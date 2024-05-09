<script lang="ts">
	import type { ChartData } from '$lib/types';

	export let data: ChartData;

	export let indexA = 0;
	export let indexB = 0;
	export let left = 0;
	export let top = 0;
	export let bottom = 0;
	export let opacity = 0;

	let style: string;
	$: {
		style = `left: ${left}px; opacity: ${opacity};`;
		if (bottom !== 0) {
			style += `bottom: ${bottom}px;`;
		} else {
			style += `top: ${top}px;`;
		}
	}

	$: console.log({ top, bottom, opacity, style });
</script>

<div class="tooltip" {style}>
	<table>
		<tbody>
			{#each data.datasets[indexA].data[indexB].tooltip as content}
				<tr>
					{#each Object.values(content) as cell}
						<td>{cell}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	table {
		color: black;
	}
	tr:nth-child(even) {
		background-color: whitesmoke;
	}
	tr:nth-child(odd) {
		background-color: darkgray;
	}
	td {
		padding-left: 15px;
		padding-right: 15px;
	}

	.tooltip {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 3px;
		color: white;
		pointer-events: none;
		position: absolute;
		transform: translate(-100%, 0);
		transition: all 0.1s ease;
	}
</style>
