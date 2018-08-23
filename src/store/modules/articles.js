import articleApi from '../../api/article'

// initial state
const state = {
  articles: [],
  article: {}
}

// getters
const getters = {
  pageSize: state => state.articles.length,
  articles: state => state.articles,
  article: state => state.article
}

// actions
const actions = {
  getArticles: async({commit}) => {
    const articles = await articleApi.apiFetchArticles();
    commit('getArticles', articles)
  },
  addNewArticle: async({
    commit
  }, article) => {
    const articles = await articleApi.apiAddArticle(article);
    commit('addNewArticle', articles)
  },
  updateArticle: async({
    commit
  }, article) => {
    const data = await articleApi.apiUpdateArticle(article);
    commit('updateArticle', data)
  },
  deleteArticle: async({
    commit
  }, article) => {
    await articleApi.apiDeleteArticle(article.id);
    commit('deleteArticle', article)
  },
  detailArticle: async({
    commit
  }, id) => {
    const data = await articleApi.apiDetailArticle(id);
    commit('getDetailArticle', data)
  }
}

// mutations
const mutations = {
  getArticles(state, articles) {
    state.articles = JSON.parse(JSON.stringify(articles));
  },
  addNewArticle(state, article) {
    state.articles = [
      ...state.articles,
      article
    ]
  },
  updateArticle(state, article) {
    state
      .articles
      .map(item => item.id === article.id
        ? article
        : item)
  },
  deleteArticle(state, article) {
    state
      .articles
      .filter(item => item.id !== article.id)
  },
  getDetailArticle(state, article) {
    state.article = article
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
