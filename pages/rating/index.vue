<template>
  <div class="container  card mt-4 mb-4">
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
        <h3 class="p-2 flex-grow-1 bd-highlight">{{ $t('all_rating') }}</h3>
        <div class="p-2 bd-highlight">
          <nuxt-link type="button" :to="`/rating/championship`" class="btn btn-primary btn3d">{{ $t('championship_rating_short') }}</nuxt-link>
        </div>
      </div>
      <div class="card mt-1">
        <table class="table table-sm">
          <thead class="table-light">
          <tr>
            <th scope="col" class="text-center" width="3%">№</th>
            <th scope="col">{{ $t('full_name') }}</th>
            <th scope="col">{{ $t('ball') }}</th>
            <th scope="col">{{ $t('status_name') }}</th>
            <!--            <th scope="col" class="fs-6">Yechilgan test</th>-->
            <th scope="col" width="1%" v-if="$auth.user.userData.rights > 1">
              <i class="bi bi-diagram-3"></i>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(users) in rating_data" :class="[ 'page-item',
                         (users.id === $auth.user.userData.id ? 'current-user animate__animated animate__pulse pulse-current-user' : ''),
                         ]">
            <td class="align-middle text-center">#{{ users.number }}</td>
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
            <td class="align-middle">{{ users.status_name }}</td>
            <!--            <td class="align-middle">{{ users.question }} dona</td>-->
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
                         (item.active === true ? 'active' : ''),
                         ]">
                <button class="page-link" v-html="item.label" @click="pagination(item.url)"></button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  middleware: 'isAuthenticated',
  head() {
    return {
      title: "Foydalanuvchilar reytingi"
    };
  },
  data() {
    return {
      success      : false,
      windowWidth  : this.windowResponsive(),
      next_page_url: null,
      number       : 0,
      links        : [],
      rating_data  : [],
    }
  },
  mounted() {
    this.$loading.show()
    this.getActiveChampionship()
    this.getData()
    window.onresize = () => {
      this.windowWidth = this.windowResponsive()
    }
  },
  methods: {
    async getActiveChampionship() {
      const response = await this.$axios.get(`/championship/active`).catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide();
      });
      if (response.data.active) {
        await this.$router.push(`/rating/championship`)
      }
    },
    async getData() {
      this.$axios.get(`rating/all`).then((res) => {
        this.success     = true
        this.rating_data = res.data.data.data;
        this.links       = res.data.data.links
      }).catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide();
      });
    },
    pagination($url, status = false) {
      this.$loading.show()
      this.$axios.get($url).then((res) => {
        this.success     = true
        this.rating_data = res.data.data.data;
        this.links       = res.data.data.links
        window.scrollTo({top: 0, behavior: 'smooth'});
      }).catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide();
      })
    },
  }
}
</script>
<style scoped>
tr.current-user {
  background-color: #dbf1ff;
}
</style>
