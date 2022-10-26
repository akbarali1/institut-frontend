<template>
  <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
    <div class="card animate__animated animate__fadeInDown" style="min-width: 300px;">
      <div class=" card-body">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
              Kirish
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <nuxt-link :to="`/auth/register`" class="nav-link p-2">
              Ro'yhatdan o'tish
            </nuxt-link>
          </li>
          <!--          <li class="nav-item" role="presentation">-->
          <!--            <nuxt-link :to="`/demo`" class="nav-link p-2">-->
          <!--              Demo test-->
          <!--            </nuxt-link>-->
          <!--          </li>-->
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <h1 class="text-center mb-4"></h1>
            <div class="alert alert-danger" v-if="error !== null">
              <span>{{ error }}</span>
            </div>
          </div>
          <form autocomplete="off" @submit.prevent="login" method="post">
            <div class="form-floating mb-3">
              <input type="email" id="email" name="email" v-model="email" class="form-control" placeholder="email" autofocus
                     required autocomplete="off">
              <label for="email">
                Elektron Pochta
              </label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" id="password" name="password" v-model="password" class="form-control" placeholder="password" required>
              <label for="password">
                Parol
              </label>
            </div>
            <button type="submit" class="btn btn-primary btn3d w-100">
              Kirish
            </button>
            <div class="sl-login-divider">
              <span class="sl-login-divider__line"></span>
              <span class="sl-login-divider__name">yoki</span>
              <span class="sl-login-divider__line"></span>
            </div>
            <div class="text-center">
              <button type="button" class="btn btn-block mx-1" style="background: rgb(10, 88, 202); color: white;padding: 1px;margin: auto;" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="33" class="" fill="currentColor" style="padding: 9px;">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                </svg>
              </button>
              <button type="button" class="btn btn-block mx-1" style="background: #d9392b; color: white;padding: 1px;margin: auto;" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="33" fill="currentColor" style="padding: 9px;">
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                </svg>
              </button>
              <!--              <button type="button" class="btn btn-link btn-floating mx-1 " title="Web3 Token Auth" @click="web3Login" style="padding: 0">-->
              <!--                <svg fill="none" height="33" viewBox="0 0 35 33" width="35" xmlns="http://www.w3.org/2000/svg">-->
              <!--                  <g stroke-linecap="round" stroke-linejoin="round" stroke-width=".25">-->
              <!--                    <path d="m32.9582 1-13.1341 9.7183 2.4424-5.72731z" fill="#e17726" stroke="#e17726"/>-->
              <!--                    <g fill="#e27625" stroke="#e27625">-->
              <!--                      <path d="m2.66296 1 13.01714 9.809-2.3254-5.81802z"/>-->
              <!--                      <path d="m28.2295 23.5335-3.4947 5.3386 7.4829 2.0603 2.1436-7.2823z"/>-->
              <!--                      <path d="m1.27281 23.6501 2.13055 7.2823 7.46994-2.0603-3.48166-5.3386z"/>-->
              <!--                      <path d="m10.4706 14.5149-2.0786 3.1358 7.405.3369-.2469-7.969z"/>-->
              <!--                      <path d="m25.1505 14.5149-5.1575-4.58704-.1688 8.05974 7.4049-.3369z"/>-->
              <!--                      <path d="m10.8733 28.8721 4.4819-2.1639-3.8583-3.0062z"/>-->
              <!--                      <path d="m20.2659 26.7082 4.4689 2.1639-.6105-5.1701z"/>-->
              <!--                    </g>-->
              <!--                    <path d="m24.7348 28.8721-4.469-2.1639.3638 2.9025-.039 1.231z" fill="#d5bfb2" stroke="#d5bfb2"/>-->
              <!--                    <path d="m10.8732 28.8721 4.1572 1.9696-.026-1.231.3508-2.9025z" fill="#d5bfb2" stroke="#d5bfb2"/>-->
              <!--                    <path d="m15.1084 21.7842-3.7155-1.0884 2.6243-1.2051z" fill="#233447" stroke="#233447"/>-->
              <!--                    <path d="m20.5126 21.7842 1.0913-2.2935 2.6372 1.2051z" fill="#233447" stroke="#233447"/>-->
              <!--                    <path d="m10.8733 28.8721.6495-5.3386-4.13117.1167z" fill="#cc6228" stroke="#cc6228"/>-->
              <!--                    <path d="m24.0982 23.5335.6366 5.3386 3.4946-5.2219z" fill="#cc6228" stroke="#cc6228"/>-->
              <!--                    <path d="m27.2291 17.6507-7.405.3369.6885 3.7966 1.0913-2.2935 2.6372 1.2051z" fill="#cc6228" stroke="#cc6228"/>-->
              <!--                    <path d="m11.3929 20.6958 2.6242-1.2051 1.0913 2.2935.6885-3.7966-7.40495-.3369z" fill="#cc6228" stroke="#cc6228"/>-->
              <!--                    <path d="m8.392 17.6507 3.1049 6.0513-.1039-3.0062z" fill="#e27525" stroke="#e27525"/>-->
              <!--                    <path d="m24.2412 20.6958-.1169 3.0062 3.1049-6.0513z" fill="#e27525" stroke="#e27525"/>-->
              <!--                    <path d="m15.797 17.9876-.6886 3.7967.8704 4.4833.1949-5.9087z" fill="#e27525" stroke="#e27525"/>-->
              <!--                    <path d="m19.8242 17.9876-.3638 2.3584.1819 5.9216.8704-4.4833z" fill="#e27525" stroke="#e27525"/>-->
              <!--                    <path d="m20.5127 21.7842-.8704 4.4834.6236.4406 3.8584-3.0062.1169-3.0062z" fill="#f5841f" stroke="#f5841f"/>-->
              <!--                    <path d="m11.3929 20.6958.104 3.0062 3.8583 3.0062.6236-.4406-.8704-4.4834z" fill="#f5841f" stroke="#f5841f"/>-->
              <!--                    <path d="m20.5906 30.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026 1.231-4.1572-1.9696 1.4551 1.1921 2.9489 2.0344h5.0536l2.962-2.0344 1.442-1.1921z" fill="#c0ac9d" stroke="#c0ac9d"/>-->
              <!--                    <path d="m20.2659 26.7082-.6236-.4406h-3.6635l-.6236.4406-.3508 2.9025.3248-.2851h4.9626l.3378.2851z" fill="#161616" stroke="#161616"/>-->
              <!--                    <path d="m33.5168 11.3532 1.1043-5.36447-1.6629-4.98873-12.6923 9.3944 4.8846 4.1205 6.8983 2.0085 1.52-1.7752-.6626-.4795 1.0523-.9588-.8054-.622 1.0523-.8034z" fill="#763e1a" stroke="#763e1a"/>-->
              <!--                    <path d="m1 5.98873 1.11724 5.36447-.71451.5313 1.06527.8034-.80545.622 1.05228.9588-.66255.4795 1.51997 1.7752 6.89835-2.0085 4.8846-4.1205-12.69233-9.3944z" fill="#763e1a" stroke="#763e1a"/>-->
              <!--                    <path d="m32.0489 16.5234-6.8983-2.0085 2.0786 3.1358-3.1049 6.0513 4.1052-.0519h6.1318z" fill="#f5841f" stroke="#f5841f"/>-->
              <!--                    <path d="m10.4705 14.5149-6.89828 2.0085-2.29944 7.1267h6.11883l4.10519.0519-3.10487-6.0513z" fill="#f5841f" stroke="#f5841f"/>-->
              <!--                    <path d="m19.8241 17.9876.4417-7.5932 2.0007-5.4034h-8.9119l2.0006 5.4034.4417 7.5932.1689 2.3842.013 5.8958h3.6635l.013-5.8958z" fill="#f5841f" stroke="#f5841f"/>-->
              <!--                  </g>-->
              <!--                </svg>-->
              <!--              </button>-->
              <button type="button" class="btn btn-block mx-1" style="background: #000000; color: white;padding: 1px;margin: auto;" disabled>
                <svg version="1.1" fill="currentColor" style="padding: 9px;" width="35" height="33">
                  <path fill-rule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
              </button>
              <button type="button" class="btn btn-block mx-1" style="background: #1c9cea; color: white;padding: 1px;margin: auto;" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="padding: 9px;" width="35" height="33">
                  <path
                    d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </button>
              <hr>
              <telegram-login class="p-0 m-0" radius="4" mode="callback" telegram-login="questa_bot" @callback="telegramLogin"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";

export default {
  middleware: 'isGuest',
  layout    : 'login',
  head() {
    return {
      title: 'Saytga kirish'
    }
  },
  data() {
    return {
      email       : null,
      password    : null,
      success     : false,
      has_error   : false,
      error       : null,
      sign_message: null,
    }
  },
  mounted() {
    this.$loading.hide()
  },
  methods: {
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
      this.$auth.loginWith('local', {
        data: {
          address     : address,
          signature   : signature,
          sign_message: this.sign_message
        }
      }).then((res) => {
        if (res.data.error) {
          this.SwalMixin(res.data.data, 'error')
        } else if (res.data.access_token) {
          this.routePush('/')
        } else {
          this.SwalMixin(res.data.data, 'error')
        }
      }).finally(() => {
        this.$loading.show()
      })
    },
    login() {
      this.$loading.show()
      var app = this
      this.$auth.loginWith('laravelJWT', {
        data: {
          email      : app.email,
          password   : app.password,
          device_name: 'vue_web_api'
        },
      }).then((response) => {
        if (response.data.error) {
          this.SwalMixin(response.data.error, 'error')
        } else if (response.data.access_token) {
          // this.SwalMixin('Akkauntga muvaffaqiyatli kirdingiz!')
          this.routePush('/')
        } else {
        }
      }).finally(() => {
        this.$loading.hide()
      });
    },
    routePush(route) {
      this.$router.push(route)
    },
    telegramLogin(user) {
      this.$auth.loginWith('telegram', {
        data: {
          auth_date : user.auth_date,
          hash      : user.hash,
          id        : user.id,
          first_name: user.first_name,
          last_name : user.last_name,
          photo_url : user.photo_url,
          username  : user.username,
        }
      }).then((res) => {
        if (res.data.error) {
          this.SwalMixin(res.data.data, 'error')
        } else if (res.data.access_token) {
          this.routePush('/')
        } else {
          this.SwalMixin(res.data.data, 'error')
        }
      });
    }
  }
}
</script>
<style scoped>
.sl-login-divider {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 18px 0 14px;
  width: 100%;
}

.sl-login-divider__line {
  background-color: #ccc;
  height: 1px;
}

.sl-login-divider__line, .sl-login-error {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
}

.sl-login-divider__name {
  color: #ccc;
  font-size: 16px;
  margin: 0 8px;
}
</style>
