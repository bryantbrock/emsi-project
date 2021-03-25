<script>
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import { getYears } from './utils'
  import Chart from 'chart.js';

  export let data;
  const {startYear, endYear, state, regional, nation} = data

  let chartData = {
    labels: getYears(startYear, endYear),
    data: {
        label: 'soemthing',
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(225, 204,230, .3)",
        borderColor: "rgb(205, 130, 158)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(205, 130,1 58)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      },
  };
  let chartRef;
  let options = {
    responsive: true,
    scales: {
      yAxes: [{scaleLabel: {display: true, labelString: 'Percent Change'}}]
    }
  };

  onMount(() => {chart = new Chart(chartRef, {
    type: 'line', data: chartData, options
  })});

</script>

<section>
  <div class="trend-wrapper">
    <canvas bind:this={chartRef} height={90}></canvas>
  </div>
</section>

<style>
  .trend-wrapper {
    padding-top: 20px;
  }
</style>