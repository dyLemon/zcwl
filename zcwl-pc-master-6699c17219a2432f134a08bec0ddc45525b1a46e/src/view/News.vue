<template>
  <div class="container1">
    <div class="news">
      <img style=" height: 560px;
    width: 100%;
    object-fit:cover;"
        src="../assets/recrement/new.png"
        alt
      />
        <div class="xyaaa">
        <div class="xynav xybtn">
          <div class="left">
            <div class="sub1">首页＞</div>
            <div class="sub2">新闻动态</div>
          </div>

          <img
            class="right"
            src="../assets/shubiao.png"
            alt
          />
        </div>
      </div>
    
      
    </div>
    <div class="content clearfix" v-for="item in newList" :key="item.id" @click="jumpurl(item.id)">
      <div class="subNews">
        <div class="left">
          <div class="sub1">{{item.rel_time}}</div>
          <div class="sub2">{{item.title}} </div>
          <div class="sub3" v-html="item.intro"></div>
        </div>
        <div class="right">
            <img :src="item.image" alt="">
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
      newList:[] 
    };
  },
  methods: {
    getNewsList() {
      api.getIndexNews().then((res) => {
        this.newList = res.data;
      });
    },
    jumpurl(id){
       this.$router.push({path:'/newsDetails/'+id}) 
    }
  },
  created() {
    this.getNewsList();
  },
};
</script>


<style lang="scss" scoped>

.content {
  width: 1200px;
  margin: 0 auto;
  margin-top: 107px;

  .subNews {
      border-bottom: 1px solid #D4D8D9;
    height: 336px;
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
        flex: 1;
        margin-right: 82px;
         height: 256px;
    }
    .right{
         width: 434px;
        img{
            width: 434px!important;
            height: 256px;
            object-fit: cover;

        }
    }
    .sub1{
      text-align: left;
        font-size: 14px;
        color: #959EA2;
        margin-bottom: 18px;
    }
    .sub2{
        font-weight: 500;
        font-size: 22px;
             margin-bottom: 18px;
    }
    .sub3{
        font-size: 18px;
        color: #04131A;
        line-height:26px;
        text-align: left;
        padding: 0;
    }
  }
}
</style>