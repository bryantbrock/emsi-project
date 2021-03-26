<script>
  export let headers;
  export let data;
</script>

<!--
  Both headers and data can be an array of either..
    - strings or
    - objects = {data, className}
-->

<table>
  <thead>
    <tr>
      {#each headers as header}
        {#if typeof header === 'string'}
          <th>{header}</th>
        {:else}
          <th class={header.className}>{header.data}</th>
        {/if}
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as rowData}
      <tr>
        {#each rowData as cellData}
          {#if typeof cellData === 'string'}
            <td>{cellData}</td>
          {:else}
            <td class={cellData.className}>{cellData.data}</td>
          {/if}
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  th {
    text-align: left;
  }
</style>