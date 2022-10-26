<template>
  <div>
    <div style="position: fixed; bottom: 5px; right: 5px; margin: 0px; padding: 5px 3px; z-index: 1;">
      <button type="button" class="btn btn-outline-primary btn-lg position-relative" data-bs-toggle="modal" data-bs-target="#NewsModal" @click="getNews()" style="padding: 7px 11px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-newspaper" viewBox="0 0 16 16">
          <path
            d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
          <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>
        </svg>
        <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
          <span class="visually-hidden">New alerts</span>
        </span>
      </button>
    </div>
    <div class="modal fade" id="NewsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="NewsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" :class="{'animate__animated animate__slideInRight': animated}">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="NewsModalLabel">Yangliklar</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col-12 mb-3" v-for="(item, key) in news">
                <div class="card">
                  <img class="img-fluid" :src="item.photo" role="img" alt="news image" v-if="item.photo !== null">
                  <img class="img-fluid" src="~/assets/images/news.jpg" role="img" alt="news image" v-else>
                  <div class="card-body">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <div class="collapse card-text" :id="'collapseExample'+item.id" v-html="item.content"></div>
                    <p class="mt-1">
                    <div data-bs-toggle="collapse" :data-bs-target="'#collapseExample'+item.id" aria-expanded="false" :aria-controls="'collapseExample'+item.id">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-chevron-up rotate180" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--          <div class="modal-footer">-->
          <!--            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Yopish</button>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
      news    : [],
      success : false,
      animated: false,
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
    async getNews() {
      this.$loading.show();
      await this.$axios.$get(`/news/all`).then(response => {
        this.news    = response.data.data
        this.success = true
        this.$loading.hide();
      });
      this.animate()
    },
    animate() {
      var self      = this;
      self.animated = true;
      setTimeout(function () {
        self.animated = false;
      }, 1000);
    },
  }
}
</script>
<style scoped>
.rotate180 {
  transform: rotate(180deg);
}

.rotate0 {
  transform: rotate(0deg);
}

@media screen and (min-width: 1400px) {
  .modal-dialog {
    margin-right: 0 !important;
    margin-top: 0 !important;
  }

  .modal {
    overflow: hidden;
  }
}

.modal-dialog {
  min-height: 100%;
}

.modal-content {
  min-height: 100%;
}
</style>

