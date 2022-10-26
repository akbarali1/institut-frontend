export default function ({store, redirect}) {
   if (store.getters.getUserInfo.userData.rights <= 1) {
    return redirect("/");
  }
}

// this.$store.getters.getUserInfo.userData.rights > 1
