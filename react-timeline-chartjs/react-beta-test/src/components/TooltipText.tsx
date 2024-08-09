import type { ChartData } from '../lib/Types';
import { signal } from "@preact/signals";
import { Signal } from "@preact/signals";
    import {data} from "../lib/data";

// const data: ChartData = signal();
// const tooltipDataIndex: Signal<number> = signal(0);
// const tooltipDatasetIndex: Signal<number> = signal(0);
// const left: Signal<number> = signal(0);
// const top: Signal<number> = signal(0);
// const bottom: Signal<number> = signal(0);
// const right: Signal<number> = signal(0);
// const opacity: Signal<number> = signal(0);
    

type tooltipData={tooltipDataIndex: number, tooltipDatasetIndex: number, left: number, top: number, bottom: number, right: number, opacity: number }
export default function TooltipText(
    tooltipInfo: tooltipData
) {
    const style: Signal<any> = signal({left: `${tooltipInfo.left}px;`, opacity: `${tooltipInfo.opacity};`})
    
    // style.value = `left: ${tooltipInfo.left}px; opacity: ${tooltipInfo.opacity};`;
    // style = ` opacity: ${opacity};`;
    if (tooltipInfo.bottom !== 0) {
        // style.value += `bottom: ${tooltipInfo.bottom}px;`;
        style.value.bottom = `${tooltipInfo.bottom}px`;
    }
    if (tooltipInfo.bottom == 0) {
        style.value += `top: ${top}px;`;
    }
    if (tooltipInfo.right !== 0) {
        // style += `left: ${left}px;`
        style.value += `right: ${tooltipInfo.right}px;`;
        style.value += 'display: flex; justify-content: flex-end;';
        console.log('right', tooltipInfo.right);
    }
    const styleString = style.toString();
    return (
        <div class="tooltip" id="tooltip" style={style.value} dangerouslySetInnerHTML={{ data.datasets[tooltipInfo.tooltipDatasetIndex].data[tooltipInfo.tooltipDataIndex].tooltip }}>
</div>
)
}