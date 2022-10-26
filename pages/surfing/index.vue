<template>
  <div class="container card p-2 mt-3">
    <div class="row text-center">
      <nuxt-link :to="`/`" title="Orqaga" style="width: 20px;"
                 :class="[
                    $ua.isFromPc() !== true ? '':'p-2 m-2', 'col border bg-light'
                ]">
        <img src="~/assets/svg/back.svg" class="max-image" title="Orqaga">
      </nuxt-link>
    </div>
    <div>
      <div class="alert-success p-2 fs-6 m-2">
        Bu yerda sizning reklamangiz bo'lishi uchun biz bilan <a href="https://t.me/questauz_online" target="_blank">Telegram</a> orqali bog'laning
      </div>
      <div class="card mb-3 w-100" v-for="(value, key) in surfing">
        <div class="card-header">
          {{ value.name }}
        </div>
        <div class="card-body">
          <h5 class="card-title">
            <nuxt-link :to="`/surfing/view/${value.id}`" class="text-decoration-none" target="_blank">{{ value.name }}</nuxt-link>
            <nuxt-link :to="`/admin/surfing/edit/${value.id}`" class="btn btn-primary btn-sm padingkichkina" v-if="AdminCheck()">
              <i class="bi bi-pencil"></i>
            </nuxt-link>
            <nuxt-link :to="`/surfing/view/${value.id}`" class="btn btn-primary btn-sm padingkichkina" target="_blank">
              <i class="bi bi-eye"></i>
            </nuxt-link>
          </h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="value.money  !== 0">
              <h6 class="mb-0">Beriladigan Crypto</h6>
              <span class="text-secondary"> {{ $t('user_crypto', {crypto: value.money}) }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="value.rating  !== 0">
              <h6 class="mb-0">Beriladigan Reyting</h6>
              <span class="text-secondary"> {{ $t('user_rating', {rating: value.rating}) }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="value.error  !== 0">
              <h6 class="mb-0">Beriladigan Yulduz</h6>
              <span class="text-secondary"> {{ $t('user_star', {star: value.error}) }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap" v-if="value.time  !== 0">
              <h6 class="mb-0">Beriladigan vaqti</h6>
              <span class="text-secondary"> {{ $t('surfing_time', {time: value.time}) }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <p class="card-text" v-html="value.description"></p>
            </li>
          </ul>
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
      title: "Serfing bo'limi",
    };
  },
  data() {
    return {
      success: false,
      error  : false,
      surfing: {
        title      : '',
        description: '',
        image      : '',
        url        : '',
        category   : '',
        tags       : [],
      },

    }
  },
  mounted() {
    this.getSurfung()
  },
  methods: {
    async getSurfung() {
      this.$loading.show()
      this.$axios.get('surfing/all').then((req) => {
        const response = req.data;
        this.success   = true
        this.surfing   = response.data.data
        this.$loading.hide()
      }).catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide()
      });
    }
  }
}
</script>
