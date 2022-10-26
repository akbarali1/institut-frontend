import Vue from 'vue'

Vue.mixin({
  methods: {
    introCheck(page) {
      return this.$axios.$get('intro/check?page=' + page).then((data_introCheck) => {
        // if (intro_check === false) {
        if (data_introCheck.status !== false) {
          localStorage.setItem('intro_check_' + page, true);
        } else {
          localStorage.setItem('intro_check_' + page, false);
        }
        return data_introCheck.status
      }).catch((error) => {
        localStorage.setItem('intro_check_' + page, false);
        return error;
      })
    },
    introUpdate(page, status) {
      return this.$axios.$post('intro/update', {
        page: page,
        status: status
      }).then((data_introUpdate) => {
        if (data_introUpdate.status !== true) {
          localStorage.setItem('intro_check_' + page, false);
        } else {
          localStorage.setItem('intro_check_' + page, true);
        }
        return data_introUpdate.status
      }).catch((error) => {
        localStorage.setItem('intro_check_' + page, false);
        return error;
      })
    }
  }
})
