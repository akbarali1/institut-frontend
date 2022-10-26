<template>
  <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center ">
    <div class="card animate__animated animate__fadeInDown" style="max-width: 450px;">
      <div class="card card-body">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <nuxt-link :to="`/auth/login`" class="nav-link p-2">
              Kirish
            </nuxt-link>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
              Ro'yhatdan o'tish
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <nuxt-link :to="`/demo`" class="nav-link p-2">
              Demo test
            </nuxt-link>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <h1 class="text-center mb-4"></h1>
            <div class="alert alert-danger" v-if="has_error && !success">
              <strong v-if="error == 'registration_validation_error'"
                      class="block">Tekshirish xatolari.</strong>
              <strong v-else class="block">
                Xato, hozirda ro'yxatdan o'tish imkonsiz. Sababi siz ma'lumotlarni kiritishda xatoga yo'l qo'ygan bo'lishingiz mimkun. Agar muammo davom etsa, administrator bilan bog'laning.
              </strong>
              <ol class="mt-2">
                <div v-for="(value) in errors">
                  <li><strong>{{ value[0] }}</strong></li>
                </div>
              </ol>
            </div>
          </div>
          <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
            <div class="form-floating mb-2">
              <input type="text" class="form-control" maxlength="20" minlength="2" name="name"
                     id="name" v-model="name" ref="name"
                     placeholder="Name" required autofocus
                     v-bind:class="{ 'is-invalid': has_error && errors.name }">
              <label for="name">Ismingiz</label>
            </div>

            <div class="form-floating mb-2">
              <input type="number" placeholder="Tug'ulgan yilingiz" min="1960" max="2015" id="year" v-model="year" ref="name"
                     v-bind:class="{ 'is-invalid': has_error && errors.year }"
                     oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                     maxlength="4" required class="form-control">
              <label for="year">Tug'ilgan yilingiz</label>
            </div>

            <div class="form-floating mb-2">
              <input type="email" class="form-control" name="email" id="email" v-model="email"
                     autocomplete="email" required
                     placeholder="email" v-bind:class="{ 'is-invalid': has_error && errors.email }">
              <label for="email">Elektron pochtangiz</label>
            </div>
            <div class="form-floating mb-2">
              <input type="password" class="form-control" maxlength="20" minlength="2" name="password"
                     id="password" required v-model="password"
                     placeholder="password">
              <label for="password">Parolingiz</label>
            </div>
            <div class="form-floating mb-2">
              <input type="password" class="form-control" maxlength="20" minlength="2"
                     name="password_confirmation" id="password_confirmation" required
                     v-model="password_confirmation" placeholder="password confirmation">
              <label for="password_confirmation">Parolni takrorlang</label>
            </div>
            <div class="form-floating mb-2" v-if="ref_id">
              <input type="text" class="form-control" name="password_confirmation" id="ref_name"
                     v-model="ref_name" placeholder="ref name" disabled>
              <label for="ref_name">Sizni taklif qilgan odam</label>
            </div>
            <button type="submit" class="btn btn-primary btn3d">
              A'zo bo'lish
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'isGuest',
  layout    : 'login',
  head() {
    return {
      title: "Ro'yxatdan o'tish"
    };
  },
  data() {
    return {
      error                : null,
      name                 : '',
      ref_id               : null,
      ref_name             : false,
      year                 : '',
      email                : '',
      password             : '',
      password_confirmation: '',
      has_error            : false,
      errors               : {},
      success              : false
    }
  },
  mounted() {
    const ref_id = localStorage.getItem('ref_id')
    if (ref_id) {
      this.ref_id = ref_id
      this.userNameFind(this.ref_id)
    }
    this.$loading.hide()
  },
  methods: {
    register(e) {
      e.preventDefault();
      let app = this;
      this.$axios.post('auth/register', {
        name                 : app.name,
        year                 : app.year,
        email                : app.email,
        password             : app.password,
        password_confirmation: app.password_confirmation,
        ref_id               : app.ref_id,
      }).then((response) => {
        this.$router.push(`/auth/login`)
      }).catch((error) => {
        app.has_error = true
        console.log(error.response.data)
        this.SwalMixin('Formada xatoliklar topildi', 'error')
        app.errors = error.response.data.errors || {}
        app.error  = error.response.data.error
      });
    },
    userNameFind($id) {
      this.$axios.get(`auth/user/username/${$id}`).then((response) => {
        this.ref_name = response.data.name
      });
    }
  }
}
</script>
