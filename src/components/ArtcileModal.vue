<template>
  <div>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">NEW ARTICLE</div>
              <div class="modal-body">
                <form id="articleForm" @submit.prevent="checkForm" action="" method="">
                  <div>
                    <label for="title">Name</label>
                    <input id="title" v-model="article.title" type="text" name="title" placeholder="title" required>
                  </div>
                  <div>
                    <label for="content">Content</label>
                    <textarea v-model="article.content" placeholder="add multiple lines" required></textarea>
                  </div>
                  <div>
                    <label for="author">Author</label>
                    <input id="author" v-model="article.author" type="text" name="author" placeholder="author" required>
                  </div>
                  <div>
                    <label for="email">Email</label>
                    <input name='email' v-model="article.email" type="text" class='extraWidth' placeholder="email" required>
                  </div>
                  <div>
                    <label for="">&nbsp;</label>
                    <input type="submit" value="POST ARTICLE" />
                    <button @click.stop.prevent="closeModal">CANCEL</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </transition>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: false,
      default: {},
    },
  },
  methods: {
    checkForm() {
      this.$emit('formSubmit', this.article);
    },
    closeModal() {
      this.$emit('formClose');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/**FORM***/
form div {
  margin-bottom: 15px;
}
label {
  float: left;
  font-size: 15px;
  margin: 10px 10px 0 0;
  text-transform: uppercase;
  background: 'blue';
  width: 150px;
}
input[type='text'],
input[type='email'] {
  margin: 0;
  font-size: 18px;
  line-height: 18px;
  height: 18px;
  padding: 10px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  font-family: Lato, sans-serif;
  color: #888;
  width: 318px;
}
input[type='text']:focus {
  color: #333;
}
textarea {
  border: 1px solid #ddd;
  font-size: 18px;
  height: 150px;
  width: 332px;
}
.extraWidth {
  width: 318px;
}
button,
input[type='submit'] {
  background: none;
  border: 0px;
  color: #888;
  font-size: 15px;
  font-family: Lato, sans-serif;
  cursor: pointer;
}
</style>
