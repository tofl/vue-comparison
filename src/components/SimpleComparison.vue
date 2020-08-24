<template>
  <div>
    <div v-if="visualisationType === 'bars' && plots.length">
      <Plotly
        v-for="(plot, id) in plots"
        :key="id"
        :data="plot.data"
        :layout="plot.layout"
        :displayModeBar="false"
      />
      <Plotly
        :data="plots[0].data"
        :layout="plots[0].layout"
        :displayModeBar="false"
      />
    </div>

    <table v-else>
      <tr>
        <th></th>
        <th
          v-for="(column, id) in allColumns"
          :key="id"
        >
          {{ column }}
        </th>
      </tr>
      <tr
        v-for="(line, id) in this.values"
        :key="id"
      >
        <td>{{ line.title }}</td>
        <td
          v-for="(set, id) in line.data"
          :key="id"
        >
          {{ set }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly';

export default {
  name: 'SimpleComparison',
  components: { Plotly },

  props: {
    title: {
      type: String,
      required: true,
    },

    visualisationType: {
      type: String,
      validator(value) {
        return ['table', 'bars'].indexOf(value) !== -1;
      },
    },

    values: {
      type: Array,
      required: true,
    },
  },

  computed: {
    allColumns() {
      let largestSetKey = 0;
      let max = 0;

      this.values.forEach((value, id) => {
        if (value.data.length > max) {
          max = value.data.length;
          largestSetKey = id;
        }
      });

      console.log(this.values[largestSetKey].data);
      const keys = [];
      Object.keys(this.values[largestSetKey].data).forEach((key) => {
        keys.push(key);
      });

      return keys;
    },
  },

  data() {
    return {
      plots: [],
      data: [
        {
          y: [10],
          type: 'bar',
          name: 'Set #1',
        },
        {
          y: [12],
          type: 'bar',
          name: 'Set #2',
        },
      ],

      layout: {
        title: this.title,
      },
    };
  },

  mounted() {
    if (this.visualisationType !== 'bars') return;

    this.values.forEach((value) => {
      const plot = {
        data: [],
        layout: {},
      };
      plot.layout.title = value.title;

      Object.keys(value.data).forEach((key) => {
        plot.data.push({
          y: [value.data[key]],
          x: [plot.layout.title],
          type: 'bar',
          name: key,
        });
      });

      this.plots.push(plot);
    });
  },
};
</script>

<style scoped lang="scss">
table, th, tr, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
