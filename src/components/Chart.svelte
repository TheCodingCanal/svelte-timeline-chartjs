<script lang="ts">
	export const ssr = false;
	export const csr = true;

	import { Bar } from 'svelte-chartjs';
	import { data } from '../lib/data.js';
	import 'chartjs-adapter-date-fns';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import TooltipText from './TooltipText.svelte';

	const icons = {
	blockquote: TooltipText,
	}

	import {
		Chart,
		TimeScale,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale
	} from 'chart.js';
	let tooltipDataIndex: number = 0;
	let tooltipDatasetIndex: number = 0;
	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, TimeScale);

	const getOrCreateTooltip = (chart) => {
		let tooltipEl = chart.canvas.parentNode.querySelector('#tooltipContents');

		if (!tooltipEl) {
			tooltipEl = document.createElement('div');
			tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
			tooltipEl.style.borderRadius = '3px';
			tooltipEl.style.color = 'white';
			tooltipEl.style.opacity = 1;
			tooltipEl.style.pointerEvents = 'none';
			tooltipEl.style.position = 'absolute';
			tooltipEl.style.transform = 'translate(-50%, 0)';
			tooltipEl.style.transition = 'all .1s ease';
			tooltipEl.id = "tooltipContents";
			let TooltipTextEl = document.getElementById("TooltipText");
			if(TooltipTextEl) {
				tooltipEl.appendChild(TooltipTextEl);
			}
			chart.canvas.parentNode.appendChild(tooltipEl);
		}
		return tooltipEl;
	};

	const externalTooltipHandler = (context) => {

		const {chart, tooltip} = context;
		tooltipDataIndex = tooltip.$context.tooltipItems[0].dataIndex;
		tooltipDatasetIndex = tooltip.$context.tooltipItems[0].datasetIndex;
		const tooltipEl = getOrCreateTooltip(chart);

		if (tooltip.opacity === 0){
			tooltipEl.style.opacity = 0;
			return;
		}

		const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
		const screenPadding: number = 500;

		// Display, position, and set styles for font
		if(tooltip.x < window.outerWidth - screenPadding) {
			tooltipEl.style.opacity = 1;
			tooltipEl.style.left = positionX + window.scrollX + tooltip.caretX + 'px';
			tooltipEl.style.top = positionY + window.scrollY + tooltip.caretY + 'px';
			// tooltipEl.style.top = tooltip._eventPosition.y + 'px';
			tooltipEl.style.font = tooltip.options.bodyFont.string;
			tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
		}
		// need to figure out better number for screenPadding
		else if(tooltip.x > window.outerWidth - screenPadding){

			tooltipEl.style.opacity = 1;
			tooltipEl.style.left = positionX + window.scrollX + tooltip.caretX - tooltipEl.clientWidth + 'px';
			tooltipEl.style.top = positionY + window.scrollY + tooltip.caretY + 'px';
			tooltipEl.style.font = tooltip.options.bodyFont.string;
			tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
		}
		// else if(tooltip.y > window.outerWidth - screenPadding){
		// 	tooltipEl.style.opacity = 1;
		// 	tooltipEl.style.left = positionX + window.scrollX + tooltip.caretX + 'px';
		// 	tooltipEl.style.top = positionY + window.scrollY + tooltip.caretY - tooltipEl.clientHeight + 'px';
		// 	tooltipEl.style.font = tooltip.options.bodyFont.string;
		// 	tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
		// }



	}
</script>

<Bar
	{data}
	options={{
		indexAxis: 'y',
		responsive: true,
		scales: { x: { type: 'time', time: { unit: 'day' }, min: '2022-10-01', max: '2022-10-15' } },
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
<TooltipText indexB={tooltipDataIndex} indexA={tooltipDatasetIndex}></TooltipText>

