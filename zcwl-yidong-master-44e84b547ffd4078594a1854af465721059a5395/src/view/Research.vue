<template>
  <div class="container1">
    <div class="news">
      <!-- <img style=" height: 3.5rem;
    width: 100%;
   " :src="InstituteDetail.top_image" alt /> -->
      <img style="height: 3.5rem; width: 100%" src="../assets/yjBg.png" alt />
      <div class="xyaaa">
        <div class="xynav xybtn">
          <div class="left">
            <div class="sub1" @click="goToNavigation('/')">首页＞</div>
            <div class="sub2">研究院</div>
          </div>

          <img class="right" src="../assets/shubiao.png" alt />
        </div>
      </div>
    </div>
    <!-- 11111111111 -->
    <div class="product">
      <mytitle big="产品理念" :small="small.small1"></mytitle>
      <div class="idea">
        <div
          class="ideaItem"
          v-for="(item, index) in productIdeas"
          :key="index"
        >
          <img :src="item.icon" alt />
          <div class="idea1">{{ item.title }}</div>
          <div class="idea2">{{ item.en_title }}</div>
        </div>
      </div>
    </div>
    <!-- 11111111111111111 -->
    <div class="expert">
      <mytitle2 big="专家团队" :small="small.small2"></mytitle2>
      <!-- 2222222222 -->
      <div class="person">
        <div class="aaa">
          <!-- <div style="height:0.12rem"></div> -->
          <div
            class="personItem"
            v-for="(item, index) in expertTeam.slice(0, 3)"
            :key="index"
          >
            <div class="person1">
              <img :src="item.avatar" alt />
              <div class="person2">{{ item.name }}</div>

              <div class="person3">{{ item.title }}</div>
            </div>
            <div class="pcontentt">
              <div class="pcontent" v-html="item.intro"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3333333333 -->
      <div class="bigmore xycenter">
        <div class="zi xycenter" @click="jumpUrl">MORE ></div>
      </div>
    </div>
    <!-- 444444444444 -->
    <mytitle big="成就及荣誉" :small="small.small3"></mytitle>
    <div class="honer clearfix" v-html="InstituteDetail.intro"></div>
    <div class="certifi">
      <img
        v-for="(item, index) in HonorList"
        :key="index"
        class="cerItem"
        :src="item.image"
      />
    </div>
  </div>
</template>
<script>
import mytitle2 from "@/components/mytitle2";
import mytitle from "@/components/mytitle"
import swiper3 from "@/components/swiper3";
import api from "@/api/home";
export default {
  components: {
    swiper3,
    mytitle2,
    mytitle,
  },
  data() {
    return {
      small: {
        small1: "PRODUCT IDEA",
        small2: "EXPERT TEAM",
        small3: "ACHIEVEMENTS AND HONORS",
      },
      productIdeas: [],
      expertTeam: [],
      HonorList: [],
      InstituteDetail: {},
    };
  },
  methods: {
    goToNavigation(path) {
      this.$router.push({ path: path });
    },
    jumpUrl() {
      this.$router.push("/research/ResearchItem");
    },

    getProductIdea() {
      api.getProductIdea().then((res) => {
        console.log(res, "productIdeas");
        this.productIdeas = res.data;
      });
    },
    getExpertTeam() {
      api.getExpertTeam().then((res) => {
        console.log(res, "expertTeam");
        this.expertTeam = res.data;
      });
    },
    getHonorList() {
      api.getHonorList().then((res) => {
        console.log(res, "HonorList");
        this.HonorList = res.data;
      });
    },
    getInstituteDetail() {
      api.getInstituteDetail().then((res) => {
        console.log(res, "InstituteDetail");
        this.InstituteDetail = res.data;
      });
    },
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
.product {
  width: 100%;
  height: 4.6rem;
  padding-top: 0.25rem;
  .idea {
    width: 100%;
    height: 1.86rem;
    display: flex;
    justify-content: space-evenly;
    // justify-content: space-between;
    // align-items: center;
    // background: red;
    // padding: 0 1rem;
    .ideaItem {
      // background: red;
      text-align: center;
      flex: 1;
      position: relative;
    }
    img {
      width: 0.98rem;
      height: 0.98rem;
      margin-bottom: 0.16rem;
    }
    .idea1 {
      font-size: 0.32rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 0.48rem;
      color: rgba(29, 151, 207, 1);
      opacity: 1;
    }
    .idea2 {
      font-size: 0.2rem;
      font-family: Source Han Sans CN;
      font-weight: 300;
      line-height: 0.34rem;
      color: rgba(149, 158, 162, 1);
      opacity: 1;
      // position: absolute;
      // bottom: 0;
    }
  }
}
.expert {
  width: 100%;
  background: #f5f5f5 !important;

  .person {
    padding: 0 0.34rem;
  }
  .pcontentt {
    padding-bottom: 0.34rem;
    border-bottom: 1px solid rgba(149, 158, 162, 1);
  }
  .pcontent {
    width: 100%;
    padding-right: 0.94rem;
    font-size: 0.28rem;
    font-family: Source Han Sans CN;
    font-weight: 300;
    line-height: 0.4rem;
    color: rgba(106, 114, 117, 1);
    opacity: 1;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 6; /** 显示的行数 **/
    overflow: hidden;
  }

  .person1 {
    width: 100%;
    height: 1.2rem;
    display: flex;
    margin-bottom: 0.34rem;
    align-items: center;
    margin-top: 0.68rem;

    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      margin-right: 0.34rem;
    }
    .person2 {
      font-size: 0.32rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 0.54rem;
      color: black;
      opacity: 1;
      margin-right: 0.34rem;
    }
    .person3 {
      font-size: 0.32rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 0.54rem;
      color: rgba(29, 151, 207, 1);
      opacity: 1;
    }
  }
}
.person1:nth-child(n + 1) {
  // border-top: 1px solid red;
}
.bigmore {
  width: 100%;
  height: 1.96rem;
  font-size: 0.24rem;

  .zi {
    width: 2.4rem;
    height: 0.6rem;
    border: 1px solid rgba(29, 151, 207, 1);
    color: rgba(29, 151, 207, 1);
    border-radius: 0.3rem;
    font-size: 0.24rem;
    font-family: Arial;
  }
}
.honer {
  width: 100%;
  padding: 0 0.34rem;
  font-size: 0.28rem;
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
  -webkit-line-clamp: 10; /** 显示的行数 **/
  overflow: hidden;
}
.certifi {
  width: 100%;
  display: flex;
  padding-left: 0.34rem;
  flex-wrap: wrap;
  .cerItem {
    width: 2.04rem;
    height: 2.88rem;
    margin-right: 0.34rem;
    margin-bottom: 0.34rem;
  }
}
.cerItem:nth-child(3n) {
  margin-right: 0;
}

.personItem:first-child {
  // background: red;
  margin-top: 0.3rem !important;
  .person1 {
    margin-top: 0rem;
  }
}
</style>