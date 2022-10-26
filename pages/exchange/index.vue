<template>
  <div :class="[
                    $ua.isFromPc() !== true ? '':'mt-5 mb-5', 'container card card-body text-center'
                ]">
    <div class="row">
      <nuxt-link :to="`/`" title="Orqaga" style="width: 20px;"
                 :class="[
                    $ua.isFromPc() !== true ? '':'p-2 m-2', 'col border bg-light'
                ]">
        <img src="~/assets/svg/back.svg" class="max-image" title="Orqaga">
      </nuxt-link>
    </div>
    <div class="mt-2" v-if="success === true">
      <div class="row justify-content-center mb-2">
        <div id="step1" :class="[
                    $ua.isFromPc() !== true ? ' p-1 m-1':'fs-2 p-2 m-2', 'col-5 border centered border bg-light rounded-3 '
                ]">
          {{ rating }} ball
        </div>
        <div id="step2" :class="[
                    $ua.isFromPc() !== true ? ' p-1 m-1':'fs-2 p-2 m-2', 'col-5 border centered border bg-light rounded-3 '
                ]">
          {{ money }} crypto
        </div>
      </div>
      <div class=" mt-4 border border-2">
        <div :class="[
                    $ua.isFromPc() !== true ? 'p-1 m-1':'p-3 fs-3 mb-3 mt-2', 'col-md-8 offset-md-2 border centered '
                ]">
          <b v-if="$ua.isFromPc() !== true">
            Xato qilishlar imkoni (<img src="~/assets/svg/star-pro.svg" class="img-fluid" alt="Pro yulduz" title="Pro yulduz" style="width: 25px">)ni sotib olish
          </b>
          <b v-else>
            Xato qilishlar imkoni (<img src="~/assets/svg/star-pro.svg" class="img-fluid" alt="Pro yulduz" title="Pro yulduz">)ni sotib olish
          </b>
        </div>
        <div class="col-md-5 offset-md-3 border centered p-0 mb-3 " id="step3">
          <div v-for="(value) in xatolik" :class="[
                    $ua.isFromPc() !== true ? '':'fs-4', 'row'
                ]">
            <div class="col-7 align-self-center">
              <img src="~/assets/svg/star-pro.svg" class="img-fluid" v-if="$ua.isFromPc() !== true" style="width: 25px" id="starpro">
              <img src="~/assets/svg/star-pro.svg" class="img-fluid" v-else id="starpro">
              x {{ value['dona'] }} = {{ value['narxi'] }} crypto
            </div>
            <div class="col-5">
              <button class="" @click="clickStar(value['dona'])" :class="[
                    $ua.isFromPc() !== true ? 'btn-sm':'', 'btn btn-primary btn3d'
                ]">
                sotib olish
              </button>
            </div>
            <div v-if="value['id'] < '4'">
              <hr class="m-1">
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 border border-2">
        <div :class="[
                    $ua.isFromPc() !== true ? 'p-1 m-1':'p-3 fs-3 mb-3 mt-2', 'col-md-8 offset-md-2 border centered '
                ]">
          <b>Test vaqtini oʻchirish</b>
        </div>
        <div class="col-md-6 offset-md-3 border centered p-3 mb-3" id="step4">
          <div class="" :class="[
                    $ua.isFromPc() !== true ? 'mt-1 mb-1':'mt-3 mb-4', 'input-group ', { 'disabledbutton' : time_block}
                ]">
            <select v-model="time_off_select" :class="[
                    $ua.isFromPc() !== true ? 'btn-sm':'fs-5', 'form-select'
                ]">
              <option value="0">Tanlang...</option>
              <option v-for="(value, key) in testtime_off" :value="key" :key="key">
                {{ key }} soatga {{ value }} crypto
              </option>
            </select>
            <button type="button" @click="clickTimeOff(time_off_select)" :class="[
                    $ua.isFromPc() !== true ? 'btn-sm':'', 'btn btn-primary '
                ]">
              sotib olish
            </button>
          </div>
          <div v-if="time_block" :class="[
                    $ua.isFromPc() !== true ? '':'fs-4', ''
                ]">
            <b>
              Sizda hozirda test vaqti oʻchirish aktivlashtirilgan
            </b>
          </div>
        </div>
      </div>
      <hr>
      <div class="mt-4 border border-2">
        <div :class="[
                    $ua.isFromPc() !== true ? 'p-1 m-1':'p-3 fs-3 mb-3 mt-2', 'col-md-8 offset-md-2 border centered '
                ]">
          <b>{{ $t('start_off_time') }}</b>
        </div>
        <div class="col-md-6 offset-md-3 border centered p-3 mb-3" id="step4">
          <div class="" :class="[
                    $ua.isFromPc() !== true ? 'mt-1 mb-1':'mt-3 mb-4', 'input-group ', { 'disabledbutton' : star_block}
                ]">
            <select v-model="star_off_select" :class="[
                    $ua.isFromPc() !== true ? 'btn-sm':'fs-5', 'form-select'
                ]">
              <option value="0">Tanlang...</option>
              <option v-for="(value, key) in star_time_off" :value="key" :key="key">
                {{ key }} soatga {{ value }} crypto
              </option>
            </select>
            <button type="button" @click="clickStarOff(star_off_select)" :class="[
                    $ua.isFromPc() !== true ? 'btn-sm':'', 'btn btn-primary'
                ]">
              sotib olish
            </button>
          </div>
          <div v-if="star_block" :class="[
                    $ua.isFromPc() !== true ? '':'fs-4', ''
                ]">
            <b>
              Sizda hozirgi vaqtda xatolaringiz hisoblanmayapti
            </b>
          </div>
          <p>{{ $t('start_time_off_info') }}</p>
        </div>
      </div>
      <div class="mt-4 border border-2">
        <div :class="[
                    $ua.isFromPc() !== true ? 'p-1 m-1':'p-3 fs-3 mb-3 mt-2', 'col-md-8 offset-md-2 border centered '
                ]">
          <b>Qoʻshimcha imkoniyatlar</b>
        </div>
        <div class="col-md-6 offset-md-3 border centered p-1 mb-3" id="step5">
          <div class="fs-5 border mb-2"> Ball sotib olish</div>

          <div class="input-group" style=" justify-content: center; align-items: center; ">
            <input type="number" :class="[
                    $ua.isFromPc() !== true ? 'btn-sm col-3':'', 'input-group-text'
                ]" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                   maxLength="5" v-model="ikoniyat_input">
            <span :class="[
                    $ua.isFromPc() !== true ? 'btn-sm':'', 'input-group-text'
                ]">=</span>
            <span :class="[
                    $ua.isFromPc() !== true ? 'btn-sm':'', 'input-group-text'
                ]"> {{ this.MoneyFormat(ikoniyat_input * 0.33) }} crypto</span>
            <button @click="clickBallAdd(ikoniyat_input)" :class="[
                    $ua.isFromPc() !== true ? 'btn-sm':'', 'btn btn-primary'
                ]">
              sotib olish
            </button>
          </div>
        </div>
      </div>
      <div class="mt-4 border border-2">
        <div :class="[
                    $ua.isFromPc() !== true ? 'p-1 m-1':'p-3 fs-3 mb-3 mt-2', 'col-md-8 offset-md-2 border centered disabledbutton'
                ]">
          <b>Aksessuarlar (yaqinda joylanadi, kuting) </b>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import introJs from "intro.js";

export default {
  middleware: 'isAuthenticated',
  head() {
    return {
      title: "Xaridorlar bo'limi",
    };
  },
  data() {
    return {
      xatolik        : [],
      testtime_off   : [],
      star_time_off  : [],
      star_off_select: 0,
      time_off_select: 0,
      money          : 0,
      rating         : 0,
      time_block     : false,
      star_block     : false,
      ikoniyat_input : 0,
      success        : false,
      has_error      : false,
      intro_exchange : false,
      page_name      : 'exchange',
    }
  },
  async mounted() {
    this.$loading.show()
    this.getExchange()
    this.intro_exchange = localStorage.getItem('intro_' + this.page_name)
    if (this.intro_exchange === null) {
      localStorage.setItem('intro_' + this.page_name, false);
    }
    await this.introStartMethods()
  },
  beforeDestroy() {
    if (this.TimerInterval) {
      clearInterval(this.TimerInterval);
    }
  },
  methods: {
    async introStartMethods() {
      this.intro_exchange = localStorage.getItem('intro_' + this.page_name)
      if (this.intro_exchange === 'false') {
        let intro_check = await this.introCheck(this.page_name);
        (intro_check === false) ? this.introJsFunction() : localStorage.setItem('intro_' + this.page_name, true);
      } else {
        let intro_check_name = localStorage.getItem('intro_check_' + this.page_name);
        if (intro_check_name === 'false') {
          this.introUpdate(this.page_name, true);
        }
      }
    },
    async getExchange() {
      this.$axios.get('exchange/get').then((req) => {
        const response     = req.data;
        this.success       = true
        this.xatolik       = response.xatolik
        this.money         = response.money
        this.rating        = response.rating
        this.testtime_off  = response.vaqtni_ochirish
        this.star_time_off = response.stars
        this.time_block    = response.time_block
        this.star_block    = response.star_block
        // if (this.intro_exchange !== 'true') {
        //   this.introJsFunction()
        // }
      }).catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide()
      });
    },
    clickStar(current) {
      this.$loading.show()
      this.$axios.post('exchange/star/buy', {
        number: current,
      }).then((res) => {
        if (res.data.success === true) {
          this.money = res.data.balance_money
          this.SwalMixin(res.data.message)
        } else {
          this.SwalMixin(res.data.message, 'error')
        }
      }).catch((error) => {
        this.has_error = true
        this.SwalMixin('Nomalum qiymat kiritilgan', 'error')
      }).finally(() => {
        this.$loading.hide()
      });
    },
    clickTimeOff(current) {
      this.$axios.post('exchange/time_off/buy', {
        number: current,
      }).then((res) => {
        if (res.data.success === true) {
          this.money      = res.data.balance_money
          this.time_block = true
          this.SwalMixin(res.data.message)
        } else if (res.data.error === true) {
          this.SwalMixin(res.data.message, 'error')
        }
      }).catch((error) => {
        this.has_error = true
        this.SwalMixin('Nomalum qiymat kiritilgan', 'error')
      }).finally(() => {
        this.$loading.hide()
      });
    },
    clickStarOff(current) {
      this.$axios.post('exchange/star_off/buy', {
        number: current,
      }).then((res) => {
        if (res.data.success === true) {
          this.money      = res.data.balance_money
          this.star_block = true
          this.SwalMixin(res.data.message)
        } else if (res.data.error === true) {
          this.SwalMixin(res.data.message, 'error')
        }
      }).catch((error) => {
        this.has_error = true
        this.SwalMixin('Nomalum qiymat kiritilgan', 'error')
      }).finally(() => {
        this.$loading.hide()
      });
    },
    clickBallAdd(ball) {
      this.$axios.post('exchange/ball/buy', {
        number: ball,
      }).then((res) => {
        if (res.data.success === true) {
          this.money  = res.data.balance_money
          this.rating = res.data.balance_rating
          this.SwalMixin(res.data.message)
        } else if (res.data.error === true) {
          this.SwalMixin(res.data.message, 'error')
        }
      }).catch((error) => {
        this.has_error = true
        this.SwalMixin('1 - 10 000 bal olish mumkin', 'error')
      }).finally(() => {
        this.$loading.hide()
      });
    },
    introJsFunction() {
      setTimeout(function () {
        var intro = introJs();
        intro.setOptions({
          steps: [
            {
              element: '#step1',
              intro  : "Jami yigʻgan ballaringiz"
            },
            {
              element: '#step2',
              intro  : "Jami yigʻgan cryptolaringiz"
            },
            {
              element: '#starpro',
              intro  : "Bu sotib olinadigan yulduzcha. Sotib olinadigan yulduzchalar siz kunlik yulduzchalarni foydalanib bo'lganingizdan so'ng, sizga qo'shimcha xato qilish imkonini beradi."
            },
            {
              intro: "Agarda siz yulduzcha sotib olsangiz lekin uni ishlatmasangiz to kunlik yulduzchalar toʻliq tugagunga qadar saqlanib turadi va shundan soʻng ishlatilishni boshlaydi. Bu yulduzcha bosh sahifada alohida koʻrinadi."
            },
            {
              element: '#step3',
              intro  : "Yulduzchalar sotib olish."
            },
            {
              element: '#step4',
              intro  : "Test vaqtini oʻchirib qoʻyish funksiyasi. Buni amalga oshirish uchun siz sotib ushbu funksiyani crypto evaziga faollashtirishingiz kerak. Bunda siz testlarga qo'yilgan vaqtni belgilangan muddatga oʻchirib qoʻyishingiz mumkin"
            },
            {
              element: '#step5',
              intro  : "Qoʻshimcha imkoniyatlar - bunda siz reyting uchun qo'shimcha ball sotib olishingiz mumkin. Bu orqali siz saytning umumiy foydalanuvchilar reytingida yuqori oʻrinda turishingiz va statusingizni koʻtarishingiz mumkin."
            },
            // {
            //   intro: "Hamma tushuntirishlarni koʻrib chiqqaningizdan hursandmiz. Endi esa bosh sahifaga qayting, testni boshlang, zavq oling va mukofotlarga ega bo'ling!"
            // },
          ]
        });
        intro.start().oncomplete(function () {
          localStorage.setItem('intro_exchange', 'true');
          window.location.href = '/settings';
        });
      }, 500);
    },
  }
}
</script>
