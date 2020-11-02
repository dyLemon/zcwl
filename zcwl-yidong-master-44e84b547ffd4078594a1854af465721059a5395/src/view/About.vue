<template>
  <div class="container1">
    <div class="news">
      <div class="myvideo">
        <video
          ref="videoPlayer"
          controls
          controlslist="nodownload"
          id="video3"
          :src="dataList.video"
          class="topBanner"
          :poster="'http://zhongcwl.b.langqiyun.cn'+dataList.video_image"
          x5-playsinline
          playsinline="true"
          webkit-playsinline="true"
          x-webkit-airplay="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen
          x5-video-orientation="portraint"
        ></video>
      </div>

      <div class="xyaaa zzNav" >
        <div class="xynav xybtn">
          <div class="left">
            <div class="sub1" @click="goToNavigation('/')">首页＞</div>
            <div class="sub2">关于我们</div>
          </div>

          <img class="right" src="../assets/shubiao.png" alt />
        </div>
      </div>
      
    </div>
    <!-- 占位高度的盒子 -->
    <div class="aaa"></div>
    <!-- 占位高度的盒子 -->
    <mytitle big="公司简介" :small="small[0]"></mytitle>
    <div class="cdd">
      <div class="profile" v-html="dataList.intro"></div>
    </div>
    <div>
      <div class="myhope">
        <!-- <div class="hope2">企业愿景</div> -->
        <div class="hope3">{{dataList.company_vision}}</div>

        <div class="hopeBg">
          <img :src="'http://zhongcwl.b.langqiyun.cn'+dataList.back_image_mobile" alt />
        </div>
      </div>

      <div class="myp">
        <mytitle2 big="产品体系" :small="small[0]"></mytitle2>
        <div class="myprofile2" v-html="dataList.social_responsibility"></div>
        <img :src="dataList.social_image_one" alt />
        <img :src="dataList.social_image_two" alt />
      </div>
      <!-- 11111111111 -->
    </div>
    <div class="blueImg" :style="{backgroundImage: 'url(' + (dataList.middle_image) + ')'}">
    

    
   
    </div>

    <div class="lichengBox" v-if="dataList.brand_is_open == 1">
      <img :src="dataList.brand_image" alt />
    </div>

    <!-- 11111111 -->
    <mytitle big="合作伙伴" small="PARTNER"></mytitle>
    <div class="partner">
      <div v-for="(item,index) in partnerList" class="pcc" :key="index">
        <img :src="item.brand_logo" class="brandImg" />
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/home";
import mytitle from "@/components/mytitle";
import mytitle2 from "@/components/mytitle2";

export default {
  components: {
    mytitle,
    mytitle2,
  },
  data() {
    return {
      small: ["COMPANY PROFILE"],
      dataList: {},
      partnerList: [],
      play: false,
    };
  },
  methods: {
    goToNavigation(path) {
      this.$router.push({ path: path });
    },
    getPartnerList() {
      api.getPartnerList().then((res) => {
        this.partnerList = res.data;
      });
    },

    getAboutUs() {
      api.getAboutUs().then((res) => {
        console.log(res, "关于我们");
        this.dataList = res.data;
      });
    },
  },
  created() {
    this.getAboutUs();
    this.getPartnerList();
  },
};
</script>


<style lang="scss" scoped>
.lichengBox {
  height: 3.5rem;
  width: 100%;
  // background: red;
  img {
    width: 100%;
    height: 100%;
  }
}
.myvideo {
  position: relative;
  video {
    width: 100%;
    height: 3.5rem;
  }
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
.aaa {
  margin-top: 0.3rem;
}
.cdd {
  //  background:url(../assets/huahua.png) no-repeat center center;
  background: url(../assets/guanyu.png) no-repeat center center;
  background-position: 55% 103%;
  background-size: 150% 82%;
  // padding-bottom: 0.68rem;
  // opacity: 0.2;
}
.profile {
  padding: 0 0.34rem;
  // height: 3.57rem;

  font-size: 0.28rem;
  font-family: Source Han Sans CN;
  font-weight: 300;
  line-height: 0.4rem;
  color: rgba(106, 114, 117, 1);
  opacity: 1;
  padding-bottom: 0.68rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 9; /** 显示的行数 **/
  overflow: hidden;
}
.myhope {
  width: 100%;
  height: 3.5rem;
  // background: #13658b url(../assets/myhope.png) no-repeat center center;
  background-size: 100%;
  position: relative;
  .hopeBg {
    position: absolute;
    width: 100%;
    height: 100%;
    // background: red;
    top: 0;
    z-index: -1;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .hope2 {
    padding-top: 0.38rem;
    padding-left: 0.34rem;
    font-size: 0.32rem;
    margin-bottom: 0.1rem;
    font-family: Source Han Sans CN;
    font-weight: 500;
    line-height: 0.64rem;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
  }
  .hope3 {
    width: 2.88rem;
    height: 1.78rem;
    padding-left: 0.34rem;
    font-size: 0.24rem;
    font-family: Source Han Sans CN;
    font-weight: 300;
    line-height: 0.36rem;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 5; /** 显示的行数 **/
    overflow: hidden;
  }
}
.myp {
  padding: 0 0.34rem;
  background-color: #f5f5f5;

  img {
    width: 6.82rem;
    height: 4.2rem;
    margin-bottom: 0.34rem;
    // object-fit: contain;
  }
}
.myprofile2 {
  font-size: 0.28rem;
  font-family: Source Han Sans CN;
  font-weight: 300;
  line-height: 0.4rem;
  color: rgba(106, 114, 117, 1);
  opacity: 1;
  padding-bottom: 0.34rem;
}
.blueImg {
  // background-color: black;
  height: 3.5rem;
  background-size: 100% 100%;
  img {
    box-sizing: border-box;
    // padding: 0.34rem;
    width: 100%;
    object-fit: cover;
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
.zzNav{
  .xynav {
  // bottom: - !important;
  top: 0;

  }
}
</style>