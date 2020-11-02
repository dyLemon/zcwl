<template>
  <div class="container88">
    <mytitle3 big='辅助断症' :small='small'></mytitle3>   
    <div class="one1">辅助医生术前规划＆提升医患沟通时效性</div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <div class="mydiv">
          <img
            class="myImg"
            :src="item.image"
            alt
          />
          <!-- <div>{{item.title}}</div>
          <div v-html="item.intro"></div> -->
        </div>
      </swiper-slide>

      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> -->
    </swiper>
   
   <!-- 判断轮播图商都来显示上下按钮 -->
      <div class="myleft" slot="button-prev" v-show="indexDefault != 0 ">
        <img src="@/assets/youyou2.png" alt />
      </div>
      <div class="myright" slot="button-next" v-show="indexDefault !=swiperList.length-1">
        <img src="@/assets/left.png" alt />
      </div>
     <div class="swiper-pagination">
      <span v-for="(item, index) in swiperList" :key="index" :class="{active:indexDefault==index}"></span>
    </div>


  </div>
</template>
<script>
import mytitle3 from "@/components/mytitle3";
export default {
  props: {
    swiperList: Array,
  
  },
  components: {
    mytitle3,
  },
  created(){
console.log(this.$props)
  },
  data() {
    let _this = this;
    return {
      small:'AUXILIARY SYNDROME',
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
          nextEl: ".container88 .myright",
          prevEl: ".container88 .myleft",
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
.container88 {
  position: relative;
  background: url(../assets/blue.png) no-repeat center center;
  height: 5.78rem;
  width: 100%;
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
    object-fit: cover;
  }
}
// 111111111111
// 按钮
.myleft {
  position: absolute;
  left: 0.17rem;
  top: 61%;

  top: 57%;
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
  top: 61%;
  top: 57%;

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
  bottom: 0.20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.swiper-pagination span.active{
  width: 24px;
  background-color: rgba(255, 255, 255,1)
}
.swiper-pagination span {
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.5);
  margin-right: .1rem;
  border-radius: 6px;
  transition: all .3s linear
}

</style>