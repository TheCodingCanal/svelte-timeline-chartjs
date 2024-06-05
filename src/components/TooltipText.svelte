<script lang="ts">
	import type { ChartData } from '$lib/types';


    export let data: ChartData;
    export let tooltipDataIndex: number = 0;
    export let tooltipDatasetIndex: number = 0;
    export let left: number = 0;
    export let top: number = 0;
    export let bottom: number = 0;
    export let right: number = 0;
    export let opacity: number = 0;

    let style: string;

	$: {
		style = `left: ${left}px; opacity: ${opacity};`;
		// style = ` opacity: ${opacity};`;
		if (bottom !== 0) {
			style += `bottom: ${bottom}px;`;
		}
		if (bottom == 0) {
			style += `top: ${top}px;`;
		}
		if (right !== 0) {
			// style += `left: ${left}px;`
			style += `right: ${right}px;`;
			style += 'display: flex; justify-content: flex-end;';
			console.log('right', right);
		}
	}
</script>

<div class="tooltip" id="tooltip" {style}>
	{@html data.datasets[tooltipDatasetIndex].data[tooltipDataIndex].tooltip}
</div>

<style>
	.tooltip {
		position: absolute;
		background-color: rgba(0, 0, 0, 0);
		border-radius: 3px;
		color: white;
		pointer-events: none;
		transform: translate(-0%, 0);
		transition: all 0.1s ease;
	}
</style>
