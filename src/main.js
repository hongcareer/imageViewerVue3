import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// import "img-viewer-vue3/style.css"; //引入组件样式
// import Muk1 from "demo-muk-ui"; //引入下载后的组件
// import ImgViewer from "./components/muk-ui"; //导入
// import ImgViewer from "img-viewer-vue3"; //导入
const app = createApp(App);
// app.use(ImgViewer); //注册
app.mount("#app");
