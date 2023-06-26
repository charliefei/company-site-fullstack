<template>
  <el-upload
    class="avatar-uploader"
    action="#"
    :auto-upload="false"
    :show-file-list="false"
    :on-change="handleChange"
  >
    <img v-if="image" :src="uploadImageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue';
import { computed } from 'vue'

const props = defineProps(['image', 'handleChange'])

const uploadImageUrl = computed(() => {
  return props.image.includes('blob') ? 
  props.image : 'http://localhost:3000' + props.image
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
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