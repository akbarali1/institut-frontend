<template>
  <div class="container">
    <AdminTableHeader/>
    <div class="card mt-1">
      <table class="table table-sm">
        <thead class="table-dark table-sm">
        <tr>
          <th scope="col" class="text-center">
            <input class="form-check-input" type="checkbox" @click="selectAll(this, $event)">
          </th>
          <th scope="col" class="text-center"><i class="bi bi-sort-numeric-down-alt"></i></th>
          <th scope="col" class="text-center"><i class="bi bi-calendar3"></i></th>
          <th scope="col" class="float-left">Savol</th>
          <th scope="col" class="float-left">To'g'ri javob</th>
          <th scope="col" class="text-center"><i class="bi bi-alarm"></i></th>
          <th scope="col" class="text-center"><i class="bi bi-cash"></i></th>
          <th scope="col" class="text-center"><i class="bi bi-person-plus"></i></th>
          <th scope="col" style="width: 10%; text-align: center;"><i class="bi bi-diagram-3"></i></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(question, id) in questions">
          <td width="1%" class="text-center align-middle">
            <input class="form-check-input" type="checkbox" @click="checkbox($event, question.id)">
          </td>
          <td width="3%" class="text-center align-middle" v-text="question.id"></td>
          <td width="8%" class="text-center  align-middle" v-text="question.create"></td>
          <td class="float-left  align-middle">{{ question.question }} <i class="bi bi-arrow-right"></i></td>
          <td class="float-left  align-middle" v-text="question.answer[0]"></td>
          <td width="1%" class="text-center align-middle" v-text="question.time"></td>
          <td width="1%" class="text-center align-middle"> {{ question.money }}</td>
          <td width="1%" class="text-center align-middle"> {{ question.rating }}</td>
          <td width="8%" class="text-center align-middle">
            <nuxt-link :to="`/admin/question/view/${question.id}`" class="btn btn-success btn-sm padingkichkina" target="_blank"><i class="bi bi-eye"></i></nuxt-link>
            <nuxt-link :to="`/admin/question/audio/edit/${question.id}`" class="btn btn-primary btn-sm padingkichkina" target="_blank"><i class="bi bi-mic"></i></nuxt-link>
            <nuxt-link :to="`/admin/question/edit/${question.id}`" class="btn btn-primary btn-sm padingkichkina" target="_blank"><i class="bi bi-pencil"></i></nuxt-link>
            <a class="btn btn-outline-danger align-middle btn-sm padingkichkina" @click="deleteQuestion(question.id, question.question)"><i class="bi bi-trash"></i></a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="card" v-if="next_page_url !== null">
      <button class="btn btn-success" @click="getPaginateTrade">
        Yana yuklash
      </button>
    </div>
    <div class="fixed-bottom" v-if="selected.length > 0">
      <div class="btn-group">
        <!--              <b>Belgilanganlarni aktivlashtirish</b>-->
        <button class="btn btn-success " @click="sendCheck"><i class="bi bi-check2-square"></i></button>
        <!--              <b>Belgilanganlarni o'chirish</b>-->
        <button class="btn btn-danger " @click="cancelCheck"><i class="bi bi-x-circle"></i></button>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import AdminTableHeader from "../../../../components/AdminTableHeader";

export default {
  components: {AdminTableHeader},
  middleware: 'isAdmin',
  data() {
    return {
      questions    : [],
      success      : false,
      next_page_url: null,
      selected     : [],
      isCheckAll   : false,
    }
  },
  mounted() {
    this.$loading.show()
    this.getQuestions()
  },
  methods: {
    async getQuestions() {
      this.$axios.get('admin/question/excel').then((res) => {
        this.questions = res.data.data.data;
        if (res.data.next_page_url !== null) {
          this.next_page_url = res.data.data.next_page_url
        }
      }).catch((error) => {
        this.has_error = true
      });
      this.$loading.hide();
    },
    async getPaginateTrade() {
      this.$axios.get(`${this.next_page_url}`).then((res) => {
        if (res.data.next_page_url !== null) {
          this.next_page_url = res.data.data.next_page_url
          const questions    = this.questions;
          this.questions     = questions.concat(res.data.data.data)
        } else {
          this.SwalMixin("Boshqa savollar qolmadi", 'error')
        }
      }).catch((error) => {
        this.has_error = true
        console.log(error.response.data.message)
      });
    },
    checkbox(event, id) {
      this.isCheckAll = !this.isCheckAll;
      let array       = this.selected;
      if (event.target.checked) {
        this.selected = array.concat(id);
      } else {
        this.selected = array.filter(item => item !== id);
      }
    },
    selectAll(bx, event) {
      var cbs = document.getElementsByTagName('input'), i = 0;
      if (event.target.checked) {
        this.selected = this.questions.map(item => item.id);
        for (i; i < cbs.length; i++) {
          if (cbs[i].type == 'checkbox') {
            cbs[i].checked = true;
          }
        }
      } else {
        this.checkboxfalse()
      }
    },
    deleteQuestion(id, name) {
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
          this.$axios.post('admin/question/delete', {
            id: id
          }).then((response) => {
            this.SwalMixin(response.data.data.message)
            this.getQuestions()
          }).catch((error) => {
            this.SwalMixin(error.response.data.message, 'error')
          });
        }
      })
    },
    sendCheck() {
      Swal.fire({
        title            : "Tasdiqlaysizmi?",
        icon             : 'info',
        text             : 'Belgilanganlarni tasdiqlab asosiy testlarga qo\'shmoqchimisiz ?',
        showCancelButton : true,
        confirmButtonText: "Ha tasdiqlayman",
        cancelButtonText : "Yo'q hozir emas"
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.post('admin/question/sendCheck', {
            id: this.selected
          }).then((response) => {
            this.checkboxfalse()
            this.SwalMixin(response.data.data.message)
            this.getQuestions()
          }).catch((error) => {
            this.SwalMixin(error.response.data.message, 'error')
          });
        }
      })
    },
    cancelCheck() {
      Swal.fire({
        title            : "Tasdiqlaysizmi?",
        icon             : 'warning',
        text             : 'Belgilangan testlarni o\'chirmoqchimisiz?',
        showCancelButton : true,
        confirmButtonText: "Ha tasdiqlayman",
        cancelButtonText : "Yo'q hozir emas"
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.post('admin/question/cancelCheck', {
            id: this.selected
          }).then((response) => {
            this.checkboxfalse()
            this.SwalMixin(response.data.data.message)
            this.getQuestions()
          }).catch((error) => {
            this.SwalMixin(error.response.data.message, 'error')
          });
        }
      })
    },
    checkboxfalse() {
      this.selected = []
      var cbs       = document.getElementsByTagName('input'), i = 0;
      for (i; i < cbs.length; i++) {
        if (cbs[i].type == 'checkbox') {
          cbs[i].checked = false;
        }
      }
    },
  }
}
</script>
