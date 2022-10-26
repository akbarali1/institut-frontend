export default function ({store, redirect}) {
  // if (store.$ua.isFromSmartphone() === true) {
  //   window.location.re("https://betta.questa.uz");
  //  } else
  if (!store.state.auth.loggedIn) {
    return redirect("/auth/login");
  }
}
