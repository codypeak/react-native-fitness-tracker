import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';
import UdaciFitnessCalendar from 'udacifitness-calendar';
import { white } from '../utils/colors';
import DateHeader from './DateHeader';
import MetricCard from './MetricCard';
import { AppLoading } from 'expo';

class History extends Component {
    state = {
        ready: false
    }

    componentDidMount () {
        const { dispatch } = this.props
        fetchCalendarResults()  //fetching calendar entries and then dispatching them to current state
            .then((entries) => dispatch(receiveEntries(entries)))
            //entries as property on an obj here. 
            .then(({ entries }) => { 
                if (!entries[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue()
                    }))//if no entry for today give the reminder so have to add to local state for the key today
                }
            }) 
            .then(() => this.setState(() => ({ ready: true })))
    }

    //from store a given day will either have metrics from that days workout or a reminder to submit data
    renderItem = ({ today, ...metrics }, formattedDate, key) => (
        <View style={styles.item}>
            {today
            ? <View>
                <DateHeader date={formattedDate} />
                <Text style={styles.noDataText}>
                    {today}
                </Text>
            </View>
            : <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'EntryDetail',  //first arg is screen you want to go to, 2nd arg can add in detail
                { entryId: key }
            )}>
                <MetricCard date={formattedDate} metrics={metrics} />
            </TouchableOpacity>}
        </View>
    )  //parens give implicit return instead of curly braces. 

    renderEmptyDate(formattedDate) {  //dont need to make arrow function bc not using this keyword
        return (
            <View style={styles.item}>
                <DateHeader date={formattedDate}/>
                <Text style={styles.noDataText}>
                    You didn't log any data on this day.
                </Text>
            </View>
        )
    }

    render() {
        const { entries } = this.props
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <UdaciFitnessCalendar
              items={entries}
              renderItem={this.renderItem}
              renderEmptyDate={this.renderEmptyDate}
            />
          )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center', //align everything along main axis in center
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20,
    }
    
})

//receive state which is just the entries and return entries. update store with the results.
function mapStateToProps (entries) {
    return {
        entries
    }
}

export default connect(
    mapStateToProps,
    )(History);