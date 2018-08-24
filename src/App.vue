<template>
  <div id="app">
    <div v-if="showModal">
      <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
                <div class="modal-header">MESSAGE ERROR</div>
                <div class="modal-body">
                  <p>{{error}}</p>
                  <p>This error will disappear in {{count}}s</p>
                </div>
              </div>
            </div>
          </div>
        </transition>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'App',
  data() {
    return {
      showModal: false,
      count: 3,
    };
  },
  computed: {
    ...mapGetters(['error']),
  },
  watch: {
    error() {
      if (this.error) {
        if (this.showModal === false) {
          this.showModal = true;

          for (let i = 0; i < 3; ++i) {
            setTimeout(() => {
              --this.count;
              if (i === 2) this.showModal = false;
            }, (i + 1) * 1000);
          }
        }
      }
    },
  },
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
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

.modal-header {
  font-weight: bold;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
}
</style>
