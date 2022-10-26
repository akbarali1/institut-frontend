<template>
  <div class="bg-light text-dark pt-4 pb-4">
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h5>{{ name }}</h5>
        </div>
        <div class="card-body">
          <div class="row pt-0 pb-2">
            <div class="col-12 col-sm-12">
              <nuxt-link :to="`/admin/demotest/edit/${id}`" class="btn btn-primary btn-sm">
                <span>Tahrirlash</span>
              </nuxt-link>
              <nuxt-link :to="`/admin/demotest/`" class="btn bg-dark text-white btn-sm">
                <span>Orqaga</span>
              </nuxt-link>
            </div>
          </div>
          <table class="table table-bordered table-striped table-hover">
            <tbody>
            <tr>
              <td>Savol nomi</td>
              <td>
                <b v-text="name"></b>
              </td>
            </tr>
            <tr>
              <td>Javoblar:</td>
              <td>
                <ol>
                  <li v-for="(question) in answers"><b v-text="question"></b></li>
                </ol>
              </td>
            </tr>
            <tr>
              <td>Test yechish uchun berilgan vaqt</td>
              <td>
                <b v-text="time"></b> soniya
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";

export default {
  layout: 'default',
  middleware: 'isAdmin',
  data() {
    return {
      question_id: this.$route.params.id,
      id: '',
      name: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: ''
      },
      time: '',
      success: false,
    }
  },
  mounted() {
    this.getQuestion()
  },
  methods: {
    async getQuestion() {
      const data = await this.$axios.$get(`admin/demo/get/${this.$route.params.id}`);
      if (data.error === true) {
        this.SwalMixin(data.message, 'error')
        this.$router.push(`/`)
      } else {
        this.id = data.data.id
        this.name = data.data.savol
        this.answers = {
          answer1: data.data.javoblar[0],
          answer2: data.data.javoblar[1],
          answer3: data.data.javoblar[2],
          answer4: data.data.javoblar[3]
        }
        this.time = data.data.berilgan_vaqt
      }
    },
  }
}
</script>
