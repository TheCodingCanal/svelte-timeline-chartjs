<script lang="ts">
	export const ssr = false;
	export const csr = true;

	import 'chartjs-adapter-date-fns';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import { Bar } from 'svelte-chartjs';
	import { data, type TimelineChartData } from '../lib/data';
	import TooltipText from './TooltipText.svelte';

	const icons = {
		blockquote: TooltipText
	};

	import {
		BarElement,
		CategoryScale,
		Chart,
		Legend,
		TimeScale,
		Title,
		Tooltip,
		type TooltipItem,
		type TooltipModel
	} from 'chart.js';
	// let tooltipDataIndex: number = 0;
	// let tooltipDatasetIndex: number = 0;
	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, TimeScale);

	const getOrCreateTooltip = (chart: Chart) => {
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
			tooltipEl.id = 'tooltipContents';
			let tooltipTextEl = document.getElementById('TooltipText');

			if (tooltipTextEl) {
				tooltipTextEl.style.opacity = 1;
				tooltipEl.appendChild(tooltipTextEl);
			}
			chart.canvas.parentNode.appendChild(tooltipEl);
		}
		return tooltipEl;
	};

	function customTooltip(
		this: TooltipModel<'bar'>,
		args: { chart: Chart; tooltip: TooltipModel<'bar'> }
	): void {
		console.log(args);
		const tooltip = args.tooltip;
		const chart = args.chart;

		// tooltipDataIndex = tooltip.$context.tooltipItems[0].dataIndex;
		// tooltipDatasetIndex = tooltip.$context.tooltipItems[0].datasetIndex;
		const tooltipEl = getOrCreateTooltip(chart);

		if (tooltip.opacity === 0) {
			tooltipEl.style.opacity = 0;
			return;
		}

		const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

		tooltipEl.style.opacity = 1;
		tooltipEl.style.left = positionX + window.scrollX + tooltip.caretX + 'px';
		tooltipEl.style.top = positionY + window.scrollY + tooltip.caretY + 'px';
		// tooltipEl.style.top = tooltip._eventPosition.y + 'px';
		tooltipEl.style.font = tooltip.options.bodyFont.string;
		tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';

		const bounding = tooltipEl.getBoundingClientRect();

		if (tooltip.caretY + bounding.height > window.innerHeight) {
			tooltipEl.style.top =
				positionY + window.scrollY + tooltip.caretY - tooltipEl.clientHeight + 'px';
		}
	}

	const customTooltipLabel = (context: TooltipItem<'bar'>) => {
		console.log(context);
		let label = context.label || '';

		if (label) {
			label += '\n';
		}

		if (context.raw) {
			const rawObj = context.raw as TimelineChartData;
			if (rawObj.tooltip) {
				label += rawObj.tooltip[0][0] + ' - ' + rawObj.tooltip[0][1] + '\n';
				label += rawObj.tooltip[1][0] + ' - ' + rawObj.tooltip[1][1];
			}
		}

		return label;
	};
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
				external: customTooltip
			}
		}
	}}
	plugins={[ChartDataLabels]}
/>

<TooltipText></TooltipText>

<style>
	.tooltip {
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 8px;
		border-radius: 4px;
		font-size: 12px;
		pointer-events: none;
		position: absolute;
	}
</style>
