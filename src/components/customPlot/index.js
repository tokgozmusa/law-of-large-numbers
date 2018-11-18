import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class CustomPlot extends Component {
  static defaultProps = {
    title: '',
    time: [],
    data1: [],
    data2: [],
    displayModeBar: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      layout: {
        title: '',
        autosize: true,
        datarevision: 0,
      },
      useResizeHandler: true,
      style: {
        width: '100%',
        height: '100%',
      },
      data: [
        {
          x: [],
          y: [],
          type: 'scatter',
          mode: 'lines+points',
          marker: { color: 'blue' },
        },
        {
          x: [],
          y: [],
          type: 'scatter',
          mode: 'lines+points',
          marker: { color: 'red' },
        },
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { time, data1, data2, title } = nextProps;
    let newData = [...this.state.data];

    newData[0].x = time;
    newData[0].y = data1;

    newData[1].x = time;
    newData[1].y = data2;

    const newLayout = Object.assign({}, this.state.layout);
    newLayout.title = title;
    newLayout.datarevision++;
    // TODO: handle integer overflow

    this.setState({ layout: newLayout });
  }

  render() {
    const { layout, data } = this.state;
    const { displayModeBar } = this.props;
    return <Plot layout={layout} data={data} config={{ displayModeBar }} />;
  }
}

export default CustomPlot;
