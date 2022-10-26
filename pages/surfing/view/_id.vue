<template>
  <div style="margin: 0; display: -webkit-flex; display: flex; -webkit-flex-direction: column; flex-direction: column; overflow: hidden"
       :style="'height:'+height+'px'">
    <iframe id="content_frame" name="content_frame" :src="site_url" width="100%" style="-webkit-flex: auto; flex: 1 0 0;"></iframe>
    <div class=" fs-1 " style=" margin: auto;">
      <div class="p-2 pt-0" v-if="error !==true">
        <span id="timer" style=" font-weight: 900; " class="timer-text" v-if="this.time !== 0"> {{ time }} soniya</span>
        <div v-if="muofot_berildi === false">
          <button class="btn btn-success" v-if="this.time <= 0" @click="sendCheck" :disabled="this.clicked">
            Mukofotni olish
          </button>
        </div>
        <div v-else>
          <div class="alert-success p-1 fs-2" v-text="mukofot_habar"></div>
        </div>
      </div>
      <div v-else class="alert-danger">
        {{ error_message }}
      </div>
    </div>
  </div>
</template>
<script>

export default {
  layout    : 'default',
  middleware: 'isAuthenticated',
  head() {
    return {
      title: this.title,
    };
  },
  data() {
    return {
      id            : this.$route.params.id,
      height        : window.innerHeight,
      site_url      : '',
      name          : '',
      mukofot_habar : '',
      muofot_berildi: false,
      title         : 'Serfing',
      success       : false,
      timer_end     : false,
      time          : 3,
      TimerInterval : '',
      error         : false,
      error_message : '',
      clicked       : false,
    }
  },
  mounted() {
    this.getSurfing()
  },
  beforeDestroy() {
    if (this.TimerInterval) {
      clearInterval(this.TimerInterval);
    }
  },
  methods: {
    async getSurfing() {
      this.$loading.show()
      this.$axios.get(`surfing/view/${this.id}`).then((req) => {
        const surfing = req.data.data;
        if (req.data.error === true) {
          window.close()
        } else {
          this.site_url  = surfing.site_url
          this.time      = surfing.time
          this.title     = surfing.name
          this.timer_end = true;
          this.success   = true;
          this.countDownTimer()
        }
      }).catch((error) => {
        window.close()
      }).finally(() => {
        this.$loading.hide()
      });
    },
    sendCheck() {
      this.clicked = true;
      this.$axios.post('surfing/end', {
        id: this.id
      }).then((response) => {
        if (response.data.success === true) {
          this.title          = 'Sahifa 1 soniyadan so`ng yopiladi';
          this.muofot_berildi = true;
          this.mukofot_habar  = response.data.data.message;
          setInterval(() => {
            window.close()
          }, 1500);
        } else {
          this.SwalMixin(response.data.data.message, 'error')
          this.title = 'Sahifa 5 soniyadan so`ng yopiladi';
          setInterval(() => {
            window.close()
          }, 5000);
        }
      }).catch((error) => {
        this.SwalMixin(error.response.data.message, 'error')
      });
    },
    countDownTimer() {
      this.TimerInterval = setInterval(() => {
        let browser_active = ((typeof document.hasFocus != 'undefined' ? document.hasFocus() : 1) ? 1 : 0);
        if (!browser_active) {
          // this.title = this.time + ' секунд (Пауза)';
        } else {
          // this.title = this.time + ' секунд';
          this.time -= 1
          if (this.time <= 0) {
            this.timer_end = true;
            clearInterval(this.TimerInterval);
          }
        }
      }, 1000);
      this.error         = false
    },
  }
}
</script>
