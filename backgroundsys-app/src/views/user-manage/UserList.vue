<template>
  <el-page-header 
    :icon="UserFilled"
    title="用户管理"
  >
    <template #content>
      <span class="text-large font-600 mr-3"> 用户列表 </span>
    </template>
  </el-page-header>

  <el-card>
    <el-table :data="userList" style="width: 100%;">
      <el-table-column label="用户名" width="180">
        <template #default="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column label="密码" width="180">
        <template #default="scope">
          {{ scope.row.password }}
        </template>
      </el-table-column>

      <el-table-column label="个人简介" width="180">
        <template #default="scope">
          {{ scope.row.introduction }}
        </template>
      </el-table-column>

      <el-table-column label="头像" width="180">
        <template #default="scope">
          <div v-if="scope.row.avatar">
            <el-avatar
              :size="50"
              :src="'http://localhost:3000'+scope.row.avatar"
            />
          </div>
          <div v-else>
            <el-avatar 
              :size="50"
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column label="角色" width="180">
        <template #default="scope">
          <el-tag v-if="scope.row.role === 1">管理员</el-tag>
          <el-tag v-else class="ml-2" type="success">编辑</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>

          <el-popconfirm 
            title="您确定要删除该用户吗？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button
                size="small"
                type="danger"
              >
                删除
              </el-button>              
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>      
    </el-table>
  </el-card>

  <!-- 用户编辑对话框 -->
  <el-dialog
    v-model="dialogVisible"
    title="用户编辑"
    width="50%"
    style="border-radius: 8px;"
  >

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
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditConfirm(userFormRef,userForm)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { 
  useGetUserList,
  useHandleEdit, 
  useHandleEditConfirm, 
  useHandleDelete 
} from '@/hooks/userHook'
import { UserFilled } from '@element-plus/icons-vue';

const userList = ref([])

onMounted(() => {
  getUserList(userList)
})

const getUserList = useGetUserList()

const formSize = ref('default')
const userFormRef = ref()
const userForm = reactive({
  _id: '',
  username: '',
  password: '',
  avatar: '',
  introduction: '',
  role: ''
})
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入个人简介', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择权限', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const dialogVisible = ref(false)
const handleEdit = useHandleEdit(dialogVisible, userForm)
const handleEditConfirm = useHandleEditConfirm(getUserList, userList, dialogVisible)

const handleDelete = useHandleDelete(getUserList, userList)
</script>

<style scoped lang="scss">
.el-card{
  margin-top: 10px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>