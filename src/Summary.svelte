<script>
  import { withCommas } from './utils'

  export let data;
  export let occupation;

  const {jobs, jobsGrowth, earnings} = data

  const withOperator = val => (val > 0 ? '+' : '-') + `${val}`
  const dateRange = `${jobsGrowth.startYear}-${jobsGrowth.endYear}`
</script>

<section>
  <p class="title">Occupation Summary for {occupation}</p>
  <div>
    <ul>
      <li style="border-right: 1px solid #dbdbdb;">
        <span class="base">{withCommas(jobs.regional)}</span>
        <span class="second">Jobs({jobs.year})</span>
        <span class="third">
          {withCommas(jobs.nationalAvg)}% <span class="primary">above</span> National average
        </span>
      </li>
      <li style="border-right: 1px solid #dbdbdb;">
        <span class="base primary">{withOperator(jobsGrowth.regional)}%</span>
        <span class="second">% change({dateRange})</span>
        <span class="third">
          Nation: <span class="primary">{withOperator(jobsGrowth.nationalAvg)}</span>
        </span>
      </li>
      <li>
        <span class="base">{`\$${earnings.regional}/hr`}</span>
        <span class="second">Median Hourly Earnings</span>
        <span class="third">Nation: {`\$${earnings.nationalAvg}/hr`}</span>
      </li>
    </ul>
  </div>
</section>

<style>
  ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
  }
  li {
    display: flex;
    flex-direction: column;
    text-align: center;
    line-height: 1.3;
    padding: 4em;
  }
  .primary {
    color: #06b114;
  }
  .title {
    font-weight: bold;
    padding-top: 40px;
  }
  .base {
    flex-grow: 1;
    font-size: 1.8em;
    font-weight: 300;
  }
  .second {
    flex-grow: 1;
    padding-top: 3px;
    font-size: 0.9em;
    font-weight: 600;
  }
  .third {
    flex-grow: 1;
    padding-top: 3px;
    font-size: 0.9em;
  }
</style>