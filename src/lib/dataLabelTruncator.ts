const textWidthCache: Record<string, number> ={};

export function formatText(text: string, barWidth: number) :string{
    const textByLine: string[] = text.toString().split('/n');

    let result: string = "";
    for(const line of textByLine)
   {
       let totalSize: number = 0;
       for(const character of line) {
           if ((totalSize += textWidth(character)) > barWidth) {
               break;
           }
           result += character;
       }
           result += "\n"
       }
    return result;
}
function textWidth (text: string): number{
    let total = 0;
    if(text && text !== ''){
       const textArray: string[] = text.split("");
       textArray.forEach(
           function(char: string){
               total += charWidth(char);
           }
       )
    }
    return total;
}

function charWidth (char: string) :number{
    if (textWidthCache[char]){
        return textWidthCache[char];
    }
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if(context) {

        const width = context.measureText(char).width;
        textWidthCache[char] = width;
    }
    return textWidthCache[char];
}

export function characterWidthEstimates() {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/:%';
    const characterWidths: Record<string, number> = {};

    for (const character of characters) {
        characterWidths[character] = charWidth(character);
    }

    return characterWidths;
}