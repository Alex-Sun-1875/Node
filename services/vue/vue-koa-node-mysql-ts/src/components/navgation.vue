<template>
  <div>
    <div v-if="!isMobile"
         class="nav">
      <div class="nav-content">
        <el-row :gutter="20">
          <el-col :span="3">
            <router-link to="/">
              <img class="logo"
                   src="../assets/logo.jpg"
                   alt="home">
            </router-link>
          </el-col>
          <el-col :span="16">
            <el-menu :router="true"
                     :default-active="activeIndex"
                     active-text-color="#409eff"
                     class="el-menu-demo"
                     mode="horizontal"
                     @select="handleSelect">
              <el-menu-item :route="l.path"
                            :index="l.index"
                            v-for="l in list"
                            :key="l.index">
                {{l.name}}
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col v-if="usetInfo._id"
                  :span="5">
            <div class="nav-right">
              <el-dropdown @command="handleLogout">
                <span class="el-dropdown-link">
                  {{userInfo.name}}<i class="el-icon-arrow-down el-icon-right"></i>
                </span>
                <img v-if="!userInfo.avatar"
                     class="user-img"
                     src="../assets/user.png"
                     alt="user">
                <img v-if="userInfo.avatar"
                     class="user-img"
                     :src="userInfo.avatar"
                     alt="user">
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
          <el-col v-else
                  :span="4">
            <div class="nav-right">
              <el-button size="small"
                         type="primary"
                         @click="handleClick('login')">
                登录
              </el-button>
              <el-button size="small"
                         type="danger"
                         @click="handleClick('register')">
                注册
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-else
         class="nav">
      <div class="nav-mobile">
        <div class="nav-mobile-logo">
          <router-link to="/">
            <img class="logo fl"
                 src="../assets/logo.jpg"
                 alt="logo">
          </router-link>
        </div>
        <div class="title">{{title}}</div>
        <div class="menu"
             :class="{'enter-slideUp': enterSlideUp, 'leave-slideDown': leaveSlideDown}">
          <div class="list">
            <div @click="handleClickMenu"
                 class="item">
              <router-link to="/">首页</router-link>
            </div>
            <div @click="handleClickMenu('/articles')"
                 class="item">
              <router-link to="/articles">文章<router-link>
            </div>
            <div @click="handleClickMenu('/archive')"
                 class="item">
              <router-link to="/archive">归档</router-link>
            </div>
            <div @click="handleClickMenu('/project')"
                 class="item">
              <router-link to="/project">项目</router-link>
            </div>
            <div @click="handleClickMenu('/timeline')"
                 class="item">
              <router-link to="/timeline">历程</router-link>
            </div>
            <div @click="handleClickMenu('/message')"
                 class="item">
              <router-link to="/message">留言</router-link>
            </div>
            <div @click="handleClickMenu('/about')"
                 class="item">
              <router-link to="/about">关于</router-link>
            </div>
            <div @click="handleClickMenu('/login')"
                 class="item">
              <span v-if="userInfo._id">{{ userInfo.name }}</span>
              <span v-else>登录</span>
            </div>
            <div v-if="!userInfo._id"
                 @click="handleClickMenu('register')"
                 class="item">
              注册
            </div>
            <div v-if="userInfo._id"
                 @click="handleClickMenu('/logout')"
                 class="item">
              退出登录
            </div>
          </div>
      </div>
    </div>
    <div v-if="isShow"
         class="mask"
         :class="{'mask-fade-out': leaveSlideDown}"
         @click="handleHideMenu">
    </div>
    <RegisterAndLogin :visible="visible"
                      :isMoible="isMobile"
                      :handleFlag="handleFlag"
                      @ok="handleOk"
                      @cancel="handleCancel">
    </RegisterAndLogin>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import RegisterAndLogin from '@/components/registerAndLogin';
import { isMobileOrPc, getQueryStringByName } from '@/utils/utils';
import { Route } from 'vue-router';
import { ObjectFit } from 'element-ui/types/image';

@Component({
  components: {
    RegisterAndLogin,
  }
})
export default class Navigation extends Vue {
  visible: boolean = false;
  handleFlag: string = '';
  title: string = '首页';
  list: Array<Object> = [
    {
      index: '1',
      path: '/',
      name: '首页',
    },
    {
      index: '2',
      path: '/articles',
      name: '文章'
    },
    {
      index: '3',
      path: '/archive',
      name: '归档',
    },
    {
      index: '4',
      path: '/project',
      name: '项目',
    },
    {
      index: '5',
      path: '/timeline',
      name: '历程',
    },
    {
      index: '6',
      path: '/message',
      name: '留言',
    },
    {
      index: '7',
      path: '/about',
      name: '关于'
    }
  ];
  activeIndex: string = '1';
  enterSlideUp: boolean = false;
  leaveSlideDown: boolean = false;
  isShow: boolean = false;
  isMobile: boolean = isMobileOrPc();
}

</script>