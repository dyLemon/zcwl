<template>
  <div class="index">
    <!-- <div class="xyswiper"> -->
    <xyswiper :swiperList="bannerList"></xyswiper>
    <!-- </div> -->
    <!-- 1111 -->
    <div class="smallSwiper">
      <div class="content">
        <div class="title2">智慧医疗中心</div>
        <div class="title3">
          <div class="mysub1"></div>SMART MEDICAL CENTER
          <div class="mysub2"></div>
        </div>
      </div>
    </div>

    <!-- 智慧医疗中心 -->
    <div class="bigContainer clearfix" v-if="linearDeafultList[currentIndex]">
      <img class="img1" :src="linearDeafultList[currentIndex].image" alt />
      <div class="title">
        <img class="mytitle1" :src="linearList[currentIndex].img" alt />
        <div class="xysub1">{{linearDeafultList[currentIndex].intro}}</div>
        <div class="mymore xybtn" @mouseover="mouseOver" @mouseleave="mouseLeave" :style="active">
          <div class="xusub2" :style="active" @click="jumpUrl(currentIndex)">MORE</div>
          <div class="xusub2" :style="active">/</div>
        </div>
      </div>
    </div>
    <!-- laksdjf -->
    <div class="bigContainer clearfix">
      <div class="linear1">
        <div v-for="(i,index) in linearList" :key="index" class="linear3" @click="itemClick(index)">
          <div class="mycontent">
            <div class="top4" :class="{active1: index ===  currentIndex}"></div>
            <div class="bottom4" :class="{active: index ===  currentIndex}">{{i.name}}</div>
          </div>
          <div class="linear2"></div>
        </div>
      </div>
    </div>
    <!-- 11111111111111111111111111 -->

    <div class="profile xybtn">
      <div class="left" v-if="companyIntro.video">
        <video
          ref="videoPlayer"
          controls
          controlslist="nodownload"
          :src="companyIntro.video"
          class="video3"
          style="object-fit: fill"
        ></video>
      </div>
      <!-- 公司简介 -->
      <div class="right">
        <img src="../assets/recrement/gongsi.png" alt />
        <div class="contnet">{{companyIntro.intro}}</div>
        <div
          class="mymore xybtn"
          @mouseover="mouseOver1"
          @mouseleave="mouseLeave1"
          :style="active1"
        >
          <div class="xusub2" :style="active1" @click="jumpUrl(5)">MORE</div>
          <div class="xusub2" :style="active1">/</div>
        </div>
        <div class="aaa7">
          <img class="aaa8" src="../assets/logo2.png" alt />
        </div>
      </div>
    </div>
    <!-- 111111111111111 -->
    <div class="newsCenter">
      <div class="smallSwiper">
        <div class="content">
          <div class="title2">新闻动态</div>
          <div class="title3">
            <div class="mysub1"></div>NEWS
            <div class="mysub2"></div>
          </div>
        </div>
      </div>
      <div class="dynamic">
        <xyswiper1 :swiperList="newList"></xyswiper1>
      </div>
    </div>

    <div class="partner">
      <div class="smallSwiper">
        <div class="content">
          <div class="title2">合作伙伴</div>
          <div class="title3">
            <div class="mysub1"></div>MESSAGE FORM
            <div class="mysub2"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="brand clearfix">
      <div v-for="i in partnerList" :key="i.id">
        <img class="brandItem" :src="i.brand_logo" />
      </div>
    </div>
    <!-- 媒体动态 -->
  </div>
</template>  


<script>
import xyswiper from "@/components/swiper";
import xyswiper1 from "@/components/swiper2";
import api from "@/api/home";

export default {
  components: { xyswiper, xyswiper1 },
  data() {
    return {
      currentIndex: 0,
      bannerList: [],
      myimg: "",

      linearList: [
        {
          name: "AI手术规划系统",
          img: require("../assets/1.png"),
          img2: require("../assets/recrement/12.png"),
        },
        {
          name: "形态量化分析服务",
          img: require("../assets/2.png"),
          img2: require("../assets/recrement/13.png"),
        },
        {
          name: "AI全血健康系统",
          img: require("../assets/3.png"),
          img2: require("../assets/recrement/14.png"),
        },

        {
          name: "中创医学影像云",
          img: require("../assets/5.png"),
          img2: require("../assets/recrement/15.png"),
        },
        {
          name: "数字化运动康复系统",
          img: require("../assets/4.png"),
          img2: require("../assets/recrement/16.png"),
        },
      ],
      linearDeafultList: [],
      partnerList: [],
      newList: [],
      companyIntro: {},
      active: "",
      active1: "",
    };
  },
  methods: {
    mouseOver1: function () {
      this.active1 = "color: #1D97CF;    border-bottom: 0.5px solid #1D97CF;";
    },
    mouseLeave1: function () {
      this.active1 = "";
    },

    mouseOver: function () {
      this.active = "color: #1D97CF;    border-bottom: 0.5px solid #1D97CF;";
    },
    mouseLeave: function () {
      this.active = "";
    },
    itemClick(index) {
      this.currentIndex = index;
    },

    jumpUrl(id) {
      switch (id) {
        case 0:
          this.$router.push({ path: "/medicalDetails/1" });
          break;
        case 1:
          this.$router.push({ path: "/mEdicalDetails/2" });
          break;
        case 2:
          this.$router.push({ path: "/mEdicaDetails/3" });
          break;
        case 3:
          this.$router.push({ path: "/mEdicalDtails/4" });
          break;
        case 4:
          this.$router.push({ path: "/mEdicalDtail/5" });
          break;
        case 5:
          this.$router.push({ path: "/aboutUs" });
          break;
      }
    },

    getBanner() {
      api.getBannerList().then((res) => {
        this.bannerList = res.data;
      });
    },

    getPartnerList() {
      api.getPartnerList().then((res) => {
        this.partnerList = res.data;
      });
    },

    getNewsList() {
      api.getIndexNews().then((res) => {
        this.newList = res.data;
      });
    },

    getFiveList() {
      api.getFiveList().then((res) => {
        this.linearDeafultList = res.data;
      });
    },

    getCompanyIntro() {
      api.getCompanyIntro().then((res) => {
        this.companyIntro = res.data;
      });
    },
  },
  created() {
    this.getBanner();
    this.getPartnerList();
    this.getNewsList();
    this.getFiveList();
    this.getCompanyIntro();
  },
};
</script>

<style lang='scss' scoped>
.profile {
  width: 1920px;
  height: 560px;
  margin: 0 auto;
  .left {
    video {
      width: 960px;
      height: 560px;
    }
  }
  .right {
    width: 960px;
    height: 560px;
    padding-left: 80px;
    padding-top: 80px;
    padding-right: 80px;
    background-color: #f5f5f5;
    display: relative;
  }
  .contnet {
    width: 100%;
    height: 190px;
    margin-top: 35px;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    margin-bottom: 39px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 7; /** 显示的行数 **/
    overflow: hidden;
  }
}
.active {
  color: #1d97cf;
}
.active1 {
  background-color: #1d97cf !important;
}
// .active1{
//   background-color: deeppink;
// }
.xyswiper {
  width: 100%;
  height: 200px;
  // 高度为980
  background-color: yellow;
}

.smallSwiper {
  width: 100%;
  height: 267px;
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
.bigContainer {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .img1 {
    width: 742px;
    height: 520px;
  }
  .title {
    width: 378px;
    height: 520px;
    margin-left: 68px;
  }
}
.mytitle1 {
  width: 100%;
  height: 100px;
  margin-bottom: 30px;
  // object-fit: cover;
}
.mymore {
  width: 160px;
  height: 30px;
  border-bottom: 0.5px solid rgba(149, 158, 162, 1);
  // border:1px solid ;
}
.xysub1 {
  margin-bottom: 60px;
  line-height: 22px;
  height: 200px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 9; /** 显示的行数 **/
  overflow: hidden;
}
.xusub2 {
  font-size: 14px;
  font-weight: 200;
  color: rgba(149, 158, 162, 1);
}
.avtive1 {
  background: rgba(29, 151, 207, 1);
}
.linear1 {
  width: 1200px;
  height: 244px;
  // background-color: yellow;
  display: flex;
  align-items: center;
  .mycontent {
    display: flex;
    flex-direction: column;
    //  justify-content: center;
    align-items: center;
  }
  .linear3 {
    display: flex;
    align-items: center;
  }
  .top4 {
    margin-bottom: 6px;
    width: 20px;
    height: 20px;
    background: rgba(4, 19, 26, 0.6);

    border-radius: 50%;
    text-align: center;
  }
  .bottom4 {
    font-size: 14px;
  }
  .linear2 {
    box-sizing: border-box;
    width: 80px;
    height: 0px;
    border: 0.5px solid rgba(4, 19, 26, 1);
    opacity: 1;
    margin: 0 34px;
  }
}
.aaa7 {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.aaa8 {
  text-align: right;
}
.linear3:last-child .linear2 {
  width: 0;
  height: 0;
  margin: 0;
}
.newsCenter {
  width: 100%;
  height: 720px;
  // background-color: skyblue;
}
// 新闻动态

// 新闻动态
.brand {
  width: 1640px;
  margin: 0 auto;
  // padding: 0 139px;
  display: flex;
  flex-wrap: wrap;
  // float: right;
}
.brand div {
  box-sizing: border-box;
  margin-left: 39px;
  margin-bottom: 39px;
}
.brandItem {
  box-sizing: border-box;
  width: 241px;
  height: 241px;
}
</style>
  
