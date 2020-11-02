<template>
  <div class="container1">
    <div class="news">
      <img style=" height: 3.5rem;
    width: 100%;
   " src="../assets/xwBg.png" alt />
      <div class="xyaaa">
        <div class="xynav xybtn">
          <div class="left">
            <div class="sub1" @click="goToNavigation('/')">首页＞</div>
            <div class="sub2">新闻动态</div>
          </div>

          <img class="right" src="../assets/shubiao.png" alt />
        </div>
      </div>
    </div>
    <div
      class="mynews clearfix"
      v-for="(item,index) in newList"
      :key="index"
      @click="jumpurl(item.id)"
    >
      <img :src="item.image" alt />
      <div class="time">{{item.rel_time}}</div>
      <div class="newsTitle myover">{{item.title}}</div>
      <div class="newsC" v-html="item.intro"></div>
    </div>

    <div class="loadMore" v-if="show" @click="load">加载更多</div>
    <div class="noMore" v-if="!show">没有更多了...</div>
  </div>
</template>

<script>
import api from "@/api/home";

export default {
  data() {
    return {
      newList: [],
      page: 1,
      show:true
    };
  },
  methods: {
    load() {},
    goToNavigation(path) {
      this.$router.push({ path: path });
    },
    getNewsList() {
      var data = {
        page: this.page,
        limit: 5,
      };

      // console.log("data",data)
      api.getIndexNews(data).then((res) => {
        // console.log(res, "news");

        if (this.newList.length >= res.data.total) {
          console.log("没了");
          this.show = false
          // this.$message.warning("没有更多了")
          return;
        }
        console.log("222222222");

        // this.newList = res.data.data;
        this.newList = [...this.newList, ...res.data.data];
      });
    },

    load() {
      this.page++;
      console.log("this.page++", this.page);

      this.getNewsList();
    },

    jumpurl(id) {
      this.$router.push({ path: "/news/newsDetails/" + id });
    },
  },
  created() {
    this.getNewsList();
  },
};
</script>


<style lang="scss" scoped>
.mynews {
  padding: 0 0.34rem;
  width: 100%;
  padding-bottom: 0.34rem;

  border-bottom: 1px solid rgba(212, 216, 217, 1);
  img {
    width: 100%;
    height: 4rem;
    margin-top: 0.68rem;
    margin-bottom: 0.16rem;
    object-fit: cover;
  }
  .time {
    font-size: 0.2rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.3rem;
    color: rgba(149, 158, 162, 1);
    opacity: 1;
    margin-top: 0.2rem;
    margin-bottom: 0.18rem;
  }
  .newsTitle {
    font-size: 0.36rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.62rem;
    color: rgba(4, 19, 26, 1);
    opacity: 1;
  }
  .newsC {
    // height:1.6rem;
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
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;
  }
}
.loadMore {
  // height: 1rem;
  text-align: center;
  border-radius: 0.1rem;
  border: 1px solid #1d97cf;
  color: #1d97cf;
  width: 1.7rem;
  margin: 0 auto;
  padding: 0.15rem 0.1rem;
  font-size: 0.26rem;
  margin-top: 0.34rem;
  margin-bottom: 0.68rem;
}
.noMore {
  text-align: center;
  font-size: 0.24rem;
  color: #959ea2;
  margin: 0.4rem 0 0.8rem 0;
}
</style>