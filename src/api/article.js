import axios from 'axios'

const API_URL = 'http://localhost:3000';

const apiFetchArticles = async() => {
  const response = await axios.get(`${API_URL}/articles`)
  return response.data
}

const apiAddArticle = async(article) => {
  const response = await axios.post(`${API_URL}/articles`, article)
  return response.data
}

const apiUpdateArticle = async(article) => {
  const response = await axios.put(`${API_URL}/articles/${article.id}`, article)
  return response.data
}

const apiDeleteArticle = async(id) => {
  const response = await axios.delete(`${API_URL}/articles/${id}`)
  return response.data
}

const apiDetailArticle = async(id) => {
  const response = await axios.get(`${API_URL}/articles/${id}`)
  return response.data
}

export default {
  apiFetchArticles,
  apiAddArticle,
  apiUpdateArticle,
  apiDeleteArticle,
  apiDetailArticle
}
