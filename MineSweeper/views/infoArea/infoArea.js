import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';


const s = StyleSheet.create({
  container:{
    flex:1,
  }

});


module.exports = class infoArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
      return(
        <View style={s.container}>
          <Text>123</Text>
        </View>
      )

    }
}
