<template>
  <el-page-header 
    :icon="UserFilled"
    title="用户管理"
  >
    <template #content>
      <span class="text-large font-600 mr-3"> 添加用户 </span>
    </template>
  </el-page-header>

  <el-card>
    <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="rules"
      label-width="120px"
      :size="formSize"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" placeholder="请输入用户名"/>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" placeholder="请输入密码" type="password"/>
      </el-form-item>
      
      <el-form-item label="角色" prop="role">
        <el-select v-model="userForm.role" placeholder="编辑">
          <el-option label="管理员" :value="1" />
          <el-option label="编辑" :value="2" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="个人简介" prop="introduction">
        <el-input v-model="userForm.introduction" type="textarea" />
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleChange"
        >
          <img v-if="userForm.avatar" :src="uploadAvatarUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm(userFormRef)">
          添加用户
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Plus, UserFilled } from '@element-plus/icons-vue';
import { useUserAdd } from '@/hooks/userHook.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const formSize = ref('default')
const userFormRef = ref()
const userForm = reactive({
  username: '',
  password: '',
  gender: 0,
  avatar: '',
  introduction: '',
  file: null,
  role: 2,
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
  ],
  role: [
    { required: true, message: '请选择权限', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const handleChange = (file) => {
  const url = URL.createObjectURL(file.raw)
  console.log('useradd-上传头像', url);
  userForm.file = file.raw
  userForm.avatar = url
}

const uploadAvatarUrl = computed(() => 
  userForm.avatar.includes('blob') ? 
  userForm.avatar : 'http://localhost:3000' + userForm.avatar
)

const submitForm = useUserAdd(userForm, router)
</script>

<style scoped lang="scss">
.el-card{
  margin-top: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
}
</style>