import React, { Component } from 'react'
import Plot from './components/customPlot'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Law of Large Numbers',
      data1: [],
      data2: [],
      time: [],
      total: 0,
      displayModeBar: false,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 10)
  }

  getNewRandomPoint() {
    let tail = 0
    for (let i = 0; i < 100; i++) {
      const asd = Math.floor(Math.random() * 2)
      if (asd === 0) {
        tail++
      }
    }
    return tail
  }

  tick = () => {
    const { time, data1, data2, total } = this.state
    const newRandomPoint = this.getNewRandomPoint()
    const newData1 = [...data1]
    const newData2 = [...data2]
    const newTime = [...time]

    newTime.push(newTime.length + 1)
    newData1.push(50)
    newData2.push((total + newRandomPoint) / newTime.length)

    this.setState({
      time: newTime,
      data1: newData1,
      data2: newData2,
      total: total + newRandomPoint,
    })
  }

  render() {
    const { title, data1, data2, time, displayModeBar } = this.state
    return (
      <div className="App">
        <button
          onClick={event => {
            this.setState({ displayModeBar: true })
            clearInterval(this.interval)
          }}
        >
          Stop
        </button>
        <Plot
          title={title}
          time={time}
          data1={data1}
          data2={data2}
          displayModeBar={displayModeBar}
        />
      </div>
    )
  }
}

export default App
