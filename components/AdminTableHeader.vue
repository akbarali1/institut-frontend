<template>
  <ul class="list-group pt-1">
    <li class="list-group-item align-center">
      <button data-bs-toggle="collapse" data-bs-target="#dat_input" aria-expanded="false" aria-controls="income-expense" class="btn btn-sm border border-dark">
        Yana
      </button>
      <nuxt-link :to="`/admin/question/create`" class="btn btn-success btn-sm">Oddiy test qo'shish</nuxt-link>
      <nuxt-link :to="`/admin/question/excel/create`" class="btn btn-success btn-sm">Excel orqali test qo'shish</nuxt-link>
      <nuxt-link :to="`/admin/question/images/create`" class="btn btn-success btn-sm">Rasmli test qo'shish</nuxt-link>
      <nuxt-link :to="`/admin/surfing/create`" class="btn btn-success btn-sm">Surfing qo'shish</nuxt-link>
      <nuxt-link :to="`/admin/surfing/stat`" class="btn btn-success btn-sm">Surfing statistika</nuxt-link>
      <span class="float-end">
          <nuxt-link :to="`/admin/question/images`" class="btn btn-green btn-sm ">Rasmli testlar</nuxt-link>
          <nuxt-link :to="`/admin/question/excel`" class="btn btn-green btn-sm ">Tasdiqlanmagan testlar</nuxt-link>
          <nuxt-link :to="`/admin`" class="btn btn-danger btn-sm " accesskey="b">Orqaga</nuxt-link>
        </span>
    </li>
    <li id="dat_input" class="list-group-item collapse">
      <table class="table">
        <tbody>
        <tr>
          <th>Jami aktiv testlar:</th>
          <td v-text="this.info.count"></td>
        </tr>
        <tr>
          <th>Jami rasmli testlar:</th>
          <td v-text="info.image_count"></td>
        </tr>
        <tr>
          <th>Jami testlar uchun beriladigan summa:</th>
          <td v-text="info.money +' so`m'"></td>
        </tr>
        <tr>
          <th>Jami testlar uchun beriladigan ball:</th>
          <td v-text="info.rating+' ball'"></td>
        </tr>
        </tbody>
      </table>
    </li>
  </ul>
</template>
<script>

export default {
  middleware: 'isAuthenticated',
  name      : 'admin_table_header',
  props     : ['requestUrl'],
  data() {
    return {
      info         : {},
      requestSSilka: this.requestUrl
    }
  },
  mounted() {
    if (typeof this.requestSSilka === 'undefined') {
      this.requestSSilka = 'admin/question/info';
    }
    this.getGetHeader()
  },
  methods: {
    async getGetHeader() {
      this.$axios.get(this.requestSSilka).then((res) => {
        this.info = res.data.data;
      }).catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide()
      });
    },
  }
}
</script>
