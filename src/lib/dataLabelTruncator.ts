const _textWidthCache: Record<string, number> = {};
let _canvas: HTMLCanvasElement;

export function formatText(text: string, barWidth: number, charWidthFunction: (char: string) => number = charWidth): string {
    const textString: string = text.toString();
    const textByLine: string[] = textString.split('\n');

    let result: string = '';
    for (const line of textByLine) {
        let totalSize: number = 0;
        for (const character of line) {
            if ((totalSize += charWidthFunction(character)) > barWidth) {
                break;
            }
            result += character;
        }
        result += '\n';
    }
    return result;
}

export function charWidth(char: string): number {
    const font: string = '1rem Arial';
    if (_textWidthCache[char]) {
        return _textWidthCache[char];
    }
    _canvas = document.createElement('canvas');
    const context: CanvasRenderingContext2D | null = _canvas.getContext('2d');

    if (context) {
        context.font = font;
        const width: number = context.measureText(char).width;
        _textWidthCache[char] = width;
    }
    return _textWidthCache[char];
}

export function characterWidthEstimates(charWidthInput: (char: string) => number = charWidth): Record<string, number> {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/:%. ';
    const characterWidths: Record<string, number> = {};

    for (const character of characters) {
        characterWidths[character] = charWidthInput(character);
    }
    return characterWidths;
}

export function setupCanvasForEstimates(canvas: HTMLCanvasElement) {
    _canvas = canvas;
}

