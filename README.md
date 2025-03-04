### 安装
image viewer for vue

npm install img-viewer-vue3
### 引入
#### 方法一
在main.js中引入
```
//引入组件样式 二选一 哪个适合自己的项目就使用哪个
import "@/node_modules/img-viewer-vue3/style.css";//引入组件样式 
import "img-viewer-vue3/style.css"; //引入组件样式
import ImgViewer from "img-viewer-vue3";
const app = createApp(App);
app.use(ImgViewer); //注册
```


### 在页面中使用
```
const ImgList = ref([]) // 图片链接
// 额外的toolbar
const fullTool = ref([
  {
    icon: '', // 使用在线链接
    func: myFunc
  }
])
function myFunc () {
  console.log('this is other method');
}
function seeImg (src) {
  // console.log(src);
}
const toolInfo = ref({
  layout: 'v', // 布局 h/v
  fullTool: fullTool,
  layoutChange: true, // 是否可以更改布局
  clickFunc: seeImg, // 图片的点击事件
})
// 使用组件
<template>
  <ImgViewer :ImgList="ImgList" :toolInfo="toolInfo"/>
</template>
```
#### 方法二
在main.js中引入
```
import "img-viewer-vue3/style.css"; //引入组件样式
```
在页面中使用
```
import { $imgViewer } from "img-viewer-vue3";
$imgViewer({
  imgList: ImgList.value,
  index: 0,
  toolInfo: toolInfo.value
})
```
#### 方法三
使用在线连接
```
<script src="https://unpkg.com/img-viewer-vue3/index.umd.js"></script>
$imgViewer({
  imgList: ImgList.value,
  index: 0,
  toolInfo: toolInfo.value
})
```