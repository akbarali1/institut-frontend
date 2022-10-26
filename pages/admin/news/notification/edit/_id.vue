<template>
  <div class="bg-light text-dark pt-4 pb-4">
    <div class="container">
      <form method="post" @submit="save" class="form-control">
        <h5 class="card-header">
          <b v-text="name"></b> ni Taxrirlash
        </h5>
        <div class="mb-3">
          <div v-if="forriles !== ''" v-html="forriles"></div>
          <label v-else class="form-label">Rasmni tanglang</label>
          <input type="file" id="files" ref="files" v-on:change="handleFilesUpload($event)" class="form-control" accept="image/*"/>
        </div>
        <div class="mb-3 text-center" v-if="server_url !== '' || url !== ''">
          <img v-if="url" :src="url" class="img-thumbnail w-25"/>
          <img v-else :src="server_url" class="img-thumbnail w-24">
        </div>
        <div class="mb-3">
          <label for="name">Habar sarlavha</label>
          <input type="text" class="form-control" id="name" v-model="name" autocomplete="off">
        </div>
        <label class="mb-1">Habar matni</label>
        <textarea class="form-control" id="content" v-model="content" rows="3" required></textarea>

        <div class="row ms-1 mt-3" role="group">
          <button class="btn btn-primary col-8 p-2" type="submit">
            Saqlash
          </button>
          <nuxt-link :to="`/admin/news/`" class="btn btn-secondary col-3 p-2 ms-2">
            Orqaga
          </nuxt-link>
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
      files       : '',
      success     : false,
      name        : '',
      description : '',
      content     : '',
      url         : '',
      server_url  : '',
      picture_name: '',
      forriles    : '',
    }
  },
  mounted() {
    this.$loading.show()
    this.getNews()
  },
  methods: {
    async getNews() {
      const data = await this.$axios.$get(`admin/news/get/${this.$route.params.id}`);
      if (data.error === true) {
        this.SwalMixin(data.data.message, 'error')
        this.$router.push(`/admin/news`)
      } else {
        const news        = data.data;
        this.name         = news.name;
        this.server_url   = news.photo
        this.picture_name = news.photo_name
        this.content      = news.content
        this.success      = true
        this.$loading.hide()
      }
    },
    save(e) {
      e.preventDefault();
      this.$loading.show()
      let formData = new FormData();

      let file = this.files[0];
      if (file) {
        formData.append('photo', file);
      }
      formData.append('id', this.$route.params.id);
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('content', this.content);
      this.$axios.post('admin/news/update',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
        this.SwalMixin(response.data.data.message)
        this.$router.push(`/admin/news/notification`)
        this.$loading.hide()
      }).catch((error) => {
        this.SwalMixin('Qandaydur xatolik', 'error')
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
