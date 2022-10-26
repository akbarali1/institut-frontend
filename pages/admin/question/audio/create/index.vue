<template>
  <div class="container">
    <span class="float-end p-2">
          <nuxt-link :to="`../`" class="btn btn-danger btn-sm " accesskey="b">Orqaga</nuxt-link>
        </span>
    <form method="post" class="form-control mt-4" @submit="submitFiles">
      <div class="mb-3">
        <label for="files" class="form-label">Ovozni tanglang</label>
        <input type="file" id="files" ref="files" v-on:change="handleFilesUpload($event)" class="form-control" accept="audio/*" autofocus required/>
      </div>
      <div class="mb-3 text-center">
        <div style="width: 450px;margin: auto;">
          <vue-plyr v-if="url">
            <audio>
              <source :src="url" type="audio/mp3"/>
            </audio>
          </vue-plyr>
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
      files    : '',
      success  : false,
      name     : '',
      url      : '',
      answers  : {
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: ''
      },
      money    : '',
      rating   : '',
      status   : '',
      status_id: '',
      time     : ''
    }
  },
  mounted() {
    this.getStatus()
  },
  methods: {
    async getStatus() {
      const data   = await this.$axios.$get(`user/getStatus`);
      this.status  = data.data
      this.success = true
    },
    submitFiles(e) {
      e.preventDefault();
      let formData = new FormData();
      let file     = this.files[0];
      formData.append('files', file);
      formData.append('name', this.name);
      formData.append('answers', JSON.stringify(this.answers));
      formData.append('money', this.money);
      formData.append('rating', this.rating);
      formData.append('time', this.time);
      formData.append('status_id', this.status_id);
      this.$axios.post('admin/question/audioQuestionCreate',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
        this.$router.push(`/admin/question/view/${res.data.data.id}`)
      }).catch((error) => {
        console.log(error)
        console.log('FAILURE!!');
      })
    },
    handleFilesUpload(e) {
      this.files = this.$refs.files.files;
      const file = e.target.files[0];
      this.url   = URL.createObjectURL(file);
    }
  }
}
</script>
