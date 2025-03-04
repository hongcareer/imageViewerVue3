### 安装
image viewer for vue

npm install img-viewer-vue3
### 引入
在main.js中引入
```
import "@/node_modules/img-viewer-vue3/style.css";
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
    icon: '' // 使用在线链接,
    func: myFunc
  }
])
function myFunc () {
  console.log('this is other method');
}
const toolInfo = ref({
  layout: 'v', // 布局 h/v
  fullTool: fullTool,
  layoutChange: true, // 是否可以更改布局
  clickFunc: seeImg, // 图片的点击事件
})
<ImgViewer :ImgList="ImgList" :toolInfo="toolInfo"/>
```
