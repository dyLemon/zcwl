<template>
  <div class="container">
    <div>
      <video
        ref="videoPlayer"
        controls
        autoplay="autoplay"
        controlslist="nodownload"
        :src="dataList.video"
        style="width: 100%; height: 560px; object-fit: fill"
      ></video>
      <div class="video-img" ></div>
    </div>
    <div class="profile">
      <div class="smallSwiper">
        <div class="content">
          <div class="title2">公司简介</div>
          <div class="title3">
            <div class="mysub1"></div>COMPANY PROFILE
            <div class="mysub2"></div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div>成都中创五联科技有限公司成立于2017年3月</div>
        <div style="margin-bottom:50px">是一家致力于开创和引领中国数字化智慧诊疗产业发展的高新技术企业。</div>
        <div>公司以构建一个精准、智能、安全、互通的智慧医疗中心为目标</div>
        <div>融合多模态医学影像重建、5G+互联网、云计算+云储存、AI+大数据分析等前沿技术</div>
        <div>实现优质医疗资源云端协同共享、海量诊疗级大数据深度挖掘应用</div>
        <div>为政府、医院、医疗机构和个人量身打造全方位、高效率的智能解决方案</div>
      </div>
    </div>
    <!-- 11111 -->
    <div class="mycontent">
      <img :src="dataList.middle_image" style="object-fit: cover;" alt />
      <div class="mycontent1">
        <div class="subContent">企业愿景</div>
        <div>{{dataList. company_vision}}</div>
      </div>
    </div>
    <!-- 222 -->

    <div class="profile1">
      <div class="smallSwiper1">
        <div class="content">
          <div class="title2">社会责任</div>
          <div class="title3">
            <div class="mysub1"></div>SMART MEDICAL CENTER
            <div class="mysub2"></div>
          </div>
        </div>
      </div>
      <div class="middle1">
        <div>本次发布会的召开，既展示了中创五联在多模态三维医学影像融合重建的成果</div>
        <div>也表达了中创五联将5G应用、AR技术与医学相结合</div>
        <div>为临床医疗创造更好未来的决心，为创造人民美好生活提供新助力</div>
      </div>

      <!-- 3333333 -->
    </div>
    <div class="img6">
      <img :src="dataList.social_image_one" style="margin-right:80px" />
      <img :src="dataList.social_image_two" alt />
    </div>

    <!-- 44444444 -->
    <div class="idea">
      <img src="@/assets/recrement/aboutUs_01.png" alt />
    </div>

    <!-- 5555555555 -->
    <!-- <div class="idea2">
      <img
        src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
        alt
      />
    </div>-->
    <!-- 11111111 -->
    <div class="smallSwiper1">
      <div class="content">
        <div class="title2">合作伙伴</div>
        <div class="title3">
          <div class="mysub1"></div>PARTNER
          <div class="mysub2"></div>
        </div>
      </div>
    </div>
    <!-- 11111111111111 -->
    <div class="brand clearfix">
      <div v-for="i in partnerList" :key="i.id">
        <img class="brandItem" style="object-fit: cover;" :src="i.brand_logo" />
      </div>
    </div>
    <!-- 111111111 -->
  </div>
</template>

<script>
import api from "@/api/home";
export default {
  data() {
    return {
      dataList: {},
      partnerList: [],
    };
  },
  methods: {
    getAboutUs() {
      api.getAboutUs().then((res) => {
        console.log(res,"res")
        this.dataList = res.data;
      });
    },
    getPartnerList() {
      api.getPartnerList().then((res) => {
        this.partnerList = res.data;
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
.container {
  width: 100%;
  min-width: 1200px;
}
.profile {
  width: 1200px;
  height: 612px;
  margin: 0 auto;
}
.smallSwiper {
  width: 100%;
  padding-top: 143px;
  padding-bottom: 42px;
  // 高度为662
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
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

.middle {
  width: 1200px;
  height: 242px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  div {
    margin-bottom: 20px;
  }
}
.mycontent {
  width: 100%;
  height: 400px;
  position: relative;
  img {
    width: 100%;
    height: 400px;
  }
  .mycontent1 {
    position: absolute;
    left: 360px;
    top: 150px;
  }
  .subContent {
    font-size: 30px;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 15px;
  }
  div {
    font-size: 18px;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 8px;
  }
}
.middle1 {
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  div {
    margin-bottom: 20px;
  }
}
.profile1 {
  width: 1200px;
  height: 389px;
  margin: 0 auto;
}
.smallSwiper1 {
  width: 100%;
  padding-top: 120px;
  padding-bottom: 50px;
  // 高度为662
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
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
.img6 {
  width: 100%;
  margin: 0 auto;
  height: 346px;
  margin-bottom: 120px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 560px;
    height: 346px;
  }
}
.idea {
  width: 100%;
  height: 900px;
  img {
    width: 100%;
    object-fit: cover;

    height: 900px;
  }
}
.idea2 {
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 300px;
  }
}
.brand {
  width: 1640px;
  margin: 0 auto;
  // padding: 0 139px;
  display: flex;
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
.brand div:first-child {
  margin-left: 0;
}
</style>