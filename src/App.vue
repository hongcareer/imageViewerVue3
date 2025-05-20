<script setup>
import { ref, onMounted } from "vue"
import { InputTemplate } from "../node_modules/input-template-vue3/index.umd.js";
import "input-template-vue3/style.css"; // 引入组件样式
const templateElements = [
  {
    id: '7',
    type: 'plaintext',
    value: '&nbsp;',
  },
  {
    id: '1',
    type: 'select',
    value: '选项1',
    options: [
      { value: '选项1', label: '选项1' },
      { value: '选项2', label: '选项2' },
      { value: '选项3', label: '选项3' }
    ],
  },
  {
    id: '2',
    type: 'text',
    value: '',
    placeholder: '【请输入文本】'
  },
  {
    id: '3',
    type: 'date',
    value: '',
    placeholder: '请选择日期'
  },
  {
    id: '4',
    type: 'plaintext',
    value: '这是一段纯文本内容，不需要输入框。',
  },
  {
    id: '9',
    type: 'select',
    value: '选项3',
    options: [
      { value: '选项1', label: '选项1' },
      { value: '选项2', label: '选项2' },
      { value: '选项3', label: '选项3' }
    ],
  },
  {
    id: '5',
    type: 'text',
    value: '哈哈啊哈',
    placeholder: '请输入文本'
  }, {
    id: '53',
    type: 'text',
    value: '哈哈啊哈111',
    placeholder: '请输入文本'
  },
  {
    id: '99',
    type: 'select',
    value: '',
    placeholder: '请选择',
    options: [
      { value: '选项1', label: '选项1' },
      { value: '选项2', label: '选项2' },
      { value: '选项3', label: '选项3' }
    ],
  },
  // {
  //   id: '8',
  //   type: 'select',
  //   value: '选项2',
  //   options: [
  //     { value: '选项1', label: '选项1' },
  //     { value: '选项2', label: '选项2' },
  //     { value: '选项3', label: '选项3' }
  //   ],
  //   html: '[选择框]'
  // },
  {
    id: '22',
    type: 'plaintext',
    value: '&nbsp;',
  },
]
const handleSubmit = (value) => {
  console.log(value)
  // 获取模板输入框的值
  const templateInputValue = templateInputRef.value.initialText
  console.log(templateInputValue)
}
const handleClear = () => {
  templateInputRef.value.initialText = ''
  templateInputRef.value.clearInput();
}
const templateInputRef = ref(null)
</script>

<template>
  <button @click="handleClear">清空</button>
  <div class="app">
    <InputTemplate :elements="templateElements" :showTemplate="true" @submit="handleSubmit" 
    ref="templateInputRef"/>
  </div>
</template>

<style scoped>
.app {
  padding: 20px;
  width: 100%;
  height: 100%;
  /* background-color: #f0f2f5; */
  max-width: 80vw;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  text-align: left;
  min-width: 800px;
}
</style>

