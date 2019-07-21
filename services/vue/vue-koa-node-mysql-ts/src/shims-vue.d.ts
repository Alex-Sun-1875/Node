import VueRouter, { Route } from 'vue-router';

/*
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
*/

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter; // 表示 Vue 的 this 下面有这个东西
    $route: Route;
    $https: any; // 不知道的东西可以定义为 any
    $urls: any;
    $Message: any;
  }
}