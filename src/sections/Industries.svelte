<script>
  import { Table } from '../components';
  import { withCommas } from '../utils';

  export let data;
  export let occupation;

  const {industries, jobs: totalJobs, year} = data;
  const tableHeaders = [
    '', 'Industry',
    `Occupation Jobs in Industry (${year})`,
    `% of Occupation in Industry (${year})`,
    `% of Total Jobs in Industry (${year})`
  ]
  const tableData = Object.values(industries).map(
    ({title, inOccupationJobs, jobs}) => [
      '', title,
      withCommas(inOccupationJobs),
      withCommas(((inOccupationJobs / totalJobs) * 100).toFixed(1)) + '%',
      withCommas(((inOccupationJobs / jobs) * 100).toFixed(1)) + '%',
    ]

  )
</script>

<section>
  <div class="industries-wrapper">
    <p class="industries-title">Industries Employing {occupation}</p>
    <Table headers={tableHeaders} data={tableData} />
  </div>
</section>


<style>
  .industries-wrapper {
    padding-top: 30px;
  }
  .industries-title {
    font-weight: bold;
    padding-top: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dbdbdb;
  }
</style>