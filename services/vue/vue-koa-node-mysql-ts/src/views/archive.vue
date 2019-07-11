<template>
  <div class="archive left">
    <el-timeline>
      <el-timeline-item v-for="(l) in articlesList"
                        :key="l.year"
                        placement="top"
                        hide-timestamp>
        <h3 class="year">{{l.year}}</h3>
        <el-timeline-item v-for="(item) in l.list"
                          :key="item._id"
                          :color="item.state === 1 ? 'green' : item.state === 3 ? 'red' : ''"
                          placement="top"
                          hide-timestamp>
          <router-link :to="`/articleDetail?article_id=${item._id}`"
                       target="_blank">
            <h3 class="title">{{item.title}}</h3>
          </router-link>
          <p>{{formatTime(item.create_time)}}</p>
        </el-timeline-item>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { timestampToTime } from '@/utils/utils';
</script>