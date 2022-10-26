export default function ({$axios, app}, inject) {
  const api = $axios.create({
    timeout: 10 * 60 * 1000,
    headers: {
      'accept': 'application/json',
      'accept-language': process.env.DEFAULT_LOCALE
    }
  });

  api.onRequest(config => {
    const token = app.store.getters.getAccessToken;
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    config.headers["accept-language"] = app.i18n.locale;
  });

  api.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      //app.store.commit('clearAccessToken');
      //app.$router.push(app.localePath(`/login`));
      app.store.dispatch('logout');
    }
  });
  // Set baseURL to something different
  // api.setBaseURL('http://intend.loc/api/v1/');
  //api.setBaseURL('https://service.itrust.uz/api/v1/');
  api.setBaseURL(`${process.env.API_URL}/`);

  inject('api', api);
};
