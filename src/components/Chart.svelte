<script lang="ts">
	export const ssr = false;
	export const csr = true;

	import 'chartjs-adapter-date-fns';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import { Bar } from 'svelte-chartjs';
	import { data } from '../lib/data';
	import TooltipText from './TooltipText.svelte';
	let tooltipDataIndex: number = 0;
	let tooltipDatasetIndex: number = 0;
	let tooltipLeft: number = 0;
	let tooltipTop: number = 0;
	let tooltipBottom: number = 0;
	let tooltipRight: number = 0;
	let tooltipOpacity: number = 0;

	const minDateStr = '2022-10-01';
	const maxDateStr = '2022-10-15';

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
	): void  {

		const {chart, tooltip} = context;



		if (tooltip.opacity === 0){
			tooltipOpacity = 0;
			return;
		}
		tooltipDataIndex = tooltip.$context.tooltipItems[0].dataIndex;
		tooltipDatasetIndex = tooltip.$context.tooltipItems[0].datasetIndex;
		console.log('bar data', tooltip.$context.tooltipItems[0].element); // bar width should be what we want to center
		console.log(context);

		tooltipDataIndex = tooltip.$context.tooltipItems[0].dataIndex;
		tooltipDatasetIndex = tooltip.$context.tooltipItems[0].datasetIndex;

		tooltipOpacity = 1;
		tooltipLeft = tooltip.caretX;
		tooltipTop = tooltip.caretY;
		tooltipBottom = 0;
		tooltipRight = 0;
		console.log(tooltip);

		if (tooltip.caretY > chart.chartArea.bottom / 2) {
			tooltipTop = 0;
			tooltipBottom = chart.chartArea.bottom - tooltip.caretY;
		}
		if(tooltip.caretX > chart.chartArea.right / 2){
			// tooltipRight =  tooltip.caretX;
			tooltipLeft = tooltip.$context.tooltip.dataPoints[0].element.x - tooltip.$context.tooltip.dataPoints[0].element.width;
			// tooltipLeft = tooltip.caretX;
		}
	}
</script>

<Bar
	{data}
	options={{
		indexAxis: 'y',
		responsive: true,
		scales: { x: { type: 'time', time: { unit: 'day' }, min: minDateStr, max: maxDateStr } },
    plugins: {
        tooltip: {
			enabled: false,
			position: 'nearest',
            external: externalTooltipHandler

        }

    }
	}}

	plugins={[ChartDataLabels]}

/>
<TooltipText
		{data}
		indexB={tooltipDataIndex}
		indexA={tooltipDatasetIndex}
		left={tooltipLeft}
		top={tooltipTop}
		bottom={tooltipBottom}
		opacity={tooltipOpacity}
		right={tooltipRight}
></TooltipText>

