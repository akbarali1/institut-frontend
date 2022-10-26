<template>
  <div class="container  card mt-4 mb-4">
    <AdminTableHeader/>
    <div>
      <div class="card mt-1">
        <table class="table table-sm">
          <thead class="table-dark table-sm">
          <tr>
            <th scope="col" class="text-center">Nomi</th>
            <th scope="col" class="text-center">Sayt URL</th>
            <th scope="col" class="text-center">Vaqti</th>
            <th scope="col" class="text-center">Puli</th>
            <th scope="col" class="text-center">Reytingi</th>
            <th scope="col" class="text-center">PRO Yulduz</th>
            <th scope="col" class="text-center" width="1%"><i class="bi bi-diagram-3"></i></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(surfing, index) in rating_data">
            <td class="text-center  align-middle">{{ surfing.name }}</td>
            <td class="text-center  align-middle">{{ surfing.site_url }}</td>
            <td class="text-center  align-middle">{{ surfing.time }}</td>
            <td class="text-center  align-middle">{{ surfing.money }}</td>
            <td class="text-center  align-middle">{{ surfing.rating }}</td>
            <td class="text-center  align-middle">{{ surfing.error }}</td>
            <td width="8%" class="text-center align-middle">
              <nuxt-link :to="`/admin/surfing/edit/${surfing.id}`" class="btn btn-primary btn-sm padingkichkina"><i class="bi bi-pencil"></i></nuxt-link>
              <a class="btn btn-outline-danger align-middle btn-sm padingkichkina" @click="deleteSurfing(surfing.id, surfing.name)"><i class="bi bi-trash"></i></a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>

import Swal from "sweetalert2";

export default {
  middleware: 'isAdmin',
  head() {
    return {
      title: "Foydalanuvchilar reytingi"
    };
  },
  data() {
    return {
      success      : false,
      next_page_url: null,
      number       : 0,
      rating_data  : [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.$loading.show()
      this.$axios.get(`admin/surfing/all`).then((res) => {
        this.success     = true
        this.rating_data = res.data.data.data;
        if (res.data.next_page_url !== null) {
          this.next_page_url = res.data.data.next_page_url
        }
      }).catch((error) => {
        this.has_error = true
        console.log(error)
      }).finally(() => {
        this.$loading.hide();
      });
    },
    deleteSurfing(id, name) {
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
          this.$loading.show()
          this.$axios.post('admin/surfing/delete', {
            id: id
          }).then((response) => {
            this.SwalMixin(response.data.data.message)
            this.getData()
          }).catch((error) => {
            console.log(error)
          }).finally(() => {
            this.$loading.hide();
          });
        }
      })
    },
  }
}
</script>
