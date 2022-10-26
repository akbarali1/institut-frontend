import Vue from 'vue'

Vue.mixin({
  methods: {
    reloadPage(name1) {
      localStorage.removeItem('laravel-jwt-auth');
      window.setTimeout(function () {
        var reload_page = window.location.href = window.location.href;
      }, name1);
    }
  }
})
