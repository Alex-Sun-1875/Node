<template>
  <div>
    <i v-if="isShowBtn"
       @click="toTop"
       class="el-icon-arrow-up">
    </i>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ArrowUp extends Vue {
  isShowBtn: boolean = false;

  mounted() {
    // 向下滑动 20 px, 出现"返回顶部" 按钮
    window.onscroll = () => {
      if (window.document.body.scrollTop > 100 ||
          window.document.documentElement.scrollTop > 100) {
        this.isShowBtn = true;
      } else {
        this.isShowBtn = false;
      }
    }
  }

  toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
</script>
<style scoped>
.el-icon-arrow-up {
  position: fixed;
  bottom: 50px;
  right: 40px;
  z-index: 99;
  border: none;
  outline: none;
  background-color: rgb(119, 118, 118);
  cursor: pointer;
  padding: 15px;
  color: white;
  border-radius: 50%;
}

.el-icon-arrow-up:hover {
  background-color: #555;
}

</style>