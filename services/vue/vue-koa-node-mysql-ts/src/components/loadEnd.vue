<template>
  <div class="load-end"> ------------------ 没有了... ----------------- </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoadEnd extends Vue {}
</script>

<style lang="less" scoped>
.load-end {
  text-align: center;
  padding: 30px;
}
</style>


