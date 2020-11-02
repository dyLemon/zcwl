<template>
  <div>
    <medical :dataInfo="dataInfo"></medical>
    <div class="contenta">
      <div class="smallSwiper11">
      <div class="content">
        <div class="title2">产品特点</div>
        <div class="title3">
          <div class="mysub1"></div>FEATURES
          <div class="mysub2"></div>
        </div>
      </div>
    </div>
    
      <div class="kuang">
        <!-- <img
          src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
          alt
        /> -->
        <div class="mydiv">{{features.detail[0].title}}</div>
        <div class="aaa8">{{features.detail[0].intro}}</div>
      </div>
    </div>
    <div class="solution"></div>
    <div class="smallSwiper">
      <div class="content">
        <div class="title2">解决方案</div>
        <div class="title3">
          <div class="mysub1"></div>SOLUTION
          <div class="mysub2"></div>
        </div>
      </div>
    </div>

    <div class="bigtitle">涵盖整个围手术期的临床精准医疗</div>
    <div class="solution1 xybtn" >
      <div class="sItem" v-for="(item,index) in solution.detail" :key="index"
        @mouseover="mouseOver(index)"
        @mouseleave="mouseLeave(index)"
        
      >
        <img :src="item.image" alt />
        <div class="sItem2"  :class="[currentIndex==index?'shadow':'']">
          <div class="sub1"  :class="[currentIndex==index?'active':'']" >{{item.title}}</div>
          <div class="sub2"  :class="[currentIndex==index?'active':'']" >{{item.intro}}</div>
        </div>
      </div>
    </div>

    <!-- 222222222222222222 -->
    <div class="assist">
      <div class="assist2">
        <div class="smallSwiper bbb">
          <div class="content">
            <div class="title2">辅助断症</div>
            <div class="title3">
              <div class="mysub1"></div>AUXILIARY SYNDROME
              <div class="mysub2"></div>
            </div>
          </div>
        </div>
        <!-- 1111111111 -->
        <div class="mytext8">辅助医生术前规划＆提升医患沟通时效性</div>
        <swiper4 :swiperList="syndrome.detail"></swiper4>
      </div>
    </div>
    <!-- 333333333333 -->
    <!-- 222222222222222222 -->
    <div class="assist3">
      <div class="assist2">
        <div class="smallSwiper">
          <div class="content">
            <div class="title2">手术规划</div>
            <div class="title3">
              <div class="mysub1"></div>SURGICAL PLANNING
              <div class="mysub2"></div>
            </div>
          </div>
        </div>
        <!-- 1111111111 -->
        <medicalSwiper1 :swiperList="planning.detail"></medicalSwiper1>
      </div>
    </div>
    <!-- 333333333333 -->

    <!-- 444444444444444 -->
    <div class="assist4">
      <div class="assist2">
        <div class="smallSwiper" style="backgroundColor:#f5f5f5;">
          <div class="content" style="backgroundColor:#f5f5f5;">
            <div class="title2">手术导航</div>
            <div class="title3">
              <div class="mysub1"></div>SURGICAL NAVIGATION
              <div class="mysub2"></div>
            </div>
          </div>
        </div>
        <!-- 1111111111 -->
        <bigSwiper :swiperList="navigation.detail"></bigSwiper>
      </div>
    </div>

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
  </div>
</template>
<script>
import api from "@/api/home";
import medical from "../../components/medical";
import mytitle from "../../components/mytitle";
import swiper4 from "../../components/swiper4";
import medicalSwiper1 from "./components/medicalSwiper1";
import bigSwiper from "./components/bigSwiper";

export default {
  components: {
    medical,
    mytitle,
    swiper4,
    medicalSwiper1,
    bigSwiper
  },
  data() {
    return {
       currentIndex: '',
      dataInfo: {},
      modelList: [],
      features: {}, //产品特色
      solution: {}, //解决方案
      syndrome: {}, //辅助断症
      planning: {}, //手术规划
      navigation: {}, //手术导航
      video: {} //产品视频
    };
  },
  methods: {
     mouseOver(index) {
      this.currentIndex = index;
    },
    mouseLeave() {
      this.currentIndex = 7;
    },
    operationDetail() {
      api.operationDetail(1).then(res => {
        console.log(res, "res");
        this.dataInfo = res.data.operation;
        this.modelList = res.data.child_menu;

        this.modelList.forEach(item => {
          if (item.menu == "产品特色") {
            this.features = item;
          }
          if (item.menu == "解决方案") {
            this.solution = item;
          }
          if (item.menu == "辅助断症") {
            this.syndrome = item;
          }
          if (item.menu == "手术规划") {
            this.planning = item;
          }
          if (item.menu == "手术导航") {
            this.navigation = item;
          }
          if (item.menu == "产品视频") {
            this.video = item;
          }
        });
      });
    }
  },
  created() {
    this.operationDetail();
  }
};
</script>
<style lang="scss" scoped>
.shadow{
  // box-shadow:0px 2px 4px rgba(4,19,26,0.2);
}
.active {
  // background: rgba(29, 151, 207, 1);
  color:#1D97CF ;
}
.contenta {
  width: 1920px;
  margin: 0 auto;
  height: 900px;
  background: url(../../assets/recrement/bbb.png) no-repeat center center;
  background-size: cover;
}
.solution {
  width: 1200px;
  margin: 0 auto;
}

.bigtitle {
  text-align: center;
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 40px;
}
.solution1 {
  width: 1200px;
  margin: 0 auto;
}
.sItem {
  width: 374px;
  height: 565px;
  img {
    width: 374px;
    height: 374px;
  }
  .sItem2 {
    padding: 40px;
    background: rgba(245, 245, 245, 1);
    .sub1 {
      font-size: 22px;
      font-weight: 500;
    }
    .sub2 {
      margin-top: 15px;
      font-size: 18px;
      line-height: 26px;
     word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;  
      height: 50px;
    }
  }
}
// 111111111
.assist {
  width: 100%;
  height: 823px;
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

.mytext8 {
  text-align: center;
  color: white;
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 40px;
}
.assist3 {
  width: 100%;
  height: 650px;
  background: white;
  background-size: cover;
}
.assist4 {
  width: 100%;
  height: 747px;
  background: #f5f5f5;
  background-size: cover;
}
.smallSwiper11 {
  width: 100%;
  padding-top: 80px;
  padding-bottom: 30px;
  //   height: 267px;
  // 高度为662
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
      color: white;
      font-weight: 800;
      font-size: 30px;
      margin-bottom: 13px;
    }
    .title3 {
      font-weight: 200;
      font-size: 22px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      .mysub1 {
        width: 100px;
        height: 0px;
        border: 0.5px solid white;
        opacity: 1;
        margin-right: 16px;
      }
      .mysub2 {
        width: 100px;
        height: 0px;
        border: 0.5px solid white;
        opacity: 1;
        margin-left: 16px;
      }
    }
  }
}
.ddd{
  width: 100%;
  height: 226px;
}
.kuang {
  width: 348px;
  height: 460px;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    // width: 100px;
    // height: 100px;
    // margin-bottom: 40px;
    //  opacity: 1;
     
  }
  .mydiv {
    margin-top: 100px;;
    
    width: 248px;
    height: 70px;
    font-size: 26px;
    font-weight: 500;
    line-height: 44px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    text-align: center;
  }
  .aaa8 {
    width: 268px;
    height: 50px;
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    text-align: center;
  }
}
// 11111111111
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
.video2 {
  width: 1200px;
  margin: 0 auto;
}
.video3 {
  width: 1260px;
  height: 460px;
  margin-bottom: 80px;
}
</style>