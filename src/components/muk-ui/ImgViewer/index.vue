
<template>
<div :class="['container', layout == 'h'?'active':'']">
  <div :class="['horv', layout == 'h'?'active':'']" @click="changeLayout" 
    v-if="toolInfo.layoutChange && props.ImgList.length > 1 && !flag"
  >
    <div class="v"></div>
    <div class="h"></div>
  </div>
	<div :class="['img-wraper',layout == 'h'?'active':'']" ref="ImgWrapper">
		<img class="v-img"
			@wheel="handleMouseWheel"
			@mousedown.stop="moveImg"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
			:src="ImgList[imgIndex]"
      ref="ImgRef"
		/>
    <img src="../icon/r-c.png" @click.stop="handleChangeIndex('l')" v-show="ImgList[0] && imgIndex!=0" class="img-l"/>
    <img src="../icon/l-c.png" @click.stop="handleChangeIndex('r')" v-show="ImgList[0] && imgIndex!=ImgList.length-1" class="img-l"/>
	</div>
  <div :class="['right', layout == 'h'?'active':'']">
    <div :class="['toolbar', layout == 'h'?'active':'']">
      <div v-for="(tool,index) in toolBar" class="tool-wrapper" :key="index">
        <img :src="tool.icon" alt="" @click="tool.func(tool.type)"/>
      </div>
    </div>
    <div :class="['small-list',layout == 'h'?'active':'']" v-if="props.ImgList.length > 1">
      <div :class="['img-list',layout == 'h' ? 'active' : '']" 
        :style="{
          width: layout == 'h' ? 82*ImgList.length + 18 + 'px':'',
          height: layout == 'v' ? 82*ImgList.length + 18 + 'px':''}"
      >
        <img :src="img" v-for="(img,index) in ImgList" @click="changeImg(index)" 
          :class="{active: layout == 'h',imgA: index == imgIndex}"
          :key="index"
          ref="SmallImgRef"
        />
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { ref, onMounted, nextTick, watch,computed } from "vue"
import BScroll from 'better-scroll'
import IR from '../icon/img-rotate.png'
import IN from '../icon/img-zoomin.png'
import IO from '../icon/img-zoomout.png'
/*
	ImgList:图片列表
*/ 
const props = defineProps({
	ImgList: {
		type: Array,
		default: [],
	},
  index: {
    type: Number,
    default: 0
  },
  toolInfo: {
    type: Object
  }
});
let flag =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(window.navigator.userAgent) ||
  document.documentElement.clientWidth < 744
const layout = ref(props.ImgList.length == 1 || flag?'h':props.toolInfo.layout)
const fullTool = computed(() => props.toolInfo.fullTool)
const toolself = [
  {
    icon: IR,
    func: handleRotate
  },
  {
    icon: IN,
    func: onMouseWheel,
    type: 'in'
  },
  {
    icon: IO,
    func: onMouseWheel,
    type: 'out'
  },
]
const toolBar = computed(() => [...toolself,...fullTool.value])
const ImgRef = ref(null)
const SmallImgRef = ref(null)
const BS2 = ref();
onMounted(async () => {
    await nextTick()
    onBScroll();
})
const onBScroll = () => {
  if (layout.value == 'h') {
    BS2.value = new BScroll('.small-list', {
      scrollX: true,
      eventPassthrough: "vertical",
      probeType: 3,
    })
  } else {
    BS2.value = new BScroll('.small-list', {
      scrollY: true,
      probeType: 3,
    })
  }
    BS2.value.on('scroll', (position) => {
        // console.log(position);
    })
    BS2.value.refresh()
}
let allHeightB = 0
let allHeightR = 0
const imgIndex = ref(props.index)
function changeImg (index) {
  console.dir(SmallImgRef.value[0]);
  imgIndex.value = index
}
async function changeLayout () {
  BS2.value.refresh()
  if (layout.value == 'h') layout.value = 'v'
  else layout.value = 'h'
  BS2.value.scrollTo(0, 0, 300)
  await nextTick()
  onBScroll()
}
const height = document.documentElement.clientHeight
const width = document.documentElement.clientWidth
function handleChangeIndex (type) {  
  if (type == 'r') {
    if (imgIndex.value >= props.ImgList.length-1) {
      imgIndex.value = props.ImgList.length-1
      return 
    }
    imgIndex.value += 1
    if (layout.value == 'v') {
      bottom()
    } else {
      right()
    }
  } else if (type == 'l') {
    if (imgIndex.value <= 0) {
      imgIndex.value = 0
      return
    }
    imgIndex.value -= 1
    if (layout.value == 'v') {
      top()
    } else {
      left()
    }
  }
  
}
function bottom () {
  let pos = update(SmallImgRef.value[imgIndex.value],10,height-10,'bottom','top')
  if (pos[0] === 'lower') {
    BS2.value.scrollTo(0, height-SmallImgRef.value[imgIndex.value].offsetTop-100, 300)
  } else if (pos[0] === 'upper' || pos[2] < 92) {
    BS2.value.scrollTo(0, -SmallImgRef.value[imgIndex.value].offsetTop + 28, 300)
  }
}
function top () {
  let pos = update(SmallImgRef.value[imgIndex.value],10,height-10,'top')
  // console.log(pos);
  if (pos[0] === 'upper') {
    BS2.value.scrollTo(0, -SmallImgRef.value[imgIndex.value].offsetTop, 300)
  }
}
function right () {
  let pos = update(SmallImgRef.value[imgIndex.value],0,width-40,'right','left')
  // console.log(pos);
  if (pos[0] === 'lower') {
    BS2.value.scrollTo(width - SmallImgRef.value[imgIndex.value].offsetLeft - 110, 0, 300)
  } else if (pos[0] === 'upper' || pos[2] < 92 ) {
    BS2.value.scrollTo(-SmallImgRef.value[imgIndex.value].offsetLeft + 28, 0, 300)
  }
}
function left () {
  let pos = update(SmallImgRef.value[imgIndex.value],10,width-10,'left')
  if (pos[0] === 'upper') {
    BS2.value.scrollTo(-SmallImgRef.value[imgIndex.value].offsetLeft, 0, 300)
  }
}
// 判断元素所在屏幕位置：屏幕上-'upper', 屏幕中-'in', 屏幕下-'lower'
function update(target, compareLowerValue, compareUuperValue,type,number) {
  const rect = target.getBoundingClientRect();
  // console.log(rect);
  return [rect[type]<compareLowerValue?'upper':rect[type] < compareUuperValue?'in':'lower',rect[type],rect[number]]
}
// PC端缩放、拖拽
const scale = ref(1) 
function handleMouseWheel(event) {
  event.preventDefault(); // 防止默认行为发生（页面滚动）
  const delta = Math.sign(-event.deltaY); // 获取滚轮滚动的方向
  scale.value += (0.1 * delta); // 每次滚动按比例调整比例值
  if (scale.value <= 0.1 || scale.value >= 10) {
    // 限制比例值在合理范围内
    scale.value = Math.max(Math.min(scale.value, 10), 0.1);
  }
  event.target.style.scale = scale.value
}
function onMouseWheel(type) {
  // console.log(type);
    if (type == 'in') {
      scale.value += 0.1
    } else {
      scale.value -= 0.1
    }
    // console.log(type,scale.value);
  if (scale.value <= 0.1 || scale.value >= 10) {
    // 限制比例值在合理范围内
    scale.value = Math.max(Math.min(scale.value, 10), 0.1);
  }
  // console.log(scale.value);
  ImgRef.value.style.scale = scale.value
}
let rotateDeg = 0
function handleRotate () {
  rotateDeg+=90
  ImgRef.value.style.rotate = `${rotateDeg}deg`
}
const ImgWrapper = ref(null)
let isDragging = false;
let startPosX = 0;
let startPosY = 0;
function moveImg (e) {
  let img = e.target
  let x = e.pageX - img.offsetLeft
  let y = e.pageY - img.offsetTop
  // 判断是点击事件还是拖拽事件
  isDragging = false;
  startPosX = e.clientX;
  startPosY = e.clientY;
  ImgWrapper.value.addEventListener('mousemove', move)
  function move(e) {
    // console.log(e.target);
    if (Math.abs(e.clientX - startPosX) > 10 || Math.abs(e.clientY - startPosY) > 10) {
      isDragging = true;
      img.style.left = e.pageX - x + 'px'
      img.style.top = e.pageY - y + 'px'
    } else {
      isDragging = false;
    }
  }
  // 添加鼠标抬起事件，鼠标抬起，将事件移除
  window.addEventListener('mouseup', (e) => {
    // console.log('mouseUp');
    if (!isDragging) {
      props.toolInfo.clickFunc(e.target.currentSrc)
    }
    ImgWrapper.value.removeEventListener('mousemove', move)
  })
}

// 移动端拖拽、
//绑定触屏事件
let touchState = null
const targetDom = ref(null)
const startMX = ref(0)
const startMY = ref(0)
const touchLength = ref(1)
//记录触屏触点坐标 记录起始和结束点
function onTouchStart(evt) {
  // console.log(evt.touches);
  targetDom.value = evt.target
  touchLength.value = evt.touches.length
  if (touchLength.value == 1) {
    startMX.value = evt.changedTouches[0].clientX - targetDom.value.offsetLeft;
    startMY.value = evt.changedTouches[0].clientY - targetDom.value.offsetTop
    isDragging = false;
    startPosX = evt.changedTouches[0].clientX;
    startPosY = evt.changedTouches[0].clientX;
  } else {
    touchState = {
        //多点触屏的第一点
        startX: evt.touches[0].pageX,
        startY: evt.touches[0].pageY,
        endX: evt.touches[0].pageX,
        endY: evt.touches[0].pageY,
        //多点触屏的第二点  单点触屏时记录坐标为 -1 
        startX2: evt.touches[1] ? evt.touches[1].pageX : -1,
        startY2: evt.touches[1] ? evt.touches[1].pageY : -1,
        endX2: evt.touches[1] ? evt.touches[1].pageX : -1,
        endY2: evt.touches[1] ? evt.touches[1].pageY : -1
    };
  }
}
//记录触屏触点坐标 触屏移动时更新结束点坐标
function onTouchMove(evt) {
  let target = targetDom.value
  if (touchLength.value == 1) {
    let xnum = evt.changedTouches[0].clientX
    let ynum = evt.changedTouches[0].clientY
    if (Math.abs(xnum- startPosX) > 10 || Math.abs(ynum - startPosY) > 10) {
      isDragging = true
      const deltaX = xnum - startMX.value;
      const deltaY = ynum - startMY.value;
      targetDom.value.style.left = deltaX + 'px'
      targetDom.value.style.top = deltaY + 'px'
    } else {
      isDragging = false
    }    
  } else {
    if (touchState === null) {
      return;
    }
    touchState.endX = evt.touches[0].pageX;
    touchState.endY = evt.touches[0].pageY;
    touchState.endX2 = evt.touches[1] ? evt.touches[1].pageX : -1;
    touchState.endY2 = evt.touches[1] ? evt.touches[1].pageY : -1;
    // //计算两点间距离
    var getDistance = function (startX, startY, endX, endY) {
        return Math.hypot(endX - startX, endY - startY);
    };
    if (touchState.startX2 != -1 && touchState.endX2 != -1 && touchState.startY2 != -1 && touchState.endY2 != -1) {
        let distanceStart = getDistance(touchState.startX, touchState.startY, touchState.startX2, touchState.startY2);
        let distanceEnd = getDistance(touchState.endX, touchState.endY, touchState.endX2, touchState.endY2);
        //起始时两点距离和结束时两单距离进行比较，判断是方法还是缩小
        if (distanceStart < distanceEnd) { //放大
          if (scale.value <= 4 ) {
            scale.value += 0.03          }
        } else if (distanceStart > distanceEnd) { //缩小
          if (scale.value >= 0.6) {
            scale.value -= 0.03
          }
        }
        handleScale(scale.value,evt)
    }
  }
}
//触屏结束时 判断是否放大缩小 防止缩放的时候屏幕抖动
function onTouchEnd(evt) {
  if (touchState === null) {
      return;
  }
};
function handleScale(scale,event) {
  event.target.style.scale = scale
}
</script>
<script>
export default {
	name: "ImgViewer",
};
</script>

<style lang="less">
div{
  box-sizing: border-box;
}
@media screen and (min-width: 376px) {
  
}
@media screen and (max-width: 375px) {
  
}
.container {
  position: fixed;
  top:0px;
  left:0px;
  width:100vw;
  height: 100vh;
  overflow: hidden;
  display:flex;
  padding: 10px 20px;
  background: rgba(0,0,0,1);
  &.active{
    flex-direction: column;
  }
  .horv {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index:10;
    display: flex;
    cursor: pointer;
    &.active{
      rotate: 90deg
    }
    .h,.v {
      height: 25px;
      width: 5px;
      background: #999;
      border-radius: 1px;
    }
    .v {
      width: 20px;
      margin-right: 3px;
    }
  }
  /* 滚动条样式 */
  ::-webkit-scrollbar {
      width: 0; /* 设置滚动条宽度 */
  }
}
	.img-wraper {
    position: relative;
    height: 50vh;
    flex:1;
    margin: auto;
    margin-right:70px;
    &.active{
      flex:none;
      margin-right:0px;
      width:100%;
    }
    .v-img {
      max-height: 100%;
      width: auto;
      transition: scale 300ms ease-out;
      transform-origin: 0% 0%;
      cursor: grab;
      position: absolute;
      -webkit-user-drag: none;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      border-radius: 5px;
      &.meng {
        
      }
		}
    img {
      &:nth-child(2), &:nth-child(3){
        position: absolute;
        width:32px;
        height: 32px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
      &:nth-child(2){
        left:0px;
      }
      &:nth-child(3){
        right:0px;
      }
    }
	}
  .right {
    display: flex;
    position: relative;
    &.active{
      flex-direction: column;
    }
    .toolbar{
      background: rgba(255,255,255,.8);
      border-radius: 2px;
      display:flex;
      flex-direction: column;
      margin-right: 10px;
      position: absolute;
      top: 50%;
      left: -50px;
      transform: translateY(-50%);
      &.active{
        display: flex;
        height: auto;
        flex-direction: row;
        top:-50px;
        left: 50%;
        transform: translateX(-50%) translateY(0%);
        margin-bottom: 10px;
        margin-right: 0px;
      }
      .tool-wrapper {
        display: flex;
        align-items: center;
        padding:2px 5px;
        img {
          width:26px;
          cursor: pointer;
        }
      }
    }
  }
  .small-list {
    width:100%;
    user-select: none;
    overflow: hidden;
    // width: 80px;
    &.active {
      width: 100%;
    }
    .img-list {
      display: flex;
      width: 100px;
      flex-direction: column;
      align-items: center;
      cursor: grab;
      &.active {
        width: 100%;
        overflow: hidden;
        flex-direction: row;
        height: 90px;
      }
      img {
        height: 72px;
        width:72px;
        object-fit: cover;
        flex-shrink:0;
        margin-bottom: 10px;
        cursor: grab;
        border-radius: 2px;
        -webkit-user-drag:none;
        transition: all 300ms;
        &.active {
          margin-right: 10px;
          margin-bottom: 0px;
        }
        &.imgA {
          height: 90px;
          width: 90px;
          flex-shrink: 0;
        }
      }
    }
  }
</style>

