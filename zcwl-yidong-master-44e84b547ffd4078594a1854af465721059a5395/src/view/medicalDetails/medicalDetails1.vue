<template>
  <div>
    <medicalTitle big="产品介绍" :small="small[0]" :dataInfo="dataInfo" :bgc="bgc"></medicalTitle>
    <!-- 产品特点 -->
    <medical12 :swiperList="features.detail"></medical12>
    <!-- 解决方案 -->
    <mytitle big="解决方案" small="SOLUTION"></mytitle>
    <div class="medicalA">涵盖整个围手术期的临床精准医疗</div>
    <medical11 :swiperList="solution.detail"></medical11>

    <!-- 辅助断症症状 -->
    <!-- <medical13 :swiperList="solution.detail"></medical13> -->
    <medical13 :swiperList="syndrome.detail"></medical13>

     
    <!-- 手术规划 -->
    <guihua :swiperList="planning.detail"></guihua>
    <!-- 手术导航 -->
    <daohang :swiperList="navigation.detail"></daohang> 

    <!-- 产品视频 -->
    <mytitle big="产品视频" :small="small1"></mytitle>
    <div class="lastVideo">
      <video
        id="videok"
        ref="videoPlayer"
        :poster="'http://zhongcwl.b.langqiyun.cn'+video.detail[0].video_img"
 controlslist="nodownload"
      controls
        style="object-fit: fill"
        :src="video.detail[0].image"
      ></video>
        <!-- controls
        controlslist="nodownload" -->
    </div>
  </div>
</template>
<script>
import mytitle from "@/components/mytitle";
import api from "@/api/home";
import medicalTitle from "@/components/medicalTitle";
import medical11 from "@/components/medical11";
import medical12 from "@/components/medical12";
import medical13 from "@/components/medical13";
import guihua from "@/components/guihua";
import daohang from "@/components/daohang";

export default {
  components: {
    medicalTitle,
    medical11,
    mytitle,
    medical12,
    medical13,
    guihua,
    daohang
  },
  data() {
    return {
      play: false,
      small1: "PRODUCT VIDEO",
      small: ["PRODUCT DESCRIPTION"],
      bgc:
        "http://zhongcwl.b.langqiyun.cn/uploads/other/20200821/2b46d3307d0051b165c620779706233e.png",
      small: ["PRODUCT DESCRIPTION"],
      currentIndex: "",
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
        console.log( "res",res);
        this.dataInfo = res.data.operation;
        this.modelList = res.data.child_menu;

        this.modelList.forEach(item => {
          if (item.menu == "产品特色") {
            item.detail.forEach((val, index) => {
              if (index == 0) {
                val.prevImage = item.detail[item.detail.length - 1].image;
                val.nextImage = item.detail[index + 1].image;
              } else if (index == item.detail.length - 1) {
                val.prevImage = item.detail[index - 1].image;
                val.nextImage = item.detail[0].image;
              } else {
                val.nextImage = item.detail[index + 1].image;
                val.prevImage = item.detail[index - 1].image;
              }
            });
            console.log(item)
            this.features = item;
          }
          if (item.menu == "解决方案") {
            this.solution = item;
            // console.log("  this.solution",  this.solution)
          }
          if (item.menu == "辅助断症") {
            this.syndrome = item;
            // console.log("  this.syndrome",  this.syndrome)

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
          // console.log("产品视频", this.video)
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
.medicalA {
  font-size: 0.29rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.48rem;
  color: rgba(29, 151, 207, 1);
  opacity: 1;
  text-align: center;
  margin-bottom: 0.34rem;
}
.lastVideo {
  position: relative;
  padding: 0 0.22rem;
  margin-bottom: 0.52rem;
  video {
    width: 100%;
    height: 3.06rem;
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
</style>