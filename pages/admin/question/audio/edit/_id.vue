<template>
  <div class="container">
    <span class="float-end p-2">
          <nuxt-link :to="`../`" class="btn btn-danger btn-sm " accesskey="b">Orqaga</nuxt-link>
        </span>
    <form method="post" class="form-control mt-4" @submit="submitFiles">
      <div class="mb-3">
        <label for="files" class="form-label">Ovozni tanglang</label>
        <input type="file" id="files" ref="files" v-on:change="handleFilesUpload($event)" class="form-control" accept="audio/*" autofocus/>
      </div>
      <div class="mb-3 text-center">
        <div style="width: 450px;margin: auto;">
          <div class="mb-3 text-center" v-if="server_url !== '' || url !== ''">
            <vue-plyr v-if="url">
              <audio>
                <source :src="url" type="audio/mp3"/>
              </audio>
            </vue-plyr>
            <vue-plyr v-else>
              <audio>
                <source :src="server_url" type="audio/mp3"/>
              </audio>
            </vue-plyr>
          </div>
        </div>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" id="user_status" v-model="status_id" required>
          <option value="">Tanlang</option>
          <option v-for="item in status" :value="item.id" v-text="item.name"></option>
        </select>
        <label>Savol qaysi statusdagi userlar uchun</label>
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
        <input type="number" class="form-control" id="money" v-model="money" placeholder="Sana" autocomplete="off" required>
        <label for="money">Mukofot miqdori</label>
      </div>
      <div class="form-floating mb-3">
        <input type="number" class="form-control" id="rating" v-model="rating" placeholder="Sana" autocomplete="off" required>
        <label for="rating">Testga berilgan ball</label>
      </div>
      <div class="form-floating mb-3">
        <input type="number" class="form-control" id="time" v-model="time" placeholder="Sana" autocomplete="off" required>
        <label for="time">Test yechish uchun berilgan vaqt (soniyada)</label>
      </div>
      <div class="row ms-1" role="group">
        <button class="btn btn-primary col-8 p-2" type="submit">
          Saqlash
        </button>
        <nuxt-link :to="`/admin/question/`" class="btn btn-secondary col-3 p-2 ms-2">
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
      question_id: this.$route.params.id,
      files      : '',
      server_url : '',
      success    : false,
      name       : '',
      url        : '',
      answers    : {
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: ''
      },
      money      : '',
      rating     : '',
      status     : '',
      status_id  : '',
      time       : '',
      file_name  : '',
    }
  },
  mounted() {
    this.$loading.show()
    this.getQuestion()
  },
  methods: {
    async getQuestion() {
      const data = await this.$axios.$get(`admin/question/get/${this.$route.params.id}`);
      if (data.error === true) {
        this.SwalMixin(data.message, 'error')
        this.$router.push(`/`)
      } else {
        this.name       = data.data.question
        this.answers    = {
          answer1: data.data.answer[0],
          answer2: data.data.answer[1],
          answer3: data.data.answer[2],
          answer4: data.data.answer[3]
        }
        this.money      = data.data.money
        this.rating     = data.data.rating
        this.time       = data.data.time
        this.server_url = data.data.file
        this.file_name  = data.data.file_name
        console.log(this.file_name)

        const user_status_all = await this.$axios.$get(`user/getStatus`);
        this.status           = user_status_all.data
        this.success          = true

        this.status_id = data.data.status_id
        this.$loading.hide()
      }
    },
    submitFiles(e) {
      e.preventDefault();
      this.$loading.show()
      let formData = new FormData();
      if (typeof this.files !== 'undefined' && this.files !== '') {
        formData.append('files', this.files[0]);
      } else {
        formData.append('picture_name', this.file_name);
      }

      formData.append('id', this.$route.params.id);
      formData.append('name', this.name);
      formData.append('answers', JSON.stringify(this.answers));
      formData.append('money', this.money);
      formData.append('rating', this.rating);
      formData.append('time', this.time);
      formData.append('status_id', this.status_id);
      this.$axios.post('admin/question/audioQuestionUpdate',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
        this.$router.push(`/admin/question/view/${res.data.data.id}`)
      }).finally(() => {
        this.$loading.hide()
      })
    },
    handleFilesUpload(e) {
      this.files = this.$refs.files.files;
      const file = e.target.files[0];
      if (file) {
        this.forriles = 'Tanlangan: <b>' + this.$refs.files.files[0].name + '<b>';
        this.url      = URL.createObjectURL(file);
      } else {
        this.forriles = 'Tanlangan: <b>' + this.picture_name + '<b>';
        this.url      = this.server_url;
      }
    }
  }
}
</script>
