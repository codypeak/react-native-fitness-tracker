import React from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';


export default class App extends React.Component {
  render() {
    return (  //adding redux, wrap app with provider, passing it store and reducer function
      <Provider store={createStore(reducer)}> 
        <View style={{flex: 1}}>  
          <AddEntry />
        </View>
      </Provider>  //flex 1 so component takes up all available space, any children components will expand to this full size. 
    );
  }
}



//https://github.com/udacity/reactnd-UdaciFitness-complete/tree/AppSetup
