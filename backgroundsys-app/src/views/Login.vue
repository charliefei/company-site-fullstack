<template>
  <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="options"
  />

  <el-form
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="loginRules"
      label-width="75px"
      class="form-container"
  >
    <h1>后台管理系统(CRUD)</h1>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" @keyup.enter="submitForm(loginFormRef)" />
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="submitForm(loginFormRef)">
        提交
      </el-button>
      <el-button @click="resetForm(loginFormRef)">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {useParticles,useInitForm,useSubmitForm} from "@/hooks/loginHook";
const router = useRouter()
const store = useStore()
// 初始化login页面粒子效果
const {options, particlesInit} = useParticles();

// 初始化表单相关数据绑定
const {loginFormRef, loginForm, loginRules, resetForm} = useInitForm();

// 提交表单
const {submitForm} = useSubmitForm(loginForm, router, store);
</script>

<style scoped>
.form-container {
  width: 50%;
  height: 50%;
  box-sizing: border-box;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, .5);
  border-radius: 15px;
  color: white;
  text-align: center;
  padding: 20px 20px;
}

h1{
  font-size: 30px;
  padding-bottom: 40px;
}

/* 样式穿透 */
:deep(.el-form-item__label) {
  color: white;
}
</style>