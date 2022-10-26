<template>
  <ChampionshipTable :requestUrl="`rating/championship/all`"/>
</template>
<script>
import ChampionshipTable from "../../../components/ChampionshipTable";

export default {
  components: {ChampionshipTable},
  middleware: 'isAuthenticated',
  head() {
    return {
      title: "Foydalanuvchilar reytingi"
    };
  },
}
</script>

