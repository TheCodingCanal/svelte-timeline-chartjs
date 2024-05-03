<script lang="ts">

import {data} from "$lib/data.js";

export let indexA: number = 0;
export let indexB: number = 0;
console.log(indexB);


</script>

<style>
    table{
       border: 1px solid black;
        color: black;
    }
    tr:nth-child(even) {
        background-color: #D6EEEE;

    }
    tr:nth-child(odd) {
        background-color: cornflowerblue;

    }
    td{
        padding-left: 15px;
        padding-right: 15px;
        border-color: red;
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