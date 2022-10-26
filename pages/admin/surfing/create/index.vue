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
// import Swal from 'sweetalert2'
export default {
  middleware: 'isAdmin',
  data() {
    return {
      name: '',
      site_url: '',
      description: '',
      rating: 0,
      money: 0,
      time: 20,
      error: '',
    }
  },
  methods: {
    // async getStatus() {
    //   const data = await this.$axios.$get(`auth/surfing/create`);
    //   this.status = data.data
    //   this.success = true
    // },
    submitFiles(e) {
      e.preventDefault();
      this.$axios.post('admin/surfing/create',
        {
          name: this.name,
          site_url: this.site_url,
          description: this.description,
          rating: this.rating,
          money: this.money,
          time: this.time,
          error: this.error,
        }).then((res) => {
        this.$router.push(`/admin/surfing`)
      }).catch((error) => {
        console.log(error)
        console.log('FAILURE!!');
      })
    },
    handleFilesUpload(e) {
      this.files = this.$refs.files.files;
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    }
  }
}
</script>
