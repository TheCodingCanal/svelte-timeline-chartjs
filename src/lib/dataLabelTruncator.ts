const _textWidthCache: Record<string, number> = {};
let _canvas: HTMLCanvasElement;

export function formatText(text: string, barWidth: number): string {
	const textString: string = text.toString();
	const textByLine: string[] = textString.split('\n');
	console.log(textByLine);

	let result: string = '';
	for (const line of textByLine) {
		let totalSize: number = 0;
		console.log(totalSize);
		for (const character of line) {
			if ((totalSize += textWidth(character)) >= barWidth) {
				break;
			}
			if (text.startsWith('Job 1236')) {
				console.log(result, totalSize);
			}
			result += character;
		}

		result += '\n';
	}
	return result;
}
function textWidth(text: string): number {
	let total = 0;
	if (text && text !== '') {
		const textArray: string[] = text.split('');
		textArray.forEach(function (char: string) {
			total += charWidth(char);
		});
	}
	return total;
}

function charWidth(char: string): number {
	const font: string = '1rem Arial';
	if (_textWidthCache[char]) {
		return _textWidthCache[char];
	}
	console.log('foobar');

	console.log(_canvas);
	const context = _canvas.getContext('2d');
	console.log('barfoo');

	if (context) {
		context.font = font;
		const width = context.measureText(char).width;
		_textWidthCache[char] = width;
	}
	return _textWidthCache[char];
}

export function characterWidthEstimates() {
	const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/:%';
	const characterWidths: Record<string, number> = {};

	for (const character of characters) {
		characterWidths[character] = charWidth(character);
	}

	return characterWidths;
}

export function setupCanvasForEstimates(canvas: HTMLCanvasElement) {
	_canvas = canvas;
}
