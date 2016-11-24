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
} from 'react-native';

const s = StyleSheet.create({
  block:{
    width:20,
    height:20,
  },
  unActive:{
    backgroundColor:'rgb(79, 172, 172)'
  },
  active:{
    backgroundColor:'rgb(79, 172, 12)'
  },
  sign:{
    backgroundColor:'rgb(7, 72, 172)'
  },
  text:{

  }

});


module.exports = class Block extends Component {
    constructor(props) {
        super(props);
        this.state = {
            haveMine: this.props.data.haveMine,//bool
            type: this.props.data.type,//0, 1, 2
            around: this.props.data.around,//0-9
        }
    }
    render() {
        let style;
        switch (this.state.type) {
          case 1:
              style = s.active;
              break;
          case 2:
              style = s.sign;
              break;
          default:
              style = s.unActive
        }
        return (
          <TouchableOpacity style={[s.block,style]}>
          <Text>123</Text>
          {
            this.state.type==1?
            <Text style={s.text}>{this.state.around}</Text>
            : null}
          {
            this.state.type==2?
            <Image ></Image>:null
          }
          </TouchableOpacity>
        )
    }
}
