<template>
  <div class="bg-light text-dark pt-4 pb-4">
    <div class="container">
      <form method="post" @submit="save" class="card">
        <h5 class="card-header">
          <b v-text="name"></b> ni Taxrirlash
        </h5>
        <div class=" card-body">
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
          <div class="mb-3">
            <div v-if="forriles !== ''" v-html="forriles"></div>
            <label v-else class="form-label">Rasmni tanglang</label>
            <input type="file" id="files" ref="files" v-on:change="handleFilesUpload($event)" class="form-control" accept="image/*"/>
          </div>
          <div class="mb-3 text-center" v-if="server_url !== '' || url !== ''">
            <img v-if="url" :src="url" class="img-thumbnail w-25"/>
            <img v-else :src="server_url" class="img-thumbnail w-24">
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
            <nuxt-link :to="`${this.$nuxt.context.from.path}`" class="btn btn-secondary col-3 p-2 ms-2">
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
      question_id : this.$route.params.id,
      name        : '',
      url         : '',
      forriles    : '',
      server_url  : '',
      answers     : {
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: ''
      },
      money       : '',
      rating      : '',
      time        : '',
      status      : '',
      picture_name: '',
      status_id   : '',
      success     : false,
    }
  },
  mounted() {
    this.getQuestion()
  },
  methods: {
    async getQuestion() {
      this.$loading.show()
      const data = await this.$axios.$get(`admin/question/get/${this.$route.params.id}`).finally(() => {
        this.$loading.hide()
      });
      if (data.error === true) {
        this.SwalMixin(data.message, 'error')
        await this.$router.push(`/`)
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
        if (data.data.picture_name) {
          this.picture_name = data.data.picture_name
        } else {
          this.picture_name = data.data.file_name;
        }

        const user_status_all = await this.$axios.$get(`user/getStatus`);
        this.status           = user_status_all.data
        this.success          = true

        this.status_id = data.data.status_id
        this.$loading.hide()
      }
    },
    save(e) {
      e.preventDefault();
      this.$loading.show()
      let formData = new FormData();
      if (typeof this.files !== 'undefined') {
        formData.append('files', this.files[0]);
      } else {
        formData.append('picture_name', this.picture_name);
      }
      formData.append('id', this.$route.params.id);
      formData.append('name', this.name);
      formData.append('answers', JSON.stringify(this.answers));
      formData.append('money', this.money);
      formData.append('rating', this.rating);
      formData.append('time', this.time);
      formData.append('status_id', this.status_id);
      this.$axios.post('admin/question/update',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
        this.SwalMixin(response.data.data.message)
        this.$router.push(`/admin/question/view/${this.question_id}`)
      }).catch((error) => {
        this.SwalMixin('Qandaydur xatolik', 'error')
      }).finally(() => {
        this.$loading.hide()
      });
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
