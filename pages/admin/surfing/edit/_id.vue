<template>
  <div class="container">
    <form method="post" class="form-control mt-4" @submit="submitFiles">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="name" v-model="name" placeholder="Sana" autocomplete="off" required autofocus>
        <label for="name">Sayt nomi</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="url" v-model="site_url" placeholder="https://www.google.com" required>
        <label for="url">Sayt URL</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="description" v-model="description" placeholder="description" required>
        <label for="url">Sayt haqida qisqacha</label>
      </div>
      <div class="form-floating mb-3">
        <input type="number" class="form-control" id="money" v-model="money" placeholder="Sana" autocomplete="off" required>
        <label for="money">Beriladigan pul (pul berilmasa 0 qo'ying)</label>
      </div>
      <div class="form-floating mb-3">
        <input type="number" class="form-control" id="rating" v-model="rating" placeholder="Sana" autocomplete="off" required>
        <label for="rating">Berilgan ball (ball berilmasa 0 qo'ying)</label>
      </div>
      <div class="form-floating mb-3">
        <input type="number" class="form-control" id="time" v-model="time" placeholder="Sana" autocomplete="off" required>
        <label for="time">Ko'rish uchun berilgan vaqt (soniyada)</label>
      </div>
      <div class="form-floating mb-3">
        <input type="number" class="form-control" id="error" v-model="error" placeholder="Sana" required>
        <label for="error">Muvafaqiyatli ko'rishdan so'ng beriladigan Pro Yulduz (berilmasa 0 qo'ying)</label>
      </div>
      <div class="row ms-1" role="group">
        <button class="btn btn-primary col-8 p-2" type="submit">
          Saqlash
        </button>
        <nuxt-link :to="`/admin/surfing/`" class="btn btn-secondary col-3 p-2 ms-2">
          Orqaga
        </nuxt-link>
      </div>
    </form>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  layout    : 'default',
  middleware: 'isAdmin',
  data() {
    return {
      name       : '',
      site_url   : '',
      description: '',
      rating     : 0,
      money      : 0,
      time       : 20,
      error      : '',
    }
  },
  mounted() {
    this.$loading.show()
    this.getData()
  },
  methods: {
    async getData() {
      const data = await this.$axios.$get(`admin/surfing/get/${this.$route.params.id}`).finally(() => {
        this.$loading.hide()
      })
      if (data.error === true) {
        this.SwalMixin(data.message, 'error')
        await this.$router.push(`/`)
      } else {
        const res        = data.data;
        this.name        = res.name;
        this.site_url    = res.site_url;
        this.description = res.description;
        this.rating      = res.rating;
        this.money       = res.money;
        this.time        = res.time;
        this.error       = res.error;
      }
    },
    submitFiles(e) {
      e.preventDefault();
      this.$loading.show()
      this.$axios.post('admin/surfing/update', {
        id         : parseInt(this.$route.params.id),
        name       : this.name,
        site_url   : this.site_url,
        description: this.description,
        rating     : this.rating,
        money      : this.money,
        time       : this.time,
        error      : this.error,
      }).then((response) => {
        this.SwalMixin(response.data.data.message)
        this.$router.push(`/admin/surfing`)
      }).catch((error) => {
        this.SwalMixin('Qandaydur xatolik', 'error')
      }).finally(() => {
        this.$loading.hide()
      });


    },
  }
}
</script>
