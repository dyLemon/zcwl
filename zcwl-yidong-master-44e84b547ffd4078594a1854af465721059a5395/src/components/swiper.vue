<!--
 * @Author: your name
 * @Date: 2020-08-15 15:28:57
 * @LastEditTime: 2020-08-15 15:49:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zcwl\src\components\swiper.vue
-->
<template>
  <div class="main-swiper-box">
    <swiper ref="mySwiper" :options="swiperOptions" v-if="swiperList.length">
      <swiper-slide class="myslide" v-for="item in swiperList" :key="item.id">
        <img :src="item.image" alt />
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination " slot="pagination">
      <span
        :class="{active:active == index}"
        v-for="(item, index) in swiperList.length"
        :key="index"
      >
        {{index+1}}
        <span></span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    swiperList: Array,
    loop: Boolean
  },
  name: "carrousel",
  data() {
    var _this = this;
    return {
      active: 0,
      swiperOptions: {
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false
        },
        loop: false,
        on: {
          slideChangeTransitionStart: function() {
            _this.active = this.realIndex;
          }
        }
        // Some Swiper option/callback...
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.myslide img {
  width: 100%;
  height: 13.6rem;
  // object-fit: scale-down;
}
.main-swiper-box {
  position: relative;
  .swiper-pagination {
    position: absolute;
    bottom: 40px;
    width: 100%;
    left: -50%;
    transform: translate(10%);
    color: white;
    font-family: Source Han Sans CN;
    font-weight: 400;
    text-align: center;
    // padding-right: 360px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span {
      transition: all 0.3s linear;
      display: flex;
     font-size:0.2rem;

      align-items: center;
      span {
        width: 0;
        margin: 0 10px;
      }
    }
    span.active {
      font-size:0.28rem;
      span {
        width: 0.34rem;
        height: 1px;
        background: white;
      }
    }
  }
}
</style>