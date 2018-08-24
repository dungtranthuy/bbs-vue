import articleApi from '../../api/article'

// initial state
const state = {
  articles: [],
  article: {},
  error: ''
}

// getters
const getters = {
  pageSize: state => state.articles.length,
  articles: state => state.articles,
  article: state => state.article,
  error: state => state.error
}

const handleError = async(commit, fn) => {
  try {
    const res = await fn();
    return res;
  } catch (err) {
    commit('getError', err.message)
  }
}

// actions
const actions = {
  getArticles: async({commit}) => handleError(commit, async() => {
    const articles = await articleApi.apiFetchArticles();
    commit('getArticles', articles)
  }),
  addNewArticle: async({
    commit
  }, article) => handleError(commit, async() => {
    const articles = await articleApi.apiAddArticle(article);
    commit('addNewArticle', articles)
  }),
  updateArticle: async({
    commit
  }, article) => handleError(commit, async() => {
    const data = await articleApi.apiUpdateArticle(article);
    commit('updateArticle', data)
  }),
  deleteArticle: async({
    commit
  }, article) => handleError(commit, async() => {
    await articleApi.apiDeleteArticle(article.id);
    commit('deleteArticle', article)
  }),
  detailArticle: async({
    commit
  }, id) => handleError(commit, async() => {
    const data = await articleApi.apiDetailArticle(id);
    commit('getDetailArticle', data)
    return data;
  })
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
  },
  getError(state, err) {
    state.error = err
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
