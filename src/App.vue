<script setup>
import { ref, onMounted } from "vue"
import {ImgViewer}  from "./components/muk-ui/index.js"
// import { $imgViewer } from "img-viewer-vue3";
function onSend(callback) {
  console.log(callback);
}
const ImgList = ref([])
ImgList.value = ["https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_h8FmmZ_1708415056226.jpeg?width=690&height=664", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_64Q53X_1708415056235.jpeg?width=690&height=664", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_E7StWf_1708415056239.jpeg?width=640&height=640", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_RzzhRh_1708415056244.jpeg?width=1000&height=1000", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_HKSA8N_1708415056250.jpeg?width=640&height=640", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_fW8H2y_1708415062302.jpeg?width=702&height=500", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_pHDMJQ_1708415066419.jpg?width=592&height=1280", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_n7JGW3_1708415072000.jpg?width=320&height=211", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_exGMB7_1708415079742.jpeg?width=400&height=400", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_Gs4J5H_1708415083432.jpeg?width=1200&height=675", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_tKzAJK_1708415091016.png?width=450&height=452", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_NTFeRf_1708415096956.jpg?width=240&height=240", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_PQRxht_1708415106513.jpg?width=3000&height=2000", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_sYnwYy_1708415120985.jpeg?width=450&height=337", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_hAtwiE_1708415126393.jpeg?width=540&height=500", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_h2bFwd_1708415131679.jpeg?width=680&height=488", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_kjBkWm_1708415139791.jpg?width=4000&height=2250", "https://convergence-media.oss-cn-beijing.aliyuncs.com/picture/20240220_875eji_1708415153907.jpg?width=133&height=115"]

const fullTool = ref([])
function otherFunc() {
  console.log('this is other method');
}
const toolInfo = ref({
  layout: 'h',
  fullTool: fullTool,
  layoutChange: false,
  clickFunc: seeImg
})
function seeImg(src) {
  // console.log(src);
}
console.log(window);
// onMounted(() => {
//   $imgViewer({
//     imgList: ImgList.value,
//     index: 0,
//     toolInfo: toolInfo.value
//   })
// })
</script>

<template>
  <div>
    <!-- <button>发送</button> -->
  </div>
  <div class="img-viewer">
    <ImgViewer :ImgList="ImgList" :toolInfo="toolInfo"/>
  </div>
</template>

<style scoped>
.img-viewer {
  width: 50vw;;
  height: 100vh;
}
</style>

