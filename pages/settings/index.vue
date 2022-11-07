<template>
  <div v-if="success === true">
    <div :class="[
                    $ua.isFromPc() !== true ? '':'mt-5 mb-5', 'container card card-body'
                ]">
      <div :class="[
                    $ua.isFromPc() !== true ? 'p-2 fs-5':'p-3 fs-3 mb-3', ' col-md-8 offset-md-2 border text-center mt-2'
                ]">
        <b>Profil sozlamalari</b>
      </div>
      <div class="col-md-10 offset-md-1 border text-center p-3 mb-3 " id="step2">
        <div class="card mb-3 w-100">
          <button type="button" class="m-2 btn btn-primary btn3d" title="Web3 Token Auth" @click="web3Login" :disabled="eth_address_status"
                  v-if="!eth_address_status">
            <svg fill="none" height="33" viewBox="0 0 35 33" width="35" xmlns="http://www.w3.org/2000/svg">
              <g stroke-linecap="round" stroke-linejoin="round" stroke-width=".25">
                <path d="m32.9582 1-13.1341 9.7183 2.4424-5.72731z" fill="#e17726" stroke="#e17726"/>
                <g fill="#e27625" stroke="#e27625">
                  <path d="m2.66296 1 13.01714 9.809-2.3254-5.81802z"/>
                  <path d="m28.2295 23.5335-3.4947 5.3386 7.4829 2.0603 2.1436-7.2823z"/>
                  <path d="m1.27281 23.6501 2.13055 7.2823 7.46994-2.0603-3.48166-5.3386z"/>
                  <path d="m10.4706 14.5149-2.0786 3.1358 7.405.3369-.2469-7.969z"/>
                  <path d="m25.1505 14.5149-5.1575-4.58704-.1688 8.05974 7.4049-.3369z"/>
                  <path d="m10.8733 28.8721 4.4819-2.1639-3.8583-3.0062z"/>
                  <path d="m20.2659 26.7082 4.4689 2.1639-.6105-5.1701z"/>
                </g>
                <path d="m24.7348 28.8721-4.469-2.1639.3638 2.9025-.039 1.231z" fill="#d5bfb2" stroke="#d5bfb2"/>
                <path d="m10.8732 28.8721 4.1572 1.9696-.026-1.231.3508-2.9025z" fill="#d5bfb2" stroke="#d5bfb2"/>
                <path d="m15.1084 21.7842-3.7155-1.0884 2.6243-1.2051z" fill="#233447" stroke="#233447"/>
                <path d="m20.5126 21.7842 1.0913-2.2935 2.6372 1.2051z" fill="#233447" stroke="#233447"/>
                <path d="m10.8733 28.8721.6495-5.3386-4.13117.1167z" fill="#cc6228" stroke="#cc6228"/>
                <path d="m24.0982 23.5335.6366 5.3386 3.4946-5.2219z" fill="#cc6228" stroke="#cc6228"/>
                <path d="m27.2291 17.6507-7.405.3369.6885 3.7966 1.0913-2.2935 2.6372 1.2051z" fill="#cc6228" stroke="#cc6228"/>
                <path d="m11.3929 20.6958 2.6242-1.2051 1.0913 2.2935.6885-3.7966-7.40495-.3369z" fill="#cc6228" stroke="#cc6228"/>
                <path d="m8.392 17.6507 3.1049 6.0513-.1039-3.0062z" fill="#e27525" stroke="#e27525"/>
                <path d="m24.2412 20.6958-.1169 3.0062 3.1049-6.0513z" fill="#e27525" stroke="#e27525"/>
                <path d="m15.797 17.9876-.6886 3.7967.8704 4.4833.1949-5.9087z" fill="#e27525" stroke="#e27525"/>
                <path d="m19.8242 17.9876-.3638 2.3584.1819 5.9216.8704-4.4833z" fill="#e27525" stroke="#e27525"/>
                <path d="m20.5127 21.7842-.8704 4.4834.6236.4406 3.8584-3.0062.1169-3.0062z" fill="#f5841f" stroke="#f5841f"/>
                <path d="m11.3929 20.6958.104 3.0062 3.8583 3.0062.6236-.4406-.8704-4.4834z" fill="#f5841f" stroke="#f5841f"/>
                <path d="m20.5906 30.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026 1.231-4.1572-1.9696 1.4551 1.1921 2.9489 2.0344h5.0536l2.962-2.0344 1.442-1.1921z" fill="#c0ac9d" stroke="#c0ac9d"/>
                <path d="m20.2659 26.7082-.6236-.4406h-3.6635l-.6236.4406-.3508 2.9025.3248-.2851h4.9626l.3378.2851z" fill="#161616" stroke="#161616"/>
                <path d="m33.5168 11.3532 1.1043-5.36447-1.6629-4.98873-12.6923 9.3944 4.8846 4.1205 6.8983 2.0085 1.52-1.7752-.6626-.4795 1.0523-.9588-.8054-.622 1.0523-.8034z" fill="#763e1a" stroke="#763e1a"/>
                <path d="m1 5.98873 1.11724 5.36447-.71451.5313 1.06527.8034-.80545.622 1.05228.9588-.66255.4795 1.51997 1.7752 6.89835-2.0085 4.8846-4.1205-12.69233-9.3944z" fill="#763e1a" stroke="#763e1a"/>
                <path d="m32.0489 16.5234-6.8983-2.0085 2.0786 3.1358-3.1049 6.0513 4.1052-.0519h6.1318z" fill="#f5841f" stroke="#f5841f"/>
                <path d="m10.4705 14.5149-6.89828 2.0085-2.29944 7.1267h6.11883l4.10519.0519-3.10487-6.0513z" fill="#f5841f" stroke="#f5841f"/>
                <path d="m19.8241 17.9876.4417-7.5932 2.0007-5.4034h-8.9119l2.0006 5.4034.4417 7.5932.1689 2.3842.013 5.8958h3.6635l.013-5.8958z" fill="#f5841f" stroke="#f5841f"/>
              </g>
            </svg>
            MetaMaskni ulash
          </button>
          <button type="button" class="m-2 btn btn-danger btn3d" title="Web3 Token Auth" @click="web3LoginDisconnected"
                  v-if="eth_address_status">
            MetaMask akkauntni uzish
          </button>
          <hr class="m-1">
          <telegram-login class="m-1 p-0"
                          v-if="!telegram_status"
                          radius="4"
                          mode="callback"
                          telegram-login="questa_bot"
                          @callback="telegramLogin"/>
          <button type="button" class="m-2 btn btn-danger btn3d" title="Web3 Token Auth" @click="telegramLoginDisconnected"
                  v-if="telegram_status">
            Telegram akkauntni uzish
          </button>
          <hr class="m-1">
          <button class="m-2 btn btn-primary btn3d" @click="introClear">
            Introni tozalash
          </button>
        </div>
        <form @submit.prevent="Save" method="post">
          <div class="form-floating mb-3">
            <input type="text" class="form-control " maxlength="20" minlength="2" v-model="familiya"
                   required placeholder="Familiyangiz">
            <label>Familiyangiz</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control " maxlength="20" minlength="2" v-model="ism" required
                   placeholder="Ismingiz">
            <label>Ismingiz</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control " maxlength="20" minlength="2" v-model="ota"
                   placeholder="" required>
            <label>Otangizning ismi</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control " maxlength="20" minlength="2" v-model="email"
                   disabled placeholder="Elektron pochtangiz">
            <label>Elektron pochtangiz</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control " v-model="phone" placeholder="Telefon raqamingiz ">
            <label>Telefon raqamingiz </label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control " v-model="webmoney"
                   placeholder="Webmoney hamyoningiz (Pul yechib olishda kerak)">
            <label>Webmoney hamyon</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control " v-model="qiwi"
                   placeholder="Qiwi hamyoningiz (Qiwi yechib olishda kerak)">
            <label>Qiwi hamyon</label>
          </div>
          <div v-if="$ua.isFromPc() !== true">
            <div class="form-floating mb-3">
              <input type="number" class="form-control" v-model="sana" placeholder="Tug'ulgan sana"
                     min="1" max="31" title="Tugilgan sana 1 dan 31 gacha raqam"
                     oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                     maxlength="2" required>
              <label>Tug'ilgan sanangiz</label>
            </div>
            <select v-model="oy" id="oy" class="form-select mb-3" required>
              <option value="">Tug'ilgan oyingiz</option>
              <option value="Yanvar">Yanvar</option>
              <option value="Fevral">Fevral</option>
              <option value="Mart">Mart</option>
              <option value="Aprel">Aprel</option>
              <option value="May">May</option>
              <option value="Iyun">Iyun</option>
              <option value="Iyul">Iyul</option>
              <option value="Avgust">Avgust</option>
              <option value="Sentabr">Sentabr</option>
              <option value="Oktabr">Oktabr</option>
              <option value="Noyabr">Noyabr</option>
              <option value="Dekabr">Dekabr</option>
            </select>
            <div class="form-floating mb-3">
              <input type="number" class="form-control" v-model="yil" placeholder="Tug'ilgan yil" title="Tug`ilgan yil 1975dan 2006gacha" min="1975" max="2006"
                     oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="4" required>
              <label>Tug'ilgan yilingiz</label>
            </div>
          </div>
          <div class="input-group mb-3" v-else>
            <div class="form-floating col-2">
              <input type="number" class="form-control" v-model="sana" placeholder="Tug'ulgan sana"
                     min="1" max="31" title="Tugilgan sana 1 dan 31 gacha raqam"
                     oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                     maxlength="2" required>
              <label>Tug'ulgan sana</label>
            </div>
            <select v-model="oy" id="oy" class="form-select" required>
              <option value="">-------------</option>
              <option value="Yanvar">Yanvar</option>
              <option value="Fevral">Fevral</option>
              <option value="Mart">Mart</option>
              <option value="Aprel">Aprel</option>
              <option value="May">May</option>
              <option value="Iyun">Iyun</option>
              <option value="Iyul">Iyul</option>
              <option value="Avgust">Avgust</option>
              <option value="Sentabr">Sentabr</option>
              <option value="Oktabr">Oktabr</option>
              <option value="Noyabr">Noyabr</option>
              <option value="Dekabr">Dekabr</option>
            </select>
            <div class="form-floating col-2">
              <input type="number" class="form-control" v-model="yil" placeholder="Tug'ulgan yil" title="Tug`ilgan yil 1975dan 2006gacha" min="1975" max="2006"
                     oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="4" required>
              <label>Tug'ulgan yil</label>
            </div>
          </div>
          <button :class="[
                    $ua.isFromPc() !== true ? 'w-50':'w-75', 'btn btn-primary btn3d'
                ]">
            Saqlash
          </button>
          <nuxt-link :to="`/`" title="Orqaga" class="btn btn-info text-white btn3d">
            Orqaga
          </nuxt-link>
        </form>
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
      title: "Sozlamalar bo'limi",
    }
  },
  data() {
    return {
      userData          : [],
      user_id           : '',
      ref_link          : 'https://questa.uz/ref_id/',
      familiya          : null,
      xabarmatni        : null,
      ism               : null,
      ota               : null,
      email             : null,
      phone             : null,
      webmoney          : null,
      qiwi              : null,
      sana              : null,
      oy                : '',
      yil               : null,
      success           : false,
      intro_settings    : false,
      page_name         : 'settings',
      eth_address_status: false,
      telegram_status   : false,
    }
  },
  async mounted() {
    this.$loading.show()
    await this.Settings()

    this.intro_settings = localStorage.getItem('intro_settings');

    this.intro_home = localStorage.getItem('intro_' + this.page_name)
    if (this.intro_home === null) {
      localStorage.setItem('intro_' + this.page_name, false);
    }
    await this.introStartMethods()
  },
  methods: {
    async introStartMethods() {
      this.intro_settings = localStorage.getItem('intro_' + this.page_name)
      if (this.intro_settings === 'false') {
        let intro_check = await this.introCheck(this.page_name);
        setTimeout(() => {
          (intro_check === false) ? this.introJsFunction() : localStorage.setItem('intro_' + this.page_name, true);
        }, 1000);
      } else {
        let intro_check_name = localStorage.getItem('intro_check_' + this.page_name);
        if (intro_check_name === 'false') {
          await this.introUpdate(this.page_name, true);
        }
      }
    },
    async Settings() {
      await this.$axios.get('auth/user').then((req) => {
        const response          = req.data;
        this.familiya           = response.userData.last_name
        this.ism                = response.userData.name
        this.ota                = response.userData.ota
        this.email              = response.userData.email
        this.email              = response.userData.email
        this.phone              = response.userData.phone
        this.webmoney           = response.userData.webmoney
        this.qiwi               = response.userData.qiwi
        this.eth_address_status = response.userData.eth_address
        this.telegram_status    = response.userData.telegram
        this.user_id            = response.userData.id
        this.ref_link           = this.ref_link + this.user_id
        this.success            = true
      }).catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide()
      });
    },
    Save() {
      this.$loading.show()
      this.$axios.post('user/save', {
        familiya: this.familiya,
        ism     : this.ism,
        ota     : this.ota,
        phone   : this.phone,
        webmoney: this.webmoney,
        qiwi    : this.qiwi,
        sana    : this.sana,
        oy      : this.oy,
        yil     : this.yil,
      }).then((res) => {
        this.SwalMixin(res.data.message)
      }).catch((error) => {
        this.has_error = true
        this.SwalMixin('Qandaydur nomalum xatolik sahifani yangilang', 'error')
        window.location.reload()
      }).finally(() => {
        this.$loading.hide()
      });
    },
    introJsFunction() {
      setTimeout(function () {
        const intro = introJs();
        intro.setOptions({
          steps: [
            // {
            //   element: '#step1',
            //   intro: "Profil rasmingiz. Bu umumiy reyting va boshqa joylarda sizning asosiy rasmingiz sifatida ko`rinadi. Rasm yuklamoqchi bo`lsangiz rasm ustiga bosing."
            // },
            {
              element: '#step2',
              intro  : "Kerakli maydonlarning hammasini to`ldiring va <b>Saqlash</b> tugmasini bosing."
            },
            {
              intro: "Hamma tushuntirishlarni koʻrib chiqqaningizdan xursandmiz. Endi esa bosh sahifaga qayting, testni boshlang, zavq oling va mukofotlarga ega bo'ling!"
            },
          ]
        });
        intro.start().oncomplete(function () {
          localStorage.setItem('intro_settings', 'true');
          window.location.href = '/';
        });
      }, 100);
    },
    async web3Login() {
      if (!window.ethereum) {
        Swal.fire({
          icon  : 'error',
          title : 'Oops...',
          text  : 'MetaMask aniqlanmadi. Iltimos, avval MetaMask-ni o\'rnating.',
          footer: '<a href="https://metamask.io/" target="_blank">Metamask saytiga kirish</a>'
        })
        return;
      }
      this.$loading.show()
      const provider    = new ethers.providers.Web3Provider(window.ethereum);
      let response      = await this.$axios.get('/auth/web3/login');
      this.sign_message = response.data.data;
      await provider.send("eth_requestAccounts", []);
      const address   = await provider.getSigner().getAddress();
      const signature = await provider.getSigner().signMessage(this.sign_message);
      this.$axios.post('user/web3/save', {
        address     : address,
        signature   : signature,
        sign_message: this.sign_message
      }).then((res) => {
        this.SwalMixin(res.data.data.message)
        this.Settings()
      }).finally(() => {
        this.$loading.hide()
      });
    },
    async telegramLogin(user) {
      this.$loading.show()
      this.$axios.post('user/telegram/save', {
        auth_date : user.auth_date,
        hash      : user.hash,
        id        : user.id,
        first_name: user.first_name,
        last_name : user.last_name,
        photo_url : user.photo_url,
        username  : user.username,
      }).then((res) => {
        this.SwalMixin(res.data.data.message)
        this.Settings()
      }).finally(() => {
        this.$loading.hide()
      });
    },
    web3LoginDisconnected() {
      this.$loading.show()
      this.$axios.get('user/web3/disconnected').then((res) => {
        this.SwalMixin(res.data.data.message)
        this.Settings()
      }).finally(() => {
        this.$loading.hide()
      });
    },
    telegramLoginDisconnected() {
      this.$loading.show()
      this.$axios.get('user/telegram/disconnected').then((res) => {
        this.SwalMixin(res.data.data.message)
        this.Settings()
      }).finally(() => {
        this.$loading.hide()
      });
    },
    introClear() {
      this.$loading.show()
      this.$axios.post('intro/clear').then((res) => {
        this.SwalMixin(res.data.data.message)
        localStorage.removeItem("intro_check_home");
        localStorage.removeItem("intro_check_test");
        localStorage.removeItem("intro_check_exchange");
        localStorage.removeItem("intro_check_settings");

        localStorage.removeItem("intro_home");
        localStorage.removeItem("intro_test");
        localStorage.removeItem("intro_exchange");
        localStorage.removeItem("intro_settings");

        setTimeout(function () {
          window.location.href = '/';
        }, 1000);
      }).finally(() => {
        this.$loading.hide()
      });
    },
  }
}
</script>
