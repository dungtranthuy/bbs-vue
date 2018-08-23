<template>
    <div>
    <h1>ARTICLES LIST</h1>
    <button id="show-modal" @click="showModal = true">ADD NEW ARTICLE</button>
    <article-modal
      v-if="showModal"
      @formSubmit="handleSubmit"
      :article="data"
      @formClose="handleCloseModal"></article-modal>
    <ul>
        <article-item
          v-for="(article, index) in dataArticles"
          :key="index"
          :article="article"
          @editArticle="handleEdit"
          @deleteArticle="handleDelete"
          @viewArticle="handleViewArticle"
        />
    </ul>
    <div class="bottomPage">
      <select class='chooseNumPage' @change="changeNumberPage" v-model="selected">
          <!-- <option disabled value="">Please select one</option> -->
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
      </select>
      <div class='paging'>
        <button class="prevButton" @click.prevent="handlePrev">Prev</button>
        <label class='currentPage'>{{index}}</label>
        <button class="nextButton" @click.prevent="handleNext">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import ArticleItem from './ArticleItem';
import ArticleModal from './ArtcileModal';

export default {
  name: 'App',
  data() {
    return {
      showModal: false,
      data: {},
      index: 1,
      numberPerPage: 1,
      selected: 1,
    };
  },
  components: {
    ArticleModal,
    ArticleItem,
  },
  computed: {
    ...mapGetters(['articles', 'pageSize']),
    start: function() {
      return (this.index - 1) * this.numberPerPage;
    },
    end: function() {
      return this.start + this.numberPerPage;
    },
    dataArticles: function() {
      return this.articles.slice(this.start, this.end);
    },
  },
  methods: {
    handleSubmit(article) {
      article.updatedDate = new Date().toISOString();
      if (article.id) {
        this.updateArticle(article);
      } else {
        article.count = 0;
        this.addNewArticle(article);
      }
      this.data = {};
      this.showModal = false;
    },
    handleCloseModal() {
      this.showModal = false;
    },
    handleEdit(data) {
      this.data = data;
      this.showModal = true;
    },
    handleDelete(data) {
      this.deleteArticle(data).then(() => {
        this.getArticles();
      });
    },
    handleViewArticle(data) {
      const id = data.id;
      ++data.count;
      this.updateArticle(data).then(() => {
        this.$router.push({
          path: `/article-detail/${id}`,
        });
      });
    },
    handlePrev() {
      if (this.index > 1) {
        --this.index;
      }
    },
    handleNext() {
      if (this.index * this.numberPerPage < this.pageSize) {
        ++this.index;
      }
    },
    changeNumberPage(e) {
      this.numberPerPage = this.selected;
      this.index = 1;
    },
    ...mapActions({
      getArticles: 'getArticles',
      addNewArticle: 'addNewArticle',
      updateArticle: 'updateArticle',
      deleteArticle: 'deleteArticle',
    }),
  },
  created() {
    this.getArticles();
  },
};
</script>

<style scoped>
ul {
  margin: 20px auto;
  padding: 20px;
  width: 800px;
  background: #ccc;
}
.bottomPage {
  width: 800px;
  margin: 20px auto;
}
.paging {
  float: right;
}
.chooseNumPage {
  float: right;
  margin: 3px 0 0 20px;
}
</style>
