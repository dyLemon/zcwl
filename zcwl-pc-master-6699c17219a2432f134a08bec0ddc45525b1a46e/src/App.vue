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
  created() {}
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
  width: 100%;
  height: 100%;
  min-width: 1200px;
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
}
.xycenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.xybtn {
  display: flex;
  justify-content: center;
  justify-content: space-between;
}

.myover {
  white-space: nowrap; /*一行显示*/

  overflow: hidden; /*超出部分隐藏*/

  text-overflow: ellipsis;
}
.xyaaa {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  .xynav {
    box-shadow: 0px 2px 4px rgba(4, 19, 26, 0.1);
    box-sizing: border-box;
    padding: 22px 20px;
    position: absolute;
    width: 1200px;
    height: 54px;
    background-color: white;
    bottom: -27px;
    left: 0%;
    z-index: 1;
    .left {
      display: flex;
    }
    .left .sub1 {
      font-size: 14px;
    }
    .left .sub2 {
      font-size: 14px;
      color: #1d97cf;
    }
    .right {
      width: 10px;
      height: 14px;
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
  }
}
</style>
