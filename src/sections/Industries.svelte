<script>
  import { Table } from '../components';
  import { withCommas } from '../utils';

  export let data;
  export let occupation;

  const {industries, jobs: totalJobs, year} = data;
  const tableHeaders = [
    {data: '', class: 'pr-2'},
    {data: 'Industry', class: 'w-60 text-left'},
    {data: `Occupation Jobs in Industry (${year})`, class: 'text-right m-w40'},
    {data: `% of Occupation in Industry (${year})`, class: 'text-right m-w40'},
    {data: `% of Total Jobs in Industry (${year})`, class: 'text-right m-w40'},
  ]
  const tableData = Object.values(industries).map(
    ({title, inOccupationJobs, jobs}) => [
      '', title,
      {data: withCommas(inOccupationJobs), class: 'text-right'},
      {data: withCommas(((inOccupationJobs / totalJobs) * 100).toFixed(1)) + '%', class: 'text-right'},
      {data: withCommas(((inOccupationJobs / jobs) * 100).toFixed(1)) + '%', class: 'text-right'},
    ]
  )
</script>

<section>
  <div class="industries-wrapper">
    <h2 class="industries-title">Industries Employing {occupation}</h2>
    <Table headers={tableHeaders} data={tableData} />
  </div>
</section>


<style>
  h2 {
    font-size: 1.2em;
  }
  .industries-wrapper {
    padding-top: 20px;
  }
  .industries-title {
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dbdbdb;
  }
</style>