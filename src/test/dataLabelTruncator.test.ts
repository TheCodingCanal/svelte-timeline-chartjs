import { characterWidthEstimates, formatText, charWidth } from '$lib/dataLabelTruncator';
import { describe, expect, it, test, vi } from 'vitest';

const characterWidths: Record<string, number> = {
	A: 1,
	B: 1,
	C: 1,
	D: 1,
	E: 1,
	F: 1,
	G: 1,
	H: 1,
	I: 1,
	J: 1,
	K: 1,
	L: 1,
	M: 1,
	N: 1,
	O: 1,
	P: 1,
	Q: 1,
	R: 1,
	S: 1,
	T: 1,
	U: 1,
	V: 1,
	W: 1,
	X: 1,
	Y: 1,
	Z: 1,
	a: 1,
	b: 1,
	c: 1,
	d: 1,
	e: 1,
	f: 1,
	g: 1,
	h: 1,
	i: 1,
	j: 1,
	k: 1,
	l: 1,
	m: 1,
	n: 1,
	o: 1,
	p: 1,
	q: 1,
	r: 1,
	s: 1,
	t: 1,
	u: 1,
	v: 1,
	w: 1,
	x: 1,
	y: 1,
	z: 1,
	'0': 1,
	'1': 1,
	'2': 1,
	'3': 1,
	'4': 1,
	'5': 1,
	'6': 1,
	'7': 1,
	'8': 1,
	'9': 1,
	'-': 1,
	'/': 1,
	':': 1,
	'%': 1,
	' ': 1,
	'.': 1
};

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

test('When  formatText takes in a sample string and the width of the bar, then it returns a truncated version of the string', () => {
	const inputString: string =
		'This is the label for test one. \nSecond line of label for test one. \nThird line of label for test one.';
	const inputWidth: number = 15;
	const expectedString: string = 'This is the lab\nSecond line of \nThird line of l\n';
	// console.log('cookie');
	characterWidthEstimates();
	const actualString: string = formatText(inputString, inputWidth);
	expect(actualString).toEqual(expectedString);
});

test('When charWidth takes in a character as a string, then it will return the correct width of the character.', () => {
	const inputCharacter: string = 'A';
	const expectedWidth: number = 1;
	const actualWidth: number = charWidth(inputCharacter);
	expect(actualWidth).toEqual(expectedWidth);
});

test('when formatText is called with a string and a width, then string will be trimmed to fit the width.', () => {
	const inputString: string =
		'THIS IS THE LABEL FOR TEST ONE. \nSECOND LINE OF THE LABEL FOR TEST ONE. \nTHIRD LINE OF LABEL FOR TEST ONE.';
	// const expectedString: string = 'THIS IS THE LABEL FOR TEST ONE. \nSECOND LINE OF THE LABEL FOR TEST ONE. \nTHIRD LINE OF LABEL FOR TEST ONE.\n';
	const expectedString: string =
		'THIS IS THE LABEL FO\nSECOND LINE OF THE L\nTHIRD LINE OF LABEL \n';
	const inputWidth: number = 20;

	const characterWidthsFunction = (char: string): number => {
		return characterWidths[char];
	};

	const actualString: string = formatText(inputString, inputWidth, characterWidthsFunction);
	expect(actualString).toEqual(expectedString);
});

test('When formatText is called with a string and a width that is longer than the string, then the string will not be trimmed to fit the width.', () => {
	const inputString: string =
		'THIS IS THE LABEL FOR TEST ONE. \nSECOND LINE OF THE LABEL FOR TEST ONE. \nTHIRD LINE OF LABEL FOR TEST ONE.';
	const expectedString: string =
		'THIS IS THE LABEL FOR TEST ONE. \nSECOND LINE OF THE LABEL FOR TEST ONE. \nTHIRD LINE OF LABEL FOR TEST ONE.\n';
	const inputWidth: number = 150;
	const characterWidthsFunction = (char: string): number => {
		return characterWidths[char];
	};

	const actualString: string = formatText(inputString, inputWidth, characterWidthsFunction);
	expect(actualString).toEqual(expectedString);
});

test('When formatText is called with a string and a width that is one less than the first string, then the string will be trimmed to fit the width.', () => {
	const inputString: string =
		'THIS IS THE LABEL FOR TEST ONE. \nSECOND LINE OF THE LABEL FOR TEST ONE. \nTHIRD LINE OF LABEL FOR TEST ONE.';
	const expectedString: string =
		'THIS IS THE LABEL FOR TEST ONE\nSECOND LINE OF THE LABEL FOR T\nTHIRD LINE OF LABEL FOR TEST O\n';
	const inputWidth: number = 30;

	const characterWidthsFunction = (char: string): number => {
		return characterWidths[char];
	};

	const actualString: string = formatText(inputString, inputWidth, characterWidthsFunction);
	expect(actualString).toEqual(expectedString);
});

test('When characterWidthEstimates is called with the method CharWidthInput, then it will produce a record of chars and their widths.', () => {
	const characterWidthsFunction = (char: string): number => {
		return characterWidths[char];
	};
	const actualRecord: Record<string, number> = characterWidthEstimates(characterWidthsFunction);
	expect(actualRecord).toEqual(characterWidths);
});
