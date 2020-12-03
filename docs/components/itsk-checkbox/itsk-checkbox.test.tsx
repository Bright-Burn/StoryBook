import { ItskCheckbox } from './itsk-checkbox';
import {render, unmountComponentAtNode} from "react-dom";
import React from "react";
import {act} from "react-dom/test-utils";

let container: any = null;
beforeEach(() => {
   container = document.createElement("div");
   document.body.appendChild(container);
});

afterEach(() => {
   unmountComponentAtNode(container);
   container.remove();
   container = null;
});

describe('Checkbox Component', () => {
   it('is truthy', () => {
      act(() => {
         render(<ItskCheckbox onChange={any0 => console.log(any0)}
                              value={1}
                              model={[0]}
                              binary={false}
                              disabled={false}
         >checkbox</ItskCheckbox>, container)
      })

      const checkbox = container.querySelector('.checkbox')
      expect(checkbox).toBeDefined();
   });

   it("changes value when clicked", () => {
      const callback = (data: any[]) => expect(data).toStrictEqual([1])
      const callback2 = (data: any[]) => expect(data).toStrictEqual([2])
      const callback3 = (data: any[]) => expect(data).toStrictEqual([true])
      act(() => {
         render(<><ItskCheckbox onChange={callback}
                              value={1}
                              model={[]}
                              binary={false}
                              disabled={false}
                              >checkbox</ItskCheckbox>
                  <ItskCheckbox onChange={callback2}
                                value={2}
                                model={[]}
                                binary={false}
                                disabled={false}
                  >checkbox</ItskCheckbox>
                  <ItskCheckbox onChange={callback3}
                                value={2}
                                model={[]}
                                binary={true}
                                disabled={false}
                  >checkbox</ItskCheckbox></>, container);
      });

      const button = document.querySelectorAll(".checkbox");
      act(() => {
         for (let i = 0; i < button.length; i++){
         button[i].dispatchEvent(new MouseEvent("click", { bubbles: true }));
         }
      });
      });
});
