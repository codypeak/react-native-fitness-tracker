import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import UdaciStepper from './UdaciStepper'
import UdaciSlider from './UdaciSlider'
import DateHeader from './DateHeader'
import { white, purple } from '../utils/colors'

function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>SUBMIT</Text>
        </TouchableOpacity>
    )
}

export default class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] + step

            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step

            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        }))
    }

    render() {
        const metaInfo = getMetricMetaInfo()

        return (
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()} />

                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                            ? <UdaciSlider 
                                value={value}
                                onChange={(value) => this.slide(key, value)}
                                {...rest}
                            />
                            : <UdaciStepper 
                                value={value}
                                onIncrement={() => this.increment(key)}
                                onDecrement={() => this.decrement(key)}
                                {...rest}
                            />}
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: white
    },
    row: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center"
    },
    iosSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40
    },
    AndroidSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      borderRadius: 2,
      alignSelf: "flex-end",
      justifyContent: "center",
      alignItems: "center"
    },
    submitBtnText: {
      color: white,
      fontSize: 22,
      textAlign: "center"
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 30,
      marginRight: 30
    }
  });
  

  