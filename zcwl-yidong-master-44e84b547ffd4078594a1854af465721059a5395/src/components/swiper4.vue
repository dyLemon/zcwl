<template>
  <div>
    <div class="container7 clearfix">
      <swiper :options="swiperOption">
        <swiper-slide class="swiper-slide" v-for="(item,index) in swiperList" :key="index">
          <img class="indexImg" :src="item.image" alt />
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

    <!-- 11111111111111111111 -->
    <img class="indexImg2" :src="linearList[indexDefault].img" alt />
    <!-- 2222222222 -->
    <div
      class="indexContent"
      v-if="swiperList[indexDefault]"
      v-html="swiperList[indexDefault].intro"
    ></div>
    <div class="more xybtn" @click="mygo(indexDefault)">
      <div class="more1">MORE</div>
      <div class="more1">/</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    swiperList: Array
  },
  data() {
    let _this = this;
    return {
      indexDefault: 0,
      swiperOption: {
        disabledClass: "my-button-disabled",
        //显示分页
        pagination: {
          //   el: '.swiper-pagination'
        },
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
        //自动轮播
        // autoplay: {
        //   delay: 2000,
        //   //当用户滑动图片后继续自动轮播
        //   disableOnInteraction: false,
        // },
        //开启循环模式
        // loop: true
      },
      linearList: [
        {
          name: "AI手术规划系统",
          img: require("@/assets/1.png"),
          img2: require("@/assets/recrement/12.png"),
          link: "/medicalCenter/medicalDetails1"
        },
        {
          name: "形态量化分析服务",
          img: require("@/assets/2.png"),
          img2: require("@/assets/recrement/13.png"),
          link: "/medicalCenter/medicalDetails2"
        },
        {
          name: "AI全血健康系统",
          img: require("@/assets/3.png"),
          img2: require("@/assets/recrement/14.png"),
          link: "/medicalCenter/medicalDetails3"
        },

        {
          name: "中创医学影像云",
          img: require("@/assets/5.png"),
          img2: require("@/assets/recrement/15.png"),
          link: "/medicalCenter/medicalDetails4"
        },
        {
          name: "数字化运动康复系统",
          img: require("@/assets/4.png"),
          img2: require("@/assets/recrement/16.png"),
          link: "/medicalCenter/medicalDetails5"
        }
      ]
    };
  },
  methods:{
    mygo(index){
      console.log(222222)
      console.log(index)
      this.$router.push(this.linearList[index].link)

    }
  }
};
</script>
<style lang="scss" scoped>
.swiper-slide {
  .indexImg {
    width: 100%;
    height: 5.26rem;
  }
}

.container7 {
  position: relative;
  width: 100%;
}
.indexImg2 {
  box-sizing: border-box;
  margin-top: 0.1rem;
  width: 100%;
  height: 1.7rem;
  padding: 0 0.34rem;
}
.indexContent {
  // height: 5.1rem;
  width: 100%;
  padding: 0.34rem;
  font-size: 0.28rem;
  font-weight: 300;
  line-height: 0.4rem;
  color: rgba(106, 114, 117, 1);
  // word-break: break-all;
  // text-overflow: ellipsis;
  // display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  // -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  // -webkit-line-clamp: 12; /** 显示的行数 **/
  // overflow: hidden;
}
.more {
  margin-top: 0.34rem;
  width: 2.8rem;
  margin-left: 0.34rem;
  border-bottom: 1px solid rgba(149, 158, 162, 1);
  margin-bottom: 0.68rem;
}
.more1 {
  font-size: 0.22rem;
  font-weight: 200;
  line-height: 0.38rem;
  color: rgba(149, 158, 162, 1);
}

.myleft {
  position: absolute;
  left: 0.34rem;
  top: 50%;
  z-index: 99;

  img {
    width: 0.9rem;
    height: 0.9rem;
  }
}

.myleft:focus,
.myright:focus {
  outline: none;
}
.myright {
  position: absolute;
  right: 0.34rem;
  top: 50%;
  z-index: 99;
  img {
    width: 0.9rem;
    height: 0.9rem;
  }
}
.my-button-disabled {
  opacity: 0.6;
  border: none;
}
</style>
