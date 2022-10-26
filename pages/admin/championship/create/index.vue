<template>
  <div class="container">
    <span class="float-end p-2">
          <nuxt-link :to="`./`" class="btn btn-danger btn-sm " accesskey="b">Orqaga</nuxt-link>
    </span>
    <form method="post" class="form-control mt-4" @submit="submitFiles">
      <div class="mb-3">
        <label for="name">Chempionat nomi</label>
        <input type="text" class="form-control" id="name" v-model="name" autocomplete="off" required>
      </div>
      <div class="mb-3">
        <label for="name">Chempionat ga beriladigan mukofotlar</label>
        <ckeditor-nuxt v-model="content"/>
      </div>
      <div class="mb-3">
        <label for="start_time">Boshlanish vaqtini belgilang</label>
        <input type="datetime-local" class="form-control" id="start_time" v-model="start_time" autocomplete="off" required>
      </div>
      <div class="mb-3">
        <label for="end_time">Tugash vaqtini belgilang</label>
        <input type="datetime-local" class="form-control" id="end_time" v-model="end_time" autocomplete="off" required>
      </div>
      <div class="row">
        <div class="col-2">
          <div class="mb-3">
            <label for="minimum_ball">Minimal ball</label>
            <input type="number" class="form-control" id="minimum_ball" v-model="minimum_ball" autocomplete="off" required>
          </div>
          <div class="mb-3">
            <label for="price_count">Sovrinlar mirdori</label>
            <input type="number" class="form-control" id="price_count" v-model="price_count" autocomplete="off" required>
          </div>
        </div>
        <div class="col-10">
          <div class="mb-3" v-for="index in parseInt(price_count)" :key="index">
            <label :for="'price_'+ index">{{ index }} sovrin nomi</label>
            <input type="text" class="form-control" :id="'price_'+ index" autocomplete="off" @keyup="changePrice(index, $event.target.value)" required>
          </div>
        </div>
      </div>
      <div class="row ms-1 mt-3" role="group">
        <button class="btn btn-primary col-8 p-2" type="submit">
          Saqlash
        </button>
        <nuxt-link :to="`/admin/championship/`" class="btn btn-secondary col-3 p-2 ms-2">
          Orqaga
        </nuxt-link>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  middleware: 'isAdmin',
  data() {
    return {
      success     : false,
      name        : '',
      price_count : 5,
      minimum_ball: 1500,
      prices      : [],
      content     : '',
      start_time  : '',
      end_time    : ''
    }
  },
  methods: {
    submitFiles(e) {
      e.preventDefault();
      const filtered = this.prices.filter(function (el) {
        return el != null;
      });
      this.$axios.post('admin/championship/create', {
          name        : this.name,
          content     : this.content,
          start_time  : this.start_time,
          end_time    : this.end_time,
          count       : parseInt(this.price_count),
          minimum_ball: parseInt(this.minimum_ball),
          prices      : filtered,
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
        this.$router.push(`/admin/championship/`)
      }).catch((error) => {
        this.SwalMixin(error.response.data.message, 'error')
      }).finally(() => {
        this.$loading.hide()
      })
    },
    changePrice(key, value) {
      this.prices[parseInt(key)] = value;
    }
  }
}
</script>
