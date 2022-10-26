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
              <button class="btn btn-success btn-sm" type="button" @click="sendCheck(id, name)" v-if="status === 2">
                <span>Aktivlashtirish</span>
              </button>
              <nuxt-link :to="`/test`" class="btn btn-info btn-sm text-white">
                <span>Test yechish</span>
              </nuxt-link>
              <nuxt-link :to="`/admin/question/audio/edit/${id}`" class="btn btn-primary btn-sm" v-if="type === 'audio'">
                <span>Audio tahrirlash</span>
              </nuxt-link>
              <nuxt-link :to="`/admin/question/edit/${id}`" class="btn btn-primary btn-sm" v-else>
                <span>Tahrirlash</span>
              </nuxt-link>
              <button class="btn btn-danger btn-sm" type="button" @click="deleteQuestion(id, name)">
                <span>O'chirish</span>
              </button>
              <nuxt-link :to="`/admin/question/audio`" class="btn bg-dark text-white btn-sm">
                <span>Orqaga</span>
              </nuxt-link>
              <nuxt-link :to="`/admin/question/excel`" class="btn bg-success text-white btn-sm float-end">
                <span>Tasdiqlanmagan testlar</span>
              </nuxt-link>
            </div>
          </div>
          <table class="table table-bordered table-striped table-hover">
            <tbody>
            <tr>
              <td>Savol ko`rinadigan status</td>
              <td>
                <b v-text="status_name"></b>
              </td>
            </tr>
            <tr>
              <td>Savol nomi</td>
              <td>
                <b v-text="name"></b>
              </td>
            </tr>
            <tr v-if="file !== ''">
              <td v-if="type === 'image'">Savol rasmi</td>
              <td v-if="type === 'audio'">Savol audiosi</td>
              <td class="align-middle">
                <a :href="file" target="_blank" v-if="type === 'image'">
                  <img :src="file" alt="rasm" class="img-thumbnail w-25">
                </a>

                <div style="width: 450px;margin: auto;" v-if="type === 'audio'">
                  <vue-plyr v-if="file">
                    <audio>
                      <source :src="file" type="audio/mp3"/>
                    </audio>
                  </vue-plyr>
                  <a :href="file" target="_blank">Faylni ko'rish</a>
                </div>
              </td>
            <tr>
              <td>Javoblar:</td>
              <td>
                <ol>
                  <li v-for="(question) in answers"><b v-text="question"></b></li>
                </ol>
              </td>
            </tr>
            <tr>
              <td>Mukofot miqdori</td>
              <td>
                <b v-text="money"></b> so'm
              </td>
            </tr>
            <tr>
              <td>Testga beriladigan ball</td>
              <td>
                <b v-text="rating"></b> ball
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
  layout    : 'default',
  middleware: 'isAdmin',
  data() {
    return {
      question_id: this.$route.params.id,
      id         : '',
      name       : '',
      status_name: '',
      status     : '',
      file       : '',
      type       : '',
      answers    : {
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: ''
      },
      money      : '',
      rating     : '',
      time       : '',
      success    : false,
    }
  },
  mounted() {
    this.getQuestion()
  },
  methods: {
    async getQuestion() {
      const data = await this.$axios.$get(`admin/question/get/${this.$route.params.id}`);
      if (data.error === true) {
        this.SwalMixin(data.message, 'error')
        this.$router.push(`/`)
      } else {
        this.id          = data.data.id
        this.name        = data.data.question
        this.file        = data.data.file
        this.type        = data.data.type
        this.status_name = data.data.status_name
        this.status      = data.data.status
        this.answers     = {
          answer1: data.data.answer[0],
          answer2: data.data.answer[1],
          answer3: data.data.answer[2],
          answer4: data.data.answer[3]
        }
        this.money       = data.data.money
        this.rating      = data.data.rating
        this.time        = data.data.time
      }
    },
    deleteQuestion(id, name) {
      Swal.fire({
        title             : "O'chirasizmi?",
        html              : `<b>${name}</b> ni o'chirmoqchimisiz?`,
        icon              : 'warning',
        showCancelButton  : true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor : '#d33',
        confirmButtonText : "Ha o'chiraman",
        cancelButtonText  : "Yo'q hozir emas"
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.post('admin/question/delete', {
            id: id
          }).then((response) => {
            this.SwalMixin(response.data.data.message)
            this.$router.push(`/admin/question`);
          }).catch((error) => {
            this.SwalMixin(error.response.data.message, 'error')
          });
        }
      })
    },
    sendCheck(id) {
      Swal.fire({
        title            : "Tasdiqlaysizmi?",
        icon             : 'info',
        text             : 'Testni asosiy testlarga qo\'shmoqchimisiz ?',
        showCancelButton : true,
        confirmButtonText: "Ha tasdiqlayman",
        cancelButtonText : "Yo'q hozir emas"
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.post('admin/question/sendCheck', {
            id: [id]
          }).then((response) => {
            this.SwalMixin(response.data.data.message)
            this.getQuestion()
          }).catch((error) => {
            this.SwalMixin(error.response.data.message, 'error')
          });
        }
      })
    },
  }
}
</script>
