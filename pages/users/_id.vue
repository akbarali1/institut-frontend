<template>
  <div>
    <div class="container mt-3">
      <div class="main-body">
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="main-breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <nuxt-link :to="`/`">{{ $t('home_page') }}</nuxt-link>
            </li>
            <li class="breadcrumb-item">
              <nuxt-link :to="`/rating`">{{ $t('rating') }}</nuxt-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Foydalanuvchi profili</li>
          </ol>
        </nav>
        <!-- /Breadcrumb -->
        <div class="row gutters-sm">
          <div class="col-md-3 mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img :src="photo" alt="Admin" class="rounded-circle" width="150" v-if="photo">
                  <img src="~/assets/images/avatar.png" alt="Admin" class="rounded-circle" width="150" v-else>
                  <div class="mt-3">
                    <h4>{{ name }}</h4>
                    <!--                    <p class="text-secondary mb-1">Full Stack Developer</p>-->
                    <!--                    <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>-->
                    <div v-if="this.AdminCheck()" class="row m-2 d-flex justify-content-center">
                      <button class="btn btn-primary btn-sm col-5 padingkichkina" @click="userRestore">0ga tushurish</button>
                      <div class="col-1"></div>
                      <button class="btn btn-outline-primary btn-sm col-5 padingkichkina" @click="getUserTestsesion">Testlarini ko`rish</button>
                      <button class="btn btn-outline-primary btn-sm col-5 mt-2 padingkichkina" @click="userPasswordChange">Parolini yangilash</button>
                      <div class="col-1"></div>
                      <button class="btn btn-outline-primary btn-sm col-5 mt-2 padingkichkina" @click="getCharts">Statistikasini ko`rish</button>
                      <button class="btn btn-outline-primary btn-sm col-5 mt-2 padingkichkina" @click="banUser">Userni banlash</button>
                      <div class="col-1"></div>
                      <button class="btn btn-outline-primary btn-sm col-5 mt-2 padingkichkina" @click="statusUpdate">Statusini o'zgartirish</button>
                      <button class="btn btn-outline-primary btn-sm col-5 mt-2 padingkichkina" @click="ratingAdd">Ball qo'shish</button>
                      <div class="col-1"></div>
                      <button class="btn btn-outline-primary btn-sm col-5 mt-2 padingkichkina" @click="cryptoAdd">Crypto qo'shish</button>
                      <button class="btn btn-outline-primary btn-sm col-5 mt-2 padingkichkina" @click="referalView">Referallarini ko`rish</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mt-3 w-100">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0">ID</h6>
                  <span class="text-secondary" v-text="id"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="this.AdminCheck()" :style="[
                    ban ? { 'background-color': '#ff6b6b' } : '',
                    ban ? { 'color': 'white' } : '',
                ]">
                  <h6 class="mb-0">Unikalniy ID</h6>
                  <span class="text-secondary" v-text="'#'+unique"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="rating">
                  <h6 class="mb-0">Reyting</h6>
                  <span class="text-secondary" v-text="rating"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="this.AdminCheck()">
                  <h6 class="mb-0">Puli</h6>
                  <span class="text-secondary" v-text="money"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0">E-Mail</h6>
                  <span class="text-secondary" v-text="email"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="phone">
                  <h6 class="mb-0">Telfoni</h6>
                  <span class="text-secondary" v-text="phone"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0">Nomi</h6>
                  <span class="text-secondary" v-text="name"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0">Statusi</h6>
                  <span class="text-secondary" v-text="status_name"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="telegram_id">
                  <h6 class="mb-0">Telegram ID</h6>
                  <span class="text-secondary" v-text="telegram_id"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="username">
                  <h6 class="mb-0">Telegram Usernmae</h6>
                  <span class="text-secondary">
                    <a :href="'https://t.me/'+ username" target="_blank">@{{ username }}</a>
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="last_name">
                  <h6 class="mb-0">Familiya</h6>
                  <span class="text-secondary" v-text="last_name"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="first_name">
                  <h6 class="mb-0">Otasining ismi</h6>
                  <span class="text-secondary" v-text="first_name"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="date">
                  <h6 class="mb-0">Tug'ilgan sanasi</h6>
                  <span class="text-secondary" v-text="date"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="question">
                  <h6 class="mb-0">Yechgan testlari</h6>
                  <span class="text-secondary" v-text="question"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="this.AdminCheck()">
                  <h6 class="mb-0">
                    <img src="~/assets/svg/star-pro.svg" class="img-fluid" alt="Pro yulduz" title="Pro yulduz" style="width: 20px">
                  </h6>
                  <span class="text-secondary" v-text="star_pro"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="this.AdminCheck()">
                  <h6 class="mb-0">
                    <img src="~/assets/svg/star.svg" class="img-fluid" alt="Pro yulduz" title="Pro yulduz" style="width: 20px">
                  </h6>
                  <span class="text-secondary" v-text="star"></span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-9" v-if="this.AdminCheck()">
            <div v-if="info" class="card mb-3 p-1" style="font-size: 12px;">
              <table class="table  table-sm mb-0 pb-0">
                <thead class="table-dark table-sm">
                <tr class="text-center align-middle">
                  <th>Jami yechgan:</th>
                  <th>Jami xato:</th>
                  <th>Bugun yechgan:</th>
                  <th>Bugungi xato:</th>
                  <th>Jami Surfing:</th>
                  <th>Bugungi Surfing:</th>
                  <th>Jami olgan <img src="~/assets/svg/star-pro.svg" class="img-fluid" alt="Pro yulduz" title="Pro yulduz" style="width: 20px">:</th>
                  <th>Qolgan <img src="~/assets/svg/star-pro.svg" class="img-fluid" alt="Pro yulduz" title="Pro yulduz" style="width: 20px">:</th>
                  <th>Ishlatilgan <img src="~/assets/svg/star-pro.svg" class="img-fluid" alt="Pro yulduz" title="Pro yulduz" style="width: 20px">:</th>
                  <th><img src="~/assets/svg/star-pro.svg" class="img-fluid" alt="Pro yulduz" title="Pro yulduz" style="width: 20px"> uchun jami pul:</th>
                </tr>
                </thead>
                <tbody>
                <tr class="fs-5 text-center">
                  <td v-text="user_info.question.total.true"></td>
                  <td v-text="user_info.question.total.false"></td>
                  <td v-text="user_info.question.today.true"></td>
                  <td v-text="user_info.question.today.false"></td>
                  <td v-text="user_info.surfing.total"></td>
                  <td v-text="user_info.surfing.today"></td>
                  <td v-text="user_info.start_pro.total"></td>
                  <td v-text="user_info.start_pro.residue"></td>
                  <td v-text="user_info.start_pro.obtained"></td>
                  <td v-text="user_info.start_pro.money"></td>
                </tr>
                </tbody>
              </table>
            </div>
            <label class="form-label">{{ $t('getDayStat') }}</label>
            <form class="input-group mb-3" method="post" @submit="changeForm">
              <input type="date" class="form-control" v-model="start_date" @change="changeForm">
              <input type="date" class="form-control" v-model="end_date" @change="changeForm">
              <button class="btn btn-primary" type="submit">Olish</button>
            </form>
            <div v-if="chart" class="card mb-3 p-1">
              <div id="chart" v-if="chart_ready" class="card-body">
                <apexchart type="area" height="300" :options="chard_data.area.options" :series="chard_data.area.series"></apexchart>
              </div>
            </div>
            <div class="card mb-3 p-1" v-if="chart_pie">
              <div class="row">
                <div id="chart_pie" class="col-4">
                  <apexchart type="pie" width="500" :options="chard_data.pie.options" :series="chard_data.pie.series"></apexchart>
                </div>
              </div>
            </div>
            <div v-if="table" class="card mb-3 p-1" style="font-size: 12px;">
              <table class="table table-sm mt-0">
                <thead class="table-dark table-sm">
                <tr>
                  <th scope="col" width="1%" class="text-center">№</th>
                  <th scope="col" width="1%" class="text-center">ID</th>
                  <th scope="col">Test savoli</th>
                  <th scope="col">Javobi</th>
                  <th scope="col">Yaratilgan</th>
                  <th scope="col" class="text-center">Ball</th>
                  <th scope="col" class="text-center">Pul</th>
                  <th scope="col" width="1%"><i class="bi bi-diagram-3"></i></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(sesion, index) in user_test_data" :style="[
                 (sesion.status === 1) ? {'background-color' : '#a9f5a9'} : '',
                 (sesion.status === 0) ? {'background-color' : '#faa0a0'} : '',
                 (sesion.status === 2) ? {'background-color' : '#fcf5c5'} : '',
                ]">
                  <td class="text-center  align-middle">{{ sesion.id }}</td>
                  <td class="text-center  align-middle">{{ sesion.question_id }}</td>
                  <td class="  align-middle">{{ sesion.question_name.question }}</td>
                  <td class="align-middle">{{ sesion.answer }}</td>
                  <td class="text-center  align-middle" width="125px">{{ sesion.created_at }}</td>
                  <td class="text-center  align-middle">
                    <span class="bg-success text-white rounded-3 padingkichkina">
                        {{ sesion.question_name.rating }}
                    </span>
                  </td>
                  <td class="text-center  align-middle">
                    <span class="bg-success text-white rounded-3 padingkichkina">
                          {{ sesion.question_name.money }}
                      </span>
                  </td>
                  <td class="text-center  align-middle">
                    <nuxt-link :to="`/admin/question/view/${sesion.question_id}/`" class="btn btn-success btn-sm padingkichkina" target="_blank"><i class="bi bi-eye"></i></nuxt-link>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="d-flex align-items-center justify-content-center">
                <nav>
                  <ul class="pagination pagination-sm">
                    <li v-for="(item, key) in links" :class="[ 'page-item',
                         (item.url === null ? 'disabled' : ''),
                         (item.active === true ? 'active none' : ''),
                         ]">
                      <button class="page-link" v-html="item.label" @click="pagination(item.url, true)"></button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div class="card mt-1" v-if="referals.length > 0">
              <div v-if="info_referal !== null" class="card mb-3 p-1" style="font-size: 12px;">
                <table class="table  table-sm mb-0 pb-0">
                  <thead class="table-dark table-sm">
                  <tr class="text-center align-middle">
                    <th>Jami referallari:</th>
<!--                    <th scope="col">{{ $t('total_ref_money') }}</th>-->
                    <th>Ball olgan referallari:</th>
                    <th>Ball olmagan referallari:</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="fs-5 text-center">
                    <td v-text="info_referal.total_count"></td>
<!--                    <td v-text="info_referal.total_count *35"></td>-->
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <table class="table table-sm">
                <thead class="table-light">
                <tr>
                  <th scope="col" class="text-center" width="3%">№</th>
                  <th scope="col" width="3%">ID</th>
                  <th scope="col">{{ $t('full_name') }}</th>
                  <th scope="col">Bonus berildimi?</th>
                  <th scope="col">{{ $t('created_at') }}</th>
                  <th scope="col" width="1%" v-if="$auth.user.userData.rights > 1">
                    <i class="bi bi-diagram-3"></i>
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(users) in referals" :class="[ 'page-item',
                         (users.id === $auth.user.userData.id ? 'current-user animate__animated animate__pulse pulse-current-user' : ''),
                         ]">
                  <td class="align-middle text-center">#{{ users.number }}</td>
                  <td class="align-middle text-left">{{ users.id }}</td>
                  <td class="align-middle text-left">
              <span v-if="users.telegram_id" class="text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                </svg>
              </span>
                    <span v-else class="text-success">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="16" height="16"><linearGradient id="b" x1="55.41" x2="12.11" y1="96.87" y2="21.87" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1e8e3e"/><stop offset="1" stop-color="#34a853"/></linearGradient><linearGradient id="c" x1="42.7" x2="86" y1="100" y2="25.13" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fcc934"/><stop offset="1" stop-color="#fbbc04"/></linearGradient><linearGradient
                    id="a" x1="6.7" x2="93.29" y1="31.25" y2="31.25" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d93025"/><stop offset="1" stop-color="#ea4335"/></linearGradient><path fill="url(#a)" d="M93.29 25a50 50 90 0 0-86.6 0l3 54z"/><path fill="url(#b)" d="M28.35 62.5 6.7 25A50 50 90 0 0 50 100l49-50z"/><path fill="url(#c)" d="M71.65 62.5 50 100a50 50 90 0 0 43.29-75H50z"/><path fill="#fff" d="M50 75a25 25 90 1 0 0-50 25 25 90 0 0 0 50z"/><path fill="#1a73e8"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         d="M50 69.8a19.8 19.8 90 1 0 0-39.6 19.8 19.8 90 0 0 0 39.6z"/></svg>
              </span>
                    {{ users.name }}
                    <span v-if="users.verified" class="text-primary">
                  <img src="~/assets/svg/verif.svg" title="Bonus berilgan" alt="back">
                </span>
                  </td>
                  <td>
                    <span class="badge bg-primary" v-if="users.verified">Bonus berilgan</span>
                    <span class="badge bg-danger" v-else>Berilmagan</span>
                  </td>
                  <td>
                    {{ users.data }}
                  </td>
                  <td class="text-center align-middle" v-if="$auth.user.userData.rights > 1">
                    <nuxt-link :to="`/users/${users.id}`" class="btn btn-success btn-sm padingkichkina"><i class="bi bi-eye"></i></nuxt-link>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="container d-flex align-items-center justify-content-center">
                <nav>
                  <ul class="pagination pagination-sm">
                    <li v-for="(item) in links_referal" :class="[ 'page-item',
                         (item.url === null ? 'disabled' : ''),
                         (item.active === true ? 'active' : ''),
                         ]">
                      <button class="page-link" v-html="item.label" @click="paginationReferal(item.url,)"></button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import VueApexCharts from 'vue-apexcharts'

window.Apex.chart = {fontFamily: "'Roboto Slab', serif"};
export default {
  layout    : 'default',
  middleware: 'isAuthenticated',
  head() {
    return {
      title: 'Foydalanuvchi profili',
    }
  },
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      user_id              : this.$route.params.id,
      id                   : '',
      name                 : '',
      status_name          : '',
      status               : '',
      money                : '',
      rating               : '',
      photo                : null,
      star_pro             : 0,
      telegram_id          : 0,
      username             : 0,
      question             : 0,
      date                 : 0,
      first_name           : 0,
      last_name            : 0,
      email                : 0,
      phone                : 0,
      star                 : 0,
      time                 : '',
      success              : false,
      ban                  : false,
      table                : false,
      next_page_url        : null,
      user_test_data       : [],
      links                : [],
      info_referal         : null,
      user_info            : {
        "question" : {
          "total": {
            "true" : 0,
            "false": 0
          },
          "today": {
            "true" : 0,
            "false": 0
          }
        },
        "surfing"  : {
          "total": 0,
          "today": 0
        },
        "start_pro": {
          "obtained": 0,
          "residue" : 0,
          "total"   : 0,
          "money"   : 0
        }
      },
      info                 : false,
      chart                : false,
      chard_data           : {},
      start_date           : '',
      end_date             : '',
      unique               : '',
      chart_ready          : false,
      chart_pie            : false,
      referals             : [],
      next_referal_page_url: null,
      links_referal        : null,
    }
  },
  mounted() {
    this.getUserInfo()
    if (this.AdminCheck()) {
      this.getUserInfoTests();
      this.getCharts();
    }
  },
  methods: {
    async getUserInfo() {
      let res = await this.$axios.$get(`user/get/${this.$route.params.id}`);
      if (res.error === true) {
        this.SwalMixin(res.data.message, 'error')
        await this.$router.push(`/rating/`)
      } else {
        this.name        = res.data.name
        this.id          = res.data.id
        this.status_name = res.data.status_name
        this.rating      = res.data.rating
        this.photo       = res.data.photo
        let admin        = res.data.admin;

        if (admin.length !== 0) {
          this.money    = admin.money;
          this.star_pro = admin.stars.pro;
          this.unique   = admin.unique;
          this.star     = admin.stars.stars;
          this.email    = admin.email;
          this.phone    = admin.phone;

          this.telegram_id = admin.telegram_id;
          this.last_name   = admin.last_name;
          this.first_name  = admin.otasi;
          this.question    = admin.question;
          this.date        = admin.date;
          this.username    = admin.username;
          this.ban         = admin.ban;

        }
      }
    },
    userRestore() {
      Swal.fire({
        title             : "Tozalaysizmi?",
        html              : `<p>Userni 0ga tushurishni istaysizmi?. <br>Bu jarayonni orqaga qaytarib bo'lmaydi.</p>`,
        icon              : 'warning',
        showCancelButton  : true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor : '#d33',
        confirmButtonText : "Ha",
        cancelButtonText  : "Yo'q hozir emas"
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.post('user/restore', {
            user_id: this.user_id,
          }).then((response) => {
            this.SwalMixin(response.data.data.message)
          }).catch((error) => {
            this.SwalMixin(error.response.data.message, 'error')
          });
        }
      })
    },
    getUserTestsesion() {
      this.$loading.show()
      this.$axios.get('user/tests/' + this.user_id + '?start_date=' + this.start_date + '&end_date=' + this.end_date).then((res) => {
        this.success        = true
        this.table          = true
        this.user_test_data = res.data.data.data;
        if (res.data.next_page_url !== null) {
          this.next_page_url = res.data.data.next_page_url
          this.links         = res.data.data.links
        }
      }).catch((error) => {
        this.SwalMixin(error.response.data.message, 'error')
      }).finally(() => {
        this.$loading.hide();
      });
    },
    async referalView() {
      this.$loading.show()
      await this.$axios.get('user/referals/' + this.user_id).then((response) => {
        this.success      = true
        this.referals     = response.data.data.data.data;
        // console.log()
        this.info_referal = {
          total_count: response.data.data.data.total
        }
        if (response.data.data.data.next_page_url !== null) {
          this.next_referal_page_url = response.data.data.data.next_page_url
          this.links_referal         = response.data.data.data.links
        }
      }).finally(() => {
        this.$loading.hide();
      });
    },
    pagination($url, status = false) {
      this.$loading.show()
      this.$axios.get($url).then((res) => {
        this.success        = true
        this.table          = true
        this.user_test_data = res.data.data.data;
        if (res.data.next_page_url !== null) {
          this.next_page_url = res.data.data.next_page_url
          this.links         = res.data.data.links
        }
        // this.$loading.hide();
      }).catch((error) => {
        this.has_error = true
      }).finally(() => {
        this.$loading.hide();
      });
    },
    paginationReferal($url, status = false) {
      this.$loading.show()
      this.$axios.get($url).then((response) => {
        this.success  = true
        this.referals = response.data.data.data.data;
        if (response.data.data.data.next_page_url !== null) {
          this.next_referal_page_url = response.data.data.data.next_page_url
          this.links_referal         = response.data.data.data.links
        }
      }).catch((error) => {
        this.has_error = true
      }).finally(() => {
        this.$loading.hide();
      });
    },
    getUserInfoTests() {
      this.$axios.get('user/user-info/' + this.user_id).then((res) => {
        this.user_info = res.data.data;
        this.info      = true;
      });

    },
    userPasswordChange() {
      Swal.fire({
        title              : 'Yangi parolni yozing',
        input              : 'text',
        inputAttributes    : {
          autocapitalize: 'off'
        },
        showCancelButton   : true,
        confirmButtonText  : 'Yangilash',
        cancelButtonText   : 'Bekor qilish',
        showLoaderOnConfirm: true,
        preConfirm         : (password) => {
          return this.$axios.post('user/password-change', {
            user_id : this.user_id,
            password: password
          });
        },
        allowOutsideClick  : () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          this.SwalMixin(result.value.data.data.message, 'success')
        }
      })

    },
    cryptoAdd() {
      Swal.fire({
        title              : "Crypto qo'shish",
        text               : "Qo'shiladigan cryptoni yozing",
        input              : 'number',
        inputAttributes    : {
          autocapitalize: 'off'
        },
        showCancelButton   : true,
        confirmButtonText  : "Qo'shish",
        cancelButtonText   : 'Bekor qilish',
        showLoaderOnConfirm: true,
        preConfirm         : (crypto) => {
          return this.$axios.post('user/crypto-change', {
            user_id: parseInt(this.user_id),
            crypto : parseInt(crypto)
          });
        },
        allowOutsideClick  : () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          this.SwalMixin(result.value.data.data.message, 'success')
          this.getUserInfo()
        }
      })

    },
    ratingAdd() {
      Swal.fire({
        title              : "Ball qo'shish",
        html               :
          '<input class="swal2-input" id="rating-number" placeholder="Qo`shiladigan ballni yozing" type="number" style=" width: 80%; ">' +
          '<label for="rating-checkbox" class="swal2-checkbox" style="display: flex;">' +
          '<input type="checkbox" value="1" id="rating-checkbox">' +
          '<span class="swal2-label">Chempionat baliga ham qo`shilsin</span>' +
          '</label>',
        showCancelButton   : true,
        confirmButtonText  : "Qo'shish",
        cancelButtonText   : 'Bekor qilish',
        showLoaderOnConfirm: true,
        preConfirm         : () => {
          return this.$axios.post('user/rating-change', {
            user_id : parseInt(this.user_id),
            rating  : parseInt(document.getElementById('rating-number').value),
            checkbox: document.getElementById('rating-checkbox').checked
          });
        },
        allowOutsideClick  : () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          this.SwalMixin(result.value.data.data.message, 'success')
          this.getUserInfo()
        }
      });
    },
    async statusUpdate() {
      const userStatus = await this.$axios.get('user/getStatusAll');
      Swal.fire({
        title              : "Statusni tanlang",
        text               : "Qo'shiladigan cryptoni yozing",
        input              : 'select',
        inputOptions       : userStatus.data.data,
        inputPlaceholder   : 'Statusni tanlang',
        showCancelButton   : true,
        confirmButtonText  : "Qo'shish",
        cancelButtonText   : 'Bekor qilish',
        showLoaderOnConfirm: true,
        preConfirm         : (status) => {
          return this.$axios.post('user/status-change', {
            user_id  : parseInt(this.user_id),
            status_id: parseInt(status)
          });
        },
        allowOutsideClick  : () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          this.SwalMixin(result.value.data.data.message, 'success')
          this.getUserInfo()
        }
      })

    },
    getCharts(e) {
      if (e) {
        e.preventDefault();
      }
      this.$loading.show()
      this.chart       = false;
      this.chart_ready = false;
      this.chart_pie   = false;
      this.chard_data  = {
        pie : {},
        area: {},
      }
      this.chart       = true;
      this.$axios.get('user/chart/' + this.user_id + '?start_date=' + this.start_date + '&end_date=' + this.end_date).then((res) => {
        let data                     = res.data,
            colors                   = data.colors,
            area                     = data.area,
            pie                      = data.pie;
        this.chard_data.area.options = {
          chart     : {
            height: 300,
            type  : 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke    : {
            curve: 'straight'
          },
          xaxis     : {
            categories: area.categories,
            title     : {
              text: "Sanalar bo'yicicha yechgan testlar statistikasi"
            }
          },
          tooltip   : {
            x: {
              format: 'dd.MM.yyyy'
            },
          },
          colors    : colors,
        };
        this.chard_data.area.series  = [
          {
            name: 'To`g`ri',
            data: area.true_answer
          },
          {
            name: 'Xato',
            data: area.false_answer
          },
          {
            name: 'Premium False',
            data: area.premium_false_answer
          }
        ];
        this.chard_data.pie.series   = pie.series;
        this.chard_data.pie.options  = {
          chart : {
            width: 500,
            type : 'pie',
          },
          labels: ['To`g`ri', 'Xato', 'Premium False'],
          colors: colors,
          title : {
            text: "Test yechish aniqlik darajasi"
          }
        };

        this.chart       = true;
        this.chart_pie   = true;
        this.chart_ready = true;
        this.$loading.hide();
      });
    },
    changeForm(e) {
      e.preventDefault();
      this.getCharts();
      if (this.AdminCheck()) {
        this.getUserTestsesion();
      }
    },
    banUser() {
      Swal.fire({
        title             : "Bu foydalanuvchini banlaysizmi ?",
        html              : `<p>Bu userni banlamoqchimisiz <br>Shundan so'ng bu foydalanuvchi saytga kira olmaydi.</p>`,
        icon              : 'warning',
        showCancelButton  : true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor : '#d33',
        confirmButtonText : "Ha",
        cancelButtonText  : "Yo'q hozir emas"
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.post('user/ban', {
            user_id: this.user_id,
          }).then((response) => {
            this.SwalMixin(response.data.data.message)
            this.getUserInfo()
          }).catch((error) => {
            this.SwalMixin(error.response.data.message, 'error')
          });
        }
      })
    },
  }
}
</script>
<style scoped>
@media (min-width: 1800px) {
  .container {
    max-width: 1800px;
  }
}
</style>
