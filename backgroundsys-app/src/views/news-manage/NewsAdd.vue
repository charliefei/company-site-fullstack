<template>
  <el-page-header 
    :icon="DocumentAdd"
    title="文章管理"
  >
    <template #content>
      <span class="text-large font-600 mr-3"> 添加文章 </span>
    </template>
  </el-page-header>

  <el-card>
    <el-form
      ref="articleFormRef"
      :model="articleForm"
      :rules="rules"
      label-width="120px"
      :size="formSize"
      status-icon
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="articleForm.title" placeholder="请输入标题"/>
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <MyEditor @getContent="getContent"/>
      </el-form-item>

      <el-form-item label="分类" prop="category">
        <el-select v-model="articleForm.category" placeholder="最新动态">
          <el-option 
            v-for="cate in options" 
            :key="cate.label" 
            :label="cate.label"
            :value="cate.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="封面" prop="cover">
        <Upload :image="articleForm.cover" :handle-change="handleChange" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(articleFormRef)">
          添加
        </el-button>
      </el-form-item>      
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import MyEditor from '../../components/MyEditor.vue';
import Upload from '../../components/Upload.vue';
import { DocumentAdd } from '@element-plus/icons-vue';
import { useSubmitForm } from '../../hooks/newsHook'
const router = useRouter()

const formSize = ref('default')
const articleFormRef = ref()
const articleForm = reactive({
  title: '',
  content: '',
  category: 1, // 1最新动态 2典型案例 3通知公告
  cover: '',
  file: null,
  isPublish: 0 // 0未发布 1已发布
})
const rules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' },
  ],
  category: [
    { required: true, message: '请选择文章分类', trigger: 'change' },
  ],
  isPublish: [
    { required: true, message: '请点击是否发布', trigger: 'change' },
  ]
})
const options = [
  {
    label: '最新动态',
    value: 1
  },
  {
    label: '典型案例',
    value: 2
  },
  {
    label: '通知公告',
    value: 3
  }
]

const getContent = (valueHtml) => {
  // console.log(valueHtml.value);
  articleForm.content = valueHtml.value
}

const handleChange = file => {
  const url = URL.createObjectURL(file.raw)
  console.log('newsadd-上传文章封面', url);

  articleForm.file = file.raw
  articleForm.cover = url
}

const submitForm = useSubmitForm(articleForm, router)
</script>

<style scoped lang="scss">
.el-card{
  margin-top: 20px;
}
</style>