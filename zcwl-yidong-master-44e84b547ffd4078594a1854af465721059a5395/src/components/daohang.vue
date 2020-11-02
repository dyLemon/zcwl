<template>
  <div class="container66">
    <mytitle3 big="手术导航" :small="small"></mytitle3>
    <!-- swiper-no-swiping" -->
    <div class="swiper-container">
      <swiper :options="swiperOption">
        <swiper-slide class="swiper-slide swiper-no-swiping" v-if="swiperList[0]">
          <div class="Dnav1">
            <img class="Dimg" :src="swiperList[0].image[aIndex]" alt />
          </div>
          <div class="Dnav2">
            <div v-for="(item, index) in swiperList[0].image" :key="index" @click="onchange(index)">
              <img class="img2" :src="item" alt />
            </div>
          </div>
          <div class="Dcontent">
            <div class="Dleft">
              <img src="../assets/boo.png" alt />
              <div class="Dleft2" v-html="swiperList[0].intro"></div>
            </div>
            <img class="Dright myright" src="../assets/qqq.png" alt />
          </div>
        </swiper-slide>
        <!-- 右边 -->
        <swiper-slide class="swiper-slide">
          <div class="xyNav2">
            <video
              id="videoB"
              ref="videoPlayer"
              controls
              :poster="swiperList[1].image[currentIndex].video_image"
              controlslist="nodownload"
              style="object-fit: fill"
              :src="swiperList[1].image[currentIndex].video"
            ></video>
         
          </div>

          <div class="mybread">
            <div
              class="mybread1"
              @click="changeColor(index)"
              v-for="(item,index) in swiperList[1].image"
              :key="index"
              :class="[currentIndex==index?'active':'']"
            >
              <div class="title">{{item.title}}</div>
              <div class="line"></div>
            </div>
          </div>
          <div class="mynow">
            <div class="btn">
              <img class="mynoe1 myleft" src="../assets/rr.png" alt />
            </div>

            <div class="nowRi">
              <img
                class="ww"
                style=" width: 0.92rem;
    height: 0.35rem;"
                src="../assets/jj.png"
                alt
              />
              <div class="vvv" style v-html="swiperList[1].intro"></div>
            </div>
          </div>
        </swiper-slide>

        <!-- 左右箭头 -->
      </swiper>
      <div class="blank"></div>

      <!-- 分页器 -->

      <!-- 左右箭头 -->

      <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
    </div>
  </div>
</template>
<script>
import mytitle3 from "@/components/mytitle2";
export default {
  props: {
    swiperList: Array,
  },
  components: {
    mytitle3,
  },
  created() {
    console.log(this.$props);
  },
  data() {
    let _this = this;

    return {
      arr: ["1111", "2222", "3333"],
      currentIndex: 0,
      aIndex: 0,
      play: false,
      small: "SURGICAL NAVIGATION",
      swiperOption: {
        disabledClass: "my-button-disabled",
        //显示分页
        //设置点击箭头
        navigation: {
          nextEl: ".container66 .myright",
          prevEl: ".container66 .myleft",
          disabledClass: "my-button-disabled",
        },
        on: {
          slideChangeTransitionEnd: function () {
            console.log(this.activeIndex);
            _this.indexDefault = this.activeIndex;
          },
        },
      },
    };
  },
  methods: {
    changeColor(index) {
      this.currentIndex = index;
    },
    onchange(index) {
      this.aIndex = index;
    },
  },
};
</script>
<style lang="scss" scoped>
.blank {
  height: 0.8rem;
  width: 100%;
  // background: red;
}
.container66 {
  background-color: #f5f5f5;
  // height: 9.04rem;
}
.Dnav1 {
  padding: 0 0.34rem;
  margin-bottom: 0.34rem;
}
.Dimg {
  width: 100%;
  height: 3.12rem;
}
.Dnav2 {
  overflow-x: scroll;
  width: 100%;
  display: flex;
  padding-left: 0.34rem;
  padding-bottom: 20px;
}
.img2 {
  width: 1.66rem;
  height: 1.13rem;
  margin-right: 0.34rem;
}
.Dcontent {
  padding-left: 0.34rem;
  margin-top: 0.23rem;
  width: 100%;
  // height: 1.24rem;
  // background-color: pink;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .Dright {
    width: 1rem;
    height: 1rem;
    margin-right: 0.2rem;
  }
  img {
    width: 0.92rem;
    height: 0.39rem;
    margin-bottom: 0.24rem;
  }
  .Dleft2 {
    width: 3.66rem;
    // background: red;
    // height: 0.75rem;
    font-size: 0.29rem;
    font-family: Source Han Sans CN;
    font-weight: 300;
    line-height: 0.4rem;
    color: rgba(106, 114, 117, 1);
    opacity: 1;

    white-space: pre;

    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;
  }
}
.xyNav2 {
  padding: 0 0.34rem;
  position: relative;
  video {
    width: 100%;
    height: 3.12rem;
  }
  .myplay {
    width: 0.68rem;
    height: 0.68rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}

.mybread {
  width: 100%;
  // height: 0.64rem;
  //   position: absolute;
  //   left: -355px;
  //   bottom: -135px;
  display: flex;
  justify-content: space-between;
  .mybread1 {
    font-size: 0.2rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.3rem;
    color: rgba(4, 19, 26, 1);
    opacity: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1;
    padding-left: 0.34rem;
    border-bottom: 2px solid rgba(149, 158, 162, 1);

    .title {
      margin-top: 0.16rem;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .line {
      height: 0.16rem;
      // border-bottom: 2px solid rgba(149, 158, 162, 1);
      // background: red;
      width: 100%;
    }
  }
}
.active {
  border-bottom: 2px solid #1d97cf !important;
  color: black !important;
}
.mynow {
  margin-top: 0.66rem;
  width: 100%;
  height: 2.58rem;
  padding-left: 0.24rem;
  padding-right: 0.74rem;
  display: flex;
  align-items: center;

  .mynoe1 {
    width: 0.92rem;
    height: 0.92rem;
    margin-right: 0.57rem;
  }
  .ww {
    width: 0.92rem;
    height: 0.35rem;
  }
  .vvv {
    margin-top: 0.24rem;
    font-size: 0.29rem;
    font-family: Source Han Sans CN;
    font-weight: 300;
    line-height: 0.4rem;
    color: rgba(106, 114, 117, 1);
    opacity: 1;
    margin-bottom: 0.34rem;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;
  }
}
.myleft:focus,
.myright:focus {
  outline: none;
}

.btn {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.3rem;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>