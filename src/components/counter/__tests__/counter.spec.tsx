import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import Counter from "../index";

jest.useFakeTimers();

describe("<Counter />", () => {
  it("Counter to render with start time 10", () => {
    const counter = TestUtils.renderIntoDocument(<Counter start={10} /> as any);
    const counterNode = ReactDOM.findDOMNode(counter);
    expect(counterNode).toMatchSnapshot();
  });
});
