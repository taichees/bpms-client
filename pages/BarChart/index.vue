<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 150,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartData: {
        labels: ["languages"],
        datasets: [{
          label: 'Ruby',
          data: [500],
          backgroundColor: 'rgba( 255, 100, 100, 1 )',
          stack: 'stack 1'
        },
        {
          label: 'C#',
          data: [300],
          backgroundColor: 'rgba( 100, 100, 255, 1 )',
          stack: 'stack 1'
        },
        {
          label: 'Vue',
          data: [200],
          backgroundColor: 'rgba( 100, 255, 100, 1 )',
          stack: 'stack 1',
        }],
      },
      chartOptions: {
        responsive : true,
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        },
      },
    };
  },
};
</script>
