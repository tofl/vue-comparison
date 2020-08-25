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
    </div>

    <table
      v-else
      :class="classes ? classes.table : ''"
    >
      <tr :class="classes ? classes.thead : ''">
        <th></th>
        <th
          v-for="(set, key) in setNames"
          :key="key"
        >
          {{ set }}
        </th>
      </tr>

      <tr
        v-for="(line, lineNumber) in tableFormat"
        :key="lineNumber"
        :class="classes ? classes.tr : ''"
      >
        <td><strong>{{ values[lineNumber].title }}</strong></td>
        <td
          v-for="(value, key) in line"
          :key="key"
        >
          {{ value }}
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
      // TODO add validator
    },

    classes: {
      type: Object,
      required: false,
    },
  },

  computed: {
    setNames() {
      const keys = [];
      this.values.forEach((value) => {
        // Get all the set names
        Object.keys(value.data).forEach((key) => {
          if (!keys.includes(key)) keys.push(key);
        });
      });

      return keys;
    },

    tableFormat() {
      const lines = [];
      this.values.forEach((value) => {
        const line = [];
        this.setNames.forEach((setName) => {
          if (value.data[setName]) {
            line.push(value.data[setName]);
          } else {
            line.push(null);
          }
        });
        lines.push(line);
      });
      return lines;
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
