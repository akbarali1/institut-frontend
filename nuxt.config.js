export default {
  ssr: false, loader: true, // target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title    : 'Questa.uz', meta: [
      {charset: 'utf-8'}, {name: 'viewport', content: 'width=device-width, initial-scale=1'}, {hid: 'description', name: 'description', content: ''}, {name: 'format-detection', content: 'telephone=no'}
    ], link  : [
      {
        rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'
      }, {
        rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.1/font/bootstrap-icons.css'
      }, {rel: 'stylesheet', type: 'text/css', href: 'https://unpkg.com/vue-plyr/dist/vue-plyr.css'}
    ], script: [
      // {
      //   src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js", async: true, crossorigin: "anonymous"
      // },
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js", async: true, crossorigin: "anonymous"
      }, // {
      //   src: "https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js", async: true, crossorigin: "anonymous"
      // },
      {
        src: "https://cdn.ethers.io/lib/ethers-5.2.umd.min.js", async: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css      : [
    '~/assets/css/bootstrap.min.css', '~/assets/css/animate.min.css', '~/assets/css/introjs.min.css', '@/assets/css/overwrite.css'
  ], script: [
    // {src: '~/assets/js/intro.min.js', body: true},
    // {src: '~/assets/js/sw.js', body: true}
  ], // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins  : [
    '~/assets/js/build_notif.js', '~/plugins/toast.js', '~/plugins/introCheck.js', '~/plugins/reload.js', '~/plugins/MoneyFormat.js', '~/plugins/Admin.js', '~/plugins/vue-dialog-loading.js', '@/plugins/nuxt-plyr'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // buildModules: [
  //   '@nuxtjs/google-analytics'
  // ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules : [
    '@nuxtjs/axios', '@nuxtjs/auth-next', '@nuxtjs/dotenv', '@nuxtjs/pwa', 'nuxt-user-agent', [
      '@nuxtjs/i18n', {
        strategy: 'prefix_except_default', defaultLocale: process.env.DEFAULT_LOCALE, locales: [
          {
            code: 'uz', name: "O'zbekcha", file: 'uz.js'
          }
        ], lazy : true, langDir: 'lang/'
      }
    ]
  ], axios: {
    baseURL: process.env.API_URL
  }, pwa  : {
    icon      : true, manifest: {
      name: 'Questa.uz', short_name: 'Questa', lang: process.env.DEFAULT_LOCALE, theme_color: '#ebf1f7', useWebmanifestExtension: false
    }, meta   : {
      name: 'Questa.uz', short_name: 'Questa', lang: process.env.DEFAULT_LOCALE, theme_color: '#ebf1f7', author: 'Questa', description: 'Questa.uz bilimlaringizni tekshiring'
    }, workbox: {
      publicPath: '/_js', importScripts: ['sw_app.js']
    }
  }, auth : {
    strategies: {
      laravelJWT: {
        provider        : 'laravel/jwt',
        url             : process.env.API_URL,
        endpoints       : {
          login: {url: process.env.API_URL + 'auth/login', method: 'post', propertyName: 'token'}, refresh: {url: process.env.API_URL + 'auth/refresh', method: 'post'}, logout: {url: process.env.API_URL + 'auth/logout', method: 'destroy'}, user: {url: 'auth/user', method: 'get'}
        }, token        : {
          property: 'access_token', maxAge: 604800
        }, tokenRequired: true, tokenType: 'Bearer', globalToken: true, refreshToken: {
          maxAge: 604800
        }
      },
      local     : {
        provider        : 'laravel/jwt',
        url             : process.env.API_URL,
        endpoints       : {
          login     : {
            url: process.env.API_URL + 'auth/web3/verify', method: 'post', propertyName: 'token'
          }, refresh: {
            url: process.env.API_URL + 'auth/refresh', method: 'post'
          }, logout : {
            url: process.env.API_URL + 'auth/logout', method: 'destroy'
          }, user   : {url: 'auth/user', method: 'get', propertyName: false}
        }, token        : {
          property: 'access_token', maxAge: 604800
        }, tokenRequired: true, tokenType: 'Bearer', globalToken: true, refreshToken: {
          maxAge: 604800
        }
      },
      telegram  : {
        provider        : 'laravel/jwt',
        url             : process.env.API_URL,
        endpoints       : {
          login     : {
            url         : process.env.API_URL + 'auth/telegram/login',
            method      : 'post',
            propertyName: 'token'
          }, refresh: {
            url   : process.env.API_URL + 'auth/refresh',
            method: 'post'
          }, logout : {
            url: process.env.API_URL + 'auth/logout', method: 'destroy'
          }, user   : {url: 'auth/user', method: 'get', propertyName: false}
        }, token        : {
          property: 'access_token', maxAge: 604800
        }, tokenRequired: true, tokenType: 'Bearer', globalToken: true, refreshToken: {
          maxAge: 604800
        }
      }
    }
  }, // googleAnalytics    : {
  //   id: process.env.GOOGLE_ANALYTICS_ID
  // }, publicRuntimeConfig: {
  //   googleAnalytics: {
  //     id: process.env.GOOGLE_ANALYTICS_ID
  //   }
  // },

  buildDir: 'nuxt-dist', build: {}
}
