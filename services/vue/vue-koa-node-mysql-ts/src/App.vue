<template>
  <div id="app" class="container">
    <div class="layout">
      <Articles v-if="isShow"></Articles>
      <img src="./assets/bg.jpg" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import Articles from '@/views/articles.vue';
import { isMobileOrPc } from '@/utils/utils';

@Component({
  components: {
    Articles,
  }
})
export default class App extends Vue {
  isShow: boolean = true;

  mounted() {}
}

</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  width: 1200px;
  margin: 0 auto;
  padding-top: 61px;
}
img {
  vertical-align: bottom;
}
</style>