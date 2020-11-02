<template>
  <div class="container99">
    <mytitle3 big='手术规划' :small='small'></mytitle3>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <div class="mydiv">
          <img  class="myImg"  :src="item.image" alt="">
        </div>
      </swiper-slide>

      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> -->
    </swiper>
     
      <div class="myleft" slot="button-prev" v-show="indexDefault !=0">
        <img src="@/assets/youyou.png" alt />
      </div>
      <div class="myright" slot="button-next" v-show="indexDefault !=swiperList.length-1">
        <img src="@/assets/cc1.png" alt />
      </div>
     <div class="swiper-pagination">
      <span v-for="(item, index) in swiperList" :key="index" :class="{active:indexDefault==index}"></span>
    </div>
  </div>
</template>
<script>
import mytitle3 from "@/components/mytitle";
export default {
  props: {
    swiperList: Array,
  
  },
  components: {
    mytitle3,
  },
  data() {
    let _this = this;
    return {
      
      small:'SURGICAL PLANNING',
       indexDefault: 0,
      swiperOption: {
         disabledClass: "my-button-disabled",
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true, // 允许点击小圆点跳转
        // },
        // autoplay: {
        //   delay: 3000,
        //   disableOnInteraction: false, // 手动切换之后继续自动轮播
        // },
        // loop: true,
        navigation: {
          nextEl: ".container99 .myright",
          prevEl: ".container99 .myleft",
            disabledClass: "my-button-disabled"
        },
        on: {
          slideChangeTransitionEnd: function() {
            console.log(this.activeIndex);
            _this.indexDefault = this.activeIndex;
          }
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.container99 {
  position: relative;
  height: 5.00rem;
  width: 100%;
//   background-color: pink;
}
.one1 {
  text-align: center;
  font-size: 0.28rem;
  font-family: Source Han Sans CN;
  font-weight: 300;
  line-height: 0.48rem;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  margin-bottom: 0.34rem;
}
.mydiv {
  padding: 0 0.34rem;
  .myImg {
    width: 100%;
    height: 2.4rem;
  }
}
// 111111111111
// 按钮
.myleft {
  position: absolute;
  left: 0.17rem;
  top: 49%;
  z-index: 99;
  img {
    width: 0.28rem;
    height: 0.58rem;
  }
}
.myleft:focus,
.myright:focus {
  outline: none;
}
.myright {
  position: absolute;
  right: 0.17rem;
  top: 49%;
  z-index: 99;
  img {
    width: 0.28rem;
    height: 0.58rem;
  }
}
.my-button-disabled {
  opacity: 0.4;
  border: none;
}
// 111111111111111111
// 小圆点


.swiper-pagination{
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.swiper-pagination span.active{
  width: 24px;
  background-color: black;
}
.swiper-pagination span {
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: black;
  margin-right: .1rem;
  border-radius: 6px;
  transition: all .3s linear
}

</style>