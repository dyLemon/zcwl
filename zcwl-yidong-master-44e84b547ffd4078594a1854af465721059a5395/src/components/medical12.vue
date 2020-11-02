<template>
  <div class="container77">
    <mytitle3 big="产品特点" small="FEATRUES"></mytitle3>
    <swiper :options="swiperOption" v-if="swiperList.length">
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <div class="wrap">
          <!-- <div class="two">
            <img class="middleImg2" :src="item.prevImage" alt />
          </div> -->
          <div class="one">
            <img class="middleImg" :src="item.image" alt />
            <div class="one1">{{item.title}}</div>
            <!-- <div class="one1">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div> -->

            <div class="one2" v-html="item.intro"></div>
          </div>
          <!-- <div class="two">
            <img class="middleImg2" :src="item.nextImage" alt />
          </div> -->
        </div>
      </swiper-slide>
      
      <!-- <swiper-slide></swiper-slide>
      <swiper-slide>slide3</swiper-slide>
      <swiper-slide>slide4</swiper-slide>-->
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->

    </swiper>
      <div class="swiper-pagination">
      <span v-for="(item, index) in swiperList.length" :key="index" :class="{active:indexDefault==index}"></span>
    </div>
  
  </div>
</template>

<script>
import mytitle3 from "@/components/mytitle3";
export default {
  props: {
    swiperList: Array
  },
  components: {
    mytitle3
  },
  data() {
    let _this = this;
    return {
      indexDefault: 0,
      nextImge: "",
      prevImge: "",
      swiperOption: {
                 slideToClickedSlide: false, //禁止点击轮播图切换
        // autoplay: {
        //   disableOnInteraction: false, // 鼠标滑动后继续自动播放
        //   delay: 40000000, //4秒切换一次
        // },
        slidesPerView: 3,

 
        spaceBetween: 68,
 
        loop: true,
        navigation: {
          nextEl: ".container77 .myright",
          prevEl: ".container77 .myleft"
        },
        on: {
          slideChangeTransitionEnd: function() {
            console.log("this",this.realIndex)
              _this.indexDefault = this.realIndex;
         
          }
        }
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.container77 {
  width: 100%;
  height: 6.72rem;
  background: url(../assets/pp.png) no-repeat center center;
  background-size: 100%;
  position: relative;
}
// 。swiper-slide swiper-slide-active
.swiper-slide-active {
  //
}
.one {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // border-radius: 5px;
  // color: #fff;
  // height: 4.26rem;
  // width: 3.52rem;
  // background: rgba(19, 101, 139, 0.5);
  // margin: 0 0.68rem;
}
.one1 {
  width: 2rem;
  font-size: 0.32rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.4rem;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  text-align: center;

 

}
.one2 {
  font-size: 0.24rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.34rem;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  text-align: center;
  word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 3; /** 显示的行数 **/
    overflow: hidden;  
}
.middleImg {
  width: 1rem;
  height: 1rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
  opacity: 0.8;
  margin-top: 1.52rem;
  margin-bottom: 0.34rem;
  //   margin-left: 1.26rem;
  overflow: hidden;
}
.middleImg2 {
  width: 1rem;
  height: 1rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
  opacity: 0.8;
  margin-top: 1.68rem;
  margin-bottom: 0.34rem;
}
.swiper-slide .swiper-slide-prev {
  width: 1rem;
  height: 1rem;
  background: pink;
}
.swiper-slide {
  // width: 110px!important;
}
.swiper-slide .swiper-slide-next {
  width: 1rem;
  height: 1rem;
  background: pink;
  //   margin-left: 20px!important;
}
.swiper-slide-next {
}
.swiper-slide {
  width: 300px; /*设为固定值*/
  width: auto; /*根据内容调整宽度*/
}
.wrap {
  transition: 300ms;

  display: flex;
  width: 100vw;
  justify-content: center;
  .one1,.one2{
    display: none; 
      //  display: -webkit-box;
  }
}
// 1111111111111111
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


.swiper-slide-active,
.swiper-slide-duplicate-active {
  transform: scale(1);
 
.wrap{
 
  .one{
transition: all 1s;
  border-radius: 5px;
  color: #fff;
  height: 4.26rem;
  width: 3.52rem;
  background: rgba(19, 101, 139, 0.5);
  // margin: 0 0.68rem;
 
  .middleImg{
    margin: 0;
    // margin-top: -0.68rem;
  }
  .one1{
    margin-top: 0.34rem;
    margin-bottom: 0.22rem;
 
  word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
    // display: inline-block;
        -webkit-box-orient: vertical;

 
  }
  .one2{
    width: 2.7rem;
  

    word-break: break-all;



      word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
    // display: inline-block;
        -webkit-box-orient: vertical;
  }
  }
}

}

.swiper-slide-active{
  transition: 300ms;

  // background: pink;
   .middleImg{
    // margin-right: -0.68rem;
 
   margin-right: -0.8rem;
  }
}
.swiper-slide-duplicate{
  // background: red;
   .middleImg{
    // margin: 0;
    // margin-right: -0.68rem;
  }
}
</style>