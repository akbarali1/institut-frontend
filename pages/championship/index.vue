<template>
  <div class="container text-center mt-5" id="testindex">
    <div v-if="championship_check">
      <div class="card card-body mb-3 p-1 w-100" v-if="championship_check === true">
        <h2>Chempionat tugashiga qoldi</h2>
        <no-ssr>
          <flip-countdown :deadline="championship_time" @timeElapsed="timeElapsedHandler"></flip-countdown>
        </no-ssr>
      </div>
      <TestViewTable :getTestUrl="`championship/random`" :checkTestUrl="`championship/check`" :timeElapsedHandlerUrl="`/championship`"/>
    </div>
    <div v-else>
      <div class="card card-body mb-3" v-if="championship_check_off === true">
        <h1>Chempionat boshlanishiga qoldi</h1>
        <no-ssr>
          <flip-countdown :deadline="championship_time" @timeElapsed="timeElapsedHandlerReload"></flip-countdown>
        </no-ssr>
      </div>
    </div>
  </div>
</template>
<script>
import FlipCountdown from 'vue2-flip-countdown'
import Swal from 'sweetalert2'

export default {
  components: {FlipCountdown},
  middleware: 'isAuthenticated',
  head() {
    return {
      title: "Chempionat testlarini yechish",
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
      window.location.href = 'https://t.me/questa_offical'
    },
    timeElapsedHandlerReload() {
      window.location.reload()
    },
    async getActiveChampionship() {
      let response         = await this.$axios.get('championship/getActiveChampionshipEndTime').catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide()
      });
      let championship_var = response.data;
      if (typeof championship_var.success !== 'undefined' && championship_var.success === true) {
        if (championship_var.data.start_time > championship_var.data.day) {
          this.championship_check_off = true
          this.championship_time      = championship_var.data.start_time
        } else {
          this.championship_time  = championship_var.data.end_time
          this.championship_check = true
        }
      } else {
        Swal.fire({
          icon  : 'error',
          title : "Hozirda chemionat mavjud emas!",
          footer: "<a href=\"https://t.me/questa_offical\">Eski chempionatlar haqida Telegram kanalimizda ko'ring</a>"
        }).then((result) => {
          this.$router.push(`/`)
        });
      }
    },
  }
}
</script>
