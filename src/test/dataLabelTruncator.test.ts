import {
	characterWidthEstimates,
	formatText,
	setupCanvasForEstimates
} from '$lib/dataLabelTruncator';
import { describe, expect, it, test, vi } from 'vitest';

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

describe('mockWindow', () => {
	it('mocks the passed object', () => {
		expect(window.Path2D).not.toBeNull();
		expect(window.CanvasGradient).not.toBeNull();
		expect(window.CanvasPattern).not.toBeNull();
		expect(window.CanvasRenderingContext2D).not.toBeNull();
		expect(window.DOMMatrix).not.toBeNull();
		expect(window.ImageData).not.toBeNull();
		expect(window.TextMetrics).not.toBeNull();
		expect(window.ImageBitmap).not.toBeNull();
		expect(window.createImageBitmap).not.toBeNull();

		expect(vi.isMockFunction(window.HTMLCanvasElement.prototype.getContext)).toBe(true);
		expect(vi.isMockFunction(window.HTMLCanvasElement.prototype.toBlob)).toBe(true);
		expect(vi.isMockFunction(window.HTMLCanvasElement.prototype.toDataURL)).toBe(true);
	});

	it('mocks without a fully formed passed in window object', () => {
		expect(window.Path2D).not.toBeNull();
		expect(window.CanvasGradient).not.toBeNull();
		expect(window.CanvasPattern).not.toBeNull();
		expect(window.CanvasRenderingContext2D).not.toBeNull();
		expect(window.DOMMatrix).not.toBeNull();
		expect(window.ImageData).not.toBeNull();
		expect(window.TextMetrics).not.toBeNull();
		expect(window.ImageBitmap).not.toBeNull();
		expect(window.createImageBitmap).not.toBeNull();

		expect(vi.isMockFunction(window.HTMLCanvasElement)).toBe(false);
	});
});

// const { window } = new JSDOM('<!doctype html><html><body></body></html>');
// global.document = window.document;
// global.window = global.document.defaultView;

test('takes in a sample string and the width of the bar and returns a truncated version of the string', () => {
	const inputString: string =
		'This is the label for test one. \nSecond line of label for test one. \nThird line of label for test one.';
	const inputWidth: number = 150;
	const expectedString: string =
		'This is the label for test one. \nSecond line of label for test one. \nThird line of label for test one.\n';
	// const spy: MockInstance = vi.spyOn(document, 'createElement').mockReturnValue(new HTMLDivElement());
	console.log('cookie');
	setupCanvasForEstimates(window.HTMLCanvasElement.prototype);
	characterWidthEstimates();
	console.log('bar');
	const actualString: string = formatText(inputString, inputWidth);
	console.log(actualString);
	expect(actualString).toEqual(expectedString);
	// expect(spy).toHaveBeenCalled();
});
