export { default as AdminDemoQuestionTable } from '../..\\components\\AdminDemoQuestionTable.vue'
export { default as AdminQuestionTable } from '../..\\components\\AdminQuestionTable.vue'
export { default as AdminTableHeader } from '../..\\components\\AdminTableHeader.vue'
export { default as ChampionshipTable } from '../..\\components\\ChampionshipTable.vue'
export { default as CkeditorNuxt } from '../..\\components\\ckeditorNuxt.vue'
export { default as Footer } from '../..\\components\\Footer.vue'
export { default as Header } from '../..\\components\\Header.vue'
export { default as News } from '../..\\components\\News.vue'
export { default as NuxtLogo } from '../..\\components\\NuxtLogo.vue'
export { default as TelegramLogin } from '../..\\components\\telegram-login.vue'
export { default as TestViewTable } from '../..\\components\\TestViewTable.vue'
export { default as Tutorial } from '../..\\components\\Tutorial.vue'
export { default as UserStatus } from '../..\\components\\user-status.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
