<template>
  <div class="right slider">
    <img class="right-logo"
         src="../assets/userLogo.jpeg"
         alt="">
    <div class="title">Chromium</div>
    <div class="right-content"></div>
    <div class="tag">
      <div class="title">标签</div>
      <router-link v-for="item in list"
                   class="item"
                   :key="item._id"
                   :to="`/articles?tag_id=${item._id}&tag_name=${item.name}&catagory=`">
        <span :key="item._id">{{item.name}}</span>
      </router-link>
    </div>
    <div class="introduce">
      <div class="title">Chromium 学习</div>
      <div class="content"></div>
    </div>
    <div class="introduce">
      <div class="title">Chromium 学习</div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Slider extends Vue {
  isLoadEnd: boolean = false;
  isLoading: boolean = false;
  list: Array<Object> = [];
  total: number = 0;
  params: any = {
    keyword: "",
    pageNum: 1,
    pageSize: 100,
  };

  mounted() {
    this.handleSearch();
  }

  async handleSearch() {
    this.isLoading = true;
    const res: any = await this.$https.get(this.$urls.getTagList, {
      params: this.params
    });
    this.isLoading = false;
    if (res.status === 200) {
      if (res.data.code === 0) {
        const data: any = res.data.data;
        this.list = [...this.list, ...data.list];
        this.total = data.count;
        this.params.pageNum++;
        if (this.total === this.list.length) {
          this.isLoadEnd = true;
        }
      } else {
        this.$message.error(res.data.message);
        return;
      }
    } else {
      this.$message.error('网络错误');
      return;
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  padding-top: 50px;
}

.right {
  text-align: center;
  .right-logo {
    width: 130px;
    border-radius: 50%;
    animation: mylogo 3s;
    -moz-animation: mylogo 3s;
    -webkit-animation: mylogo 3s;
    -o-animation: mylogo 3s;
    animation-iteration-count: infinite;
  }
  .title {
    font-size: 25px;
    font-weight: bold;
  }
  .right-content {
    padding: 10px 0 20px 0;
    margin-bottom: 10px;
    border-bottom: 1 solid #eee;
    .item {
      display: inline-block;
      padding: 0 10px;
      color: #969696;
      border-right: 1px solid #eee;
      &:last-child {
        border-right: none;
      }
      .num {
        color: #333;
      }
    }
  }
  .introduce {
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 14px;
      color: #969696;
    }
    .content {
      color: #333;
      line-height: 26px;
      text-align: left;
      padding: 20px 0;
    }
    .footer {
      padding-bottom: 10px;
    }
  }
  .tags {
    min-height: 200px;
    padding: 5px 0 20px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 14px;
      color: #969696;
    }
    .item {
      display: inline-block;
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 5px;
      background-color: #eee;
      color: #333;
      margin: 10px 10px 0 0;
      text-decoration: none;
      &:hover {
        color: #409eff;
      }
    }
  }
  .classification {
    padding: 5px 0 20px 0;
    .title {
      font-size: 14px;
      color: #969696;
    }
    .item {
      text-align: center;
      padding: 10px;
      border-bottom: 1px solid #eee;
      color: #666;
      margin: 10px 10px 0 0;
    }
  }
}

@keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
  }
}

@-moz-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-webkit-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-o-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

</style>
