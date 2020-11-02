<template>
  <div>
    <div class="container7 clearfix">
      <mytitle big='核心业务' :small='small[0]'></mytitle>
      <div class="swiper-container">
        <swiper :options="swiperOption">
          <swiper-slide class="swiper-slide" v-for="(item,index) in swiperList" :key="index">
            <img
              class="indexImg"
               :src="item.image"
              alt
            />
          </swiper-slide>
          <!-- 分页器 -->

          <!-- 左右箭头 -->
        </swiper>

        <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
      </div>

      <div class="myleft" slot="button-prev">
        <img src="@/assets/recrement/19.png" alt />
      </div>
      <div class="myright" slot="button-next">
        <img src="@/assets/recrement/18.png" alt />
      </div>
      <!-- 11111111111111111111 -->

      <div class="coreContent">
        <div class="core1">{{swiperList[indexDefault].title}}</div>
        <div class="contBox">

        <div class="core2" v-html="swiperList[indexDefault].intro"></div>
        </div>
      </div>
    <div class="swiper-pagination">
      <span v-for="(item, index) in swiperList" :key="index" :class="{active:indexDefault==index}"></span>
    </div>
    </div>
  </div>
</template>

<script>
import mytitle from "@/components/mytitle3";
export default {
  components: {
    mytitle
  },
  props: {
    swiperList: Array
  },
  data() {
    let _this = this;
    return {
      small:['CORE BUSINESS'],
      indexDefault: 0,
      swiperOption: {
        disabledClass: "my-button-disabled",
        //显示分页
        //设置点击箭头
        navigation: {
          nextEl: ".container7 .myright",
          prevEl: ".container7 .myleft",
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
  }
};
</script>
<style lang="scss" scoped>
.container7 {
  position: relative;
  width: 100%;
  // height: 8.54rem;
  background: url(../assets/shui.png) no-repeat center center;
  padding-bottom: 0.12rem;

}
.swiper-slide {
  .indexImg {
    box-sizing: border-box;
    padding: 0 0.34rem;
    width: 100%;
    height: 3.9rem;
  }
}
// 1111111111111
// 按钮
.myleft {
  position: absolute;
  left: 0.34rem;
  top: 79%;
  z-index: 99;

  img {
    width: 0.68rem;
    height: 0.68rem;
  }
}
.myleft:focus,
.myright:focus {
  outline: none;
}
.myright {
  position: absolute;
  right: 0.34rem;
  top:79%;
  z-index: 99;
  img {
    width: 0.68rem;
    height: 0.68rem;
  }
}
.my-button-disabled {
  opacity: 0.6;
  border: none;
}
// 11111111111111
.swiper-container {
  --swiper-pagination-color: white; /* 两种都可以 */
}
.container7 .swiper-pagination-bullet-active {
  background: rgb(235, 111, 111);
  width: 0.8rem !important;
}
.swiper-pagination{
  margin-top: 0.44rem !important;
  // background: pink;
  // position: absolute;
  margin-bottom: 0.16rem;
  position: static;
  bottom: -1rem;
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

// 1111111111111111111111111111
.coreContent {
  width: 4.32rem;
  // height: 1.82rem;
  // background-color: pink;
  margin: 0 auto;
  margin-top: 0.32rem;
}
.core1 {
  font-size: 0.36rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.62rem;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  text-align: center;

// background: red;
word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;



}
.contBox{
  height: 1.2rem;
  // background: red;
}
.core2 {
  // height: 10.1rem;
  text-align: center;
  font-size: 0.24rem;
  font-family: Source Han Sans CN;
  font-weight: 300;
  line-height: 0.4rem;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 3; /** 显示的行数 **/
  overflow: hidden;
  // background: red;
}
</style>
