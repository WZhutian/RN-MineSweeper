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
          this.state = {
              level: 1,
              data: [],
              rest: this.props.level * 10 + 10,
          }
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
  _initMines() {
          let mines = 0;
          let randomArray = this._getRandomArray(this.rows*this.cols,this.mines);
          for (let value of randomArray) {
              let row = parseInt(value / this.cols);
              let col = value % this.cols;
              let block = this.state.data[row][col];
              block.haveMine = true;
              this._addAroundNumber(row, col);
          }
      }
      //翻牌子算法
  _openMore(row, col) {
          let nowAt = this.state.data[row][col];
          if (nowAt.haveMine || nowAt.type == 1) return;
          if (nowAt.around == 0) {
              nowAt.type = 1;
              for (let i = -1; i <= 1; i++) {
                  for (let j = -1; j <= 1; j++) {
                      let x = row + i,
                          y = col + j;
                      if (x > 0 && y > 0 && x < this.rows && y < this.cols && (i != 0 || j != 0)) {
                          this._openMore(x, y);
                      }
                  }
              }
          } else {
              nowAt.type = 1;
          }
      }
      //打开一个雷区
  openOne(row, col) {
      if (this.state.data[row][col].haveMine) {
          alert('Game Over!');
      } else {
          this.state.data[row][col].type = 1;
          for (let i = -1; i <= 1; i++) {
              for (let j = -1; j <= 1; j++) {
                  let x = row + i,
                      y = col + j;
                  if (x > 0 && y > 0 && x < this.rows && y < this.cols && (i != 0 || j != 0)) {
                      this._openMore(x, y);
                  }
              }
          }
      }
  }
  longPress(row, col) {
      if (this.state.rest == 0) return;

      if (this.state.data[row][col].type == 2) {
        this.state.data[row][col].type = 0;
        this.state.rest -= 1;
      } else if (this.state.data[row][col].type == 0){
        this.state.data[row][col].type = 2;
        this.state.rest += 1;
      }

  }
  press(row,col){
      if (this.state.data[row][col].type == 0) {
        openOne(row,col);
      } else if (this.state.data[row][col].type == 1) {
        //先判断周围8个格子的雷以及是否插旗
        
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
    for(let row of this.state.data){
      for(let col of row){
        let temp = <Block
          key = {key}
          press = {this.press.bind(this,row,col)}
          longPress = {this.longPress.bind(this,row,col)}
          data = {col}
          col = {this.cols}//列数，用来保持每一列个数固定
        ></Block>
        doms.push(temp);
        key++;
      }
    }
    return (
      <View style={s.container}>
        <View style={s.mineContainer}>
          {doms}
        </View>
      </View>
    )
  }
}
