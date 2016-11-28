'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MineField from './mineField/mineField';
import InfoArea from './infoArea/infoArea';

module.exports = class Layout extends Component {
  static propTypes = {
      navigator: React.PropTypes.object,
      route: React.PropTypes.object
  };

  constructor(props){
      super(props);
      this.state = {
      }
  }
  render() {
    return (
      <View style={styles.container}>
        <InfoArea></InfoArea>
        <MineField
          level={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
