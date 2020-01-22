import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import eps from './modules/eps'
import polls from './modules/polls'
import config from './config/config.json'

Vue.use(Vuex)

/*const debug = process.env.NODE_ENV !== 'production'*/

export default new Vuex.Store({

  state: {
    REST_URL: config.REST_URL,
    X_TOKEN: config.X_TOKEN,
    STORAGE_ID: 'PromoID'
  },

  getters: {

  },

  mutations: {

  },

  actions: {

    ShowErrow ( { rootState, dispatch }, response ) {
      var error = '';
      var ernum = 0;
      for (var key in response.errors){
        if (ernum === 6){
          error += "...";
          break;
        }
        error += response.errors[key] + '<br>';
        ernum++;
      }
      if (ernum != 0) {
        window.f7.alert(error, response.error)
      } else {
        if (response.error) {
          if (response.message) { window.f7.alert(response.message, response.error) }
          else { window.f7.alert(response.error) }
        } else {
          if (response.message) { window.f7.alert(response.message) }
          else { window.f7.alert("Неизвестная ошибка сервера") }
        }
      }
    }

  },

  modules: {
    user,
    eps,
	polls
  },

})
