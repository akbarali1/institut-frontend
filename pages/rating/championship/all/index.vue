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
      <div class="alert-success p-2 mb-2">
        {{ $t('championship_all') }}
      </div>
      <div class="card mb-3 w-100" v-for="(value, key) in surfing">
        <div class="card-header">
          {{ $t('no_chemipionat', {id: value.id}) }}
        </div>
        <div class="card-body">
          <h5 class="card-title">
            <nuxt-link :to="`/rating/championship/view/${value.id}`" class="text-decoration-none">{{ value.name }}</nuxt-link>
          </h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 class="mb-0">{{ $t('minimum_ball') }}</h6>
              <span class="text-secondary">{{ value.minimum_ball }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 class="mb-0">{{ $t('award_count') }}</h6>
              <span class="text-secondary">{{ $t('award_print', {count: value.count}) }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 class="mb-0">{{ $t('start_time_text') }}</h6>
              <span class="text-secondary">{{ value.start_time }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 class="mb-0">{{ $t('end_time_text') }}</h6>
              <span class="text-secondary">{{ value.end_time }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <p class="card-text" v-html="value.content"></p>
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
      title: "Hamma chempionatlar ro'yhati",
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
    this.$loading.show()
    this.getSurfung()

  },
  methods: {
    async getSurfung() {
      this.$axios.get('/rating/championship/getAll').then((req) => {
        const response = req.data;
        this.success   = true
        this.surfing   = response.data.data
        this.$loading.hide()

      }).catch((error) => {
        alert('Xatolik')
      });
    }
  }
}
</script>
