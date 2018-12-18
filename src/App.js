import React, { Component } from 'react';
import './App.css';
import BarChart from './components/BarChart';

class App extends Component {

  barChartData = [{
    'label': 'Jan',
    'value': 1
  }, {
      'label': 'Feb',
      'value': 3
  }, {
      'label': 'Mar',
      'value': 8
  }, {
      'label': 'Apr',
      'value': 12
  }, {
      'label': 'May',
      'value': 18
  }, {
      'label': 'Jun',
      'value': 22
  }, {
      'label': 'Jul',
      'value': 28
  }, {
      'label': 'Aug',
      'value': 26
  }, {
      'label': 'Sep',
      'value': 18
  }, {
      'label': 'Oct',
      'value': 10
  }, {
      'label': 'Nov',
      'value': 6
  }, {
      'label': 'Dec',
      'value': 3
  }];

  render() {
    return (
      <BarChart data={this.barChartData} width="400" height="240"/>
    );
  }
}

export default App;
