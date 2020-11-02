<template>
  <div>
    <medical :dataInfo="dataInfo"></medical>

    <!-- 222222222222222222 -->
    <div class="assist">
      <div class="assist2">
        <div class="smallSwiper bbb">
          <div class="content">
            <div class="title2">核心业务</div>
            <div class="title3">
              <div class="mysub1"></div>CORE BUSINESS
              <div class="mysub2"></div>
            </div>
          </div>
        </div>
        <!-- 1111111111 -->
        <div class="mytext8"></div>
        <swiper4 :swiperList="disease.detail"></swiper4>
      </div>
    </div>
    <!-- 333333333333 -->

    <div class="smallSwiper">
      <div class="content">
        <div class="title2">产品视频</div>
        <div class="title3">
          <div class="mysub1"></div>PRODUCT VIDEO
          <div class="mysub2"></div>
        </div>
      </div>
    </div>

    <!-- 55555555555555555555555555 -->
    <div class="video2" v-if="video.detail">
      <video
        ref="videoPlayer"
        controls
        controlslist="nodownload"
        :src="video.detail[0].image"
        class="video3"
        style="object-fit: fill"
      ></video>
    </div>

    <!-- 3333333333333333 -->
    <topdown></topdown>

    <!-- 44444444444444 -->
  </div>
</template>
<script>
import api from "@/api/home";
import medical from "../../components/medical";
import mytitle from "../../components/mytitle";
import swiper4 from "./components/medicalSwiper2";
import topdown from "./components/topdown";

export default {
  components: {
    medical,
    mytitle,
    swiper4,
    topdown,
  },
  data() {
    return {
      dataInfo: {},
      modelList: [],
      disease:{}, //涉及病种
      video: {}, //产品视频
    };
  },
  methods: {
    operationDetail() {
      api.operationDetail(2).then((res) => {
        console.log(res,"res")
        this.dataInfo = res.data.operation;
        this.modelList = res.data.child_menu;

        this.modelList.forEach((item) => {
          if (item.menu == "涉及病种") {
            this.disease = item;
          }
          if (item.menu == "产品视频") {
            this.video = item;
          }
        });
      });
    },
  },
  created() {
    this.operationDetail();
  },
};
</script>
<style lang="scss" scoped>
.contenta {
  width: 100%;
  height: 900px;
  background: url(../../assets/recrement/yisheng.png) no-repeat center center;
  background-size: cover;
}

.assist {
  width: 100%;
  height: 843px;
  background: url(../../assets/beijing.png) no-repeat center center;
  background-size: cover;
}
.assist2 {
  width: 1200px;
  margin: 0 auto;
  .bbb {
    background-color: transparent;
    color: white;
  }
}

.video2 {
  width: 1200px;
  margin: 0 auto;
}
.video3 {
  width: 1260px;
  height: 460px;
  margin-bottom: 80px;
}

.mytext8 {
  text-align: center;
  color: white;
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 40px;
}
.smallSwiper {
  width: 100%;
  padding-top: 80px;
  padding-bottom: 30px;
  //   height: 267px;
  // 高度为662
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    // width: 300px;
    height: 100px;
    // 高度为662
    // margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title2 {
      font-weight: 800;
      font-size: 30px;
      margin-bottom: 13px;
    }
    .title3 {
      font-weight: 200;
      font-size: 22px;
      color: rgba(149, 158, 162, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      .mysub1 {
        width: 100px;
        height: 0px;
        border: 0.5px solid rgba(149, 158, 162, 1);
        opacity: 1;
        margin-right: 16px;
      }
      .mysub2 {
        width: 100px;
        height: 0px;
        border: 0.5px solid rgba(149, 158, 162, 1);
        opacity: 1;
        margin-left: 16px;
      }
    }
  }
}
</style>