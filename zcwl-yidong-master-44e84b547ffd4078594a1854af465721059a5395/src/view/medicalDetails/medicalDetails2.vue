<template>
  <div>
    <medicalTitle :dataInfo="dataInfo" big="产品介绍" :small="small[0]" :bgc="bgc"></medicalTitle>

    <medical5 :swiperList="disease.detail"></medical5>
    <mytitle big="产品视频" :small="small[1]"></mytitle>
    <div class="vvv">
      <div class="videoBox">
        <video
          ref="videoPlayer"
          controls
          id="video2"
          controlslist="nodownload"
          class="video2"
          style="object-fit: fill"
          :poster="'http://zhongcwl.b.langqiyun.cn/'+video.detail[currIndex].video_img"
          :src="video.detail[currIndex].image"
        ></video>
      </div>
      <!-- <div class="coverBox" v-show="flag">
        <img class="cover" :src="baseUrl+ video.detail[currIndex].video_img" alt />
        <img class="play" @click="bofang" src="../../assets/play.png" alt />
      </div> -->
    </div>

    <div class="myrow">
      <div
        class="rowItem"
        v-for="(item,index) in video.detail"
        :class="currIndex == index ? 'isBorder':''"
        :key="index"
        @click="onchange(index)"
      >
        <img :src="baseUrl+item.video_img" alt />
        <div class="myover">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import medical5 from "@/components/medical5";
import mytitle from "@/components/mytitle";
import api from "@/api/home";
import medicalTitle from "@/components/medicalTitle";
export default {
  components: {
    medicalTitle,
    medical5,
    mytitle,
  },
  data() {
    return {
      bgc:
        "http://zhongcwl.b.langqiyun.cn/uploads/other/20200821/291942221e1f5279500ce24c9c714319.png",
      small: ["PRODUCT DESCRIPTION", "PRODUCT VIDEO"],
      play: false,
      dataInfo: {},
      modelList: [],
      currIndex: 0,
      flag:true,
      disease: {}, //涉及病种
      video: {}, //产品视频,
      baseUrl: "http://zhongcwl.b.langqiyun.cn",
    };
  },
  methods: {
    operationDetail() {
      api.operationDetail(2).then((res) => {
        console.log(res, "res");
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
        console.log("视频信息", this.video);
      });
    },
    bofang(){
console.log('132')
      let video = document.getElementById("video2");
      this.play = true;
      this.flag = false
      video.play();
      video.addEventListener("ended", () => {
        this.play = false;
      });
    },
    onchange(index) {
      this.currIndex = index;
      this.flag = true
    },
  },
  created() {
    this.operationDetail();
  },
};
</script>
<style lang="scss" scoped>
.vvv {
  position: relative;
  width: 95%;
  // padding: 0 0.32rem;
  height: 4.54rem;
  margin: 0 auto;
  margin-bottom: 0.32rem;
  img {
    position: absolute;
    width: 0.68rem;
    height: 0.68rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  .coverBox {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    .cover {
      width: 100%;
      height: 100%;
    }
    .play {
      width: 1rem;
      height: 1rem;
      position: absolute;
      left: 50%;
      top: 50%;
      // margin-left: -0.34rem;
      // margin-top: -0.34rem;
    }
  }
}
.videoBox{
  width: 99%;
  height: 99%;
  margin: 0 auto;
  margin-top: 0.1rem;
}
.video2 {
 width: 100%;
 height: 100%;
  // margin-bottom: 0.32rem;
}
.myrow {
  padding-left: 0.32rem;
  display: flex;
  overflow-x: scroll;
  margin-bottom: 0.34rem;
  padding-bottom: 0.34rem;
}
.rowItem {
  width: 2.58rem;
  height: 1.8rem;
  margin-right: 0.32rem;

  img {
    width: 2.58rem;
    height: 1.15rem;
    margin-bottom: 0.1rem;
  }
  div {
    font-size: 0.29rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.4rem;
    color: rgba(4, 19, 26, 1);
    opacity: 1;
  }
}
.isBorder{
div{
color: rgba(71,165,219,1);

}
}
</style>