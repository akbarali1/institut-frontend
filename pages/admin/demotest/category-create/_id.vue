<template>
  <div class="bg-light text-dark pt-4 pb-4">
    <div class="container">
      <form method="post" @submit="save" class="card">
        <h5 class="card-header">
          <b v-text="name"></b> ni qo'shish
        </h5>
        <div class=" card-body">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="name" v-model="name" placeholder="Sana" autocomplete="off" required>
            <label for="name">Nomi</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="money_type" v-model="server_url" placeholder="Sana" autocomplete="off" required>
            <label for="money_type">Slug</label>
          </div>

          <div class="row ms-1" role="group">
            <button class="btn btn-primary col-8 p-2" type="submit">
              Saqlash
            </button>
            <nuxt-link :to="`/admin/demotest/`" class="btn btn-secondary col-3 p-2 ms-2">
              Orqaga
            </nuxt-link>
          </div>
        </div>
      </form>
    </div>
    <Footer/>
  </div>
</template>
<script>

export default {
  layout    : 'default',
  middleware: 'isAdmin',
  data() {
    return {
      name      : '',
      forriles  : '',
      server_url: '',
      answers   : {
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: ''
      },
      time      : '',
      success   : false,
    }
  },
  methods: {
    save(e) {
      e.preventDefault();
      this.$loading.show()
      this.$axios.post('admin/demo/category/create', {
        name: this.name,
        slug: this.server_url,
      }).then((response) => {
        this.SwalMixin(response.data.data.message)
        this.$router.push(`/admin/demotest/`)
      }).catch((error) => {
        this.SwalMixin('Qandaydur xatolik', 'error')
      }).finally(() => {
        this.$loading.hide()
      })
    },
  }
}
</script>
