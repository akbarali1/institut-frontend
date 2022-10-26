<template>
  <div class="bg-light text-dark pt-4 pb-4">
    <div class="container">
      <form method="post" @submit="save" class="card">
        <h5 class="card-header">
          <b v-text="name"></b> ni Taxrirlash
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
import Swal from 'sweetalert2'

export default {
  layout    : 'default',
  middleware: 'isAdmin',
  data() {
    return {
      question_id: this.$route.params.id,
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
    this.getQuestion()
    this.getCategory()
  },
  methods: {
    async getCategory() {
      this.category = await this.$axios.$get(`admin/demo/category/all`);
      this.$loading.hide()
    },
    async getQuestion() {
      const data = await this.$axios.$get(`admin/demo/get/${this.$route.params.id}`);
      if (data.error === true) {
        this.SwalMixin(data.message, 'error')
        this.$router.push(`/`)
      } else {
        this.name        = data.data.savol
        this.answers     = {
          answer1: data.data.javoblar[0],
          answer2: data.data.javoblar[1],
          answer3: data.data.javoblar[2],
          answer4: data.data.javoblar[3]
        }
        this.time        = data.data.berilgan_vaqt
        this.category_id = data.data.cat_id
        this.success     = true
        this.$loading.hide()
      }
    },
    save(e) {
      e.preventDefault();
      this.$loading.show()
      this.$axios.post('admin/demo/update', {
        id     : parseInt(this.question_id),
        name   : this.name,
        answers: JSON.stringify(this.answers),
        time   : this.time
      }).then((response) => {
        this.SwalMixin(response.data.data.message)
        this.$router.push(`/admin/demotest/view/${this.question_id}`)
        this.$loading.hide()
      }).catch((error) => {
        this.SwalMixin('Qandaydur xatolik', 'error')
      });
    },
  }
}
</script>
