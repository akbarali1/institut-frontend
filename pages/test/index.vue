<template>
  <div class="container text-center mt-5" id="testindex">
    <div class="card card-body mb-3 p-1 w-100" v-if="championship_check === true">
      <h2>Chempionat boshlanishiga qoldi</h2>
      <no-ssr>
        <flip-countdown :deadline="championship_time" @timeElapsed="timeElapsedHandler"></flip-countdown>
      </no-ssr>
    </div>
    <TestViewTable :getTestUrl="`question/random`" :checkTestUrl="`question/check`"/>
  </div>
</template>
<script>
import FlipCountdown from 'vue2-flip-countdown'

export default {
  components: {FlipCountdown},
  middleware: 'isAuthenticated',
  head() {
    return {
      title: "Test yechish",
    };
  },
  data() {
    return {
      championship_time : null,
      championship_check: false,
    }
  },
  async mounted() {
    this.$loading.show()
    await this.getActiveChampionship()
  },
  methods: {
    timeElapsedHandler() {
      this.$router.push(`/championship`)
    },
    async getActiveChampionship() {
      let response         = await this.$axios.get('championship/getActiveChampionship').finally(() => {
        this.$loading.hide()
      });
      let championship_var = response.data;
      if (typeof championship_var.success !== 'undefined') {
        if (typeof championship_var.data.message !== 'undefined') {
          await this.$router.push(`/championship`)
        } else {
          this.championship_time  = championship_var.data.start_time
          this.championship_check = true
        }
      }
    },
  }
}
</script>
