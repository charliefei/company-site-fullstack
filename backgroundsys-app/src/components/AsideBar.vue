<template>
  <el-aside :width="isCollapse?'64px':'200px'">
    <el-menu
        active-text-color="#ffd04b"
        class="el-menu-vertical-demo"
        text-color="black"
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        :default-active="route.fullPath"
    >
      <el-menu-item index="/index">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="/center">
        <el-icon><User /></el-icon>
        <span>个人中心</span>
      </el-menu-item>

      <el-sub-menu index="/user-manage">
        <template #title>
          <el-icon><Edit /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/adduser">
          <el-icon><EditPen /></el-icon>
          添加用户
        </el-menu-item>
        <el-menu-item index="/user-manage/userlist">
          <el-icon><User /></el-icon>
          用户列表
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon><MessageBox /></el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/news-manage/addnews">
          <el-icon><DocumentAdd /></el-icon>
          添加新闻
        </el-menu-item>
        <el-menu-item index="/news-manage/newslist">
          <el-icon><Document /></el-icon>
          新闻列表
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon><Files /></el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product-manage/addproduct">
          <el-icon><DocumentAdd /></el-icon>
          添加产品
        </el-menu-item>
        <el-menu-item index="/product-manage/productlist">
          <el-icon><Document /></el-icon>
          产品列表
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import {
  Edit,
  House,
  User,
  EditPen,
  DocumentAdd,
  Document,
  MessageBox,
  Files
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const route = useRoute()

defineProps({
  isCollapse: {
    type: Boolean
  }
})
</script>

<style scoped lang="scss">
.el-menu {
  height: 100%;
  border-right:none;
  background: rgb(238,174,202);
  background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);

  .el-sub-menu{
    .el-menu-item{
      background: rgb(238,174,202);
      background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
    }
  }
}
</style>