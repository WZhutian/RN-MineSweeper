'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
} from 'react-native';
import Layout from './views/layout';

class helloworld extends Component {
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

AppRegistry.registerComponent('MineSweeper', () => MineSweeper);
