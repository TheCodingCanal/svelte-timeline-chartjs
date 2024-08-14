import { DatedTime } from '../lib/TimeData';
import { XAxisAdjustment } from '../lib/TimeLogic';
import { characterWidthEstimates, formatText } from '../lib/DataLabelTruncator';
import type { XAxisTime, anyObject } from '../lib/Types';
import { Element as chartElement, ChartEvent } from 'chart.js';
import 'chartjs-adapter-date-fns';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { data } from '../lib/Data';
import { signal } from '@preact/signals-react';
import { Signal } from '@preact/signals-react';
import TooltipText from './TooltipText.tsx';
import { useRef } from 'react';
import Modal from './Modal';

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

const tooltipDataIndex: Signal<number> = signal(0);
const tooltipDatasetIndex: Signal<number> = signal(0);
const tooltipLeft: Signal<number> = signal(0);
const tooltipTop: Signal<number> = signal(0);
const tooltipBottom: Signal<number> = signal(0);
const tooltipRight: Signal<number> = signal(0);
const tooltipOpacity: Signal<number> = signal(0);

function externalTooltipHandler(
	this: TooltipModel<'bar'>,
	context: {
		chart: Chart;
		tooltip: TooltipModel<'bar'>;
	}
) {
	const { chart, tooltip } = context;

	if (tooltip.opacity === 0) {
		tooltipOpacity.value = 0;
		console.log('hideTooltip');
		return;
	}

	tooltipDataIndex.value = tooltip.$context.tooltipItems[0].dataIndex;
	tooltipDatasetIndex.value = tooltip.$context.tooltipItems[0].datasetIndex;

	tooltipOpacity.value = 1;
	tooltipLeft.value = tooltip.caretX;
	tooltipTop.value = tooltip.caretY;
	tooltipBottom.value = 0;
	tooltipRight.value = 0;

	//Flips tooltip up if in bottom half of the page.
	if (tooltip.caretY > chart.chartArea.bottom / 2) {
		tooltipTop.value = 0;
		const tooltipDelta: number = chart.canvas.getBoundingClientRect().bottom - tooltip.caretY;
		const pageChartDelta: number = window.innerHeight - chart.canvas.getBoundingClientRect().bottom;
		tooltipBottom.value = pageChartDelta + tooltipDelta;
	}
	//Flips tooltip to the left if it is too close to the left hand side of screen.
	if (
		tooltip.caretX - tooltip.$context.tooltip.dataPoints[0].element.width < window.innerWidth / 4 &&
		tooltip.caretX > chart.chartArea.right / 2
	) {
		tooltipLeft.value = tooltip.caretX - tooltip.$context.tooltip.dataPoints[0].element.width;
	}
	//Flips tooltip to left side of bar if in right half of screen.
	else if (tooltip.caretX > chart.chartArea.right / 2 && tooltip.caretX < window.innerWidth) {
		tooltipRight.value = tooltip.caretX + tooltip.$context.tooltip.dataPoints[0].element.width;
		tooltipLeft.value = tooltip.caretX - tooltip.$context.tooltip.dataPoints[0].element.width;
	}
	//When bar goes off of the left side of the screen tooltips left side will align with chart left.
	if (tooltip.$context.tooltip.dataPoints[0].element.base <= chart.chartArea.left) {
		tooltipLeft.value = chart.chartArea.left;
	}
	//When bar goes off of the right side of the screen the tooltip will flip to the left side.
	else if (tooltip.caretX >= chart.chartArea.right) {
		tooltipRight.value = tooltip.caretX + tooltip.$context.tooltip.dataPoints[0].element.width;
		tooltipLeft.value = tooltip.caretX - tooltip.$context.tooltip.dataPoints[0].element.width;
	}
}

export default function ChartComponent() {
	const ssr = false;
	const csr = true;

	const minDate: Date = DatedTime.min;
	const maxDate: Date = DatedTime.max;
	const minDateStr: string = minDate.toISOString();
	const maxDateStr: string = maxDate.toISOString();

	const dataClone = structuredClone(data);

	const modalVisible: Signal<boolean> = signal(false);
	const barLabel: Signal<string> = signal('');
	const TimeData: Signal<XAxisTime> = signal(XAxisAdjustment(DatedTime));
	const chartRef = useRef<Bar>(null);

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, TimeScale);

	const clickHandler = (click: ChartEvent) => {
		console.log(chartRef.current);
		const points = chartRef.current.getElementsAtEventForMode(
			click,
			'nearest',
			{ intersect: true },
			true
		);
		if (points[0]) {
			const datasetIndex: number = points[0].datasetIndex;
			const dataIndex: number = points[0].index;
			barLabel.value = data.datasets[datasetIndex].data[dataIndex].label;
			modalVisible.value = true;
		}
	};

	const closeModal = () => {
		modalVisible.value = false;
	};

	const updateLabel = (chart: Chart) => {
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

						const dataLabelString = dataClone.datasets[datasetIndex].data[dataIndex].label;
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
	};

	const debounce = (fn: (chart: Chart) => void, ms = 300) => {
		let timeoutId: ReturnType<typeof setTimeout>;
		return function (this: any, ...args: any[]) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => fn.apply(this, args), ms);
		};
	};

	const updateLabelOnResize = (chart: Chart) => {
		if (chart.getDatasetMeta(0).data.length > 0) {
			updateLabel(chart);
		}
	};

	const updateLabelDebounce = debounce(updateLabelOnResize, 100);

	return (
		<div>
			<Bar
				style={{ position: 'relative', height: '95vh', width: '95vw' }}
				data-testid="barChart"
				ref={chartRef}
				data={data}
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
							time: { unit: TimeData.value.unit },
							min: minDateStr,
							max: maxDateStr,
							ticks: { stepSize: TimeData.value.stepSize }
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
				{...data}
				tooltipDataIndex={tooltipDataIndex}
				tooltipDatasetIndex={tooltipDatasetIndex}
				left={tooltipLeft}
				top={tooltipTop}
				bottom={tooltipBottom}
				opacity={tooltipOpacity}
				right={tooltipRight}
			></TooltipText>
			<Modal show={modalVisible} children={barLabel}></Modal>
		</div>
	);
}
