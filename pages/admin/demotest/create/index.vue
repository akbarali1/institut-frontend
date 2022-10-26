<template>
  <div class="bg-light text-dark pt-4 pb-4">
    <div class="container">
      <form method="post" @submit="save" class="card">
        <h5 class="card-header">
          Demo test yaratish
        </h5>
        <div class=" card-body">

          <div class="form-floating mb-3">
            <select class="form-select" id="user_status" v-model="category_id" required>
              <option value="">Tanlang</option>
              <option v-for="item in category" :value="item.id" v-text="item.name"></option>
            </select>
            <label>Savolning kategoriyasi</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="name" v-model="name" placeholder="Sana" autocomplete="off" required>
            <label for="name">Savol</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="money_type" v-model="answers.answer1" placeholder="Sana" autocomplete="off" required>
            <label for="money_type">To'g'ri javob</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="answer2" v-model="answers.answer2" placeholder="Sana" autocomplete="off" required>
            <label for="answer2">Xato javob 1</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="answer3" v-model="answers.answer3" placeholder="Sana" autocomplete="off" required>
            <label for="answer3">Xato javob 2</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="answer4" v-model="answers.answer4" placeholder="Sana" autocomplete="off" required>
            <label for="answer4">Xato javob 3</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="time" v-model="time" placeholder="Sana" autocomplete="off" required>
            <label for="time">Test yechish uchun berilgan vaqt (soniyada)</label>
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
      name       : '',
      forriles   : '',
      server_url : '',
      category_id: '',
      category   : [],
      answers    : {
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: ''
      },
      time       : '',
      success    : false,
    }
  },
  mounted() {
    this.$loading.show()
    this.getCategory()
  },
  methods: {
    async getCategory() {
      this.category = await this.$axios.$get(`admin/demo/category/all`);
      this.$loading.hide()
    },
    save(e) {
      e.preventDefault();
      this.$loading.show()
      this.$axios.post('admin/demo/create', {
        id      : this.$route.params.id,
        name    : this.name,
        cat_id  : this.category_id,
        cat_name: this.category.find(item => item.id == this.category_id).name,
        answers : this.answers,
        time    : this.time
      }).then((response) => {
        this.SwalMixin(response.data.data.message)
        this.$router.push(`/admin/demotest/view/${response.data.data.id}`)
      }).catch((error) => {
        this.SwalMixin('Qandaydur xatolik', 'error')
      }).finally(() => {
        this.$loading.hide()
      })
    }
    ,
  }
}
</script>
