<template>
  <div class="container66" >
    
    <swiper :options="swiperOption"   v-if="swiperList.length">
      <swiper-slide v-for="(item,index) in swiperList" :key="index">
        <div class="one">
          <img
            class="one1"
            :src="item.image"
          />
          <div class="one2">
            <div class="one3">{{item.title}}</div>
            <div class="one4" v-html="item.intro"></div>
          </div>
        </div>
      </swiper-slide>
    </swiper>



 
    
      <div class="myleft" slot="button-prev">
        <img src="@/assets/recrement/19.png" alt />
      </div>
      <div class="myright" slot="button-next">
        <img src="@/assets/recrement/18.png" alt />
      </div>
      <!-- 11111111111111111111 -->
      <!-- <div class="blank"></div> -->
  </div>
</template>

<script>
export default {
    props: {
    swiperList: Array,
  },
  data() {
    return {
      arr:[
        {
          image:"https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1598412082&di=61961acb51deadfa99e79cc004ea467b&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"
        },  {
          image:"https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1598412082&di=61961acb51deadfa99e79cc004ea467b&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"
        },  {
          image:"https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1598412082&di=61961acb51deadfa99e79cc004ea467b&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"
        },
      ],
      swiperOption: {
        
        centeredSlides:true,
        slidesPerView: 1.3,
        spaceBetween: 30,
        // freeMode: true,
       navigation: {
          nextEl: ".container66 .myright",
          prevEl: ".container66 .myleft",
          // disabledClass: "my-button-disabled"
        },
        // autoplay: {
        //   slidesOffsetBefore: 50,
        //   delay: 3000,
        //   disableOnInteraction: false // 手动切换之后继续自动轮播
        // },
        // loop: true
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.blank{
  width: 100%;
  height: 1rem;

}
.container66 {
  position: relative;
  width: 100%;
  // height: 9rem;
  background-size: 100%;
  padding-bottom: 0.8rem;
}
.one {
  height: 8.8rem;
  width: 100%;
  // width: 5.5rem;

  .one1 {
    width: 100%;
    height: 5.5rem;
    display: block;
    margin: 0 auto;
  }
  .one2 {
    margin: 0 auto;
    width: 100%;
    // height: 1.68rem;
    background: #f5f5f5;
    opacity: 1;
    padding: 0.58rem  0 0 0.38rem;
    box-sizing: border-box;
        height: 2.62rem;

  }
  .one3 {
    font-size: 0.32rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    // line-height: 0.54rem;
    color: rgba(29, 151, 207, 1);
    opacity: 1;
    margin-bottom: 0.24rem;
    // margin-top: 0.6rem;
  }
  .one4 {
    // height: 0.86rem;
    font-size: 0.28rem;
    width: 4.48rem;
    font-family: Source Han Sans CN;
    font-weight: 300;
    line-height: 0.4rem;
    color: rgba(106, 114, 117, 1);
    opacity: 1;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;  
  }
}
.swiper-slide swiper-slide-active {
  // width: 100px;
  // img{}
}
// 1111111111111
// 按钮
.myleft {
  position: absolute;
  left: 2.5rem;
  top: 88%;
  z-index: 99;

  img {
    width: 1rem;
    height: 1rem;
  }
}
.myleft:focus,
.myright:focus {
  outline: none;
}
.myright {
  position: absolute;
  right: 2.5rem;
  top: 88%;
  z-index: 99;
  img {
    width: 1rem;
    height: 1rem;
    // box-shadow: 1px 1px 1px rgba(0,0,0,0.5)
    
  }
}
.my-button-disabled {
  opacity: 0.6;
  border: none;
}
// 11111111111111
</style>