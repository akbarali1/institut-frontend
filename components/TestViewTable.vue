<template>
  <div id="cardCenter">
    <!--  <div style=" background-color: rgb(250 250 250 / 70%);  margin-top: 10rem !important; ">-->
    <div v-if="has_error === true" class="card w-100 animate__animated animate__bounceIn">
      <div class="card-body">
        <h3>
          <div class="alert fs-5 text-center" :class="class_test" v-html="test_text"></div>
        </h3>
        <nuxt-link :to="`/`" class="btn btn-success fs-3 pt-2 mb-2 text-center">
          Bosh sahifaga qaytish
        </nuxt-link>
      </div>
    </div>
    <!--    <div v-if="success === true" class=" card-body">-->
    <div v-if="success === true" class="card card-body" :class="ads_image !== false ? 'mb-3' : '' " id="cardRemoveClass">
      <div :class="{'animate__animated animate__bounceInDown': animated}">
          <span id="starpro">
            <img src="~/assets/svg/star-pro.svg" alt="pro yulduz" class="img-fluid p-1 " v-for="(value, index) in stars_pro" :title="index+' pro yulduz'">
          </span>
        <span id="star">
            <img src="~/assets/svg/star.svg" alt="1 - yulduz" title="oddiy yulduz" class="img-fluid p-1 " v-for="(value, index) in stars" :title="index+' yulduz'">
          </span>
      </div>
      <hr>
      <div :class="[
                    $ua.isFromPc() !== true ? 'p-2':'fs-4', 'alert alert-success '
                ]" v-if="timeof === true">
        {{ $t('time_off_true') }}
      </div>
      <div :class="[
                    $ua.isFromPc() !== true ? 'p-2':'fs-4', 'alert alert-success '
                ]" v-if="starof === true">
        {{ $t('star_off_true') }}
      </div>
      <div class="row" v-if="$ua.isFromPc() !== true" :class="{'animate__animated animate__zoomIn': animated}">
        <div class="col-12 pb-2">
          <div class="position-relative">
            <div class="position-absolute top-0 end-0">
              <button class="btn btn-outline-primary btn-sm ms-4" @click="bugTestSend" style=" border-color: #ffffff; ">
                <img src="~/assets/svg/bug.svg" alt="bug" title="Xatolik xaqida xabar berish" class="p-0" style="width: 20px;">
              </button>
            </div>
          </div>
          <div class="rounded border border-secondary p-2" id="step2">
            <div v-if="question_photo !== false  && question_photo !== ''">
              <img :src="question_photo" style="width: 250px; display: block; margin-left: auto; margin-right: auto;pointer-events: none;" class="rounded" alt="img">
              <hr>
            </div>
            <div v-if="question_audio !== false && question_audio !== ''" style="width: 100%; display: block; margin-left: auto; margin-right: auto;">
              <vue-plyr>
                <audio>
                  <source :src="question_audio" type="audio/mp3"/>
                </audio>
              </vue-plyr>
              <hr>
            </div>
            <div v-if="question_video !== false && question_video !== ''" style="width: 100%; display: block; margin-left: auto; margin-right: auto;">
              <vue-plyr>
                <video :poster="video_image" :src="question_video">
                  <track v-if="video_subtitles"
                         kind="captions"
                         :label="subtitle_name"
                         :srclang="subtitle_code"
                         :src="video_subtitles"
                         default
                  />
                </video>
              </vue-plyr>
              <hr>
            </div>
            {{ question.question }}
          </div>
        </div>
        <div class="col-6 border-secondary">
          <div class="rounded border border-secondary p-2" data-bs-toggle="tooltip"
               data-bs-placement="top" title="" id="step1"
               data-bs-original-title="Jami va qo`shiladigan ball">
            {{ user_rating }} + {{ test_rating }}
          </div>
        </div>
        <div class="col-6 border-secondary">
          <div class="rounded border border-secondary p-2" data-bs-toggle="tooltip"
               data-bs-placement="top" title=""
               data-bs-original-title="Jami va qo`shiladigan crypto">
            {{ user_money }} + {{ test_money }}
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-sm-2 border-secondary">
          <div class="rounded border border-secondary fs-5 p-3" :class="{'animate__animated animate__backInLeft': animated}" id="step1">
            {{ user_rating }} + {{ test_rating }}
          </div>
        </div>
        <div class="col" :class="{'animate__animated animate__zoomIn': animated}">
          <div class="position-relative">
            <div class="position-absolute top-0 end-0">
              <button class="btn btn-outline-primary btn-sm" @click="bugTestSend">
                <img src="~/assets/svg/bug.svg" alt="bug" title="Xatolik xaqida xabar berish" class="p-0">
              </button>
            </div>
          </div>
          <div class="rounded border border-secondary fs-3 p-3" id="step2">
            <div v-if="question_photo !== false  && question_photo !== ''">
              <img :src="question_photo" style="width: 250px; display: block; margin-left: auto; margin-right: auto;pointer-events: none;" class="rounded" alt="img">
              <hr>
            </div>
            <div v-if="question_audio !== false && question_audio !== ''" style="width: 450px; display: block; margin-left: auto; margin-right: auto;">
              <vue-plyr>
                <audio>
                  <source :src="question_audio" type="audio/mp3"/>
                </audio>
              </vue-plyr>
              <hr>
            </div>
            <div v-if="question_video !== false && question_video !== ''" style="width: 100%; display: block; margin-left: auto; margin-right: auto;">
              <vue-plyr>
                <video :poster="video_image" :src="question_video">
                  <track v-if="video_subtitles"
                         kind="captions"
                         :label="subtitle_name"
                         :srclang="subtitle_code"
                         :src="video_subtitles"
                         default
                  />
                </video>
              </vue-plyr>
              <hr>
            </div>
            {{ question.question }}
          </div>
        </div>
        <div class="col-sm-2 border-secondary">
          <div class="rounded border border-secondary fs-5 p-3" :class="{'animate__animated animate__backInRight': animated}" id="step3">
            {{ user_money }} + {{ test_money }}
          </div>
        </div>
      </div>
      <hr>
      <div class="row g-2" :class="{'animate__animated animate__zoomIn': animated}" id="step4">
        <div class="col-6 testhover" v-for="(value, key) in answers" :id="'testId'+key">
          <div class="" :class="[
                    $ua.isFromPc() !== true ? '':'fs-5', ' border btn-info btn3d text-white rounded_3 test  p-3 m-1'
                ]" :id="'answer'+key" style="cursor: pointer" @click="ClickingTest($event)">{{ value }}
          </div>
        </div>
      </div>
      <div class="container" :class="{'animate__animated animate__bounceInUp': animated}">
        <hr>
        <div class=" grid-container">
          <div class="grid-item">
            <nuxt-link :to="`/`">
              <button style="cursor: pointer;" id="step5" :class="[
                    $ua.isFromPc() !== true ? 'p-1':'p-2', 'btn btn-primary btn3d rounded-3'
                ]">
                <img src="~/assets/svg/house.svg" alt="Keyngisi" title="Keyngisi" style="height: 50px;">
              </button>
            </nuxt-link>
          </div>
          <div class="grid-item">
            <div id="redall" v-if="timeof !== true" :class="[
                    $ua.isFromPc() !== true ? '':'p-3 border', ' text-black rounded-3 fs-4'
                ]">
              <img src="~/assets/svg/clock.svg" class="shakeicon" alt="clock" title="clock"
                   style="height: 40px;padding: 0;margin: 0;padding-right: 1px;">
              <span id="timer" style=" font-weight: 900; " class="timer-text"> {{ countDown }} soniya</span>
            </div>
            <div id="redall" v-else-if="timeof === true" :class="[
                    $ua.isFromPc() !== true ? '':'p-3 border', ' text-black rounded-3 fs-4'
                ]">
              <img src="~/assets/svg/checksiz.svg" alt="checksiz" title="cheksiz"
                   style="height: 40px;padding: 0;margin: 0;padding-right: 1px;">
              <span style=" font-weight: 900; " class="timer-text"> Cheksiz</span>
            </div>
          </div>
          <div class="grid-item">
            <button @click="reloadQuestion()" style="cursor: pointer;" id="step6" :class="[
                    $ua.isFromPc() !== true ? 'p-1':'p-2', 'btn btn-primary btn3d rounded-3'
                ]">
              <img src="~/assets/svg/keyngisi.svg" alt="Keyngisi" title="Keyngisi" style="height: 50px;">
            </button>
          </div>
        </div>
        <div class="mt-3">
          <button accesskey="b" class="btn btn-sm btn3d  btn-default" @click="bodyAddStyle" style="background: white;color: black;"><i class="bi bi-card-image"></i></button>
          <button type="button" class="btn btn-sm btn3d  btn-default" @click="testTabStatus" v-html="test_tab_icon" style="background: white;color: black;"></button>
          <button type="button" class="btn btn-sm btn3d  btn-default" @click="soundStatus" v-html="sound_icon" style="background: white;color: black;" id="sound_button"></button>
          <button type="button" class="btn btn-sm btn3d  btn-default" @click="AnimateStatus" style="background: white;color: black;" id="animate">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-wink" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm1.757-.437a.5.5 0 0 1 .68.194.934.934 0 0 0 .813.493c.339 0 .645-.19.813-.493a.5.5 0 1 1 .874.486A1.934 1.934 0 0 1 10.25 7.75c-.73 0-1.356-.412-1.687-1.007a.5.5 0 0 1 .194-.68z"/>
            </svg>
          </button>
        </div>
        <div class="pt-2" v-if="this.AdminCheck() === true">
          <div class="p-1" v-if="answer !== null"><h5><b>Javob:</b> {{ answer }}</h5></div>
          <nuxt-link accesskey="v" :to="`/admin/question/view/${question.id}`" class="btn btn-success btn-sm" target="_blank"><i class="bi bi-eye"></i></nuxt-link>
          <nuxt-link accesskey="e" :to="`/admin/question/edit/${question.id}`" class="btn btn-primary btn-sm" target="_blank"><i class="bi bi-pencil"></i></nuxt-link>
          <button accesskey="a" class="btn btn-info btn-sm" @click="trueAnswer"><i class="bi bi-question-square"></i></button>
        </div>
      </div>
      <input type="hidden" id="questionid" :value="question.id">
    </div>
    <div class="container d-flex align-items-center justify-content-center" v-if="ads_image !== false" v-html="ads_image"></div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import introJs from "intro.js";

export default {
  middleware: 'isAuthenticated',
  name      : 'trade',
  props     : ['getTestUrl', 'checkTestUrl'],
  data() {
    return {
      success           : false,
      has_error         : false,
      class_test        : '',
      test_text         : null,
      answers           : [],
      user_money        : 0,
      test_money        : 0,
      stars_pro         : 0,
      user_rating       : 0,
      test_rating       : 0,
      stars             : 0,
      rating            : 0,
      answer_time       : 10,
      TimerInterval     : '',
      countDown         : 10,
      question_photo    : false,
      question_audio    : false,
      video_subtitles   : false,
      question_video    : false,
      subtitle_code     : false,
      subtitle_name     : false,
      video_image       : false,
      timeof            : false,
      starof            : false,
      animated          : false,
      answer            : null,
      question          : {
        "id"      : "",
        "question": "",
        "file"    : "",
        "time"    : 0,
        "money"   : 0,
        "rating"  : 0
      },
      intro_test        : false,
      page_name         : 'test',
      championship_time : null,
      championship_check: false,
      soundActive       : true,
      animateActive     : true,
      ads_image         : false,
      sound_icon        : process.env.SOUND_ICON_TRUE,
      test_tab_icon     : process.env.TEST_ICON_TRUE,
      testTabActive     : true
    }
  },
  async mounted() {
    this.$loading.show()
    await this.getTest()
    this.intro_test = localStorage.getItem('intro_' + this.page_name)
    if (this.intro_test === null) {
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
    async getTest() {
      await this.$axios.get(this.getTestUrl).then((req) => {
        const res = req.data;
        if (res.success === true) {
          this.question    = res.question
          this.success     = true
          this.test_rating = res.question.rating
          this.test_money  = res.question.money
          this.stars       = res.stars
          this.user_rating = res.user_rating
          this.user_money  = res.user_money
          this.stars_pro   = res.stars_pro
          this.answers     = res.answers
          this.timeof      = res.timeof
          this.starof      = res.starOf
          this.$loading.hide()

          if (res.question.type === 'image') {
            this.question_photo = res.question.file;
          }
          if (res.question.type === 'audio') {
            this.question_audio = res.question.file;
          }
          if (res.question.type === 'video') {
            this.question_video = res.question.file;
          }

          this.intro_test = localStorage.getItem('intro_' + this.page_name)
          if (this.intro_test === 'false') {
            this.timeof = true
            this.introStartMethods()
          }
          this.countDown = res.question.time
          if (res.timeof !== true) {
            this.countDownTimer()
          }
        } else if (res.error === true) {
          this.has_error  = true
          this.success    = false
          this.class_test = res.class
          this.test_text  = res.message
        }
        this.answer = null
        this.animate()
      }).catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide()
      });
      await this.getAds()
    },
    countDownTimer() {
      this.TimerInterval = setInterval(() => {
        this.browser_active = ((typeof document.hasFocus != 'undefined' ? document.hasFocus() : 1) ? 1 : 0);
        // console.log(this.browser_active)
        if (this.browser_active) {
          this.countDown -= 1
          if (this.countDown <= 0) {
            let x = document.getElementsByClassName('test');
            for (let i = 0; i < x.length; i++) {
              x[i].classList.add("disabledbutton");
            }
            this.reloadQuestion()
          }
          this.browser_active_check = true
        } else {
          if (this.browser_active_check === true) {
            let x = document.getElementsByClassName('test');
            for (let i = 0; i < x.length; i++) {
              x[i].classList.add("disabledbutton");
            }
            this.browserActive()
          }
        }
      }, 1000);
    },
    ClickingTest(current) {
      this.$loading.show()
      const answer      = current.target.innerText,
            x           = document.getElementsByClassName('test'),
            question_id = document.getElementById('questionid').value,
            div         = current;
      for (let i = 0; i < x.length; i++) {
        x[i].classList.add("disabledbutton");
      }
      this.$axios.post(this.checkTestUrl, {
        answer     : answer,
        question_id: question_id,
      }).then((res) => {
        clearInterval(this.TimerInterval)
        div.target.classList.remove("btn-info");
        if (res.data.success === true) {
          this.playSound(process.env.SUCCESS_SOUND)
          div.target.classList.add("btn-success");
          this.SwalMixin(res.data.message)
        } else {
          this.playSound(process.env.ERROR_SOUND)
          div.target.classList.add("btn-danger");
          this.SwalMixin('Javob xato', 'error')
        }
        this.reloadQuestion()
      }).catch(() => {
        this.has_error = true
      });
    },
    reloadQuestion() {
      this.$loading.show()
      clearInterval(this.TimerInterval);
      const x = document.getElementsByClassName('test');
      setTimeout(() => {
        this.question_photo = false
        this.question_audio = false
        this.question_video = false
        this.getTest();
        setTimeout(() => {
          for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("disabledbutton");
            x[i].classList.add("btn-info");
            x[i].classList.remove("btn-success");
            x[i].classList.remove("btn-danger");
            // x[i].classList.remove("testerror");
            // x[i].classList.remove("testsuccess");
          }
        }, 500);
      }, 1000);
    },
    animate() {
      if (this.animateActive === true) {
        let self      = this;
        self.animated = true;
        setTimeout(function () {
          self.animated = false;
        }, 1000);
      }
    },
    introJsFunction() {
      setTimeout(function () {
        let intro = introJs();
        intro.setOptions({
          steps: [
            {
              element: '#step1',
              intro  : "Jami va test uchun beriladigan bal miqdori."
            },
            {
              element: '#step2',
              intro  : "Sizga berilgan test savoli."
            },
            {
              element: '#step3',
              intro  : "Jami crypto va test uchun beriladigan crypto miqdori."
            },
            {
              element: '#step4',
              intro  : "Bu berilgan savolning javob variyantlari, siz o`zingiz to`g`ri deb bilgan variantingizni bosing. To`g`ri javobni belgilasangiz variant - yashil rangni, xato javobni belgilasangiz - qizil rangni aks etadi va avtomatik keyingi testga o`tib ketadi."
            },
            {
              element: '#step5',
              intro  : 'Test yechishdan zeriksangiz bosh sahifaga qaytish uchun bosing.'
            },
            {
              element: '#redall',
              intro  : "Test uchun berilgan vaqt. Agarda belgilangan vaqt davomida testga javob berishga ulgurmasangiz avtomatik keyingi testga o`tib ketadi. (Vaqtincha u cheksiz)"
            },
            {
              intro: "Test vaqtini o'chirib qo'yishingiz mumkin. Buni Xaridlar bo'lim orqali amalga oshiriladi."
            },
            {
              element: '#step6',
              intro  : 'Agarda testning javobini bilmasangiz keyingi testga o`tish uchun shuni bosing.'
            },
            {
              element: '#sound_button',
              intro  : "Test to'g'ri yoki noto'g'ri javobini berilganda ovozli rejimda habardor qilish."
            }
          ]
        });
        intro.start().oncomplete(function () {
          localStorage.setItem('intro_test', 'true');
          window.location.href = '/exchange/';
        });
      }, 1000);
    },
    trueAnswer() {
      this.$axios.post('admin/question/trueAnswer', {
        question_id: this.question.id,
      }).then((res) => {
        this.answer = res.data.data.answer
      }).catch(() => {
        this.has_error = true
      });
    },
    playSound(sound) {
      if (sound && this.soundActive === true) {
        new Audio(sound).play();
      }
    },
    soundStatus() {
      this.soundActive = !this.soundActive;
      if (this.soundActive === true) {
        this.sound_icon = process.env.SOUND_ICON_TRUE;
      } else {
        this.sound_icon = process.env.SOUND_ICON_FALSE;
      }
    },
    testTabStatus() {
      this.testTabActive = !this.testTabActive;
      let addClass       = '', removeClass = '';
      if (this.testTabActive === true) {
        this.test_tab_icon = process.env.TEST_ICON_TRUE;
        addClass           = 'col-6';
        removeClass        = 'col-12';
      } else {
        removeClass        = 'col-6';
        addClass           = 'col-12';
        this.test_tab_icon = process.env.TEST_ICON_FALSE;
      }
      this.answers.forEach((item, index) => {
        document.getElementById('testId' + index).classList.add(addClass);
        document.getElementById('testId' + index).classList.remove(removeClass);
      })
    },
    AnimateStatus() {
      this.animateActive = !this.animateActive;
    },
    async browserActive() {
      this.browser_active_check = false
      let browser_active        = ((typeof document.hasFocus != 'undefined' ? document.hasFocus() : 1) ? 1 : 0);
      if (!browser_active) {
        Swal.fire({
          title             : this.$t('exit_test'),
          text              : this.$t('test_exit_message'),
          icon              : 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText : this.$t('next_test'),
          allowOutsideClick : false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.reloadQuestion()
          }
        })
      }
    },
    async introStartMethods() {
      this.intro_test = localStorage.getItem('intro_' + this.page_name)
      if (this.intro_test === 'false') {
        let intro_check = await this.introCheck(this.page_name);
        if (intro_check === false) {
          this.timeof = true
          this.introJsFunction()
        } else {
          localStorage.setItem('intro_' + this.page_name, true)
        }
      } else {
        let intro_check_name = localStorage.getItem('intro_check_' + this.page_name);
        if (intro_check_name === 'false') {
          await this.introUpdate(this.page_name, true);
        }
      }
    },
    bugTestSend() {
      Swal.fire({
        title              : this.$t('bug_test'),
        text               : this.$t('bug_test_message'),
        input              : 'text',
        inputAttributes    : {
          autocapitalize: 'off'
        },
        showCancelButton   : true,
        confirmButtonText  : "Jo'natish",
        cancelButtonText   : 'Bekor qilish',
        showLoaderOnConfirm: true,
        preConfirm         : (message) => {
          return this.$axios.post('question/bug-send', {
            question_id: parseInt(document.getElementById('questionid').value),
            message    : message
          });
        },
        allowOutsideClick  : () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          this.SwalMixin(result.value.data.data.message, 'success')
          this.reloadQuestion()
        }
      })


    },
    async getAds() {
      await this.$axios.get('adsense/getImage').then((req) => {
        this.ads_image = req.data.ads;
      });
    },
    bodyAddStyle() {
      let styleCardCenter = '';
      if (this.$ua.isFromPc() !== true) {
        styleCardCenter = 'background-color: rgb(250 250 250 / 70%); margin-top: 2rem !important;';
      } else {
        styleCardCenter = 'background-color: rgb(250 250 250 / 70%); margin-top: 10rem !important;';
      }
      document.getElementById('cardCenter').setAttribute('style', styleCardCenter);

      document.getElementById('cardCenter').classList.add('mb-5', 'rounded-3');
      document.getElementById('cardRemoveClass').classList.remove('card');

      document.body.setAttribute("style", 'background: url(https://wallpaperaccess.com/full/370649.jpg) no-repeat center center fixed;' +
        '-webkit-background-size: cover;\n' +
        '-moz-background-size: cover;\n' +
        '-o-background-size: cover;\n' +
        'background-size: cover;');
    },
  }
}
</script>
