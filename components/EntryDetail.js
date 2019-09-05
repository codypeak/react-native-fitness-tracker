import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import MetricCard from './MetricCard'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { TextButton } from './TextButton'

class EntryDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const { entryID } = navigation.state.params

        const year = entryID.slice(0,4)
        const month = entryID.slice(5,7)
        const day = entryID.slice(8)

        return {
            title: `${month}/${day}/${year}`
        }
    }

    reset = () => {
        const { remove, goBack, entryID } = this.props
        remove()
        goBack()
        removeEntry(entryID)
    }

    //when click reset component re-renders, so this says dont rerender unless the day has current information and today is falsey
    shouldComponentUpdate (nextProps) {
        return nextProps.metrics !== null && !nextProps.metrics.today
    }


    render() {
        const { metrics } = this.props

        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics}/>
                <TextButton onPress={this.reset} style={{margin: 20}}>
                    RESET
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
    }
})

function mapStateToProps (state, { navigation }) {
    const { entryID } = navigation.state.params;  //entryID is key of the specific day so pass that and that day's metrics to component

    return {
        entryID,
        metrics: state[entryID]
    }
}

function mapDispatchToProps (dispatch, { navigation }) {
    const { entryID } = navigation.state.params
    //to reset/remove invoke addEntry and then at that specific addEntry  
    return { 
        remove: () => dispatch(addEntry({
            [addEntry]: timeToString() === entryID
                ? getDailyReminderValue()  //if date is today remind user to input data, if not set to null
                : null
        })),
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);