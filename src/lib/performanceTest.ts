import { addDays, format } from 'date-fns';
import type { ChartData, Dataset, TooltipData } from './types';

export const generateData = (minDate: Date, maxDate: Date): ChartData => {
	const labels = ['Ankermake', 'Ender', 'Prusa', 'MakerBot'];
	const datasets = generateDatasets(minDate, maxDate, labels);
	return { labels, datasets };
};

const getRandomInt = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateTooltipData = (): TooltipData[] => {
	const numRows = getRandomInt(1, 12);
	const numCols = getRandomInt(2, 4);
	const tooltipData: TooltipData[] = [];

	for (let i = 0; i < numRows; i++) {
		const row: TooltipData = {};
		for (let j = 0; j < numCols; j++) {
			row[`category ${i + 1}`] = `info ${j + 1}`;
		}
		tooltipData.push(row);
	}

	return tooltipData;
};

const generateDatasets = (minDate: Date, maxDate: Date, labels: string[]): Dataset[] => {
	const datasets: Dataset[] = [];
	const colors = [
		'rgba(255, 134, 159, 0.4)',
		'rgba(98, 182, 239, 0.4)',
		'rgba(255, 218, 128, 0.4)',
		'rgba(113, 205, 205, 0.4)',
		'rgba(170, 128, 252, 0.4)',
		'rgba(255, 177, 101, 0.4)'
	];

	for (let i = 0; i < 5; i++) {
		const dataset: Dataset = {
			label: `Dataset ${i + 1}`,
			data: [],
			backgroundColor: colors[i % colors.length],
			borderWidth: 1,
			borderSkipped: false,
			borderColor: colors[i % colors.length].replace('0.4', '1')
		};

		let currentDate = new Date(minDate);

		for (let j = 0; j < 1000; j++) {
			const startDate = currentDate;
			//const eventDuration = getRandomInt(1, 2);
			const endDate = addDays(startDate, 1);

			dataset.data.push({
				x: [format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd')],
				y: labels[getRandomInt(0, labels.length - 1)],
				label: `Job ${1000 + j}`,
				tooltip: generateTooltipData()
			});

			currentDate = endDate;

			if (currentDate > maxDate) break;
		}

		datasets.push(dataset);
	}

	return datasets;
};
