import Vue from 'vue'

Vue.mixin({
  methods: {
    AdminCheck() {
      return (this.$store.getters.getUserInfo.userData.rights > 1);
    },
    windowResponsive() {
      return window.innerWidth < 800;
    }
  }
})
