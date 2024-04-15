<script>
	export const ssr = false;
	export const csr = true;

	import { Bar } from 'svelte-chartjs';
	import { data } from '../lib/data.js';
	import 'chartjs-adapter-date-fns';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

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

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, TimeScale);
</script>

<Bar
	{data}
	options={{
		indexAxis: 'y',
		responsive: true,
		scales: { x: { type: 'time', time: { unit: 'day' }, min: '2022-10-01', max: '2022-10-15' } },
   plugins: {tooltip: {callbacks: {title: () =>"test"}}}
	}}

	plugins={[ChartDataLabels]}

/>
