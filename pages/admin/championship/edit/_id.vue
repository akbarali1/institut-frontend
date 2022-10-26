<template>
  <div class="container">
    <span class="float-end p-2">
          <nuxt-link :to="`./`" class="btn btn-danger btn-sm " accesskey="b">Orqaga</nuxt-link>
    </span>
    <form method="post" class="form-control mt-4" @submit="save">
      <div class="mb-3">
        <label for="name">Chempionat nomi</label>
        <input type="text" class="form-control" id="name" v-model="name" autocomplete="off">
      </div>
      <div class="mb-3">
        <label for="name">Chempionat ga beriladigan mukofotlar</label>
        <ckeditor-nuxt v-model="content"/>
      </div>
      <div class="mb-3">
        <label for="start_time">Boshlanish vaqtini belgilang</label>
        <input type="datetime-local" class="form-control" id="start_time" v-model="start_time" autocomplete="off">
      </div>
      <div class="mb-3">
        <label for="end_time">Tugash vaqtini belgilang</label>
        <input type="datetime-local" class="form-control" id="end_time" v-model="end_time" autocomplete="off">
      </div>
      <div class="row">
        <div class="col-2">
          <div class="mb-3">
            <label for="minimum_ball">Minimal ball</label>
            <input type="number" class="form-control" id="minimum_ball" v-model="minimum_ball" autocomplete="off" required>
          </div>
          <div class="mb-3">
            <label for="price_count">Sovrinlar mirdori</label>
            <input type="number" class="form-control" id="price_count" v-model="price_count" autocomplete="off" required>
          </div>
        </div>
        <div class="col-10">
          <div class="mb-3" v-for="index in parseInt(price_count)" :key="index">
            <label :for="'price_'+ index">{{ index }} sovrin nomi</label>
            <input type="text" class="form-control" :id="'price_'+ index" autocomplete="off" v-model="awards[index-1]['name']" required
                   @keyup="changePrice(index-1, awards[index-1]['id'], $event.target.value)"
                   v-if="typeof awards[index-1] !== 'undefined'">
            <input type="text" class="form-control" :id="'price_'+ index" autocomplete="off" required v-else @keyup="changePrice(index, null, $event.target.value)">
          </div>
        </div>
      </div>
      <div class="row ms-1 mt-3" role="group">
        <button class="btn btn-primary col-8 p-2" type="submit">
          Saqlash
        </button>
        <nuxt-link :to="`/admin/championship/`" class="btn btn-secondary col-3 p-2 ms-2">
          Orqaga
        </nuxt-link>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  layout    : 'default',
  middleware: 'isAdmin',
  data() {
    return {
      success     : false,
      name        : '',
      price_count : 5,
      minimum_ball: 1500,
      prices      : [
        {
          id  : '',
          name: ''
        }
      ],
      awards      : [
        {
          id  : '',
          name: ''
        }
      ],
      content     : '',
      start_time  : '',
      end_time    : ''
    }
  },
  mounted() {
    this.$loading.show()
    this.getChampionship()
  },
  methods: {
    async getChampionship() {
      const data = await this.$axios.$get(`admin/championship/get/${this.$route.params.id}`);
      if (data.error === true) {
        this.SwalMixin(data.data.message, 'error')
        await this.$router.push(`/admin/championship/`)
      } else {
        this.start_time   = data.data.start_time;
        this.end_time     = data.data.end_time;
        this.name         = data.data.name;
        this.content      = data.data.content;
        this.minimum_ball = data.data.minimum_ball;
        this.price_count  = data.data.count;
        this.awards       = data.data.awards;
        this.awards.forEach((item, index) => {
          this.changePrice(index, item.id, item.name)
        });
        this.success = true
        this.$loading.hide()
      }
    },
    save(e) {
      e.preventDefault();
      const filtered = this.prices.filter(function (el) {
        return el != null;
      });
      this.$loading.show()
      this.$axios.post('admin/championship/update', {
        id          : parseInt(this.$route.params.id),
        name        : this.name,
        content     : this.content,
        start_time  : this.start_time,
        end_time    : this.end_time,
        minimum_ball: parseInt(this.minimum_ball),
        count       : parseInt(this.price_count),
        prices      : filtered,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        this.SwalMixin(response.data.data.message)
        this.$router.push(`/admin/championship/`)
      }).catch((error) => {
        this.SwalMixin('Qandaydur xatolik', 'error')
      }).finally(() => {
        this.$loading.hide()
      });
    },
    changePrice(key, id, name) {
      this.prices[parseInt(key)] = {id: id, name: name};
      console.log(this.prices)
    }
  }
}
</script>
