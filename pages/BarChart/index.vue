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
    //JSON取得
    let jsonObj;
    const http = new XMLHttpRequest();
    http.open(
      "GET",
      "http://localhost:5000/schema/test_2"
    );
    http.send();
    const dataset = [];
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        // jsonをオブジェクトに変更
        jsonObj = JSON.parse(http.responseText);
        jsonObj.forEach(element => {
        dataset.push({
          // mongooseの中身がおかしくて、name,strで格納されていない。暫定対処でデータを取得できるように_id,__vを指定しています。ちなみに__vが0しか入っていないので、棒グラフが見えないです。
          label: element._id,
          data: [element.__v],
          stack: 'stack 1'
        })});
      }
    };
    return {
      chartData: {
        labels: ["languages"],
        datasets: dataset
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
