import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import Counter from '../../counter';

jest.useFakeTimers();
declare const setInterval: any;

describe('<Counter />', () => {
  it('Counter to render with start time 10', () => {
    const counter = TestUtils.renderIntoDocument(
      <Counter start={10} />
    );
    const counterNode = ReactDOM.findDOMNode(counter);
    expect(counterNode).toMatchSnapshot();
  });
});
