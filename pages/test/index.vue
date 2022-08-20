<template>
  <div class="container">
    <nuxt-link to="/"><NuxtLogo /></nuxt-link>
    <div>
      <form @submit.prevent="insert_data">
        <label>名前：<input v-model="name_text" type="text" /></label>
        <label>文字列：<input v-model="str_text" type="text" /></label>
        <button type="submit">追加</button>
      </form>
    </div>
    <div class="datas">
      <table class="table">
        <tr>
          <th>No</th>
          <th>名前</th>
          <th>文字列</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, i) in alldatas" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.str }}</td>
          <td>
            <button v-on:click.stop="deleteDatas(item._id)">削除</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TestPage",
  data: () => {
    return {
      name_text: "",
      str_text: "",
    };
  },
  // @ts-ignore
  async fetch({ store }) {
    await store.dispatch("test/getDatas");
  },
  computed: {
    // @ts-ignore
    ...mapGetters("test", ["alldatas"]),
  },
  methods: {
    ...mapActions("test", ["insertDatas", "deleteDatas"]),
    async insert_data() {
      // @ts-ignore
      this.$nuxt.$loading.start();
      const data = {
        // @ts-ignore
        name: this.name_text,
        // @ts-ignore
        str: this.str_text,
      };
      // @ts-ignore
      await this.insertDatas(data);
      // @ts-ignore
      this.name_text = "";
      // @ts-ignore
      this.str_text = "";
      setTimeout(() => {
        // @ts-ignore
        this.$nuxt.$loading.finish();
      }, 3000);
    },
  },
};
</script>
