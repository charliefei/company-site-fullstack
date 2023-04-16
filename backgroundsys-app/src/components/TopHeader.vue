<template>
  <el-header>
    <div class="left">
      <el-icon
          @click="changeCollapseState"
          style="cursor: pointer"
      >
        <Menu />
      </el-icon>
      <h2 style="margin-left: 10px;display:inline-block">XXX管理系统</h2>
    </div>
    <div class="right">
      <h2 style="display: inline-block;margin-right: 10px">
        欢迎 {{ store.state.userInfo.username }} 回来
      </h2>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon :size="30">
            <User />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="redirectToCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import {Menu,User} from '@element-plus/icons-vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
const store = useStore()
const router = useRouter()

const changeCollapseState = () => {
  store.commit("changeCollapseState")
}

const redirectToCenter = () => {
  router.push('/center')
}

const logout = () => {
  localStorage.removeItem('token')
  store.commit('clearUserInfo')
  router.push('/login')
}
</script>

<style scoped lang="scss">
.el-header{
  background-color: #2d3a4b;
  color:white;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-dropdown {
    margin-top: 15px;

    .el-dropdown-link{
      cursor: pointer;
      color: #ccc;
      display: flex;
      align-items: center;
      outline: none;
    }
  }
}
</style>