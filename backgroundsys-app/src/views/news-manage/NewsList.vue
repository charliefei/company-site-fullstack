<template>
  <el-page-header 
    :icon="Document"
    title="文章管理"
  >
    <template #content>
      <span class="text-large font-600 mr-3"> 文章列表 </span>
    </template>
  </el-page-header>

  <el-card>
    <el-table :data="articleList" style="width: 100%;">
      <el-table-column label="标题">
        <template #default="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column label="分类">
        <template #default="scope">
          {{ showCategory(scope.row.category) }}
        </template>
      </el-table-column>

      <el-table-column label="更新时间">
        <template #default="scope">
          {{ showEditTime(scope.row.editTime) }}
        </template>
      </el-table-column>

      <el-table-column label="是否发布">
        <template #default="scope">
          <el-switch 
            v-model="scope.row.isPublish" 
            :active-value="1"
            :inactive-value="0"
            @change="handleSwitchPublishState(scope.row)"
          />
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button 
            size="small" 
            circle
            :icon="Star"
            type="success"
            @click="handleArticlePreview(scope.row)"
          />

          <el-button 
            size="small" 
            circle
            :icon="Edit"
            type="primary"
            @click="handleArticleEdit(scope.row)"
          />

          <el-popconfirm 
            title="您确定要删除该文章吗？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="handlArticleDelete(scope.row)"
          >
            <template #reference>
              <el-button 
                size="small" 
                circle
                :icon="Delete"
                type="danger"
              />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column> 
    </el-table>
  </el-card>

  <!-- 文章预览 -->
  <el-dialog
    v-model="dialogVisible"
    title="文章预览"
    width="50%"
    style="border-radius: 8px;"
  >
    <section class="article-wrapper">
      <section class="article-title">
        <h2>{{ previewArticle.title }}</h2><br/>
        <span>{{ showEditTime(previewArticle.editTime) }}</span>
      </section>

      <el-divider>
        <el-icon>
          <StarFilled />
        </el-icon>
      </el-divider>

      <section class="article-content" v-html="previewArticle.content">
      </section>
    </section>
  </el-dialog>

  <!-- 文章编辑 -->
  <el-dialog
    v-model="editDialogVisible"
    title="文章编辑"
    width="50%"
    style="border-radius: 8px;"
  >
    <el-form
      ref="articleFormRef"
      :model="articleForm"
      label-width="120px"
      status-icon
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="articleForm.title" placeholder="请输入标题"/>
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <MyEditor @getContent="getContent" :content="articleForm.content"/>
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
    </el-form>

    <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleArticleEditConfirm(articleFormRef,articleForm)">
            确认
          </el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {Document,Star,Edit,Delete,StarFilled} from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import { 
  useGetArticleList,
  useHandleSwitchPublishState,
  useHandleArticlePreview,
  useHandlArticleDelete,
  useHandleArticleEdit,
  useHandleArticleEditConfirm
 } from '@/hooks/newsHook'
import moment from 'moment'
import MyEditor from '../../components/MyEditor.vue';

const articleList = ref([])
const previewArticle = ref({})
const dialogVisible = ref(false)
const editDialogVisible = ref(false)

const articleFormRef = ref()
const articleForm = reactive({
  _id: 0,
  title: '',
  content: '',
  category: 1, // 1最新动态 2典型案例 3通知公告
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

onMounted(() => {
  getArticleList(articleList)
})

const getArticleList = useGetArticleList()

const showCategory = (category) => {
  const categories = ['最新动态', '典型案例', '通知公告']
  return categories[category - 1]
}

const showEditTime = (editTime) => {
  return moment(editTime).format('YYYY/MM/DD HH:mm:ss')
}

const handleSwitchPublishState = useHandleSwitchPublishState(getArticleList, articleList)
const handleArticlePreview = useHandleArticlePreview(previewArticle, dialogVisible)
const handlArticleDelete = useHandlArticleDelete(getArticleList, articleList)
const handleArticleEdit = useHandleArticleEdit(editDialogVisible, articleForm)
const handleArticleEditConfirm = useHandleArticleEditConfirm(getArticleList, articleList, editDialogVisible)
</script>

<style scoped lang="scss">
.el-card{
  margin-top: 10px;
}

.el-dialog{
  border-radius: 10px;

  .article-wrapper{
    .article-title{
      position: relative;
      text-align: center;
      line-height: inherit;

      span{
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 8px;
        color: #ccc;
      }
    }

    :deep(.article-content){
      img{
        max-width: 100%;
      }
    }
  }
}
</style>