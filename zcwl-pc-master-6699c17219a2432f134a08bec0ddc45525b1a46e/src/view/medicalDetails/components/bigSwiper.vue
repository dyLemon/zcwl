<template>
  <div class="container9">
    <swiper :options="swiperOption" v-if="swiperList" class="medical1">

      <!-- 从前 -->
      <swiper-slide class="swiper-slide">
        
        <!-- 此处为竖向swiper -->
        <div class="div1">
          <swiper :options="swiperOption1" v-if="swiperList[0].image">
            <swiper-slide v-for="(item,index) in swiperList[0].image" :key="index">
              <img :src="item" alt />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>

        <img class="middle8"
          src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
          alt
        />
        <div>{{swiperList[0].title}}</div>
        <div>{{swiperList[0].intro}}</div>

      </swiper-slide>

      <!-- 现在 -->
      <swiper-slide class="swiper-slide">
        <img
          src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg"
          alt
        />
        <div>{{swiperList[1].title}}</div>
        <div>{{swiperList[1].intro}}</div>
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
          nextEl: ".container9 .myright",
          prevEl: ".container9 .myleft",
          disabledClass: "my-button-disabled",
        },
      },

      swiperOption1: {
        slidesPerView: "auto",
        direction: "vertical",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.medical1{
  height: 400px;
}
.swiper-slide {
  display: flex;
  align-items: center
  img {
    width: 120vw;
    height: 400px;
    
  }
}
.middle8{
  height: 400px;
  width: 600px;
}
.div1 {
  width: 220px;
  height: 400px;
  img{
    width: 220px;
  height: 150px;
  }
  // margin: 20px auto;
  background-color: pink;
}
.div1 .swiper-container {
  height: 100%;
}
.div1 .swiper-slide {
  margin-top: 10px;
  height: 160px;
  img {
    width: 150px;
    height: 150px;
  }
}

.container9 {
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
