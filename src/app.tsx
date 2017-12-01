import * as React from 'react';
import Counter from './components/counter';
import './app.css';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="app">
        <Counter start={0} interval={2000}/>
        <Counter start={10}/>
        <Counter start={20}/>
      </div>
    );
  }
}

export default App;
