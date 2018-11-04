import React, { Component } from 'react'
import Plot from 'react-plotly.js'

class CustomPlot extends Component {
  static defaultProps = {
    title: '',
    time: [],
    data1: [],
    data2: [],
    displayModeBar: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      layout: {
        width: '100%',
        height: '100%',
        title: '',
        datarevision: 0,
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
    }
  }

  componentWillReceiveProps(nextProps) {
    const { time, data1, data2, title } = nextProps
    let newData = [...this.state.data]

    newData[0].x = time
    newData[0].y = data1

    newData[1].x = time
    newData[1].y = data2

    const newLayout = Object.assign({}, this.state.layout)
    newLayout.title = title
    newLayout.datarevision++

    this.setState({ layout: newLayout })
  }

  render() {
    const { layout, data } = this.state
    const { displayModeBar } = this.props
    return <Plot layout={layout} data={data} config={{ displayModeBar }} />
  }
}

export default CustomPlot
