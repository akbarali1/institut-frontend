<template>
  <div class="container">
    <span class="float-end p-2">
          <nuxt-link :to="`../`" class="btn btn-danger btn-sm " accesskey="b">Orqaga</nuxt-link>
        </span>
    <form method="post" class="form-control mt-4" @submit="submitFiles">
      <div class="mb-3">
        <label for="files" class="form-label">Rasmni tanglang</label>
        <input type="file" id="files" ref="files" v-on:change="handleFilesUpload($event)" class="form-control" accept="image/*" autofocus/>
      </div>
      <div class="mb-3 text-center">
        <img v-if="url" :src="url" class="img-thumbnail w-25"/>
      </div>
      <div class="mb-3">
        <label for="name">Habar sarlavha</label>
        <input type="text" class="form-control" id="name" v-model="name" autocomplete="off">
      </div>

      <div class="mb-3">
        <label for="link">Habarga kirish uchun link</label>
        <input type="text" class="form-control" id="link" v-model="link" autocomplete="off">
      </div>
      <!--      <div class="mb-3">-->
      <!--        <label for="exampleFormControlTextarea1" class="form-label">News Description</label>-->
      <!--        <textarea class="form-control" id="exampleFormControlTextarea1" v-model="description" rows="2"></textarea>-->
      <!--      </div>-->
      <label class="mb-1">Habar matni</label>
      <textarea class="form-control" id="content" v-model="content" rows="3" required></textarea>
      <div class="row ms-1 mt-3" role="group">
        <button class="btn btn-primary col-8 p-2" type="submit">
          Saqlash
        </button>
        <nuxt-link :to="`/admin/news/notification`" class="btn btn-secondary col-3 p-2 ms-2">
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
      files      : '',
      success    : false,
      name       : '',
      link       : '',
      description: '',
      content    : '',
      url        : '',
    }
  },
  methods: {
    submitFiles(e) {
      e.preventDefault();
      let formData = new FormData();
      let file     = this.files[0];
      if (file) {
        formData.append('photo', file);
      }
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('content', this.content);
      formData.append('link', this.link);
      this.$axios.post('admin/news/notification/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
        this.$router.push(`/admin/news/notification`)
      }).catch((error) => {
        console.log(error)
        console.log('FAILURE!!');
      })
    },
    handleFilesUpload(e) {
      this.files = this.$refs.files.files;
      const file = e.target.files[0];
      this.url   = URL.createObjectURL(file);
    },
  }
}
</script>
