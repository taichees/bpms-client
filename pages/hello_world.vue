<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5">
      <blockquote v-for="data in datas" :key="data._id" class="blockquote">
        &#8220;{{ data.str }}&#8221;
        <footer>
          <small>
            <em>&mdash;{{ data.name }}</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HelloWorld',
  async asyncData ({ $axios }) {
    const data = await $axios.$get('/api/test')
    // eslint-disable-next-line no-console
    console.log(data)
    return { datas: data }
  }
}
</script>
