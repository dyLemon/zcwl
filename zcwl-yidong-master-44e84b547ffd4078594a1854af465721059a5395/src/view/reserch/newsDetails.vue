<template>
  <div class="nDetails">
    <div class="bigTitle">{{detail.title}}</div>
    <div class="time">{{detail.rel_time}}</div>
    <div class="nContent">
      <div v-html="detail.content"></div>
    </div>
    <!-- 111111111 -->
    <div class="preN" v-if="detail.prev_news" @click="getNewsDetail(detail.prev_news.id)">上一篇</div>
    <div class="preContent" v-if="detail.prev_news">
      <img
        :src="detail.prev_news.image"
        alt
      />
      <div class="preContent1">
        <div class="time1">{{detail.prev_news.rel_time}}</div>
        <div class="title1" >{{detail.prev_news.title}}</div>
      </div>
    </div>
    <!-- 22222222222222 -->
    <div class="preN" v-if="detail.next_news" @click="getNewsDetail(detail.next_news.id)">下一篇</div>
    <div class="preContent" v-if="detail.next_news">
      <img
        :src="detail.next_news.image"
        alt
      />
      <div class="preContent1">
        <div class="time1">{{detail.next_news.rel_time}}</div>
        <div class="title1">{{detail.next_news.title}}</div>
      </div>
    </div>
  </div>
</template>
 <script>
import api from "@/api/home";
export default {
  data() {
    return {
      detail:{}
    };
  },
  methods: {
    getNewsDetail(id) {
      api.getNewsDetail(id).then((res) => {
        this.detail=res.data;

const imgs = new RegExp('<img', 'gi')
const videos = new RegExp('<video', 'gi')

// res.details = details.replace(regex, `<img style="max-width: 100%; height: auto"`);
res.data.content = res.data.content.replace(imgs, `<img style="max-width: 100%; height: auto"`);
res.data.content = res.data.content.replace(videos, `<video style="max-width: 100%; height: auto"`);






        console.log(res,"res")
      });
    },
  },
  created() {
    let id = this.$route.params.id;
    this.getNewsDetail(id);
  },
};
</script>
<style lang="scss" scoped>
.nDetails {
  width: 100%;
  padding: 0 0.34rem;
}
.bigTitle {
  width: 100%;

  margin-top: 0.68rem;
  text-align: center;
  font-size: 0.4rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.68rem;
  color: rgba(4, 19, 26, 1);
  opacity: 1;
}
.time {
  text-align: center;
  font-size: 0.2rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.3rem;
  color: rgba(149, 158, 162, 1);
  opacity: 1;
  padding-bottom: 0.16rem;
  border-bottom: 1px solid rgba(76, 79, 80, 1);
}
.nContent {
  width: 100%;
  margin-bottom: 0.34rem;
  div,
  p,
  img {
    width: 100%;
    object-fit: cover;
    text-align: center;
    font-size: 0.28rem;
    font-family: Source Han Sans CN;
    font-weight: 300;
    line-height: 0.4rem;
    color: rgba(4, 19, 26, 1);
    opacity: 1;
    margin-top: 0.34rem;
  }
}
.preN {
  font-size: 0.28rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.4rem;
  color: rgba(4, 19, 26, 1);
  opacity: 1;
  padding-bottom: 0.16rem;
  border-bottom: 1px solid black;
}
.preContent {
     width: 100%;
  display: flex;

  img {
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 0.34rem;
    object-fit: cover;
  }
  .preContent1 {
    width: 100%;
    // width: 2.5rem;
    height: 2.5rem;
    padding: 0.34rem;
    margin-top: 0.34rem;
       margin-bottom: 0.68rem;
  }
  .time1 {
    flex: 1;
    font-size: 0.2rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.3rem;
    color: rgba(149, 158, 162, 1);
    opacity: 1;
  }
  .title1 {
      flex: 1;
    width: 100%!important;
    font-size: 0.32rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.54rem;
    color: rgba(4, 19, 26, 1);
    opacity: 1;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 3; /** 显示的行数 **/
    overflow: hidden;  
 
  }
}
</style>