import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Block from './block/block';

const s = StyleSheet.create({
  mineContainer:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
  }
});

module.exports = class MineField extends Component {
      constructor(props) {
          super(props);
          //state 保存要显示的东西(状态)
          this.state = {
              level: 1,
              data: [],
              rest: this.props.level * 10 + 10,
              unOpened: Math.pow(this.props.level * 4 + 6, 2) - this.props.level * 10 + 10,//剩余的
          }
          this.startTime; //游戏开始时间
          //行、列、雷数
          this.rows = this.props.level * 4 + 6,
          this.cols = this.props.level * 4 + 6,
          this.mines = this.props.level * 10 + 10,

          this.backup = 0; //刷新备份
          this._initStore();
          this._initMines();
      }
  //初始化雷区存储数据结构
    _initStore() {
          let i = 0;
          while (i < this.rows) {
              let tempArr = [],
                  j = 0;
              while (j < this.cols) {
                  tempArr.push({
                      haveMine: false,
                      around: 0,
                      type: 0,
                  })
                  j++;
              }
              this.state.data.push(tempArr);
              i++;
          }
          this.backup = JSON.parse(JSON.stringify(this.state.data));
      }
  //获取一个随机的不重复数组
    _getRandomArray(endNum,count) {
      // console.log(endNum);
        let ret = new Set();
        while (ret.size < count+1) {
            ret.add(parseInt(Math.random() * endNum))
        }
        return [...ret];
    }
  //给周围的雷区增加计数
    _addAroundNumber(row, col) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let x = row + i,
                    y = col + j;
                if (x >= 0 && y >= 0 && x < this.rows && y < this.cols && (i != 0 || j != 0)) {
                    this.state.data[x][y].around+=1;
                }
            }
        }
    }
  //安放地雷
    _initMines() {
        let mines = 0;
        let randomArray = this._getRandomArray(this.rows * this.cols,this.mines);
        for (let value of randomArray) {
            let row = parseInt(value / this.cols);
            let col = value % this.cols;
            let block = this.state.data[row][col];
            block.haveMine = true;
            this._addAroundNumber(row, col);
        }
    }
  //检查是否完成
    _checkFinish(){
      if(this.state.unOpened == 0){
        let endTime = new Date();
        alert('Congratulation!  You Used' + (this.startTime - endTime) + 'ms')
        return true;
      }else{
        return false;
      }
    }
  //翻牌子，打开0周围的8个格子，如果还是0，则继续打开
    _openMore(row, col) {
        let nowAt = this.state.data[row][col];
        if (nowAt.haveMine || nowAt.type == 1) return;
        nowAt.type = 1;
        this.state.unOpened -= 1;
        this.setState({})
        if (nowAt.around == 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let x = row + i,
                        y = col + j;
                    if (x >= 0 && y >= 0 && x < this.rows && y < this.cols && (i != 0 || j != 0)) {
                        this._openMore(x, y);
                    }
                }
            }
        }
    }
  //打开一个雷区
    _openOne(row, col) {
        let nowAt = this.state.data[row][col];
        if (nowAt.haveMine) {
            alert('Game Over!');
        } else {
            nowAt.type = 1;
            this.state.unOpened -= 1;
            this.setState({})
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let x = row + i,
                        y = col + j;
                    if(this.state.data[x][y].type == 2 && this.state.data[x][y].haveMine){
                      alert('Wrong Flag');
                    }
                    if (x >= 0 && y >= 0 && x < this.rows && y < this.cols && (i != 0 || j != 0) &&
                      (this.state.data[x][y].around == 0 || nowAt.around == 0)) {
                        this._openMore(x, y);
                    }
                }
            }
        }
    }
    longPress(row, col) {
        if (this.state.rest == 0) return;
        let nowAt = this.state.data[row][col];
        if (nowAt.type == 2) {
          nowAt.type = 0;
          this.state.rest -= 1;
        } else if (nowAt.type == 0){
          nowAt.type = 2;
          this.state.rest += 1;
        }
        this.setState({})

    }
    press(row,col){
        let nowAt = this.state.data[row][col];
        if (nowAt.type == 0) {
          if(!this.startTime) this.startTime = new Date();//记录开始时间
          this._openOne(row,col);
        } else if (nowAt.type == 1) {
          //判断周围8个格子的雷以及是否插旗,数量等于该位置数字
          let flags = nowAt.around;
          let ready2press = [];
          for (let i = -1; i <= 1; i++) {
              for (let j = -1; j <= 1; j++) {
                  let x = row + i,
                      y = col + j;
                  if (x >= 0 && y >= 0 && x < this.rows && y < this.cols && (i != 0 || j != 0)) {
                      if(this.state.data[x][y].type == 2){
                        flags --;
                      }else if(this.state.data[x][y].type == 0){
                        ready2press.push([x,y]);
                      }
                  }
              }
          }
          if(flags==0){
            ready2press.map((value)=>{
                this._openOne(value[0],value[1]);
            })
          }
        }
    }
  //重置所有
    refresh() {
        this.setState({
            row: JSON.parse(JSON.stringify(this.backup)),
        })
    }
    render() {
      let doms=[], key=0;
      this.state.data.map((row,key_r)=>{
        row.map((col,key_c)=>{
          let temp = <Block
            key = {key}
            press = {this.press.bind(this,key_r,key_c)}
            longPress = {this.longPress.bind(this,key_r,key_c)}
            haveMine = {col.haveMine}
            type = {col.type}
            around = {col.around}
            col = {this.cols}//列数，用来保持每一列个数固定
          ></Block>
          doms.push(temp);
          key++;
        })
      })
      return (
        <View style={s.container}>
          <View style={s.mineContainer}>
            {doms}
          </View>
        </View>
      )
    }
}
