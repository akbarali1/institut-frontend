<template>
  <div class="container  card mt-4 mb-4">
    <hr>
    <nuxt-link :to="`/`" class="btn btn-primary btn-block w-100">
      Bosh sahifaga o'tish
    </nuxt-link>
    <hr>
    <div>
      <label for="unique_id">Unikalniy ID bo`yicha userni topish</label>
      <form class="input-group mb-3" @submit="searchUniqueId">
        <input type="text" class="form-control" placeholder="Unikalniy idniyozing" id="unique_id" v-model="unique_id" autocomplete="off">
        <button class="btn btn-outline-secondary" type="submit">Topish</button>
      </form>
    </div>
    <hr>
    <div class="row w-100 p-1 text-center " role="group">
      <nuxt-link :to="`/admin/demotest`" class="btn btn-primary m-1 col-md-2">Demo testlar</nuxt-link>
      <nuxt-link :to="`/admin/question`" class="btn btn-primary m-1 col-md-2">Hamma testlar</nuxt-link>
      <nuxt-link :to="`/admin/question/images`" class="btn btn-primary m-1 col-md-2">Rasmli testlar</nuxt-link>
      <nuxt-link :to="`/admin/question/audio`" class="btn btn-primary m-1 col-md-2">Audio testlar</nuxt-link>
      <nuxt-link :to="`/admin/question/excel`" class="btn btn-primary m-1 col-md-2">Tasdiqlanmagan testlar</nuxt-link>
      <nuxt-link :to="`/admin/news/`" class="btn btn-primary m-1 col-md-2">Yangiliklar</nuxt-link>
      <nuxt-link :to="`/admin/surfing/`" class="btn btn-primary m-1 col-md-2">Surfing</nuxt-link>
      <nuxt-link :to="`/admin/championship/`" class="btn btn-primary m-1 col-md-2">Chempionat</nuxt-link>
    </div>
    <hr>
    <div class="row w-100 p-1 " role="group">
      <nuxt-link :to="`/admin/question/excel/create`" class="btn btn-primary m-1 col-md-2">Excel orqali test qo'shish</nuxt-link>
      <nuxt-link :to="`/admin/question/images/create`" class="btn btn-primary m-1 col-md-2">Rasmli test qo'shish</nuxt-link>
      <nuxt-link :to="`/admin/question/audio/create`" class="btn btn-primary m-1 col-md-2">Audio test qo'shish</nuxt-link>
      <nuxt-link :to="`/admin/surfing/create`" class="btn btn-primary m-1 col-md-2">Serfing qo'shish</nuxt-link>
      <nuxt-link :to="`/admin/news/create`" class="btn btn-primary m-1 col-md-2">Yanglik qo'shish</nuxt-link>
      <nuxt-link :to="`/admin/championship/create`" class="btn btn-primary m-1 col-md-2">Chempionat yaratish</nuxt-link>
    </div>
    <hr>

  </div>
</template>
<script>

export default {
  middleware: 'isAdmin',
  data() {
    return {
      success  : false,
      unique_id: ''
    }
  },
  mounted() {
    this.$loading.hide();
  },
  methods: {
    searchUniqueId(e) {
      e.preventDefault();
      this.$loading.show()
      this.$axios.post('user/find-unique-id', {
        unique_id: this.unique_id,
      }).then((response) => {
        console.log(response.data)
        if (response.data.error === true) {
          this.SwalMixin(response.data.data.message, 'error')
        }
        this.$router.push(`/users/${response.data.data.user.id}`)
      }).catch((error) => {
        this.SwalMixin('Qandaydur xatolik', 'error')
      }).finally(() => {
        this.$loading.hide()
      })
    }
  }
}
</script>
