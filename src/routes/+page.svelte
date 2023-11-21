<script>
let data = null

import { onMount } from "svelte";

import {io} from 'socket.io-client'

const socket = io()

socket.on('eventFromServer', (message) => {
    const { row , col, result} = message
    data[row][col] = result
})


async function fetchData() {
    try {
        const response = await fetch('/api');
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the fetch function when the component is mounted
onMount(async () => {
    data = await fetchData();
    loops = Array.from({
        length: data.length
    }, (_, index) => index)
    console.log(data);
});

const height = 500;
const width = 500;

$: loops = Array.from({
    length: 0
}, (_, index) => index)

function handleClick(row, col) {

    const oposite = (data[row][col][0] === "f1") ? "f2" : "f1"

    const obj = {
        type: "putBlock",
        row,
        col,
        block: [oposite, null]
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    };

    fetch('/api', options)
}
</script>

<div style={`grid-template-columns: repeat(1, 1fr);`} class="wrapper center">

    <div id="map" style={`grid-template-columns: repeat(${data?.length}, 1fr); width: ${width}px; height: ${height}px;`}>
        {#each loops as row}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#each loops as col}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class={`cell center ${data[row][col][0]}`} on:click={() => {handleClick(row,col)}}> {data[row][col][0]}-{data[row][col][1]}</div>
        {/each}
        {/each}
    </div>

</div>

<style>
.center {
    display: grid;
    align-items: center;
    justify-items: center;
}

.wrapper {
    height: 100%;
    width: 100%;
}

#map {
    display: grid;
}

.cell {
    border: 1px solid white;
    background-color: black;
    padding: 8px;
    text-align: center;
    box-sizing: border-box;
    display: grid;
    justify-content: center;
    align-items: center;
    color: white;
    text-transform: uppercase;
    font-family: 'Roboto', Times, serif;
}

.f1 {
    background-color: green;
}

.f2 {
    background-color: grey;
}
</style>
