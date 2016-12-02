'use strict'
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Navigator,} from 'react-native';
import { createStore} from 'redux';
import { Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import Layout from './views/layout';

// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

// Store
const store = createStore(counter);

class Redux extends Component {


  render() {
       return (
           <Provider store = { store }>
               <MineSweeper />
           </Provider>
       );
   }
}

class MS extends Component {
  render() {
    return (
        <Navigator
            configureScene={
                (route) => {
                    if(route.configureScene){
                        return route.configureScene
                    }
                    return Navigator.SceneConfigs.FloatFromRight
                }
            }
            initialRoute={
                {
                    name : 'Layout',
                    index : 0,
                    component : Layout,
                    configureScene: Navigator.SceneConfigs.FloatFromRight
                }
            }
            renderScene={
                (route, navigator) =>
                {
                    var Component = route.component;
                        return <Component
                        navigator={navigator}
                        route={route}
                    />
                }
            }
        />

    );
  }
}
let setState = (state) => {
    return {
        userReducer: state.userReducer
    }
};
let setAction = (dispatch) => {
    return {
        getLocalUser: (callback) => {dispatch(userAction.getLocal(callback))}
    }
}
let MineSweeper = connect(setState, setAction)(MS);

AppRegistry.registerComponent('MineSweeper', () => Redux);
