<template>
  <div class="bg-light text-dark d-flex flex-column min-vh-100 justify-content-center align-items-center" :class="{'animate__animated animate__jackInTheBox': complete}">
    <main style="max-width: 1100px;">
      <div class="container card card-body mt-4" v-if="success === true">
        <div class="container">
          <div class="text-center" :class="{'animate__animated animate__bounceInDown': animated}">
            <div :class="[
                    $ua.isFromPc() !== true ? 'p-1 fs-5 ':'fs-3 p-3', 'rounded mb-4 border border-secondary'
                ]">
              {{ question.question }}
            </div>
          </div>
          <div class="row g-1" :class="{'animate__animated animate__bounceInLeft': animated}">
            <div class="col-6 testhover text-center" v-for="(value, key) in answers" :id="'testId'+key">
              <div class="" :class="[
                    $ua.isFromPc() !== true ? '':'fs-5', ' border btn-info btn3d text-white rounded_3 test  p-3 m-1'
                ]" :id="'answer'+key" style="cursor: pointer" @click="ClickingTest($event)">{{ value }}
              </div>
            </div>
          </div>
          <div class=" mt-3">
            <div class=" grid-container" :class="{'animate__animated animate__bounceInUp': animated}">
              <div class="grid-item">
                <nuxt-link :to="`/auth/login`" class="text-decoration-none" title="Login">
                  <button style="cursor: pointer;" :class="[
                        $ua.isFromPc() !== true ? 'p-1':'p-2', 'btn btn-primary btn3d rounded-3'
                    ]">
                    <img src="~/assets/svg/login.svg" alt="Login" title="Keyngisi" style="height: 50px; color:white;">
                  </button>
                </nuxt-link>
              </div>
              <div class="grid-item">
                <div :class="[
                      $ua.isFromPc() !== true ? '':'p-3 border', ' text-black rounded-3 fs-4'
                  ]">
                  <img src="~/assets/svg/clock.svg" class="shakeicon" alt="clock" title="clock"
                       style="height: 40px;padding: 0;margin: 0;padding-right: 1px;">
                  <span id="timer" style=" font-weight: 900; " class="timer-text"> {{ countDown }} soniya</span>
                </div>
              </div>
              <div class="grid-item">
                <div style="cursor: pointer;">
                  <button @click="reloadQuestion()" style="cursor: pointer;" :class="[
                    $ua.isFromPc() !== true ? 'p-1':'p-2', 'btn btn-primary btn3d rounded-3'
                ]">
                    <img src="~/assets/svg/keyngisi.svg" alt="Keyngisi" title="Keyngisi" style="height: 50px;">
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-3 text-center">
              <button type="button" class="btn btn-sm" @click="testTabStatus" v-html="test_tab_icon" style="background: white;color: black;"></button>
            </div>
          </div>
        </div>
        <input type="hidden" id="questionid" :value="question.id">
      </div>
      <div class="container position-absolute top-50 start-50 translate-middle card card-body" v-if="complete === true">
        <div class="text-center">
          <div>
            <h1 style=" font-size: 70px; ">{{ complete_text.number }}</h1>
            <div :class="[ $ua.isFromPc() !== true ? 'm-3 fs-5':'m-5 fs-3', 'centered' ]">{{ complete_text.message }}</div>
          </div>
          <nuxt-link :to="`/auth/register`">
            <span :class="[ $ua.isFromPc() !== true ? 'p-2 fs-6':'p-3 fs-3', 'btn btn-success col-md-4' ]" v-html="complete_text.reg_text"></span>
          </nuxt-link>
          <nuxt-link :to="`/auth/login`">
            <span :class="[ $ua.isFromPc() !== true ? 'p-2 fs-6':'p-3 fs-3', 'btn btn-success col-md-2' ]">Saytga kirish</span>
          </nuxt-link>
        </div>
      </div>
    </main>
  </div>
</template>
<script>

export default {
  layout    : 'login',
  middleware: 'isGuest',
  head() {
    return {
      title: "Demo test"
    };
  },
  data() {
    return {
      has_error    : false,
      answers      : [],
      question     : {"id": "", "question": ""},
      money        : null,
      rating       : null,
      answer_time  : 10,
      complete     : false,
      success      : false,
      questionend  : '',
      TimerInterval: '',
      animated     : false,
      countDown    : 20,
      complete_text: {},
      time         : null,
      test_tab_icon: process.env.TEST_ICON_TRUE,
      testTabActive: true
    }
  },
  mounted() {
    this.$loading.show()
    const demoTestSavol = localStorage.getItem('demoTestSavol')
    const demoTestJavob = localStorage.getItem('demoTestJavob')
    if (demoTestSavol == null) {
      localStorage.demoTestSavol = '[0]'
    }
    if (demoTestJavob == null) {
      localStorage.demoTestJavob = '{}'
    }
    this.getDemoTest();
  },
  beforeDestroy() {
    if (this.TimerInterval) {
      clearInterval(this.TimerInterval);
    }
  },
  methods: {
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
    async getDemoTest() {
      var demoTestSavol = JSON.parse(localStorage.getItem('demoTestSavol')),
          demoTestJavob = JSON.parse(localStorage.getItem('demoTestJavob'));
      this.$axios.post('demo_test/random', {
        DemoTest : demoTestSavol,
        DemoJavob: demoTestJavob
      }).then((res) => {
        this.countDown = 0
        if (res.data.complete === true) {
          this.success                = false
          this.complete               = true
          // this.completeQuestion(res.data)
          this.complete_text.number   = res.data.answer_response
          this.complete_text.message  = res.data.message_text
          this.complete_text.reg_text = res.data.reg_text
        } else {
          this.success   = true
          this.question  = res.data
          this.answers   = res.data.answers
          this.countDown = res.data.time
          this.countDownTimer()
          this.animate()
        }
      }).catch(function (error) {
        console.log(error);
      });
      this.$loading.hide()
    },
    countDownTimer() {
      this.TimerInterval = setInterval(() => {
        this.countDown -= 1
        if (this.countDown <= 0) {
          var x = document.getElementsByClassName('test');
          for (var i = 0; i < x.length; i++) {
            x[i].classList.add("disabledbutton");
          }
          this.reloadQuestion()
          clearInterval(this.TimerInterval);
        }
      }, 1000);
    },
    ClickingTest(current) {
      var divtext       = event.target.innerText,
          x             = document.getElementsByClassName('test'),
          demoTestJavob = JSON.parse(localStorage.getItem('demoTestJavob')),
          demoTestSavol = JSON.parse(localStorage.getItem('demoTestSavol')),
          questionid    = document.getElementById('questionid').value,
          div           = current;
      for (var i = 0; i < x.length; i++) {
        x[i].classList.add("disabledbutton");
      }
      this.$axios.post('demo_test/check', {
        DemoTest  : demoTestSavol,
        DemoJavob : demoTestJavob,
        Answer    : divtext,
        QuestionId: questionid,
      }).then((res) => {
        clearInterval(this.TimerInterval)
        div.target.classList.remove("btn-info");
        if (res.data.demo_test == null || res.data.demo_test == undefined) {
          console.error("uman adashtizu keyngisiga otkazaman")
        } else if (res.data.success === true) {
          div.target.classList.add("btn-success");
          localStorage.demoTestSavol = res.data.demo_test
          localStorage.demoTestJavob = res.data.demo_javob
        } else {
          div.target.classList.add("btn-danger");
          localStorage.demoTestSavol = res.data.demo_test
          localStorage.demoTestJavob = res.data.demo_javob
        }
        this.reloadQuestion()
      }).catch((error) => {
        console.log(error);
      });
    },
    reloadQuestion() {
      this.$loading.show()
      clearInterval(this.TimerInterval);
      var x = document.getElementsByClassName('test');
      setTimeout(() => {
        this.getDemoTest();
        setTimeout(() => {
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("disabledbutton");
            x[i].classList.add("btn-info");
            x[i].classList.remove("btn-success");
            x[i].classList.remove("btn-danger");
            // x[i].classList.remove("testerror");
            // x[i].classList.remove("testsuccess");
          }
        }, 200);
      }, 1000);
    },
    animate() {
      var self      = this;
      self.animated = true;
      setTimeout(function () {
        self.animated = false;
      }, 1000);
    }
  }
}
/*
 :class="[
 $ua.isFromPc() !== true ? 'p-1':'fs-3 p-3', 'rounded mb-4 border border-secondary'
 ]"
 */
</script>
