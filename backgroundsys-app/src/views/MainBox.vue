<template>
  <div class="common-layout">
    <el-container>
      <AsideBar :isCollapse="store.state.isCollapse" />
      <el-container direction="vertical">
        <TopHeader />
        <el-main style="margin: 0;padding: 15px;">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import AsideBar from "@/components/AsideBar.vue";
import TopHeader from '@/components/TopHeader.vue'
import {useStore} from 'vuex'

const store = useStore()
</script>

<style scoped lang="scss">
</style>