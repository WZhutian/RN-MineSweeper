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

let windowWidth = Dimensions.get('window').width;

const s = StyleSheet.create({
  block:{
    borderWidth:1,
    borderWidth:1,
    borderColor:'rgb(49, 52, 68)',
    justifyContent:'center',
    alignItems:'center',
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
    color:'white',
    fontSize:16,
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
          <TouchableOpacity
            onPress={this.props.press}
            onLongPress={this.props.longPress}
           style={[s.block,style,{width:windowWidth/this.props.col,height:windowWidth/this.props.col,}]}
          >
          {
            this.state.type==1?
            <Text style={s.text}>{this.state.around}</Text>
            : null}
          {
            this.state.type==2?
            <Image></Image>:null
          }
          </TouchableOpacity>
        )
    }
}
