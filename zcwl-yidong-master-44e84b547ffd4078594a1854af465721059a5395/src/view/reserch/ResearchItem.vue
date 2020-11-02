<template>
  <div class="container1">
    <div class="news">
      <img
        style=" height: 3.5rem;
    width: 100%;
   "
        src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
        alt
      />
      <div class="xyaaa">
        <div class="xynav xybtn">
          <div class="left">
            <div class="sub1" @click.self="goToNavigation('/')">
              首页＞
              <span @click.self="goToNavigation('/research')">研究院＞</span>
            </div>
            <div class="sub2">专家团队</div>
          </div>

          <img class="right" src="../../assets/shubiao.png" alt />
        </div>
      </div>
    </div>
    <!-- 11111111111111111 -->
    <div class="expert">
      <!-- 2222222222 -->
      <div class="person">
        <div class="aaa">
          <!-- <div style='height:1rem'></div> -->
          <div class="personItem" v-for="(item,index) in zhuanjiaArr" :key="index">
            <div class="person1">
              <img :src="item.avatar" alt />
              <div class="person2">{{item.name}}</div>
              <div class="person3">{{item.title}}</div>
            </div>
            <div class="pcontent">
              <div class="pcontent" v-html="item.intro"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="loadMore" @click="load" v-if="show">加载更多</div>
      <div class="noMore" v-if="!show">没有更多了...</div>
    </div>
    <!-- 444444444444 -->

    <router-view></router-view>
  </div>
</template>
<script>
import mytitle2 from "@/components/mytitle2";
import mytitle from "@/components/mytitle";
import api from "@/api/home";
export default {
  components: {
    mytitle2,
    mytitle,
  },
  data() {
    return {
      productIdeas: [],
      expertTeam: [],
      HonorList: [],
      InstituteDetail: {},
      zhuanjiaArr: [],
      num: 3,
      show: true,
    };
  },
  methods: {
    // 加载更多，做的本地的
    load() {
      this.num += 3;

      this.zhuanjiaArr = this.expertTeam.slice(0, this.num);

      if (this.num > this.expertTeam.length) {
        console.log("没有更多了");
        this.show = false;
      }

      console.log("专家", this.zhuanjiaArr);
    },
    goToNavigation(path) {
      this.$router.push({ path: path });
    },
    jumpUrl() {
      this.$router.push("/research/researchItem");
    },

    getProductIdea() {
      api.getProductIdea().then((res) => {
        this.productIdeas = res.data;
      });
    },
    getExpertTeam() {
      api.getExpertTeam().then((res) => {
        this.expertTeam = res.data;
        this.zhuanjiaArr = this.expertTeam.slice(0, this.num);
      });
    },
    getHonorList() {
      api.getHonorList().then((res) => {
        this.HonorList = res.data;
      });
    },
    getInstituteDetail() {
      api.getInstituteDetail().then((res) => {
        this.InstituteDetail = res.data;
      });
    },
  },
  created() {
    console.log(3333333333333);
    this.getProductIdea();
    this.getExpertTeam();
    this.getHonorList();
    this.getInstituteDetail();
  },
};
</script>

<style lang="scss" scoped>
.loadMore {
  text-align: center;
  border-radius: 0.1rem;
  border: 1px solid #1d97cf;
  color: #1d97cf;
  width: 1.7rem;
  margin: 0 auto;
  padding: 0.15rem 0.1rem;
  font-size: 0.26rem;
}
.noMore {
  
  text-align: center;
  font-size: 0.24rem;
  color:rgba(149,158,162,1);
  margin: 0.4rem 0 0.8rem 0;
}
.personItem {
  padding-bottom: 0.34rem;
  border-bottom: 1px solid #959ea2;
}
.container1 {
  margin-bottom: 0.68rem;
}
.product {
  width: 100%;
  height: 4.6rem;
  padding-top: 0.25rem;
  .idea {
    width: 100%;
    height: 1.86rem;
    display: flex;
    justify-content: space-evenly;
    // background: red;
    // align-items: center;
    .ideaItem {
      text-align: center;
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
    }
  }
}
.expert {
  width: 100%;

  .person {
    padding: 0 0.34rem;
  }
  .pcontent {
    width: 100%;
    padding-right: 0.4rem;
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
  
  .aaa {
    padding-bottom: 0.34rem;
    // border-bottom: 1px solid rgba(149, 158, 162, 1);
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
.bigmore {
  width: 100%;
  height: 1.96rem;

  .zi {
    width: 2.4rem;
    height: 0.6rem;
    border: 1px solid rgba(29, 151, 207, 1);
    color: rgba(29, 151, 207, 1);
    border-radius: 0.3rem;
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
  padding: 0 0.34rem;
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


.personItem:first-child{
  .person1{
    margin-top: 0.45rem;
  }
}


 
</style>