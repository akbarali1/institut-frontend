<template>
  <div class="container  card mt-4 mb-4">
    <div class="row w-100 p-1 " role="group">
      <nuxt-link :to="`/`" class="btn btn-primary m-1 col-md-2">Bosh sahifa</nuxt-link>
      <nuxt-link :to="`/admin/`" class="btn btn-primary m-1 col-md-2">Admin panel</nuxt-link>
      <nuxt-link :to="`/admin/championship/create`" class="btn btn-primary m-1 col-md-2">Chempionat qo'shish</nuxt-link>
    </div>
    <div class="row mb-3">
      <div class="col-md-4 mb-3" v-for="(item, key) in data">
        <div class="card">
          <div class="card-body">
            <div class="card-text mb-3">
              Boshlanish vaqti: {{ item.start_time }} <br>
              Tugash vaqti vaqti: {{ item.end_time }} <br>
            </div>
            <nuxt-link :to="`/admin/championship/edit/${item.id}`" class="btn btn-primary btn-sm" style="padding: 2px 5px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="bi bi-pencil">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
              </svg>
            </nuxt-link>
            <button type="button" class="btn btn-danger btn-sm" style="  padding: 2px 5px;" @click="deleteData(item.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";

export default {
  middleware: 'isAdmin',
  data() {
    return {
      success: false,
      data: []
    }
  },
  mounted() {
    this.$loading.hide();
    this.$loading.show()
    this.HomePage()
  },
  methods: {
    async HomePage() {
      const data = await this.$axios.$get(`admin/championship/all`);
      const data1 = await this.$axios.$get(`championship/active`);
      console.log(data1.data)
      this.data = data.data;
      this.success = true
      this.$loading.hide();
    },
    deleteData(id) {
      Swal.fire({
        title: "O'chirasizmi?",
        html: `<b>${id}</b> ni o'chirmoqchimisiz?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Ha o'chiraman",
        cancelButtonText: "Yo'q hozir emas"
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.post('admin/championship/delete/' + id).then((response) => {
            this.SwalMixin(response.data.data.message)
            this.HomePage()
          }).catch((error) => {
            console.log(error)
          });
        }
      })
    },
  }
}
</script>
