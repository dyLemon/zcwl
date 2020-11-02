<template>
  <div class="container">
    <div class="bigImg">
      <img :src="InstituteDetail.top_image" alt />
      <div class="xyaaa">
        <div class="xynav xybtn">
          <div class="left">
            <div class="sub1">首页＞</div>
            <div class="sub2">研究院</div>
          </div>

          <img
            class="right"
            src="../assets/shubiao.png"
            alt
          />
        </div> 
      </div>
    </div>
    <div class="smallSwiper">
      <div class="content">
        <div class="title2">产品理念</div>
        <div class="title3">
          <div class="mysub1"></div>PRODUCT IDEA
          <div class="mysub2"></div>
        </div>
      </div>
    </div>
    <!-- 11111111111111111 -->
    <div>
      <div class="container5"></div>
      <div class="product">
        <div class="productItem" v-for="(item,index) in productIdeas" :key="index"
          @mouseover="mouseOver(index)"
        @mouseleave="mouseLeave(index)"
        
        >
          <div >
            <img class="productImg" :src="item.icon" alt />
          </div>
          <div class="mysub2" :class="[currentIndex==index?'active':'','productItem']" >{{item.title.slice(0,6)}}</div>
          <div class="mysub3" :class="[currentIndex==index?'active':'','productItem']" >{{item.en_title}}</div>
        </div>
      </div>
    </div>
    <!-- 22222222222222222 -->
    <div class="myteam">
      <div class="smallSwiper aaa1">
        <div class="content">
          <div class="title2">专家团队</div>
          <div class="title3">
            <div class="mysub1"></div>EXPERT TEAM
            <div class="mysub2"></div>
          </div>
        </div>
      </div>
      <swiper3 :swiperList="expertTeam"></swiper3>

      <!-- 333333333333333333333 -->
      <div class="smallSwiper">
        <div class="content">
          <div class="title2">成就及荣誉</div>
          <div class="title3">
            <div class="mysub1"></div>ACHIEVEMENTS AND HONORS
            <div class="mysub2"></div>
          </div>
        </div>
      </div>
      <div class="honor">
        <div class="mytext">{{InstituteDetail.intro}}</div>
      </div>
      <div class="certificate">
        <div v-for="(item,index) in HonorList" :key="index">
          <img
            :src="item.image"
            alt
          />
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import swiper3 from "@/components/swiper3";
import api from "@/api/home";
export default {
  components: {
    swiper3,
  },
  data() {
    return {
        currentIndex: '',
      productIdeas: [],
      expertTeam: [],
      HonorList: [],
      InstituteDetail:{}
    };
  },
  methods: {
     mouseOver(index) {
      this.currentIndex = index;
    },
    mouseLeave() {
      this.currentIndex = 7;
    },
    getProductIdea() {
      api.getProductIdea().then((res) => {
        this.productIdeas = res.data;
      });
    },
    getExpertTeam() {
      api.getExpertTeam().then((res) => {
        this.expertTeam = res.data;
      });
    },
    getHonorList() {
      api.getHonorList().then((res) => {
        this.HonorList = res.data;
      });
    },
    getInstituteDetail(){
      api.getInstituteDetail().then(res=>{
        this.InstituteDetail = res.data;
      })
    }
  },
  created() {
    this.getProductIdea();
    this.getExpertTeam();
    this.getHonorList();
    this.getInstituteDetail();
  },
};
</script>

<style lang="scss" scoped>
.active {
  // background: rgba(29, 151, 207, 1);
  color:#1D97CF ;
}
.bigImg {
  max-width: 1920px;
  height: 560px;
  img {
    width: 100%;
    object-fit: cover;
    height: 560px;
  }
}
.imgItem {
  width: 1200px;
  margin: 0 auto;
  height: 560px;
}
.smallSwiper {
  box-sizing: content-box;
  width: 100%;
  height: 267px;
  padding-top: 30px;

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
.product {
  width: 1200px;
  height: 297px;
  // background-color: pink;
  margin: 0 auto;
  display: flex;
}
.productItem {
  width: 400px;
  height: 174px;
  // background-color: yellow;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(212, 216, 217, 1);
  img{
  border-radius: 50%;

  }
}
.productItem:last-child {
  border: none;
}

.productImg {
  width: 100px;
  height: 100px;
  margin-bottom: 11px;
}
.mysub2 {
  font-size: 30px;
  margin-bottom: 5px;
}
.mysub3 {
  font-size: 14px;
}
.aaa1 {
  background-color: #f5f5f5 !important;
}
.content5 {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  div {
    font-size: 18px;
    margin-bottom: 37px;
  }
  .certificate {
    img {
      width: 208px;
      height: 294px;
      margin-right: 40px;
    }
  }
  // 11111111111111111111111111
  .el-col {
    // border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    background-color: GREEN;
  }
}
.honor {
  width: 1200px;
  margin: 0 auto;
  .mytext {
    text-align: center;
    line-height:32px;
  }
}
.certificate {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 37px;
  margin-bottom: 80px;
  img {
    // display: block;
    width: 200px;
    height: 294px;
    margin-right: 40px;
    margin-bottom: 40px;
  }
}
</style>