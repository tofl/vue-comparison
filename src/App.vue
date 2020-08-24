<template>
  <div id="app">
    <button @click="visType = 'bars'">Bars</button>
    <button @click="visType = 'table'">Table</button>

    <SimpleComparison
      :title="'Test'"
      :visualisation-type="visType"
      :values="this.values"
    />
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      visType: 'bars',
      values: [
        {
          title: 'Maximum power (kW)',
          data: {
            'Set #1': 5000,
            'Set #2': 5500,
          },
        },
        {
          title: 'Average power (kW)',
          data: {
            'Set #1': 5000,
            'Set #2': 5501,
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss">
</style>
