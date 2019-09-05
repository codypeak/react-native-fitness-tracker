import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from './components/History';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator} from 'react-navigation-stack'
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import Constants from 'expo-constants'
import EntryDetail from './components/EntryDetail';

function UdaciStatusBar ({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  History: History,
  AddEntry: AddEntry,
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
        return routeName === "History" 
          ? <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
          : <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }),
  tabBarOptions: {
    showIcon: true,
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
    },
  }
)
// const Tabs = TabNavigator({
//   History: {
//     screen: History,
//     navigationOptions: {
//       tabBarLabel: 'History',
//       tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
//     },
//   },
//   AddEntry: {
//     screen: AddEntry,
//     navigationOptions: {
//       tabBarLabel: 'Add Entry',
//       tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
//     },
//   },
// }, {
//   navigationOptions: {
//     header: null
//   },
//   tabBarOptions: {
//     activeTintColor: Platform.OS === 'ios' ? purple : white,
//     style: {
//       height: 56,
//       backgroundColor: Platform.OS === 'ios' ? white : purple,
//       shadowColor: 'rgba(0, 0, 0, 0.24)',
//       shadowOffset: {
//         width: 0,
//         height: 3
//       },
//       shadowRadius: 6,
//       shadowOpacity: 1
//     }
//   }
// })

//need stackNav b/c going into route hierarchy
//updated per https://github.com/udacity/reactnd-UdaciFitness-complete/commit/86af918722052eebafbc2892b6cd772b51a18dd4?
const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    })
  }
})) 

export default class App extends React.Component {
  render() {
    return (  //adding redux, wrap app with provider, passing it store and reducer function
      <Provider store={createStore(reducer)}> 
        <View style={{flex: 1}}>  
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>  //flex 1 so component takes up all available space, any children components will expand to this full size. 
    )
  }
}
