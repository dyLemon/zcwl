<template>
  <div class="aaa">
    <el-carousel :autoplay="false" type="card" height="400px">
      <el-carousel-item v-for="(item,index) in swiperList" :key="index">
        <img :src="item.avatar" alt />
        <div class="sub1">
          <div class="sub2">
            {{item.name}}
            <span style="color:#1D97CF">{{item.title}}</span>
          </div>
          <div class="sub3">{{item.intro}}</div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  props: {
    swiperList: Array,
  },
  data() {
    return {};
  },
created(){
  // console.log(this.swiperList)
}
};
</script>
<style  >
.aaa{
      background-color: #f5f5f5;
}
.el-carousel__item--card {
  /* width: 433px; */
  /* height: 433px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.el-carousel__item img {
  box-sizing: border-box;
  width: 152px;
  height: 152px;
  border-radius: 50%;
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin-bottom: 80px;
}

.el-carousel__item:nth-child(2n) {
background-color: #f5f5f5;
}

.el-carousel__item:nth-child(2n + 1) {
 background-color: #f5f5f5;
}
.el-carousel__indicator {
  display: none !important;
}
.sub1 {
  text-align: center;
}
.sub2 {
  margin-bottom: 35px;
  font-size: 30px;
}
.sub3 {
  font-size: 18px;
  line-height:32px;
  height: 100px;
  padding: 0 110px;
  word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 3; /** 显示的行数 **/
    overflow: hidden;  
}
</style>