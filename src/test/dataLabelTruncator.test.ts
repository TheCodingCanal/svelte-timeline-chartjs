import {assert, expect, MockInstance, test, vi} from "vitest";
import {formatText, characterWidthEstimates} from "$lib/dataLabelTruncator"
import { JSDOM } from "jsdom";
// const { window } = new JSDOM('<!doctype html><html><body></body></html>');

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;
global.window = global.document.defaultView;
test('takes in a sample string and the width of the bar and returns a truncated version of the string', () =>{
    const inputString: string = "This is the label for test one. \nSecond line of label for test one. \nThird line of label for test one.";
    const inputWidth: number = 150;
    const expectedString: string = "This is the label \nSecond line of label\nThird line of label";
    // const spy: MockInstance = vi.spyOn(document, 'createElement').mockReturnValue(new HTMLDivElement());
    console.log("cookie")
    characterWidthEstimates();
    console.log("bar");
const actualString: string = formatText(inputString, inputWidth);
console.log(actualString);
    expect(actualString).toEqual(expectedString);
    // expect(spy).toHaveBeenCalled();
})