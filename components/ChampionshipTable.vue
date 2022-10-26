<template>
  <div class="container  card mt-3 mb-4">
    <div class="row text-center">
      <nuxt-link :to="`/`" title="Orqaga" style="width: 15px;"
                 :class="[
                    $ua.isFromPc() !== true ? '':'p-1 m-1', 'col border bg-light'
                ]">
        <img src="~/assets/svg/back.svg" class="max-image" title="Orqaga" style="width: 40px;">
      </nuxt-link>
    </div>
    <div>
      <div class="d-flex bd-highlight">
        <h3 class="pt-2 flex-grow-1 bd-highlight">{{ championship.name }}</h3>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="card mt-1 w-100">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">{{ $t('name') }}</h6>
                <span class="text-secondary">{{ championship.name }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">{{ $t('minimum_ball') }}</h6>
                <span class="text-secondary">{{ championship.ball }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">{{ $t('award_count') }}</h6>
                <span class="text-secondary">{{ $t('award_print', {count: championship.count}) }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">{{ $t('start_time_text') }}</h6>
                <span class="text-secondary">{{ championship.start_time }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">{{ $t('end_time_text') }}</h6>
                <span class="text-secondary">{{ championship.end_time }}</span>
              </li>
            </ul>
            <div class="card-body" v-html="championship.content"></div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card mt-1 w-100" :style="[
                windowWidth ? { 'font-size': '12px' } : '',
            ]">
            <table class="table table-sm">
              <thead class="table-light">
              <tr>
                <th scope="col" width="3%" class="text-center">№</th>
                <th scope="col">{{ $t('full_name') }}</th>
                <th scope="col">{{ $t('ball') }}</th>
                <th scope="col" class="text-center">{{ $t('award') }}</th>
                <th scope="col">{{ $t('status_name') }}</th>
                <th scope="col" v-if="$auth.user.userData.rights > 1">Yechilgan test</th>
                <th scope="col" width="1%" v-if="$auth.user.userData.rights > 1">
                  <i class="bi bi-diagram-3"></i>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(users) in rating_data"
                  :class="[ 'page-item',
                         (users.id === $auth.user.userData.id ? 'current-user animate__animated animate__pulse pulse-current-user' : ''),
                         (users.is_given ? 'top_user' : ''),
                       ]">
                <td class="align-middle text-center">
                  <div class="d-none"></div>
                  #{{ users.number }}
                </td>
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
                </td>
                <td class="align-middle">{{ Math.floor(users.rating) }}</td>
                <td class="align-middle text-center">
              <span class="badge rounded-pill m-1" :class="users.is_given ? 'bg-primary' : 'bg-danger'">
                  {{ users.award }}
              </span>
                </td>
                <td class="align-middle">{{ users.status_name }}</td>
                <td class="align-middle" v-if="$auth.user.userData.rights > 1">{{ users.question }} dona</td>
                <td class="text-center align-middle" v-if="$auth.user.userData.rights > 1">
                  <nuxt-link :to="`/users/${users.id}`" class="btn btn-success btn-sm padingkichkina"><i class="bi bi-eye"></i></nuxt-link>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="container d-flex align-items-center justify-content-center">
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'isAuthenticated',
  props     : ['requestUrl'],
  data() {
    return {
      success      : false,
      windowWidth  : this.windowResponsive(),
      next_page_url: null,
      number       : 0,
      links        : [],
      rating_data  : [],
      i            : 0,
      championship : {
        id        : 0,
        name      : '',
        content   : '',
        start_time: '',
        end_time  : '',
      },
    }
  },
  mounted() {
    this.$loading.show()
    this.HomePage()
    window.onresize = () => {
      this.windowWidth = this.windowResponsive()
    }
  },
  methods: {
    async HomePage() {
      this.$axios.get(this.requestUrl).then((res) => {
        if (res.data.error) {
          this.$router.push(`/rating/championship/all`)
        } else {
          this.success      = true
          this.rating_data  = res.data.data.data;
          this.links        = res.data.data.links
          this.championship = res.data.data.championship;
        }
      }).catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide()
      });
    },
    pagination($url) {
      this.$loading.show()
      this.$axios.get($url).then((res) => {
        this.success     = true
        this.rating_data = res.data.data.data;
        this.links       = res.data.data.links
        window.scrollTo({top: 0, behavior: 'smooth'});
      }).catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide()
      });
    },
  }
}
</script>
<style scoped>
tr.current-user {
  background-color: #dbf1ff;
}

tr.top_user {
  background-color: #F1C40F !important;
  color: #312b11 !important;
}
</style>
