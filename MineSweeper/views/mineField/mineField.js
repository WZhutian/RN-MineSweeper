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
  signOne(row, col) {
      if (this.state.rest == 0) return;
      this.state.data[row][col].type = 2;
      this.setState({
          rest: this.state.rest - 1,
      })
  }
  unSignOne(row, col) {
      if (this.state.data[row][col].type != 2) return;
      this.state.data[row][col].type = 0;
      this.setState({
          rest: this.state.rest + 1,
      })
  }
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
          open = {this.openOne.bind(this)}
          sign = {this.signOne.bind(this)}
          unSign = {this.unSignOne.bind(this)}
          data = {col}
        ></Block>
        doms.push(temp)
        key++;
      }
    }
    console.log(doms);
    return (
      <View style={{flex:1}}>
        {doms}
      </View>
    )
  }
}
