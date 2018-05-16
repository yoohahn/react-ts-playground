import * as React from 'react';
import styles from './counter.css';

interface ICounterStates {
  count: number;
}

interface ICounterProps extends React.Props<Counter> {
  start: number;
  interval?: number;
}

class Counter extends React.Component<ICounterProps, ICounterStates> {
  interval: number;
  public static defaultProps: Partial<ICounterProps> = {
    interval: 1000,
  };

  constructor(props) {
    super(props);

    this.state = {
      count: props.start,
    };
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, this.props.interval);
  }

  render() {
    return (
      <div className={styles.counter}>{this.state.count}</div>
    );
  }
}

export default Counter;
