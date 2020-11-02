<template>
  <div class="ooo">
    <el-carousel :interval="4000" type="card" height="40vh" :autoplay="false">
      <el-carousel-item v-for="(item,index) in swiperList" :key="index">
        <img
          :src="item.image"
          alt
        />
        <h3>
          <!-- <div>sadf拉卡撒地方</div> -->
        </h3>
      </el-carousel-item>
    </el-carousel>
    <div class="mylast">私人定制化康复处方远程指导</div>
    <div class="last1"></div>
  </div>
</template>
<script>
export default {
  props: {
    swiperList: Array,
  },
  name: "carrousel",
};
</script>
<style>
.ooo {
  width: 100%;
  margin: 0 auto;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
}
.el-carousel {
  margin: 0 74px;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: hsl(212, 28%, 86%);
}
.el-carousel__indicators {
  display: none;
}
.el-carousel__item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mylast {
  margin-top: 40px;
  text-align: center;
  font-size: 40px;
  line-height: 44px;
  margin-bottom: 15px;
  /* border-bottom: 2px solid #000; */
}
.last1 {
  /* text-align: center; */
  margin: 0 auto;
  width: 200px;
  height: 4px;
  background: rgba(4, 19, 26, 1);
  opacity: 1;
  margin-bottom: 120px;
}
.el-carousel__arrow {
  width: 92px;
  height: 92px;
}
.el-icon-arrow-left{
  font-size: 30px;

}
.el-icon-arrow-right{
    font-size: 30px;
  
}
</style>