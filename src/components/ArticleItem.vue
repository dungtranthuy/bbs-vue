<template>
  <li @click="handleViewArticle">
      <label>{{article.title}}</label>
      <label>{{article.content}}</label>
      <label>{{article.author}}</label>
      <label>{{article.email}}</label>
      <button class="editButton" @click.stop="handleEdit">Edit</button>
      <button class="deleteButton" @click.stop="handleDelete">Delete</button>
  </li>
</template>

<script>
export default {
  props: ['article'],
  methods: {
    handleEdit() {
      this.$emit('editArticle', this.article);
    },
    handleDelete() {
      this.$emit('deleteArticle', this.article);
    },
    handleViewArticle() {
      this.$emit('viewArticle', this.article);
    },
  },
};
</script>

<style scoped>
li {
  overflow: hidden;
  padding: 8px 0;
  text-align: left;
  border-bottom: 1px solid #999;
}
button {
  outline: none;
  background: none;
  border: 0px;
  color: #888;
  font-size: 15px;
  font-family: Lato, sans-serif;
  cursor: pointer;
}
label {
  font-size: 18px;
  margin: 0 10px 10px;
}
li .editButton,
li .deleteButton {
  margin: 3px 0px 0 15px;
}
</style>
