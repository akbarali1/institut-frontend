import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _029bb339 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _15bd2a32 = () => interopDefault(import('..\\pages\\championship\\index.vue' /* webpackChunkName: "pages/championship/index" */))
const _96a4f5ae = () => interopDefault(import('..\\pages\\exchange\\index.vue' /* webpackChunkName: "pages/exchange/index" */))
const _416979ef = () => interopDefault(import('..\\pages\\rating\\index.vue' /* webpackChunkName: "pages/rating/index" */))
const _4cdf64dd = () => interopDefault(import('..\\pages\\referal\\index.vue' /* webpackChunkName: "pages/referal/index" */))
const _f448d1ae = () => interopDefault(import('..\\pages\\settings\\index.vue' /* webpackChunkName: "pages/settings/index" */))
const _0e23fadc = () => interopDefault(import('..\\pages\\surfing\\index.vue' /* webpackChunkName: "pages/surfing/index" */))
const _0dc0345a = () => interopDefault(import('..\\pages\\test\\index.vue' /* webpackChunkName: "pages/test/index" */))
const _1bd6b398 = () => interopDefault(import('..\\pages\\admin\\championship\\index.vue' /* webpackChunkName: "pages/admin/championship/index" */))
const _2f1fcce4 = () => interopDefault(import('..\\pages\\admin\\demotest\\index.vue' /* webpackChunkName: "pages/admin/demotest/index" */))
const _5ea7f874 = () => interopDefault(import('..\\pages\\admin\\news\\index.vue' /* webpackChunkName: "pages/admin/news/index" */))
const _ebc2cd5a = () => interopDefault(import('..\\pages\\admin\\question\\index.vue' /* webpackChunkName: "pages/admin/question/index" */))
const _a6bbb922 = () => interopDefault(import('..\\pages\\admin\\surfing\\index.vue' /* webpackChunkName: "pages/admin/surfing/index" */))
const _47aa56ca = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _4ae78b3e = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _5c4d766a = () => interopDefault(import('..\\pages\\rating\\championship\\index.vue' /* webpackChunkName: "pages/rating/championship/index" */))
const _73157976 = () => interopDefault(import('..\\pages\\rating\\o\\index.vue' /* webpackChunkName: "pages/rating/o/index" */))
const _7ce4f37a = () => interopDefault(import('..\\pages\\rating\\referal\\index.vue' /* webpackChunkName: "pages/rating/referal/index" */))
const _57a96b90 = () => interopDefault(import('..\\pages\\admin\\championship\\create\\index.vue' /* webpackChunkName: "pages/admin/championship/create/index" */))
const _24867e30 = () => interopDefault(import('..\\pages\\admin\\demotest\\create\\index.vue' /* webpackChunkName: "pages/admin/demotest/create/index" */))
const _d1c6146c = () => interopDefault(import('..\\pages\\admin\\news\\create\\index.vue' /* webpackChunkName: "pages/admin/news/create/index" */))
const _bf9ec50a = () => interopDefault(import('..\\pages\\admin\\news\\notification\\index.vue' /* webpackChunkName: "pages/admin/news/notification/index" */))
const _ccf52b6a = () => interopDefault(import('..\\pages\\admin\\question\\audio\\index.vue' /* webpackChunkName: "pages/admin/question/audio/index" */))
const _3cdbae57 = () => interopDefault(import('..\\pages\\admin\\question\\create\\index.vue' /* webpackChunkName: "pages/admin/question/create/index" */))
const _7a604cca = () => interopDefault(import('..\\pages\\admin\\question\\excel\\index.vue' /* webpackChunkName: "pages/admin/question/excel/index" */))
const _0ecc475b = () => interopDefault(import('..\\pages\\admin\\question\\images\\index.vue' /* webpackChunkName: "pages/admin/question/images/index" */))
const _47b15c73 = () => interopDefault(import('..\\pages\\admin\\surfing\\create\\index.vue' /* webpackChunkName: "pages/admin/surfing/create/index" */))
const _7334254a = () => interopDefault(import('..\\pages\\admin\\surfing\\stat\\index.vue' /* webpackChunkName: "pages/admin/surfing/stat/index" */))
const _2a381aa9 = () => interopDefault(import('..\\pages\\rating\\championship\\all\\index.vue' /* webpackChunkName: "pages/rating/championship/all/index" */))
const _5d5b0a7f = () => interopDefault(import('..\\pages\\admin\\news\\notification\\create\\index.vue' /* webpackChunkName: "pages/admin/news/notification/create/index" */))
const _7a83f162 = () => interopDefault(import('..\\pages\\admin\\question\\audio\\create\\index.vue' /* webpackChunkName: "pages/admin/question/audio/create/index" */))
const _2189face = () => interopDefault(import('..\\pages\\admin\\question\\excel\\create\\index.vue' /* webpackChunkName: "pages/admin/question/excel/create/index" */))
const _2bc25742 = () => interopDefault(import('..\\pages\\admin\\question\\images\\create\\index.vue' /* webpackChunkName: "pages/admin/question/images/create/index" */))
const _f9fdf8ce = () => interopDefault(import('..\\pages\\admin\\news\\notification\\edit\\_id.vue' /* webpackChunkName: "pages/admin/news/notification/edit/_id" */))
const _0efa2f2e = () => interopDefault(import('..\\pages\\admin\\question\\audio\\edit\\_id.vue' /* webpackChunkName: "pages/admin/question/audio/edit/_id" */))
const _845ff05c = () => interopDefault(import('..\\pages\\admin\\championship\\edit\\_id.vue' /* webpackChunkName: "pages/admin/championship/edit/_id" */))
const _f5196c66 = () => interopDefault(import('..\\pages\\admin\\demotest\\category-create\\_id.vue' /* webpackChunkName: "pages/admin/demotest/category-create/_id" */))
const _c2ef52fc = () => interopDefault(import('..\\pages\\admin\\demotest\\edit\\_id.vue' /* webpackChunkName: "pages/admin/demotest/edit/_id" */))
const _24fd8847 = () => interopDefault(import('..\\pages\\admin\\demotest\\view\\_id.vue' /* webpackChunkName: "pages/admin/demotest/view/_id" */))
const _c10b6738 = () => interopDefault(import('..\\pages\\admin\\news\\edit\\_id.vue' /* webpackChunkName: "pages/admin/news/edit/_id" */))
const _e945591e = () => interopDefault(import('..\\pages\\admin\\question\\edit\\_id.vue' /* webpackChunkName: "pages/admin/question/edit/_id" */))
const _11d28536 = () => interopDefault(import('..\\pages\\admin\\question\\view\\_id.vue' /* webpackChunkName: "pages/admin/question/view/_id" */))
const _4e966f8d = () => interopDefault(import('..\\pages\\admin\\surfing\\edit\\_id.vue' /* webpackChunkName: "pages/admin/surfing/edit/_id" */))
const _488efecd = () => interopDefault(import('..\\pages\\rating\\championship\\view\\_id.vue' /* webpackChunkName: "pages/rating/championship/view/_id" */))
const _69c9fa3f = () => interopDefault(import('..\\pages\\surfing\\view\\_id.vue' /* webpackChunkName: "pages/surfing/view/_id" */))
const _49ac8fbd = () => interopDefault(import('..\\pages\\ref_id\\_slug.vue' /* webpackChunkName: "pages/ref_id/_slug" */))
const _aea6b570 = () => interopDefault(import('..\\pages\\users\\_id.vue' /* webpackChunkName: "pages/users/_id" */))
const _44be5d2c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _029bb339,
    name: "admin___uz"
  }, {
    path: "/championship",
    component: _15bd2a32,
    name: "championship___uz"
  }, {
    path: "/exchange",
    component: _96a4f5ae,
    name: "exchange___uz"
  }, {
    path: "/rating",
    component: _416979ef,
    name: "rating___uz"
  }, {
    path: "/referal",
    component: _4cdf64dd,
    name: "referal___uz"
  }, {
    path: "/settings",
    component: _f448d1ae,
    name: "settings___uz"
  }, {
    path: "/surfing",
    component: _0e23fadc,
    name: "surfing___uz"
  }, {
    path: "/test",
    component: _0dc0345a,
    name: "test___uz"
  }, {
    path: "/admin/championship",
    component: _1bd6b398,
    name: "admin-championship___uz"
  }, {
    path: "/admin/demotest",
    component: _2f1fcce4,
    name: "admin-demotest___uz"
  }, {
    path: "/admin/news",
    component: _5ea7f874,
    name: "admin-news___uz"
  }, {
    path: "/admin/question",
    component: _ebc2cd5a,
    name: "admin-question___uz"
  }, {
    path: "/admin/surfing",
    component: _a6bbb922,
    name: "admin-surfing___uz"
  }, {
    path: "/auth/login",
    component: _47aa56ca,
    name: "auth-login___uz"
  }, {
    path: "/auth/register",
    component: _4ae78b3e,
    name: "auth-register___uz"
  }, {
    path: "/rating/championship",
    component: _5c4d766a,
    name: "rating-championship___uz"
  }, {
    path: "/rating/o",
    component: _73157976,
    name: "rating-o___uz"
  }, {
    path: "/rating/referal",
    component: _7ce4f37a,
    name: "rating-referal___uz"
  }, {
    path: "/admin/championship/create",
    component: _57a96b90,
    name: "admin-championship-create___uz"
  }, {
    path: "/admin/demotest/create",
    component: _24867e30,
    name: "admin-demotest-create___uz"
  }, {
    path: "/admin/news/create",
    component: _d1c6146c,
    name: "admin-news-create___uz"
  }, {
    path: "/admin/news/notification",
    component: _bf9ec50a,
    name: "admin-news-notification___uz"
  }, {
    path: "/admin/question/audio",
    component: _ccf52b6a,
    name: "admin-question-audio___uz"
  }, {
    path: "/admin/question/create",
    component: _3cdbae57,
    name: "admin-question-create___uz"
  }, {
    path: "/admin/question/excel",
    component: _7a604cca,
    name: "admin-question-excel___uz"
  }, {
    path: "/admin/question/images",
    component: _0ecc475b,
    name: "admin-question-images___uz"
  }, {
    path: "/admin/surfing/create",
    component: _47b15c73,
    name: "admin-surfing-create___uz"
  }, {
    path: "/admin/surfing/stat",
    component: _7334254a,
    name: "admin-surfing-stat___uz"
  }, {
    path: "/rating/championship/all",
    component: _2a381aa9,
    name: "rating-championship-all___uz"
  }, {
    path: "/admin/news/notification/create",
    component: _5d5b0a7f,
    name: "admin-news-notification-create___uz"
  }, {
    path: "/admin/question/audio/create",
    component: _7a83f162,
    name: "admin-question-audio-create___uz"
  }, {
    path: "/admin/question/excel/create",
    component: _2189face,
    name: "admin-question-excel-create___uz"
  }, {
    path: "/admin/question/images/create",
    component: _2bc25742,
    name: "admin-question-images-create___uz"
  }, {
    path: "/admin/news/notification/edit/:id?",
    component: _f9fdf8ce,
    name: "admin-news-notification-edit-id___uz"
  }, {
    path: "/admin/question/audio/edit/:id?",
    component: _0efa2f2e,
    name: "admin-question-audio-edit-id___uz"
  }, {
    path: "/admin/championship/edit/:id?",
    component: _845ff05c,
    name: "admin-championship-edit-id___uz"
  }, {
    path: "/admin/demotest/category-create/:id?",
    component: _f5196c66,
    name: "admin-demotest-category-create-id___uz"
  }, {
    path: "/admin/demotest/edit/:id?",
    component: _c2ef52fc,
    name: "admin-demotest-edit-id___uz"
  }, {
    path: "/admin/demotest/view/:id?",
    component: _24fd8847,
    name: "admin-demotest-view-id___uz"
  }, {
    path: "/admin/news/edit/:id?",
    component: _c10b6738,
    name: "admin-news-edit-id___uz"
  }, {
    path: "/admin/question/edit/:id?",
    component: _e945591e,
    name: "admin-question-edit-id___uz"
  }, {
    path: "/admin/question/view/:id?",
    component: _11d28536,
    name: "admin-question-view-id___uz"
  }, {
    path: "/admin/surfing/edit/:id?",
    component: _4e966f8d,
    name: "admin-surfing-edit-id___uz"
  }, {
    path: "/rating/championship/view/:id?",
    component: _488efecd,
    name: "rating-championship-view-id___uz"
  }, {
    path: "/surfing/view/:id?",
    component: _69c9fa3f,
    name: "surfing-view-id___uz"
  }, {
    path: "/ref_id/:slug?",
    component: _49ac8fbd,
    name: "ref_id-slug___uz"
  }, {
    path: "/users/:id?",
    component: _aea6b570,
    name: "users-id___uz"
  }, {
    path: "/",
    component: _44be5d2c,
    name: "index___uz"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
