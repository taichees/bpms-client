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
        <tr v-for="(item, i) in datas" :key="i">
          <td>{{ i }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.str }}</td>
          <td><button v-on:click.stop="delete_data(item._id)">削除</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
export default {
  layout: "noNavbar",
  name: "TestPage",
  data: () => {
    return {
      datas: null,
      name_text: "",
      str_text: "",
    };
  },
  async asyncData() {
    // 取得先のURL
    const url = "http://localhost:5000/test";
    // リクエスト（Get）
    const response = await axios.get(url);
    // 配列で返ってくるのでJSONにして返却
    // console.log(response);
    return {
      datas: response.data,
    };
  },
  methods: {
    // name_text: "",
    // str_text: "",
    async insert_data() {
      // 取得先のURL
      const url = "http://localhost:5000/test";

      const data = {
        // @ts-ignore
        name: this.name_text,
        // @ts-ignore
        str: this.str_text,
      };
      // リクエスト（DELETE）
      const response = await axios.post(url, data);
      // 配列で返ってくるのでJSONにして返却
      // console.log(response);

      const location = "/test";
      window.location.href = location;
      return {};
    },
    async delete_data(id: string) {
      // 取得先のURL
      const url = "http://localhost:5000/test";
      // リクエスト（DELETE）
      const response = await axios.delete(url, { data: { _id: id } });
      // 配列で返ってくるのでJSONにして返却
      // console.log(response);

      const location = "/test";
      window.location.href = location;
      return {};
    },
  },
};
</script>
