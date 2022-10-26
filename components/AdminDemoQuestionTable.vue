<template>
  <div>
    <div class="card mt-1">
      <table class="table table-sm">
        <thead class="table-dark table-sm">
        <tr>
          <th scope="col" class="text-center"><i class="bi bi-sort-numeric-down-alt"></i></th>
          <th scope="col" class="float-left">Savol</th>
          <th scope="col" class="float-left">To'g'ri javob</th>
          <th scope="col" class="text-center"><i class="bi bi-alarm"></i></th>
          <th scope="col" style="width: 7%; text-align: center;"><i class="bi bi-diagram-3"></i></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(question, id) in questions">
          <td width="3%" class="text-center align-middle" v-text="question.id"></td>
          <td class="float-left  align-middle">{{ question.savol }} <i class="bi bi-arrow-right"></i></td>
          <td class="float-left  align-middle" v-text="question.javoblar[0]"></td>
          <td width="1%" class="text-center align-middle" v-text="question.berilgan_vaqt"></td>
          <td width="8%" class="text-center align-middle">
            <nuxt-link :to="`/admin/demotest/view/${question.id}`" class="btn btn-success btn-sm padingkichkina"><i class="bi bi-eye"></i></nuxt-link>
            <nuxt-link :to="`/admin/demotest/edit/${question.id}`" class="btn btn-primary btn-sm padingkichkina"><i class="bi bi-pencil"></i></nuxt-link>
            <button @click="deleteQuestion(question.id)" class="btn btn-outline-danger align-middle btn-sm padingkichkina"><i class="bi bi-trash"></i></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="card" v-if="nexturl !== null">
      <button class="btn btn-success" @click="getPaginateTrade">
        Yana yuklash
      </button>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  middleware: 'isAuthenticated',
  name      : 'AdminDemoQuestionTable',
  props     : ['requestUrl'],
  data() {
    return {
      questions: {},
      nexturl  : null,
    }
  },
  mounted() {
    this.$loading.show()
    this.getQuestions()
  },
  methods: {
    async getQuestions() {
      this.$axios.get(this.requestUrl).then((res) => {
        this.questions = res.data.data.data;
        if (res.data.nexturl !== null) {
          this.nexturl = res.data.data.next_page_url
        }
      }).catch((error) => {
        this.has_error = true
        console.log(error)
      });
      this.$loading.hide();
    },
    async getPaginateTrade() {
      this.$axios.get(`${this.nexturl}`).then((res) => {
        if (res.data.next_page_url !== null) {
          this.nexturl    = res.data.data.next_page_url
          const questions = this.questions;
          this.questions  = questions.concat(res.data.data.data)
        } else {
          this.SwalMixin("Boshqa savollar qolmadi", 'error')
        }
      }).catch((error) => {
        this.has_error = true
        console.log(error)
      });
    },
    deleteQuestion(id) {
      Swal.fire({
        title             : 'Are you sure?',
        text              : 'You won\'t be able to revert this!',
        icon              : 'warning',
        showCancelButton  : true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor : '#d33',
        confirmButtonText : 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$loading.show();
          this.$axios.post(`admin/demo/delete/${id}`).then((res) => {
            this.SwalMixin('Savol o`chirildi', 'success')
            this.getQuestions()
          }).catch((error) => {
            this.has_error = true
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
