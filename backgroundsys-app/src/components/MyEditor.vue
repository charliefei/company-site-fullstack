<template >
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        :style="styleSheet"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChanged"
      />
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' 
import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const styleSheet = {
  height: '350px',
  overflowY: 'hidden',
}

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const mode = ref('default')

// 内容 HTML
const valueHtml = ref('')
const props = defineProps(['content'])
watch(()=>props.content, () => {
  valueHtml.value = props.content
})

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入文章内容...' }

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const emit = defineEmits(['getContent'])
const handleChanged = (editor) => {
  // console.log('content', editor.getHtml());
  // console.log(valueHtml.value);
  emit('getContent', valueHtml)
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
</script>

<style lang="scss" scoped>
</style>