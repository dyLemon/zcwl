<template>
  <div class="container1">
    <div class="news">
      <div class="xyaaa">
        <div class="xynav xybtn">
          <div class="left">
            <div class="sub1" @click="goToNavigation('/')">首页＞</div>
            <div class="sub2">招纳贤士</div>
          </div>
          <img class="right" src="../../assets/shubiao.png" alt />
        </div>
      </div>
    </div>
    <!-- 占位高度的盒子 -->
    <div class="aaa"></div>
    <!-- 占位高度的盒子 -->
    <div class="mypadding">
      <div class="rec1">工作机会</div>
      <div class="rec2">{{detail.title}}</div>
      <div class="rec3" v-html='detail.intro'></div>
    </div>

    <div class="myrec" v-for="(item,index) in recruitList" :key="index">
      <img :src="item.image" alt />
      <div class="social">
        <div class="social1">{{item.title}}</div>
        <ul class="box">
          <li class="social4" v-for="(a,b) in item.keywords" :key="b">
            <div class="circle"></div>
            <div class="social2">{{a}}</div>
          </li>
        </ul>
        <div class="see xycenter">
          <div class="r_arrow">
            <img class="r_arrow_img" src="../../assets/r.png" alt="">
          </div>
          <div @click="onPosition(item.id)">查看职位</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/home";
export default {
  data() {
    return {
      detail: {},
      recruitList: [],
    };
  },
  methods: {
    goToNavigation(path){
        this.$router.push({path:path})
      },
    getRecruit() {
      api.getRecruit().then((res) => {
        this.recruitList = res.data.cate;
        this.detail = res.data.detail;
      });
    },
    onPosition(id) {
      this.$router.push({
        path: "/recruitment/recruitList",
        query: {
          id: id,
        },
      });
    },
  },
  created() {
    this.getRecruit();
  },
};
</script>

<style lang="scss" scoped>
.box{
  min-height: 2.3rem;
}
.mypadding {
  padding: 1px 0.34rem;
}
// .aaa{
//   margin-top: 0.68rem;
// }
.r_arrow{
  width: 0.12rem;
  height: 0.24rem;
  line-height: 0 !important;
  margin-right: 0.12rem;
  .r_arrow_img{
    width: 100%;
    height: 100%;
  }

}
.rec1 {
  margin-top: 0.85rem;
  font-size: 0.32rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.54rem;
  color: rgba(29, 151, 207, 1);
  opacity: 1;
  text-align: center;
}
.rec2 {
  font-size: 0.4rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.68rem;
  color: rgba(4, 19, 26, 1);
  opacity: 1;
  text-align: center;
  margin-bottom: 0.3rem;
  margin-top: 0.1rem;
}
.rec3 {
  font-size: 0.28rem;
  font-family: Source Han Sans CN;
  font-weight: 300;
  line-height: 0.4rem;
  color: rgba(106, 114, 117, 1);
  opacity: 1;
  text-align: center;
}
.myrec {
  padding: 0 0.34rem;
  width: 100%;
  height: 9.12rem;
  margin-bottom: 0.68rem;
  margin-top: 0.68rem;
  img {
    width: 100%;
    height: 4.2rem;
  }
  .social {
    width: 100%;
    // height: 4.92rem;
    padding: 0.68rem;
    background-color: #f5f5f5;

    .social1 {
      font-size: 0.4rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 0.68rem;
      color: rgba(4, 19, 26, 1);
      opacity: 1;
      margin-bottom: 0.28rem;
    }

    .circle {
      width: 0.08rem;
      height: 0.08rem;
      background: rgba(19, 101, 139, 1);
      border-radius: 50%;
      opacity: 1;
    }
    .social2 {
      margin-left: 0.08rem;
      font-size: 0.28rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 0.4rem;
      color: rgba(106, 114, 117, 1);
      opacity: 1;
    }
    .social4 {
      display: flex;
      align-items: center;
      margin-bottom: 0.34rem;
    }
  }
}
.see {
  width: 2.4rem;
  height: 0.6rem;
  border: 1px solid rgba(19, 101, 139, 1);
  opacity: 1;
  // margin-bottom: 0.68rem;
  div {
    font-size: 0.28rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.4rem;
    color: rgba(19, 101, 139, 1);
    opacity: 1;
  }
}
</style>