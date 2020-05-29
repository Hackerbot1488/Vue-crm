import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  actions: {
    async fetchCurrency () {
      // const key = process.env.VUE_APP_FIXER
      const key = process.env.VUE_APP_VALUTE
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/USD`).then(response => response.json())
      console.log(res)
      var date = new Date().toLocaleDateString()
      const numbers = date.split('.')
      date = ''
      for (var i = numbers.length - 1; i >= 0; i--) {
        if (i === 0) {
          date += numbers[i]
        } else {
          date += numbers[i] + '-'
        }
      }
      return {
        date,
        rates: res.conversion_rates
      }
      // return res
    }
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
