<script lang="ts">

import {data} from "$lib/data.js";

export let indexA: number = 0;
export let indexB: number = 0;


</script>

<style>
    table{
        color: black;
    }
    tr:nth-child(even) {
        background-color: whitesmoke;

    }
    tr:nth-child(odd) {
        background-color: darkgray;

    }
    td{
        padding-left: 15px;
        padding-right: 15px;
    }
</style>

<div id="TooltipText" style="opacity: 0">
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