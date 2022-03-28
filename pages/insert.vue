<template>
  <v-row>
    <v-col class="text-center">
      <form id="insert_model" @submit.prevent>
        <label>name<input v-model="data.name" name="name"></label>
        <label>str<input v-model="data.str" name="str"></label>
        <button @click="asyncPost()">
          送信
        </button>
      </form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InsertTest',
  data () {
    return {
      data: {
        name: '',
        str: ''
      }
    }
  },
  methods: {
    async asyncPost () {
      await this.$axios.$post('/api/test', this.data).then((_req, _res) => {
        alert(this.data.name + 'は登録されました。')
        this.$router.push('/hello_world')
      })
    }
  }
}
</script>
