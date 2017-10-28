import * as React from 'react';

interface ICounterStates {
  count: number;
}

interface ICounterProps extends React.Props<Counter> {
  title: string;
  start: number;
}

class Counter extends React.Component<ICounterProps, ICounterStates> {
  constructor() {
    super();

    this.state = {
      count: 0
    };
  }
  componentDidMount() {
    const { start } = this.props;
    this.setState({ count: start });
    setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }
  render() {
    const { count } = this.state;
    const { title } = this.props;
    return (
      <div>
        <div>{title}: {count}</div>
      </div>
    );
  }
}

export default Counter;
