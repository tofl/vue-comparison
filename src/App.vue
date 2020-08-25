<template>
  <div id="app">
    <button @click="visType = 'bars'">Bars</button>
    <button @click="visType = 'table'">Table</button>

    <SimpleComparison
      :title="'Test'"
      :visualisation-type="visType"
      :values="this.values"
      :classes="classes"
    />
  </div>
</template>

<script>
export default {
  name: 'App',

  computed: {
    classes() {
      return {
        table: 'table',
      };
    },
  },

  data() {
    return {
      visType: 'bars',
      values: [
        {
          title: 'Maximum power (kW)',
          data: {
            'Set #1': 5000,
            'Set #2': 5500,
            'Set #4': 8500,
          },
        },
        {
          title: 'Average power (kW)',
          data: {
            'Set #1': 5000,
            'Set #2': 5501,
          },
        },
        {
          title: 'Hotel load (kW)',
          data: {
            'Set #1': 5000,
            'Set #2': 5501,
            'Set #3': 2000,
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.table {
  color: red;
}
</style>
