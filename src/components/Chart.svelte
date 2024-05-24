<script lang="ts">


    export const ssr = false;
    export const csr = true;

    import 'chartjs-adapter-date-fns';
    import ChartDataLabels from 'chartjs-plugin-datalabels';
    import {Bar} from 'svelte-chartjs';
    import {data} from '../lib/data';
    import {DatedTime} from "$lib/TimeData";
    import TooltipText from './TooltipText.svelte';
    import {XAxisAdjustment} from "$lib/TimeLogic";
    import type {XAxisTime} from "$lib/types";


    let tooltipDataIndex: number = 0;
    let tooltipDatasetIndex: number = 0;
    let tooltipLeft: number = 0;
    let tooltipTop: number = 0;
    let tooltipBottom: number = 0;
    let tooltipRight: number = 0;
    let tooltipOpacity: number = 0;

    let TimeData: XAxisTime;

    export const minDate: Date = DatedTime.min;
    export const maxDate: Date = DatedTime.max;
    export const minDateStr: string = minDate.toISOString();
    export const maxDateStr: string = maxDate.toISOString();
    console.log("maxDateString", maxDateStr, "maxDate", maxDate);
console.log(DatedTime);
    $: TimeData = XAxisAdjustment(DatedTime);


    import {
        BarElement,
        CategoryScale,
        Chart,
        Legend,
        TimeScale,
        Title,
        Tooltip,
        type TooltipModel
    } from 'chart.js';

    Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, TimeScale);

    function externalTooltipHandler(
        this: TooltipModel<'bar'>,
        context: { chart: Chart; tooltip: TooltipModel<'bar'> }
    ): void {

        const {chart, tooltip} = context;

        if (tooltip.opacity === 0) {
            tooltipOpacity = 0;
            return;
        }

        tooltipDataIndex = tooltip.$context.tooltipItems[0].dataIndex;
        tooltipDatasetIndex = tooltip.$context.tooltipItems[0].datasetIndex;
        // console.log('bar data', tooltip.$context.tooltipItems[0].element);
        // console.log(context);


        tooltipOpacity = 1;
        tooltipLeft = tooltip.caretX;
        tooltipTop = tooltip.caretY;
        tooltipBottom = 0;
        tooltipRight = 0;


        //Flips tooltip up if in bottom half of the page.
        if (tooltip.caretY > chart.chartArea.bottom / 2) {
            tooltipTop = 0;
            let tooltipDelta: number = chart.canvas.getBoundingClientRect().bottom - tooltip.caretY;
            let pageChartDelta: number = window.innerHeight - chart.canvas.getBoundingClientRect().bottom;
            tooltipBottom = pageChartDelta + tooltipDelta;

        }
        //Flips tooltip to the left if it is too close to the left hand side of screen.
        if (tooltip.caretX - tooltip.$context.tooltip.dataPoints[0].element.width < window.innerWidth / 4 && tooltip.caretX > chart.chartArea.right / 2) {
            tooltipLeft = tooltip.caretX - tooltip.$context.tooltip.dataPoints[0].element.width;
        }
        //Flips tooltip to left side of bar if in right half of screen.
        else if (tooltip.caretX > chart.chartArea.right / 2) {
            tooltipRight = tooltip.caretX + tooltip.$context.tooltip.dataPoints[0].element.width;
            tooltipLeft = tooltip.caretX - tooltip.$context.tooltip.dataPoints[0].element.width;
        }


    }
</script>

<Bar
        {data}
        options={{
		indexAxis: 'y',
		responsive: true,
    scales: { x: { type: 'time', time: { unit: TimeData.unit }, min: minDateStr, max: maxDateStr, ticks: {stepSize: TimeData.stepSize}} },
    plugins: {
        tooltip: {
			enabled: false,
			position: 'nearest',
            external: externalTooltipHandler
        },
        datalabels:{
            clamp: true,
            textAlign: 'center',
            display: 'auto'
        }

    }
	}}

        plugins={[ChartDataLabels]}

/>
<TooltipText
        {data}
        tooltipDataIndex={tooltipDataIndex}
        tooltipDatasetIndex={tooltipDatasetIndex}
        left={tooltipLeft}
        top={tooltipTop}
        bottom={tooltipBottom}
        opacity={tooltipOpacity}
        right={tooltipRight}
></TooltipText>

