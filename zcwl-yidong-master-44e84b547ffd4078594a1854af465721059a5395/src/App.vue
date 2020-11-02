<template>
  <div id="app">
    <myHead></myHead>
  

    <!-- <div class="aaa">1111</div> -->

    <router-view />
    <myFoot></myFoot>
  </div>
</template>

<script>
import myHead from "@/components/myHead";
import myFoot from "@/components/myFoot";

export default {
  components: { myHead, myFoot },
  name: "App",
 
};
</script>

<style lang="scss">
input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #ccc;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #ccc;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #ccc;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #ccc;
}
* {
  padding: 0;
  margin: 0;
}
html,
body {
  max-width: 768px;
  height: 100%;
  // overflow-x: hidden;
}
input {
  outline-color: invert;
  outline-style: none;
  outline-width: 0px;
  border: none;
  border-style: none;
  text-shadow: none;
  -webkit-appearance: none;
  -webkit-user-select: text;
  outline-color: transparent;
  box-shadow: none;
}
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
div {
  box-sizing: border-box;
  font-size: 0.28rem;
}
.xycenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.xybtn {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.myover {
  white-space: nowrap; /*一行显示*/

  overflow: hidden; /*超出部分隐藏*/

  text-overflow: ellipsis;
}
.footContent .el-collapse{
  border: none;
  //  border-bottom: 1px solid  rgba(112,112,112,1)!important;

}
.footContent .el-collapse-item__wrap{
      border-bottom: 1px solid  rgba(112,112,112,1);;
      padding-bottom: 0.3rem;
      background-color: #04131A;
}

.footContent .el-collapse-item__content {
    padding-bottom: 0;
}


.xyaaa {
  // width: 100%;
  padding: 0 0.34rem;
  margin: 0 auto;
  position: relative;
  // height: 0.6rem;
  .xynav {
    box-shadow: 0px 2px 4px rgba(4, 19, 26, 0.1);
    box-sizing: border-box;
    padding: 0.16rem 0.34rem;
    position: absolute;
    width: 6.82rem;
    height: 0.6rem;
    background-color: white;
    bottom: -.3rem;
    left: 0.34rem;
      margin: 0 auto;
    z-index: 1;
    .left {
      display: flex;
    }
    .left .sub1 {
     font-size:0.24rem;
    }
    .left .sub2 {
     font-size:0.24rem;
      color: #1d97cf;
    }
    .right {
      width: 0.2rem;
      height: 0.27rem;
    }
  }
}
.container1 {
  .el-input,
  .el-input__inner,
  .el-select {
    background-color: rgba(245, 245, 245, 1);
    border: none;
    border-radius: 0;
    width: 100%;
    height: 0.6rem;

  }
}
.container1 .el-input__icon {
  line-height: 0.6rem;
  }
.contenta .el-carousel__arrow {
  display: none !important;
}
.contenta .el-carousel__mask {
  background-color: transparent !important;
  opacity: 1 !important;
}
.aaa .el-carousel__indicator {
  display: none !important;
}
 .myFoot .el-collapse-item__header{
  background-color: #04131A!important;
  color:white!important;
  border-bottom: 1px solid  rgba(112,112,112,1)!important;
}


// 手术导航小圆点
// .container88 .swiper-button-prev, .swiper-button-next{
//   top: 32%;
// right: 5px;
//   // width: 0.28rem;
//   // height: 0.52rem;

// }

// .container88 .swiper-button-prev:after,.swiper-button-next:after{
// font-size: 25px;
// color: white;

// }
// .container88 .swiper-button-prev, .swiper-container-rtl .swiper-button-next{

// }
</style>
