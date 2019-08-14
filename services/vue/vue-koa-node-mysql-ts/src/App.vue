<template>
  <div id="app" class="container">
    <Navigation v-if="isShowNav" />
    <div class=" layout">
      <router-view />
      <Slider v-if="isShowSlider"></Slider>
    </div>
    <ArrowUp></ArrowUp>
    <Footer v-show="isShowNav"></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import Navigation from '@/components/navigation.vue';
import Slider from '@/components/slider.vue';
import Footer from '@/components/footer.vue';
import ArrowUp from '@/components/arrowUp.vue';
import { isMobileOrPc } from '@/utils/utils';

// 移动端 rem 单位适配
if (isMobileOrPc()) {
  var width = window.screen.width;
  window.document.getElementsByTagName('html')[0].style.fontSize = width / 7.5 + 'px';
}

@Component({
  components: {
    Navigation,
    Slider,
    ArrowUp,
    Footer,
  }
})
export default class App extends Vue {
  isShowNav: boolean = false;
  isShowSlider: boolean = false;

  mounted() {
    this.routeChange(this.$route, this.$route);
  }

  @Watch('$route')
  routeChange(val: Route, oldVal: Route) {
    // const referrer: any = window.document.getElementById('referrer');
    if (val.path === '/') {
      this.isShowNav = true;
      // referrer.setAttribute('content', 'always');
    } else {
      this.isShowNav = true;
      // referrer.setAttribute('content', 'never');
    }
    if (val.path === '/articles' ||
        val.path === '/archive' ||
        val.path === '/project' ||
        val.path === '/timeline' ||
        val.path === '/message') {
          this.isShowSlider = true;
        } else {
          this.isShowSlider = false;
        }
        if (isMobileOrPc()) {
          this.isShowSlider = false;
        }
  }
}

</script>

<style lang="scss">
@import url('./scss/index.scss');
@import url('./scss/mobile.scss');
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
