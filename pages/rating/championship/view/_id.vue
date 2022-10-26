<template>
  <ChampionshipTable :requestUrl="`rating/championship/all/${this.$route.params.id}`"/>
</template>
<script>
export default {
  middleware: 'isAuthenticated',
  head() {
    return {
      title: "O'tkazilgan chempionat natijalari"
    };
  },
}
</script>
