<template>
  <div class="container mt-4 mb-4">
    <label class="form-label">{{ $t('getDayStat') }}</label>
    <form class="input-group mb-3" method="post" @submit="changeForm">
      <input type="date" class="form-control" v-model="start_date" @change="changeForm">
      <input type="date" class="form-control" v-model="end_date" @change="changeForm">
      <button class="btn btn-primary" type="submit">Olish</button>
    </form>

    <div v-if="success" class="card mb-3 p-1">
      <div id="chart" v-if="chart_ready" class="card-body">
        <apexchart type="area" height="300" :options="chard_data.area.options" :series="chard_data.area.series"></apexchart>
      </div>
    </div>
    <div v-if="success" class="card mb-3 p-1">
      <div id="chart" v-if="chart_user" class="card-body">
        <apexchart type="area" height="300" :options="chard_data.areaUser.options" :series="chard_data.areaUser.series"></apexchart>
      </div>
    </div>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'

window.Apex.chart = {fontFamily: "'Roboto Slab', serif"};
export default {
  middleware: 'isAdmin',
  head() {
    return {
      title: "Surfung statistikasi"
    };
  },
  data() {
    return {
      success    : false,
      chart      : false,
      chart_user : false,
      chart_ready: false,
      start_date : '',
      end_date   : '',
      chard_data : {
        area    : {},
        areaUser: {},
      },
    }
  },
  components: {
    apexchart: VueApexCharts,
  },
  mounted() {
    this.HomePage()
  },
  methods: {
    async HomePage() {
      this.$loading.show()
      this.chart       = false;
      this.chart_user  = false;
      this.chart_ready = false;
      this.chart_pie   = false;
      this.chard_data  = {
        area    : {},
        areaUser: {},
      };
      this.$axios.get(`admin/surfing/stat` + '?start_date=' + this.start_date + '&end_date=' + this.end_date).then((res) => {
        let data                     = res.data,
            area                     = data.area,
            areaUser                 = data.users;
        this.chard_data.area.options = {
          chart     : {
            height: 300,
            type  : 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke    : {
            curve: 'straight'
          },
          xaxis     : {
            categories: area.categories,
            title     : {
              text: "Sanalar bo'yicicha yechgan testlar statistikasi"
            }
          },
          tooltip   : {
            x: {
              format: 'dd.MM.yyyy'
            },
          },
        };
        this.chard_data.area.series  = [
          {
            name: 'Sanalar bo\'yicicha statistika',
            data: area.stat,
          }
        ];

        this.chard_data.areaUser.options = {
          chart     : {
            height: 300,
            type  : 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke    : {
            curve: 'straight'
          },
          xaxis     : {
            categories: areaUser.categories,
            title     : {
              text: "Sanalar bo'yicicha userlar ko`rsan surfing"
            }
          },
          tooltip   : {
            x: {
              format: 'dd.MM.yyyy'
            },
          },
        };
        this.chard_data.areaUser.series  = areaUser.stat;

        this.success     = true;
        this.chart_user  = true;
        this.chart_ready = true;
        this.$loading.hide();
      });
      this.$loading.hide();
    },
    changeForm(e) {
      e.preventDefault();
      this.HomePage();
    },
  }
}
</script>
