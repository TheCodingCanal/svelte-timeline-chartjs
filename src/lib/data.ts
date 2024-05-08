import type { ChartData } from 'chart.js';

export type TimelineChartData = { x: string[]; y: string; label: string; tooltip: string[][] };

export const data: ChartData<'bar', Array<TimelineChartData>> = {
	labels: ['Ankermake', 'Ender', 'Prusa', 'MakerBot'],
	datasets: [
		{
			label: 'Jobs',
			data: [
				{
					x: ['2022-10-02', '2022-10-08'],
					y: 'Ender',
					label: 'Job 1234 - Part A',
					tooltip: [
						['category', 'info'],
						['category', 'info']
					]
				},
				{
					x: ['2022-10-08', '2022-10-10'],
					y: 'Ender',
					label: 'Job 1235',
					tooltip: [
						['category one', 'info one'],
						['category two', 'info two']
					]
				},
				{
					x: ['2022-10-01', '2022-10-05'],
					y: 'Ankermake',
					label: 'Job 1236',
					tooltip: [
						['category three', 'info three'],
						['category four', 'info four']
					]
				},
				{
					x: ['2022-10-05', '2022-10-12'],
					y: 'Ankermake',
					label: 'Job 1237',
					tooltip: [
						['category five', 'info six'],
						['category seven', 'info eight']
					]
				},
				{
					x: ['2022-10-05', '2022-10-12'],
					y: 'MakerBot',
					label: 'Job 1237',
					tooltip: [
						['category five', 'info six'],
						['category seven', 'info eight']
					]
				}
			],
			backgroundColor: [
				'rgba(255, 134,159,0.4)',
				'rgba(98,  182, 239,0.4)',
				'rgba(255, 218, 128,0.4)',
				'rgba(113, 205, 205,0.4)',
				'rgba(170, 128, 252,0.4)',
				'rgba(255, 177, 101,0.4)'
			],
			borderWidth: 1,
			borderSkipped: false,
			borderColor: [
				'rgba(255, 134, 159, 1)',
				'rgba(98,  182, 239, 1)',
				'rgba(255, 218, 128, 1)',
				'rgba(113, 205, 205, 1)',
				'rgba(170, 128, 252, 1)',
				'rgba(255, 177, 101, 1)'
			]
		},
		{
			label: 'Shifts',
			data: [
				{
					x: ['2022-10-02', '2022-10-08'],
					y: 'Ender',
					label: 'Job 1234 - Part A',
					tooltip: [
						['category nine', 'info one'],
						['category two', 'info ten']
					]
				},
				{
					x: ['2022-10-08', '2022-10-10'],
					y: 'Ender',
					label: 'Job 1235',
					tooltip: [
						['category one', 'info one'],
						['category two', 'info two']
					]
				},
				{
					x: ['2022-10-01', '2022-10-05'],
					y: 'Ankermake',
					label: 'Job 1236',
					tooltip: [
						['category one', 'info one'],
						['category two', 'info two']
					]
				},
				{
					x: ['2022-10-05', '2022-10-12'],
					y: 'Ankermake',
					label: 'Job 1237',
					tooltip: [
						['category one', 'info one'],
						['category two', 'info two']
					]
				},
				{
					x: ['2022-10-05', '2022-10-12'],
					y: 'MakerBot',
					label: 'Job 1237',
					tooltip: [
						['category five', 'info six'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight']
					]
				},
				{
					x: ['2022-10-12', '2022-10-15'],
					y: 'MakerBot',
					label: 'Job 1237',
					tooltip: [
						['category five', 'info six', 'third column', 'fourth column'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight'],
						['category seven', 'info eight']
					]
				}
			],
			backgroundColor: [
				'rgba(255, 134,159,0.4)',
				'rgba(98,  182, 239,0.4)',
				'rgba(255, 218, 128,0.4)',
				'rgba(113, 205, 205,0.4)',
				'rgba(170, 128, 252,0.4)',
				'rgba(255, 177, 101,0.4)'
			],
			borderWidth: 1,
			borderSkipped: false,
			borderColor: [
				'rgba(255, 134, 159, 1)',
				'rgba(98,  182, 239, 1)',
				'rgba(255, 218, 128, 1)',
				'rgba(113, 205, 205, 1)',
				'rgba(170, 128, 252, 1)',
				'rgba(255, 177, 101, 1)'
			]
		}
	]
};
