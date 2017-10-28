import * as React from 'react';
import Counter from './counter';
import './app.css';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="app">
        <Counter title="Counter" start={10}/>
      </div>
    );
  }
}

export default App;
