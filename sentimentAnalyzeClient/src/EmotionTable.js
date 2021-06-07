import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {

  getItems = function () {
    const emotions = eval('(' + JSON.stringify(this.props.emotions) + ')')
    let res = []
    for (var i in emotions)
      res.push(emotions[i]);
    console.log(res)
    return res
  }
  getKey = function () {
    const emotions = eval('(' + JSON.stringify(this.props.emotions) + ')')
    return Object.keys(emotions)
  }
  mergeArr = function (arr1, arr2) {
    let res = []
    let temp = []
    for (var i in arr1) {
      temp.push(arr1[i])
      temp.push(arr2[i])
      res.push(temp);
      temp = []
    }
    return res
  }
  render() {
    return (
      <div>
        <table className="table table-bordered">
          <tbody>
            {
              this.mergeArr(this.getKey(), this.getItems()).map(function (eventDetails) {
                return <tr><td>{eventDetails[0]}</td><td>{eventDetails[1]}</td></tr>;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

}
export default EmotionTable;
