<template>
  <div class="container  card mt-4 mb-4">
    <hr>
    <div class="btn-group" role="group" aria-label="Basic example">
      <nuxt-link :to="`/`" class="btn btn-primary m-1">Bosh sahifa</nuxt-link>
      <nuxt-link :to="`/admin/`" class="btn btn-primary m-1">Admin panel</nuxt-link>
      <nuxt-link :to="`/admin/news/create`" class="btn btn-primary m-1">Yanglik qo'shish</nuxt-link>
      <nuxt-link :to="`/admin/news/notification`" class="btn btn-primary m-1">Bildirishnomalar</nuxt-link>
    </div>
    <hr>
    <div class="row mb-3">
      <div class="col-md-3 mb-3" v-for="(item, key) in news">
        <div class="card">
          <img class="img-fluid" :src="item.photo" role="img" alt="news image" v-if="item.photo !== null">
          <img class="img-fluid" src="~/assets/images/news.jpg" role="img" alt="news image" v-else>
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <nuxt-link :to="`/admin/news/edit/${item.id}`" class="btn btn-primary btn-sm" style="  padding: 2px 5px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path
                  d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
            </nuxt-link>
            <button type="button" class="btn btn-danger btn-sm" style="  padding: 2px 5px;" @click="deleteNews(item.id, item.name)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
            <div class="collapse card-text" :id="'collapseExample'+item.id" v-html="item.content"></div>
            <p class="mt-1">
            <div data-bs-toggle="collapse" :data-bs-target="'#collapseExample'+item.id" aria-expanded="false" :aria-controls="'collapseExample'+item.id">
              <svg style="transform: rotate(180deg);" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
              </svg>
            </div>
          </div>
        </div>
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
      news   : [],
      success: false
    }
  },
  mounted() {
    this.getNews()
  },
  methods: {
    async getNews() {
      this.$loading.show()
      const data   = await this.$axios.$get(`admin/news/all`).catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide()
      });
      this.news    = data.data.data
      this.success = true
    },
    deleteNews(id, name) {
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
          this.$axios.post('admin/news/delete', {
            id: id
          }).then((response) => {
            this.SwalMixin(response.data.data.message)
            this.getNews()
          }).catch(() => {
            window.location.reload()
          }).finally(() => {
            this.$loading.hide()
          });
        }
      })
    },
  }
}
</script>
