<template>
  <div class="container">
    <ul class="list-group pt-1">
      <li class="list-group-item align-center">
        <span class="float-end">
          <nuxt-link :to="`../`" class="btn btn-danger btn-sm " accesskey="b">Orqaga</nuxt-link>
        </span>
      </li>
      <li id="dat_input" class="list-group-item collapse">
        <p>Bu yerga endi biror nima qo`shiladi</p>
      </li>
    </ul>
    <hr>
    <div class="container form-control">
      <div class="mb-3">
        <label for="files" class="form-label">Excel faylni tanglang</label>
        <input type="file" id="files" ref="files" v-on:change="handleFilesUpload()" class="form-control"
               accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
        <button v-on:click="submitFiles()" class="btn btn-primary mt-3">Saqlash</button>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  middleware: 'isAdmin',
  data() {
    return {
      files: '',
      success: false,
    }
  },

  methods: {
    submitFiles() {
      let formData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append('files', file);
      }
      this.$axios.post('admin/question/uploadExcel',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {

        if (res.data.success === true) {
          this.success = true;
          this.$router.push(`/admin/question/excel`)
        } else {
          Swal.fire({
            icon: 'error',
            // title: 'Oops...',
            title: res.data.data.message,
            footer: res.data.data.html
          })
        }
      }).catch((error) => {
        console.log(error)
        console.log('FAILURE!!');
      })
    },
    handleFilesUpload() {
      this.files = this.$refs.files.files;
    }
  }
}
</script>
