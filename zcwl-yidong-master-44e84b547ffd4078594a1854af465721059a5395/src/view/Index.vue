<template>
  <div class="index">
    <!-- 首页banner -->
    <xyswiper :swiperList="bannerList"></xyswiper>

    <!-- 智慧医疗中心 -->
    <mytitle big="智慧医疗中心" :small="small"></mytitle>
    <swiper4 :swiperList="linearDeafultList"></swiper4>

    <!-- 公司简介 -->
    <div class="profile55">
      <video
        ref="videoPlayer"
        controls
        controlslist="nodownload"
        id="video3"
       :poster="'http://zhongcwl.b.langqiyun.cn'+companyIntro.intro_video_image"
        :src="'http://zhongcwl.b.langqiyun.cn'+companyIntro.intro_video"
        class="video3"
        style="object-fit: fill"
      ></video>
        <!-- :src="companyIntro.video" -->

    </div>
    <div class="profile">
      <img class="cgg" src="../assets/ggg.png" alt />
      <div class="proContent" v-html="companyIntro.index_intro"></div>
      <div class="more xybtn" @click="$router.push('aboutUS')">
        <div class="more1">MORE</div>
        <div class="more1">/</div>
      </div>
    </div>

    <!-- 新闻 动态 -->
    <mytitle big="新闻动态" small="NEWS"></mytitle>
    <div class="indexNews">
      <div
        class="indexNewsItem"
        v-for="(item,index) in newList"
        :key="index"
        @click="goUrl(item.id)"
      >
        <img :src="item.image" alt />
        <div class="newsA">{{item.rel_time}}</div>
        <!-- <div class="newsB">{{item.title.slice(0,14)}}</div> -->
        <div class="newsB">{{item.title}}</div>
      </div>
    </div>

    <!-- 合作伙伴 -->
    <mytitle big="合作伙伴" small="PARTNER"></mytitle>
    <div class="partner">
      <div v-for="(item,index) in partnerList" class="pcc" :key="index">
        <img :src="item.brand_logo" class="brandImg" />
      </div>
    </div>
  </div>
</template>
<script>
import xyswiper from "@/components/swiper";
import swiper4 from "@/components/swiper4";
import mytitle from "@/components/mytitle";
import api from "@/api/home";
import more from "@/components/more";
export default {
  components: { xyswiper, swiper4, more, mytitle },
  data() {
    return {
      small: "SMART MEDICALC ENTER",
      currentIndex: 0,
      bannerList: [],
      myimg: "",

      linearList: [
        {
          name: "AI手术规划系统",
          img: require("../assets/1.png"),
          img2: require("../assets/recrement/12.png"),
          link: "/medicalDetails/1",
        },
        {
          name: "形态量化分析服务",
          img: require("../assets/2.png"),
          img2: require("../assets/recrement/13.png"),
          link: "/mEdicalDetails/2",
        },
        {
          name: "AI全血健康系统",
          img: require("../assets/3.png"),
          img2: require("../assets/recrement/14.png"),
          link: "/mEdicaDetails/3",
        },

        {
          name: "中创医学影像云",
          img: require("../assets/5.png"),
          img2: require("../assets/recrement/15.png"),
          link: "/mEdicalDtails/4",
        },
        {
          name: "数字化运动康复系统",
          img: require("../assets/4.png"),
          img2: require("../assets/recrement/16.png"),
          link: "/mEdicalDtail/5",
        },
      ],
      linearDeafultList: [],
      partnerList: [],
      newList: [],
      companyIntro: {},
      active: "",
      active1: "",
      play: false,
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
          this.$router.push({ path: "" });
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
      api.getBannerList({ plat: 2 }).then((res) => {
        this.bannerList = res.data;
      });
    },
    goUrl(id) {
      this.$router.push({ path: "/news/newsDetails/" + id });
    },

    getPartnerList() {
      api.getPartnerList().then((res) => {
        this.partnerList = res.data;
      });
    },

    getNewsList() {
      var data = {
        page: 1,
        limit: 999,
      };
      api.getIndexNews(data).then((res) => {
        console.log("新闻", res);
        this.newList = res.data.data;
      });
    },

    getFiveList() {
      api.getFiveList().then((res) => {
        this.linearDeafultList = res.data;
      });
    },

    getCompanyIntro() {
      api.getCompanyIntro().then((res) => {
        console.log(res, "companyIntro");
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
.xytitle {
  width: 100%;
  height: 1.78rem;
}
.profile55 {
  img {
    width: 100%;
    height: 0.68rem;
  }
  video {
    width: 100%;
    height: 4.36rem;
  }
}
.profile {
  width: 100%;
  padding: 0 0.34rem;
  padding-top: 0.34rem;
  background: rgba(245, 245, 245, 1);
  padding-bottom: 0.68rem;

  .cgg {
    width: 2.4rem;
    height: 0.6rem;
  }

  .proContent {
    margin-top: 0.2rem;
    font-size: 0.28rem;
    font-weight: 300;
    line-height: 0.4rem;
    color: rgba(106, 114, 117, 1);
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 10; /** 显示的行数 **/
    overflow: hidden;
  }
}
.more {
  margin-top: 0.34rem;
  width: 2.8rem;
  border-bottom: 1px solid rgba(149, 158, 162, 1);
  // padding-bottom: 0.68rem;
  background: rgba(245, 245, 245, 1);
}
.more1 {
  font-size: 0.22rem;
  font-weight: 200;
  line-height: 0.38rem;
  color: rgba(149, 158, 162, 1);
}
.indexNews {
  width: 100%;
  height: 4.46rem;
  display: flex;
  overflow-x: scroll;
  .indexNewsItem {
    margin-left: 0.34rem;

    img {
      width: 5.26rem;
      height: 3.1rem;
      border-radius: 5px;
      margin-bottom: 0.16rem;
    }
    .newsA {
      font-size: 0.2rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 0.3rem;
      color: rgba(149, 158, 162, 1);
      opacity: 1;
      margin-bottom: 0.16rem;
    }
    .newsB {
      font-size: 0.28rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 0.4rem;
      color: rgba(4, 19, 26, 1);
      opacity: 1;

      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
.partner {
  width: 100%;
  // padding: 0 0.34rem;
  padding-left: 0.34rem;
  display: flex;
  flex-wrap: wrap;
  .brandImg {
    width: 2.06rem;
    height: 2.06rem;
    // margin:  0 2.5%;
    margin-right: 0.32rem;
    margin-bottom: 0.32rem;
  }
}
.profile55 {
  position: relative;
  img {
    width: 0.68rem;
    height: 0.68rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}
</style>