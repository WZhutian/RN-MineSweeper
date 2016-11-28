import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView,} from 'react-native';

const s = StyleSheet.create({
  container:{
    flex:1,
  },
  infoPannel:{
    alignItems:'center',
    justifyContent:'center',
    margin:5,
    borderRadius:4,
    borderColor:'rgb(13, 54, 52)',
    borderWidth:2,
    width:50,
  },

});


module.exports = class infoArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    _renderViews(){
      return(
        <View></View>
      )
    }
    render() {
      return(
        <View style={s.container}>
          <ScrollView
            style={{flex:1}}
            horizontal = {true}
          >
            <View style={s.infoPannel}>
              <Text style={{}}>{this.props.name}(我)</Text>
              <Text style={{}}>{this.props.rest}</Text>
            </View>
            {this._renderViews()}
          </ScrollView>
        </View>
      )
    }
}
