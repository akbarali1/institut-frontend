<template>
  <div class="container card mt-4 mb-4" v-if="success === true">
    <div v-if="this.windowWidth">
      <div class="row">
        <div class="col-12 text-center">
          <user-status :status_name="userData.status_name" :status_id="userData.status_id" :mobile="true"></user-status>
          <div class="d-block">
            <div class="fs-5 text-center p-1 badge bg-info text-dark" @click="copyId(userData.unq_id)" role="button">#{{ userData.unq_id }}</div>
          </div>
        </div>
        <div class="col-5 border bg-light m-2 rounded-3">
          <div class="text-center p-1">{{ userData.rating }} ball</div>
        </div>
        <div class="col"></div>
        <div class="col-5 border bg-light m-2 rounded-3">
          <div class="text-center p-1">{{ userData.money }} crypto</div>
        </div>
      </div>
      <div class="row pt-3 p-1 d-flex justify-content-center">
        <div class="col-4 p-1">
          <nuxt-link :to="`/test`" class="border border20foiz shadow kopka" style="padding: 1.7em" id="step6">
            <img src="~/assets/svg/solving.svg" class="max-image" alt="baby" title="Test yechish">
          </nuxt-link>
        </div>
        <div class="col-4 p-1">
          <nuxt-link :to="`/rating`" class="border border20foiz shadow kopka" id="step7" style="padding: 1.7em">
            <img src="~/assets/svg/ranking-users.svg" class="max-image" alt="baby"
                 title="Jami foydalanuvchilar reytingi">
          </nuxt-link>
        </div>
        <div class="col-4 p-1">
          <nuxt-link :to="`/rating/championship`" class="border border20foiz shadow kopka" style="padding: 1.7em" title="Reying bo`yicha xisobot">
            <img src="~/assets/svg/kubok.svg" class="max-image">
          </nuxt-link>
        </div>
        <div class="col-12 m-3"></div>
        <div class="col-4 p-1">
          <nuxt-link :to="`/surfing`" class="border border20foiz shadow kopka" style="padding: 1.7em">
            <img src="~/assets/svg/surfing.svg" class="max-image" alt="baby"
                 title="Cryptolar ishlatilish xisoboti">
          </nuxt-link>
        </div>
        <div class="col-4 p-1">
          <nuxt-link :to="`exchange`" class="border border20foiz shadow kopka" style="padding: 1.7em">
            <img src="~/assets/svg/store-shop.svg" class="max-image" alt="baby" title="Test yechish">
          </nuxt-link>
        </div>
        <div class="col-4 p-1">
          <nuxt-link :to="`settings`" class="border border20foiz shadow kopka" style="padding: 1.7em">
            <img src="~/assets/svg/settings-rgb.svg" class="max-image" alt="baby"
                 title="Jami foydalanuvchilar reytingi">
          </nuxt-link>
        </div>
        <div class="col-12 m-3"></div>
        <div class="col-4 p-1">
          <nuxt-link :to="`referal`" class="border border20foiz shadow kopka" style="padding: 1.7em">
            <img src="~/assets/svg/referal.svg" class="max-image" alt="baby"
                 title="Referallar">
          </nuxt-link>
        </div>
        <div class="col-4 disabledbutton p-1">
          <a href="#" class="border border20foiz shadow kopka" style="padding: 1.7em">
            <img src="~/assets/svg/report-rgb.svg" class="max-image" alt="baby"
                 title="Cryptolar ishlatilish xisoboti">
          </a>
        </div>
        <div class="col-4 p-1 disabledbutton">
          <a href="#" class="border border20foiz shadow kopka" style="padding: 1.7em">
            <img src="~/assets/svg/support-rgb.svg" class="max-image" alt="baby"
                 title="Cryptolar ishlatilish xisoboti">
          </a>
        </div>
        <div class="col-12 m-3"></div>
        <div class="col-4 p-1">
          <a class="border border20foiz shadow kopka " style="padding: 1.7em" @click="exitSite">
            <img src="~/assets/svg/exit-door.svg" class="max-image" alt="baby"
                 title="Cryptolar ishlatilish xisoboti">
          </a>
        </div>
      </div>
      <br>
    </div>
    <div v-else class="mb-4">
      <div class="row d-flex justify-content-center">
        <div class="col col-lg-2 align-self-end  border bg-light m-4 rounded-3" id="step2">
          <div class="text-center p-1 fs-5">{{ $t('user_rating', {rating: userData.rating}) }}</div>
        </div>
        <div class="col-2 text-center">
          <user-status :status_name="userData.status_name" :status_id="userData.status_id"></user-status>
          <div class="fs-5 text-center p-1 badge bg-info text-dark" @click="copyId(userData.unq_id)" role="button">#{{ userData.unq_id }}</div>
        </div>
        <div class="col col-lg-2 align-self-end border bg-light m-4 rounded-3" id="step5">
          <div class="text-center p-1 fs-5">{{ $t('user_crypto', {crypto: userData.money}) }}</div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="row mt-5 w-75 d-flex justify-content-center">
          <div class="col-md-2 text-center m-4">
            <nuxt-link :to="`/test`" class="border bordernineprecent p-5 shadow kopka" id="step6" accesskey="t">
              <img src="~/assets/svg/solving.svg" class="pc-image" alt="baby" title="Test yechish">
            </nuxt-link>
          </div>
          <div class="col-md-2 text-center m-4">
            <nuxt-link :to="`/rating`" class="border bordernineprecent p-5 shadow kopka" id="step7" accesskey="r">
              <img src="~/assets/svg/ranking-users.svg" class="pc-image" alt="baby"
                   title="Jami foydalanuvchilar reytingi">
            </nuxt-link>
          </div>
          <div class="col-md-2 text-center m-4">
            <nuxt-link :to="`surfing`" class="border bordernineprecent p-5 shadow kopka" id="step8">
              <img src="~/assets/svg/surfing.svg" class="pc-image" alt="baby" title="Reklama koʻrish">
            </nuxt-link>
          </div>
          <div class="col-md-2 text-center m-4">
            <nuxt-link :to="`/rating/championship`" class="border bordernineprecent p-5 shadow kopka">
              <img src="~/assets/svg/kubok.svg" class="pc-image" alt="" title="Chempionatdagi reytinglar"/>
            </nuxt-link>
          </div>
          <div class="col-12 m-3"></div>
          <div class="col-md-2 text-center m-4">
            <nuxt-link :to="`exchange`" class="border bordernineprecent p-5 shadow kopka" accesskey="e" id="exchange">
              <img src="~/assets/svg/store-shop.svg" class="pc-image" title="Xaridlar boʻlimi">
            </nuxt-link>
          </div>
          <div class="col-md-2 text-center m-4">
            <nuxt-link :to="`settings`" class="border bordernineprecent p-5 shadow kopka" id="step9" accesskey="s">
              <img src="~/assets/svg/settings-rgb.svg" class="pc-image" alt="baby" title="Sozlamalar">
            </nuxt-link>
          </div>
          <div class="col-md-2 text-center m-4 disabledbutton">
            <a href="#" class="border bordernineprecent p-5 shadow kopka">
              <img src="~/assets/svg/report-rgb.svg" class="pc-image" alt="baby"
                   title="Cryptolar ishlatilish xisoboti">
            </a>
          </div>
          <div class="col-md-2 text-center m-4 disabledbutton">
            <a class="border bordernineprecent p-5 shadow kopka">
              <img src="~/assets/svg/support-rgb.svg" class="pc-image" alt="baby" title="Qo'llab quvvatlash">
            </a>
          </div>
          <div class="col-12 m-3"></div>
          <div class="col-md-2 text-center m-4">
            <nuxt-link :to="`referal`" class="border bordernineprecent p-5 shadow kopka" id="step9" accesskey="s">
              <img src="~/assets/svg/referal.svg" class="pc-image" alt="baby" title="Referallar">
            </nuxt-link>
          </div>
          <div class="col-md-2 text-center m-4">
            <a class="border bordernineprecent p-5 shadow kopka" id="step10" accesskey="e" @click="exitSite"
               style=" cursor: pointer; ">
              <img src="~/assets/svg/exit-door.svg" class="pc-image" alt="baby" title="Saytdan chiqish">
            </a>
          </div>
          <div class="col-12 m-3"></div>
          <div class="col-md-2 text-center m-4" v-if="this.AdminCheck() === true">
            <nuxt-link :to="`admin`" class="border bordernineprecent p-5 shadow kopka" accesskey="a">
              <img src="~/assets/svg/admin-rgb.svg" class="pc-image" title="Admin panel">
            </nuxt-link>
          </div>
          <div class="col-md-2 text-center m-4" v-if="this.AdminCheck() === true">
            <nuxt-link :to="`admin/question`" class="border bordernineprecent p-5 shadow kopka" accesskey="q">
              <img src="~/assets/svg/test-admin.svg" class="pc-image" title="Hamma savollar">
            </nuxt-link>
          </div>
          <div class="col-md-2 text-center m-4" v-if="this.AdminCheck() === true">
            <nuxt-link :to="`admin/news`" class="border bordernineprecent p-5 shadow kopka" accesskey="n">
              <img src="~/assets/svg/news.svg" class="pc-image" title="Hamma savollar">
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import introJs from 'intro.js'
import UserStatus from "../components/user-status";

export default {
  components: {UserStatus},
  middleware: 'isAuthenticated',
  head() {
    return {
      title: 'Bosh sahifa',
    }
  },
  data() {
    return {
      userData   : {
        "id"             : 0,
        "name"           : "",
        "rights"         : 0,
        "money"          : "0.00",
        "rating"         : "0.00",
        "status_name"    : "",
        "purchased_error": 0,
        "stars_pro"      : 0,
        "stars"          : 0,
        "status_image"   : 0,
        "title"          : "",
        "g"              : 0
      },
      windowWidth: this.windowResponsive(),
      success    : false,
      intro_home : false,
      top_user   : {
        championship: [],
        rating      : [],
      },
      page_name  : 'home',
    }
  },
  async mounted() {
    window.onresize = () => {
      this.windowWidth = this.windowResponsive()
    }
    this.$loading.hide();
    this.$loading.show()
    await this.HomePage()
    this.intro_home = localStorage.getItem('intro_' + this.page_name)
    if (this.intro_home === null) {
      localStorage.setItem('intro_' + this.page_name, false);
    }
    await this.introStartMethods()
  },
  methods: {
    async introStartMethods() {
      this.intro_home = localStorage.getItem('intro_' + this.page_name)
      if (this.intro_home === 'false') {
        let intro_check = await this.introCheck(this.page_name);
        (intro_check === false) ? this.introJsFunction() : localStorage.setItem('intro_' + this.page_name, true);
      } else {
        let intro_check_name = localStorage.getItem('intro_check_' + this.page_name);
        if (intro_check_name === 'false') {
          this.introUpdate(this.page_name, true);
        }
      }
    },
    async HomePage() {
      this.$axios.get('auth/user').then((req) => {
        const data    = req.data;
        this.userData = data.userData
        this.success  = true
      }).catch(() => {
        window.location.reload()
      }).finally(() => {
        this.$loading.hide();
      })
    },
    exitSite() {
      Swal.fire({
        title             : this.$t('exit_site_title'),
        text              : this.$t('exit_site_text'),
        icon              : 'warning',
        showCancelButton  : true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor : '#d33',
        cancelButtonText  : this.$t('cancel_exit'),
        confirmButtonText : this.$t('exit')
      }).then((result) => {
        if (result.isConfirmed) {
          this.$auth.logout();
          setTimeout(() => {
            this.$router.push('/auth/login')
            this.reloadPage(100);
          }, 1000);

        }
      })
    },
    copyId(text) {
      navigator.clipboard.writeText(text);
      this.SwalMixin("Shaxsiy ID buferga olindi")
    },
    introJsFunction() {
      setTimeout(function () {
        var intro = introJs();
        intro.setOptions({
          steps: [
            {
              intro: "Assalomu alaykum. Saytimizga tashrif buyurganingizdan xursandmiz. Sizni saytimiz bilan tanishtirishimizga ruxsat bergaysiz. Boshlaymizmi?",
            },
            {
              element: '#step1',
              intro  : "Bu yulduzchalar kunlik berilgan xato qilish imkoniyati. Siz testga xato javob bersangiz har bir xato qilingan javob uchun bir donadan kamayib boradi"
            },
            {
              element: '#star',
              intro  : "Bu sizga ajratilgan kunlik yulduzchalar. Bu yulduzchalar tugab qolsa siz yulduzcha sotib olishingiz yoki yangi kunni kutishingiz kerak boʻladi. Sizga ajratiladigan kunlik yulduzcha statusingiz va toʻplagan reytingizga qarab belgilanadi."
            },
            {
              element: '#step2',
              intro  : "Bu sizning jami yigʻgan ballaringiz. Testga toʻgʻri javob berish orqali shu test uchun belgilangan ballarni olasiz."
            },
            {
              element: '#step3',
              intro  : 'Bu sizning statusingizning rasmi. Statusingizni qanchalik koʻtarganingiz sari rasm ham oʻzgarib boraveradi.',
            },
            {
              element: '#step4',
              intro  : "Bu sizning hozirgi statusingiz nomi. Statusingizni qanchalik koʻtarganingiz sari sizga beriladigan test savollari, unga ajratiladigan crypto va ballar  ham shunchalik koʻtarilib boraveradi.",
            },
            {
              element: '#step5',
              intro  : 'Bu sizning jami yigʻgan cryptolaringiz. Testga toʻgʻri javob berish orqali unga oldindan belgilangan cryptoni olasiz.'
            },
            {
              intro: "Siz yig'ilgan cryptoni turli aksessuarlarni xarid qilishga sarflashingiz mumkin."
            },
            {
              element: '#step6',
              intro  : "Test yechishni boshlash uchun shu tugmani bosing."
            },
            {
              element: '#step7',
              intro  : "Bu tugma orqali saytdagi barcha foydalanuvchilarning reytinglarini koʻrishingiz mumkin."
            },
            {
              element: '#step8',
              intro  : "Siz kunlik xato qilish imkoniyatingiz tugagan boʻlsa <b>Reklama koʻrish</b> orqali xato qilish imkoniyatini bepulga olishingiz va siz test yechishda davom etishingiz mumkin."
            },
            {
              element: '#exchange',
              intro  : "Bu xaridlar bo'limi bo'lib unda siz yulduzchalar, test vaqtini o'chirib qo'yish va ballarni sotib olishingiz mumkin."
            },
            {
              element: '#step9',
              intro  : "Bu orqali siz profilingiz ma'lumotlarini kiritishingiz yoki oʻzgartirishingiz mumkin."
            },
            {
              element: '#step10',
              intro  : "Agarda boshqa odam mobil qurilmasidan yoki kompyuteridan kirgan boʻlsangiz bu tugma orqali tizimdan chiqib ketishingiz mumkin."
            },
            {
              intro: "Biz kun sayin takomillashuv va rivojlanishni amalga oshirmoqdamiz, saytimizdagi ayrim sahifalar va funksiyalar tugallanish arafasida. Biz bilan qoling va birinchi bo'lib yangiliklardan xabardan bo'ling!."
            }
          ]
        });
        intro.start().oncomplete(function () {
          localStorage.setItem('intro_home', 'true');
          window.location.href = './test/';
        });
      }, 1000);
    },
  }
}
</script>
