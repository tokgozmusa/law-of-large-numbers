import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plot from './components/customPlot';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import Paper from '@material-ui/core/Paper';
import PauseIcon from '@material-ui/icons/Pause';
import RefreshIcon from '@material-ui/icons/Refresh';
import Slider from '@material-ui/lab/Slider';
import Theme from './theme';

const defaultState = {
  title: '',
  data1: [],
  data2: [],
  time: [],
  total: 0,
  isRunning: false,
  speedSliderValue: 50, // can be between [0, 100] (both included)
  displayModeBar: true,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount() {
    const { isRunning, speedSliderValue } = this.state;
    if (isRunning) {
      this.interval = setInterval(
        () => this.tick(),
        this.calculateSpeed(speedSliderValue),
      );
    }
  }

  getNewRandomPoint() {
    let tailCounter = 0;
    for (let i = 0; i < 100; i++) {
      const tailOrHead = Math.floor(Math.random() * 2);
      if (tailOrHead === 0) {
        tailCounter++;
      }
    }
    return tailCounter;
  }

  tick = () => {
    const { time, data1, data2, total } = this.state;
    const newRandomPoint = this.getNewRandomPoint();
    const newData1 = [...data1];
    const newData2 = [...data2];
    const newTime = [...time];

    newTime.push(newTime.length + 1);
    newData1.push(50);
    newData2.push((total + newRandomPoint) / newTime.length);

    this.setState({
      time: newTime,
      data1: newData1,
      data2: newData2,
      total: total + newRandomPoint,
    });
  };

  handleToolSwitch = () => {
    this.setState({ displayModeBar: !this.state.displayModeBar });
  };

  handlePlayPause = () => {
    const { isRunning, speedSliderValue } = this.state;
    if (isRunning) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(
        () => this.tick(),
        this.calculateSpeed(speedSliderValue),
      );
    }
    this.setState({ isRunning: !isRunning });
  };

  handleSpeedSliderChange = (event, value) => {
    const { isRunning } = this.state;
    this.setState({ speedSliderValue: value });
    if (isRunning) {
      clearInterval(this.interval);
      this.interval = setInterval(
        () => this.tick(),
        this.calculateSpeed(value),
      );
    }
  };

  calculateSpeed = speedSliderValue => {
    return speedSliderValue === 0 ? 500 : 5000 / speedSliderValue;
  };

  refresh = () => {
    clearInterval(this.interval);
    this.setState(defaultState);
  };

  render() {
    const {
      title,
      data1,
      data2,
      time,
      isRunning,
      speedSliderValue,
      displayModeBar,
    } = this.state;
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={Theme}>
        <Paper className={classes.intro} elevation={1}>
          <Typography variant="h5" component="h5">
            Experiment about "Law of Large Numbers"
          </Typography>
        </Paper>
        <Paper className={classes.plot} elevation={1}>
          <Plot
            title={title}
            time={time}
            data1={data1}
            data2={data2}
            displayModeBar={displayModeBar}
          />
        </Paper>
        <Paper className={classes.settingsPanel} elevation={1}>
          <Paper className={classes.controlPanel} elevation={0}>
            <IconButton color="primary" onClick={this.handlePlayPause}>
              {isRunning ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
            <IconButton color="primary" onClick={this.refresh}>
              <RefreshIcon />
            </IconButton>
          </Paper>
          <Paper className={classes.advancedControlPanel} elevation={0}>
            <Paper className={classes.row} elevation={0}>
              <Typography style={{ marginRight: 20 }} component="p">
                Speed
              </Typography>
              <Slider
                value={speedSliderValue}
                onChange={this.handleSpeedSliderChange}
              />
            </Paper>
            <Paper className={classes.row} elevation={0}>
              <Typography style={{ marginRight: 20 }} component="p">
                Plot controls
              </Typography>
              <Switch
                color="primary"
                checked={displayModeBar}
                onChange={this.handleToolSwitch}
              />
            </Paper>
          </Paper>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

const styles = theme => ({
  intro: {
    ...theme.mixins.gutters(),
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
  plot: {
    ...theme.mixins.gutters(),
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsPanel: {
    ...theme.mixins.gutters(),
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlPanel: {
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  advancedControlPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left',
    width: '50%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
