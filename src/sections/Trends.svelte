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

  const nationDataset = {
    label: 'Nation',
    borderColor: "rgb(135,206,250)",
    data: pctFromStart(nationValues),
  }
  const stateDataset = {
    label: 'State',
    borderColor: "rgb(30,144,255)",
    data: pctFromStart(stateValues),
  }
  const regionalDataset = {
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
    {data: '', class: 'pr-2'},
    {data: 'Region', class: 'w-40 text-left'},
    {data: `${startYear} Jobs`, class: 'text-right'},
    {data: `${endYear} Jobs`, class: 'text-right'},
    {data: 'Change', class: 'text-right'},
    {data: '% Change', class: 'text-right'},
  ]
  const tableData = lineData.map(({region, values}) => [
    {data: '-----', class: `${region}`}, region,
    {data: withCommas(values[0]), class: 'text-right'},
    {data: withCommas(values[values.length-1]), class: 'text-right'},
    {data: withCommas(values[values.length-1] - values[0]), class: 'text-right'},
    {
      data: withCommas((((values[values.length-1] / values[0]) - 1) * 100).toFixed(2)) + '%',
      class: 'text-right',
    },
  ])
</script>


<section>
  <div class="trend-wrapper">
    <h2 class="trend-title">Regional Trends</h2>
    <canvas bind:this={chartRef} height={90}></canvas>
    <Table headers={tableHeaders} data={tableData} />
  </div>
</section>


<style>
  h2 {
    font-size: 1.2em;
  }
  .trend-wrapper {
    padding-top: 20px;
  }
  .trend-title {
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 1px solid #dbdbdb;
  }
</style>