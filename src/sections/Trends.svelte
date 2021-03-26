<script>
  import { getYears, pctFromStart, withCommas } from '../utils';
  import { onMount } from "svelte";
  import { Table } from '../components'
  import Chart from 'chart.js';

  export let data;
  let chartRef;

  const {startYear, endYear, state, regional, nation} = data
  const regionalValues = Object.values(regional)
  const stateValues = Object.values(state)
  const nationValues = Object.values(nation)

  console.log(pctFromStart(nationValues))

  const regionalDataset = {
    label: 'Nation',
    borderColor: "rgb(135,206,250)",
    data: pctFromStart(nationValues),
  }
  const stateDataset = {
    label: 'State',
    borderColor: "rgb(30,144,255)",
    data: pctFromStart(stateValues),
  }
  const nationDataset = {
    label: 'Region',
    borderColor: "rgb(0,0,128)",
    data: pctFromStart(regionalValues),
  }
  const baseDataset = {lineTension: 0.3, backgroundColor: "rgba(0,0,0,0)"}

  let chartData = {
    labels: getYears(startYear, endYear),
    datasets: [
      Object.assign({}, baseDataset, regionalDataset),
      Object.assign({}, baseDataset, stateDataset),
      Object.assign({}, baseDataset, nationDataset),
    ]
  };
  let options = {
    responsive: true,
    scales: {yAxes: [{scaleLabel: {display: true, labelString: 'Percent Change'}}]},
    legend: {display: false},
    plugins: {tooltip: {callbacks: {label: context => context.dataset.label}}},
  };

  onMount(() => new Chart(chartRef, {
    type: 'line', data: chartData, options,
  }));

  const lineData = [
    {region: 'Region', values: regionalValues},
    {region: 'State', values: stateValues},
    {region: 'Nation', values: nationValues},
  ]
  const tableHeaders = [
    '', 'Region',
    `${startYear} Jobs`,
    `${endYear} Jobs`,
    'Change',
    '% Change'
  ]
  const tableData = lineData.map(({region, values}) => [
    '', region,
    withCommas(values[0]),
    withCommas(values[values.length-1]),
    withCommas(values[values.length-1] - values[0]),
    withCommas((((values[values.length-1] / values[0]) - 1) * 100).toFixed(2)) + '%',
  ])
</script>


<section>
  <div class="trend-wrapper">
    <p class="trend-title">Regional Trends</p>
    <canvas bind:this={chartRef} height={90}></canvas>
    <Table headers={tableHeaders} data={tableData} />
  </div>
</section>


<style>
  .trend-wrapper {
    padding-top: 30px;
  }
  .trend-title {
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 1px solid #dbdbdb;
  }
</style>