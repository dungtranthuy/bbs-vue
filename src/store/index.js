import Vue from 'vue';
import Vuex from 'vuex';
import articles from './modules/articles';
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    articles
  }
  // strict: debug, plugins: debug ? [createLogger()] : []
})
