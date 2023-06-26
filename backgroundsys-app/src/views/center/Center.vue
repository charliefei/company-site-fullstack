<template>
  <el-page-header 
    :icon="UserFilled"
    title="企业门户管理系统"
  >
    <template #content>
      <span class="text-large font-600 mr-3"> 个人中心 </span>
    </template>
  </el-page-header>

  <el-row :gutter="20" class="content-box">
    <el-col :span="8" class="left">
      <el-card class="box-card">
        <el-avatar 
          shape="square" 
          :size="100" 
          fit="cover" 
          :src="avatarUrl" 
        />
        <h3 style="">{{ username }}</h3>
        <h5 style="color: #ccc;">{{ role }}</h5>
      </el-card>
    </el-col>

    <el-col :span="16" class="right">
      <el-card>
        <h3>个人信息 👤</h3>
        <hr style="margin-bottom: 10px;"/>

        <el-form
          ref="userFormRef"
          :model="userForm"
          :rules="rules"
          label-width="120px"
          :size="formSize"
          status-icon
        >
          <el-form-item label="姓名" prop="username">
            <el-input v-model="userForm.username" placeholder="请输入姓名"/>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-select v-model="userForm.gender" placeholder="未知">
              <el-option label="男" :value="1" />
              <el-option label="女" :value="2" />
              <el-option label="保密" :value="0" />
            </el-select>
          </el-form-item>

          <el-form-item label="个人简介" prop="introduction">
            <el-input v-model="userForm.introduction" type="textarea" />
          </el-form-item>

          <el-form-item label="头像" prop="avatar">
            <Upload :image="userForm.avatar" :handleChange="handleChange" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm(userFormRef)">
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { UserFilled } from '@element-plus/icons-vue'
import { useStore } from "vuex";
import { computed,ref,reactive } from "vue";
import { useSubmitForm } from '@/hooks/editHook.js'
import Upload from '../../components/Upload.vue';

const store = useStore()
const avatarUrl = computed(() => {
  return store.state.userInfo.avatar ?
    'http://localhost:3000' + store.state.userInfo.avatar :
    'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
})
const username = computed(() => store.state.userInfo.username)
const role = computed(() => store.state.userInfo.role == 1 ? '管理员' : '编辑')
const { gender, introduction, avatar } = store.state.userInfo

const formSize = ref('default')
const userFormRef = ref()
const userForm = reactive({
  username: username.value,
  gender,
  avatar,
  introduction,
  file: null
})
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  introduction: [
    { required: true, message: '请输入个人简介', trigger: 'blur' }
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'change' }
  ]
})

const handleChange = (file) => {
  const url = URL.createObjectURL(file.raw)
  console.log('center-上传头像', url);
  userForm.file = file.raw
  userForm.avatar = url
}

// 提交表单
const submitForm = useSubmitForm(userForm, store)
</script>

<style scoped lang="scss">
.content-box{
  margin-top: 10px;

  .box-card{
    text-align: center;
  }
}
</style>