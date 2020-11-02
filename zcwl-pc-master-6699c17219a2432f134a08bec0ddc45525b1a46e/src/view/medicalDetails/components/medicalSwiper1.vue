<template>
  <div class="container8">
    <swiper :options="swiperOption">
      <swiper-slide class="swiper-slide" v-for="(item,index) in swiperList" :key="index">
        <img
          :src="item.image"
          alt
        />
      </swiper-slide>
      <!-- 分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
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
          nextEl: ".container8 .myright",
          prevEl: ".container8 .myleft",
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
  img {
    width: 120vw;
    height: 410px;
    object-fit: cover;
  }
}
.container8 {
  position: relative;
}
.myleft {
  position: absolute;
  left: -157px;
  top: 167px;
  img {
    width: 91px;
    height: 91px;
  }
}
.myright {
  position: absolute;
  right: -157px;
  top: 167px;
  img {
    width: 91px;
    height: 91px;
  }
}
.my-button-disabled {
  opacity: 0.2;
  border: none;
}
</style>
