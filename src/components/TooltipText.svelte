<script lang="ts">

import {data} from "$lib/data.js";

export let indexA: number = 0;
export let indexB: number = 0;
console.log(indexB);
</script>

<div id="TooltipText">
    <p>{data.datasets[indexA].data[indexB].tooltip} <p/>

</div>