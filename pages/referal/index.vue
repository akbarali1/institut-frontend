<template>
  <div>
    <div class="mt-5 mb-5 card container">
      <div class="row text-center">
        <nuxt-link :to="`/`" title="Orqaga" style="width: 20px;"
                   :class="[
                    $ua.isFromPc() !== true ? '':'p-2 m-2', 'col border bg-light'
                ]">
          <img src="~/assets/svg/back.svg" class="max-image" title="Orqaga" alt="back">
        </nuxt-link>
      </div>
      <div class="p-2 fs-5 border text-center mt-2">
        <b>Referallar ro'yhati</b>
      </div>
      <div class="border p-2 mb-3 " id="step2">
        <div class="card card-body mb-3">
          <p>Bu yerda siz do'stlaringizni taklif qilish orqali qo`shimcha ballar olishingiz mumkin.</p>
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="ref_link" readonly id="ref_link">
            <button class="btn btn-primary" type="button" id="button-addon2" @click="refLinkCopy()" v-html="icons_copy"></button>
          </div>
        </div>

        <div class="card mt-1">
          <table class="table table-sm">
            <thead class="table-light">
            <tr>
              <th scope="col" class="text-center" width="3%">№</th>
              <th scope="col" width="3%">ID</th>
              <th scope="col">{{ $t('full_name') }}</th>
              <th scope="col">{{ $t('created_at') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(users, index) in referals" :class="[ 'page-item',
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
                {{ users.data }}
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
  </div>
</template>
<script>
import introJs from "intro.js";
import Swal from "sweetalert2";

export default {
  middleware: 'isAuthenticated',
  head() {
    return {
      title: "Mening referallarim",
    }
  },
  data() {
    return {
      referals        : [],
      user_id         : '',
      ref_link        : 'https://questa.uz/ref_id/',
      icons_copy      : '',
      icons_copy_false: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"> <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/> <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/> </svg>',
      icons_copy_true : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">\n' +
        '  <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>\n' +
        '  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>\n' +
        '  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>\n' +
        '</svg>',
      date_of_birth   : {
        "oy"  : "",
        "yil" : "",
        "sana": ""
      },
      success         : false,
      links           : [],
      page_name       : 'referal',
    }
  },
  async mounted() {
    this.user_id    = this.$store.$auth.$state.user.userData.id;
    this.ref_link   = this.ref_link + this.user_id;
    this.icons_copy = this.icons_copy_false;
    await this.getReferals()
  },
  methods: {
    async getReferals() {
      this.$axios.get('user/referal').then((res) => {
        this.referals = res.data.data.data.data;
        // console.log(this.referals)
        this.links    = res.data.data.data.links
        this.success  = true
      }).catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide()
      });
    },
    refLinkCopy() {
      const copyText = document.getElementById("ref_link");
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      navigator.clipboard.writeText(copyText.value);
      this.icons_copy = this.icons_copy_true;
      this.SwalMixin('Referal havola buferga saqlandi');
      setTimeout(() => {
        this.icons_copy = this.icons_copy_false;
      }, 3000);
    },
    pagination($url) {
      this.$loading.show()
      this.$axios.get($url).then((res) => {
        this.success  = true
        this.referals = res.data.data.data.data;
        this.links    = res.data.data.data.links
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
