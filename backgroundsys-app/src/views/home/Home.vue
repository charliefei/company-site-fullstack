<template>
  <el-page-header :icon="HomeFilled" title="企业门户管理系统">
    <template #content>
      <span class="text-large font-600 mr-3"> 首页 </span>
    </template>
  </el-page-header>

  <el-card class="box-card">
    <el-row :gutter="8">
      <el-col :span="4">
        <el-card shadow="hover"> 
          <el-avatar 
            shape="square" 
            :size="100" 
            fit="cover" 
            :src="avatarUrl" 
          />
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card shadow="hover">
          <h4 style="font-style: italic;color: red;">
            {{ welcomeText }}
            <span>{{ user }}</span>
          </h4>
          <hr style="margin: 10px 0 10px 0"/>
          <div style="font-style: italic;font-size: 15px;">
            简介：{{ userDetail }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="box-card product-show">
    <template #header>
      <div class="card-header">
        <span>公司产品</span>
      </div>
    </template>

    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script setup>
import { HomeFilled } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const avatarUrl = computed(() => {
  return store.state.userInfo.avatar ?
    'http://localhost:3000' + store.state.userInfo.avatar :
    'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
})

const user = computed(() => {
  if (store.state.userInfo.gender === 1) {
    return store.state.userInfo.role === 1 ?
      '管理员先生' :
      store.state.userInfo.username + '先生'
  } else if (store.state.userInfo.gender === 2) {
    return store.state.userInfo.role === 1 ?
      '管理员女士' :
      store.state.userInfo.username + '女士' 
  } else {
    return store.state.userInfo.role === 1 ?
      '管理员' :
      store.state.userInfo.username
  }
})

const userDetail = computed(() => {
  return store.state.userInfo.introduction
})

const welcomeText = computed(() => {
  return new Date().getHours() < 12 ? 
  '早上坏😊！今天又是元气大伤的一天～' : '累了🥱，就喝杯咖啡提提神吧～'
})
</script>

<style scoped lang="scss">
.box-card{
  margin-top: 10px;

  .el-card{
    height: 100%;
    position: relative;

    .el-avatar{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.product-show{
  height: 52.5vh;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>