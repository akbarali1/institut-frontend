<template>
  <div>
    <div class="card">
      <div class="container">
        <label class="mt-1"> Filtrlash:</label>
        <form @submit="getQuestions" class="input-group m-2">
          <input type="text" class="form-control" placeholder="Savol nomi bo`yicha" v-model="name">
          <input type="text" class="form-control" placeholder="Savolning javobi bo`yicha" v-model="answer">
          <button type="submit" class="btn btn-primary">Filtrlash</button>
        </form>
      </div>
      <div class="container d-flex align-items-center justify-content-center">
        <nav>
          <ul class="pagination pagination-sm">
            <li v-for="(item) in links" :class="[ 'page-item',
                         (item.url === null ? 'disabled' : ''),
                         (item.active === true ? 'active' : ''),
                         ]">
              <button class="page-link" v-html="item.label" @click="pagination(item.url)"></button>
            </li>
          </ul>
        </nav>
      </div>
      <table class="table table-sm">
        <thead class="table-dark table-sm">
        <tr>
          <th scope="col" class="text-center"><i class="bi bi-list-check"></i></th>
          <th scope="col" class="text-center"><i class="bi bi-sort-numeric-down-alt"></i></th>
          <th scope="col" class="text-center"><i class="bi bi-calendar3"></i></th>
          <th scope="col" class="text-center"><i class="bi bi-bar-chart"></i></th>
          <th scope="col" class="float-left">Savol</th>
          <th scope="col" class="float-left">To'g'ri javob</th>
          <th scope="col" class="text-center"><i class="bi bi-image"></i></th>
          <th scope="col" class="text-center"><i class="bi bi-alarm"></i></th>
          <th scope="col" class="text-center"><i class="bi bi-cash"></i></th>
          <th scope="col" class="text-center"><i class="bi bi-person-plus"></i></th>
          <th scope="col" style="width: 7%; text-align: center;"><i class="bi bi-diagram-3"></i></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(question, id) in questions">
          <td width="1%" class="text-center align-middle">
            <b v-if="question.status_id === 1"><i class="bi bi-check2-all"></i></b>
            <b v-else><i class="bi bi-check"></i></b>
          </td>
          <td width="3%" class="text-center align-middle" v-text="question.id"></td>
          <td width="8%" class="text-center  align-middle" v-text="question.create"></td>
          <td class="float-left  align-middle" v-text="question.status_name"></td>
          <td class="float-left  align-middle">{{ question.question }} <i class="bi bi-arrow-right"></i></td>
          <td class="float-left  align-middle" v-text="question.answer[0]"></td>
          <td width="1%" class="text-center align-middle">
            <b v-if="question.file !== ''">
              <a :href="question.file" target="_blank" v-if="question.type === 'image'"><img :src="question.file" alt="rasm" class="img-thumbnail"></a>
              <vue-plyr v-if="question.type === 'audio'">
                <audio>
                  <source :src="question.file" type="audio/mp3"/>
                </audio>
              </vue-plyr>
            </b>
            <b v-else class="btn-danger padingkichkina rounded">Yo'q</b>
          </td>
          <td width="1%" class="text-center align-middle" v-text="question.time"></td>
          <td width="1%" class="text-center align-middle"> {{ question.money }}</td>
          <td width="1%" class="text-center align-middle"> {{ question.rating }}</td>
          <td width="8%" class="text-center align-middle">
            <nuxt-link :to="`/admin/question/view/${question.id}`" class="btn btn-success btn-sm padingkichkina"><i class="bi bi-eye"></i></nuxt-link>
            <nuxt-link :to="`/admin/question/audio/edit/${question.id}`" class="btn btn-primary btn-sm padingkichkina" v-if="question.type === 'audio'">
              <i class="bi bi-pencil"></i>
            </nuxt-link>
            <nuxt-link :to="`/admin/question/edit/${question.id}`" class="btn btn-primary btn-sm padingkichkina" v-else>
              <i class="bi bi-pencil"></i>
            </nuxt-link>
            <a class="btn btn-outline-danger align-middle btn-sm padingkichkina" @click="deleteQuestion(question.id, question.question)"><i class="bi bi-trash"></i></a>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="container d-flex align-items-center justify-content-center">
        <nav>
          <ul class="pagination pagination-sm">
            <li v-for="(item, key) in links" :class="[ 'page-item',
                         (item.url === null ? 'disabled' : ''),
                         (item.active === true ? 'active' : ''),
                         ]">
              <button class="page-link" v-html="item.label" @click="pagination(item.url)"></button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  middleware: 'isAuthenticated',
  name      : 'trade',
  props     : ['requestUrl'],
  data() {
    return {
      questions: {},
      nexturl  : null,
      links    : [],
      name     : '',
      answer   : '',
      type     : '',
    }
  },
  mounted() {
    this.$loading.show()
    this.getQuestions()
  },
  methods: {
    async getQuestions(e) {
      if (e) {
        e.preventDefault()
      }
      this.$axios.get(this.requestUrl + '?name=' + this.name + '&answer=' + this.answer).then((res) => {
        this.questions = res.data.data.data;
        this.links     = res.data.data.links
      }).catch((error) => {
        this.has_error = true
        console.log(error)
      }).finally(() => {
        this.$loading.hide()
      });
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
          this.$loading.show()
          this.$axios.post('admin/question/delete', {
            id: id
          }).then((response) => {
            this.SwalMixin(response.data.data.message)
            this.getQuestions()
          }).catch((error) => {
            console.log(error)
          }).finally(() => {
            this.$loading.hide()
          });
        }
      })
    },
    pagination($url) {
      this.$loading.show()
      this.$axios.get($url).then((res) => {
        this.questions = res.data.data.data;
        this.links     = res.data.data.links
        window.scrollTo({top: 0, behavior: 'smooth'});
      }).catch((error) => {
        this.has_error = true
      }).finally(() => {
        this.$loading.hide();
      })
    },
  }
}
</script>
