<script lang="ts">
	export const ssr = false;
	export const csr = true;

	import { DatedTime } from '$lib/TimeData';
	import { XAxisAdjustment } from '$lib/TimeLogic';
	import { characterWidthEstimates, formatText } from '$lib/dataLabelTruncator';
	import type { XAxisTime, anyObject } from '$lib/types';
	import { Element as chartElement } from 'chart.js';
	import 'chartjs-adapter-date-fns';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import { Bar } from 'svelte-chartjs';
	import { data } from '../lib/data';
	import ModalSample from './ModalSample.svelte';
	import TooltipText from './TooltipText.svelte';

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

	const dataClone = structuredClone(data);
	const updateLabelDebounce = debounce(updateLabelOnResize, 100);

	let chartInstance: Bar;
	let modalVisible: boolean = false;
	let barLabel: string;
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
		const { chart, tooltip } = context;

		if (tooltip.opacity === 0) {
			tooltipOpacity = 0;
			return;
		}

		tooltipDataIndex = tooltip.$context.tooltipItems[0].dataIndex;
		tooltipDatasetIndex = tooltip.$context.tooltipItems[0].datasetIndex;

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
		if (
			tooltip.caretX - tooltip.$context.tooltip.dataPoints[0].element.width <
				window.innerWidth / 4 &&
			tooltip.caretX > chart.chartArea.right / 2
		) {
			tooltipLeft = tooltip.caretX - tooltip.$context.tooltip.dataPoints[0].element.width;
		}
		//Flips tooltip to left side of bar if in right half of screen.
		else if (tooltip.caretX > chart.chartArea.right / 2 && tooltip.caretX < window.innerWidth) {
			tooltipRight = tooltip.caretX + tooltip.$context.tooltip.dataPoints[0].element.width;
			tooltipLeft = tooltip.caretX - tooltip.$context.tooltip.dataPoints[0].element.width;
		}
		//When bar goes off of the left side of the screen tooltips left side will align with chart left.
		if (tooltip.$context.tooltip.dataPoints[0].element.base <= chart.chartArea.left) {
			tooltipLeft = chart.chartArea.left;
		}
		//When bar goes off of the right side of the screen the tooltip will flip to the left side.
		else if (tooltip.caretX >= chart.chartArea.right) {
			tooltipRight = tooltip.caretX + tooltip.$context.tooltip.dataPoints[0].element.width;
			tooltipLeft = tooltip.caretX - tooltip.$context.tooltip.dataPoints[0].element.width;
		}
	}

	function clickHandler(click: ChartEvent) {
		console.log(click);
		const points = chartInstance
			.$capture_state()
			.chart.getElementsAtEventForMode(click, 'nearest', { intersect: true }, true);
		if (points[0]) {
			const datasetIndex: number = points[0].datasetIndex;
			const dataIndex: number = points[0].index;
			barLabel = data.datasets[datasetIndex].data[dataIndex].label;
			modalVisible = true;
		}
	}

	function updateLabel(chart: Chart) {
		characterWidthEstimates();
		if (chart) {
			for (
				let datasetIndex: number = 0;
				datasetIndex < chart.data.datasets.length;
				datasetIndex++
			) {
				for (
					let dataIndex: number = 0;
					dataIndex < chart.data.datasets[datasetIndex].data.length;
					dataIndex++
				) {
					if (
						chart?.data?.datasets[datasetIndex]?.data[dataIndex] &&
						chart?.data?.datasets[datasetIndex]?.data[dataIndex] !== null
					) {
						const barWidth: number = chart.getDatasetMeta(datasetIndex).data[dataIndex].width;

						const barData = chart.getDatasetMeta(datasetIndex).data[dataIndex] as chartElement<
							anyObject,
							anyObject
						>;
						let shownBarWidth: number = barWidth;
						//The bar is off both sides of the screen.
						if (barData.x - barWidth < chart.chartArea.left && barData.x > chart.chartArea.right) {
							shownBarWidth =
								barWidth -
								(barData.x + barWidth - chart.chartArea.right) -
								(chart.chartArea.left - barData.x);
						}
						//bar is off the right side of the screen.
						else if (barData.x > chart.chartArea.right) {
							shownBarWidth = barWidth - (barData.x - chart.chartArea.right);
						}
						//bar is off the left side of the screen.
						else if (barData.x - barWidth < chart.chartArea.left) {
							shownBarWidth = barWidth - (chart.chartArea.left - (barData.x - barWidth));
						}

						let dataLabelString = dataClone.datasets[datasetIndex].data[dataIndex].label;
						console.log(dataLabelString);
						chart.data.datasets[datasetIndex].data[dataIndex].label = formatText(
							dataLabelString,
							shownBarWidth
						);
					}
				}
			}
		}
		chart.update();
	}

	function debounce(fn: (chart: Chart) => void, ms = 300) {
		let timeoutId: ReturnType<typeof setTimeout>;
		return function (this: any, ...args: any[]) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => fn.apply(this, args), ms);
		};
	}

	function updateLabelOnResize(chart: Chart) {
		if (chart.getDatasetMeta(0).data.length > 0) {
			updateLabel(chart);
		}
	}
</script>

<Bar
	style="position: relative; height:95vh; width:95vw"
	data-testid="barChart"
	bind:this={chartInstance}
	{data}
	options={{
		maintainAspectRatio: false,
		onResize: updateLabelDebounce,
		indexAxis: 'y',
		responsive: true,
		animation: {
			onComplete: function (event) {
				if (event.initial) {
					updateLabel(event.chart);
				}
			}
		},
		scales: {
			x: {
				type: 'time',
				time: { unit: TimeData.unit },
				min: minDateStr,
				max: maxDateStr,
				ticks: { stepSize: TimeData.stepSize }
			}
		},
		plugins: {
			tooltip: {
				enabled: false,
				position: 'nearest',
				external: externalTooltipHandler
			},
			datalabels: {
				clamp: true,
				textAlign: 'center',
				display: 'auto',
				font: {
					family: 'Arial',
					size: 12,
					style: 'normal'
				}
			}
		},
		onClick: clickHandler
	}}
	plugins={[ChartDataLabels]}
/>
<TooltipText
	{data}
	{tooltipDataIndex}
	{tooltipDatasetIndex}
	left={tooltipLeft}
	top={tooltipTop}
	bottom={tooltipBottom}
	opacity={tooltipOpacity}
	right={tooltipRight}
></TooltipText>
<ModalSample bind:showModal={modalVisible} label={barLabel}></ModalSample>
