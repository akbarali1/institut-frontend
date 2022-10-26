<template>
  <span>
    <span v-if="mobile">
      <img src="~/assets/images/status/1.png" class="img-fluid m-3" alt="baby" v-if="status_id === 1">
      <img src="~/assets/images/status/2.jpg" class="img-fluid m-3" alt="ABITURIYENT" v-if="status_id === 2" style="width: 160px;">
      <div class="fs-2 p-1 text-center mb-1 badge bg-primary" style="font-weight: bold;text-transform: uppercase;">
        {{ status_name }}
      </div>
    </span>
    <span v-else>
      <img src="~/assets/images/status/1.png" class="img-fluid mt-4 mb-2" alt="beginer" id="step3" v-if="status_id === 1">
      <img src="~/assets/images/status/2.jpg" class="img-fluid mt-4 mb-2" alt="ABITURIYENT" id="step3" v-if="status_id === 2">
      <div class="fs-4 text-center  mb-1 badge bg-primary" style="font-weight: bold;text-transform: uppercase;" id="step4">
        {{ status_name }}
      </div>
    </span>
  </span>
</template>
<script>
export default {
  name   : 'user-status',
  props  : {
    status_name: {
      type    : String,
      required: true,
    },
    status_id  : {
      default: 1
    },
    mobile     : {
      type   : Boolean,
      default: false
    }
  },
}
</script>
