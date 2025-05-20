# InputTemplate 组件

一个灵活的 Vue3 模板输入组件，支持多种输入类型。

## 安装

```bash
npm install input-template-vue3
```

## 引入

### 方法一：全局注册

在 main.js 中引入：

```js
// 引入组件样式
import "input-template-vue3/style.css";
import { InputTemplate } from "input-template-vue3/index.umd.js";

const app = createApp(App);
app.use(InputTemplate); // 全局注册
```

### 方法二：局部引入

在需要使用的组件中引入：

```js
import { InputTemplate } from "input-template-vue3/index.umd.js";
import "input-template-vue3/style.css"; // 引入组件样式
```

## 使用示例

```vue
<script setup>
import { ref } from "vue";

// 定义模板元素
const templateElements = [
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
  }
];

// 提交处理函数
const handleSubmit = (value) => {
  console.log(value);
  // 获取模板输入框的值
  const templateInputValue = templateInputRef.value.initialText;
  console.log(templateInputValue);
}

// 清空输入
const handleClear = () => {
  templateInputRef.value.initialText = '';
  templateInputRef.value.clearInput();
}

const templateInputRef = ref(null);
</script>

<template>
  <button @click="handleClear">清空</button>
  <div class="container">
    <InputTemplate 
      :elements="templateElements" 
      :showTemplate="true" 
      @submit="handleSubmit" 
      ref="templateInputRef"
    />
  </div>
</template>
```

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| elements | Array | [] | 模板元素数组 |
| showTemplate | Boolean | false | 是否显示模板 |

## 元素类型

支持以下类型的输入元素：

- `text`: 文本输入框
- `select`: 下拉选择框
- `date`: 日期选择器
- `plaintext`: 纯文本显示（不可编辑）

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| submit | 提交表单时触发 | 表单数据对象 |

## 方法

通过 ref 可以调用组件的以下方法：

- `clearInput()`: 清空所有输入
- `initialText`: 获取或设置模板文本

## 示例元素配置

```js
// 文本输入
{
  id: '2',
  type: 'text',
  value: '',
  placeholder: '请输入文本'
}

// 下拉选择
{
  id: '1',
  type: 'select',
  value: '选项1',
  options: [
    { value: '选项1', label: '选项1' },
    { value: '选项2', label: '选项2' },
    { value: '选项3', label: '选项3' }
  ]
}

// 日期选择
{
  id: '3',
  type: 'date',
  value: '',
  placeholder: '请选择日期'
}

// 纯文本
{
  id: '4',
  type: 'plaintext',
  value: '这是一段纯文本内容',
}
```