import Vue from 'vue';
import Router from 'vue-router';
import ArticleList from '@/components/ArticleList';
import ArticleDetail from '@/components/ArticleDetail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/article-list',
      name: 'ArticleList',
      component: ArticleList
    }, {
      path: '/article-detail/:id',
      name: 'ArticleDetail',
      component: ArticleDetail
    }, {
      path: '/',
      redirect: 'article-list'
    }
  ]
});
