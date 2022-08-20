<template>
  <div>
    <div class="container">
      <div>
        <div v-for="item in items1" :key="`second-${item.id}`" class="item">
          {{ item.name }}
        </div>
      </div>
      <draggable
        v-model="items2"
        draggable=".item"
        group="items"
        @start="inDrag = true"
        @end="inDrag = false"
      >
        <div v-for="item in items2" :key="`third-${item.id}`" class="item">
          {{ item.name }}
        </div>
      </draggable>
    </div>
    <div class="fileInput">
      <input type="file" @change="loadCsvFile" />
      <form @submit.prevent="insert_data">
        <button type="submit">全て追加</button>
      </form>

      <table>
        <tr>
          <td v-for="item in items1" :key="`fourth-${item.id}`">
            {{ item.name }}
          </td>
        </tr>
        <tr v-for="(worker, index) in workers" :key="index">
          <td v-for="item in items2" :key="`first-${item.id}`">
            {{ worker[item.name] }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import draggable from "vuedraggable";

function dumpObj(obj: any): string {
  return JSON.stringify(obj, null, 2);
}

export default {
  name: "Swap",
  components: {
    draggable,
  },
  data() {
    return {
      inDrag: false,
      items1: [
        { id: 1, name: "name" },
        { id: 2, name: "str" },
      ],
      items2: [],
      workers: [],
    };
  },
  computed: {
    formattedItems1(): string {
      // @ts-ignore
      return dumpObj(this.items1);
    },
    formattedItems2(): string {
      // @ts-ignore
      return dumpObj(this.items2);
    },
  },
  methods: {
    ...mapActions("test", ["insertDatas", "deleteDatas"]),
    loadCsvFile(e: { target: { files: any[] } }) {
      let vm = this;
      // @ts-ignore
      vm.workers = [];
      // vm.message = "";
      let file = e.target.files[0];

      if (!file.type.match("text/csv")) {
        // vm.message = "CSVファイルを選択してください";
        return;
      }

      let reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        // @ts-ignore
        vm.items2 = [];
        // @ts-ignore
        let lines = reader.result.split("\n");
        // lines.shift();
        let linesArr = [];
        for (let i = 0; i < lines.length; i++) {
          if (i === 0) {
            for (let j = 0; j < lines[i].split(",").length; j++) {
              // @ts-ignore
              vm.items2.push({ id: j, name: lines[i].split(",")[j] });
            }
          }
          let obj = {};

          for (let j = 0; j < lines[i].split(",").length; j++) {
            // @ts-ignore
            obj[vm.items2[j].name] = lines[i].split(",")[j];
          }
          linesArr.push(obj);
        }
        // @ts-ignore
        vm.workers = linesArr;
      };
    },
    async insert_data() {
      const vm = this;
      // @ts-ignore
      vm.$nuxt.$loading.start();

      // @ts-ignore
      for (let j = 0; j < vm.workers.length; j++) {
        // @ts-ignore
        let element = vm.workers[j];
        const data = {};
        // @ts-ignore
        for (let i = 0; i < vm.items1.length; i++) {
          // @ts-ignore
          data[vm.items1[i].name] = element[vm.items2[i].name];
        }
        // @ts-ignore
        await vm.insertDatas(data);
      }

      // @ts-ignore
      vm.items2 = [];
      // @ts-ignore
      vm.workers = [];
      setTimeout(() => {
        // @ts-ignore
        vm.$nuxt.$loading.finish();
      }, 3000);
    },
  },
};
</script>

<style scoped>
pre {
  text-align: start;
  background: #2c3e50;
  color: white;
  padding: 10px;
  font-weight: bold;
}

.item {
  padding: 5px;
}

.container {
  margin: auto;
  width: 600px;
  display: flex;
  justify-content: space-around;
}
.inMove {
  background: brown !important;
}
.indicator {
  margin: auto;
  width: 300px;
  height: 30px;
  background: #42b983;
}
</style>
