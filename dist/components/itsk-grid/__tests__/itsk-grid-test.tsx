import {ItskGrid} from '../itsk-grid'
import {render, unmountComponentAtNode} from "react-dom";
import React from "react";
import {act} from "react-dom/test-utils";

const gridColumn = []
const gridRow = []

let container: HTMLDivElement = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('grid', () => {
  it('Grid should be rendered ', function () {
    act(() => {
      render(<ItskGrid columnsConfig={gridColumn} grid={gridRow}/>, container)
    })
    const grid = container.querySelector('.grid')
    expect(1).toBeUndefined()
  });
})