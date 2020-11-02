<template>
  <div class="container7">
    <swiper :options="swiperOption">
      <swiper-slide class="swiper-slide " v-for="(item,index) in swiperList" :key="index">
        <img
          :src="item.image"
          alt
        />
         <div class="contenty">
        <div class="contenty1">{{item.title}}</div>
        <div class="contenty2">{{item.intro}}</div>
      </div>
      </swiper-slide>
      <!-- 分页器 -->
      <!-- 内容 -->
     

      <!-- 左右箭头 -->
    </swiper>
    <div class="myleft" slot="button-prev">
      <img src="@/assets/recrement/19.png" alt />
    </div>
    <div class="myright" slot="button-next">
      <img src="@/assets/recrement/18.png" alt />
    </div>
  </div>
</template>

<script>
export default {
    props: {
    swiperList: Array,
  },
  data() {
    return {
      swiperOption: {
        disabledClass: "my-button-disabled",
        //显示分页
        pagination: {
          //   el: '.swiper-pagination'
        },
        //设置点击箭头
        navigation: {
          nextEl: ".myright",
          prevEl: ".myleft",
          disabledClass: "my-button-disabled",
        },
        //自动轮播
        // autoplay: {
        //   delay: 2000,
        //   //当用户滑动图片后继续自动轮播
        //   disableOnInteraction: false,
        // },
        //开启循环模式
        // loop: true
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.swiper-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 25vw;
    min-width: 300px;
    height: 240px;
    object-fit: cover;
  }
}
.container7 {
  position: relative;
}
.myleft {
  position: absolute;
  left: -5vw;
  top: 87px;
  img {
    width: 91px;
    height: 91px;
  }
}
.myright {
  position: absolute;
  right: -5vw;
  top: 87px;
  img {
    width: 91px;
    height: 91px;
  }
}
.my-button-disabled {
  opacity: 0.2;
  border: none;
}
.contenty1{
  margin-top: 90px;
  font-size:26px;
  font-weight:500;
  margin-bottom: 20px;
  text-align: center;
  color: white;
}
.contenty2{
  font-size:18px;
  text-align: center;
  color: white;


}
</style>
