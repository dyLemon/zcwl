<template>
  <div class="container1">
    <div class="news">
      <div class="xyaaa">
        <div class="xynav xybtn">
          <div class="left">
            <div class="sub1" @click.self="goToNavigation('/')">首页＞<span @click.self="goToNavigation('/recruitment')">招纳贤士＞</span></div>
            <div class="sub2" v-if='typeid==1'>社会招聘</div>
             <div class="sub2" v-if='typeid==2'>校园招聘</div>
          </div>

          <img class="right" src="../../assets/shubiao.png" alt />
        </div>
      </div>
      <div class="interest">请选择您感兴趣的职位</div>
      <div class="position clearfix">
        <div class="pItem" v-for="(item,index) in dataList" :key="index" @click="getPositionDetail(item.id)">
          <div class="top xybtn">
            <div class="left">
              <img src="../../assets/ren2.png" alt />
              <div>{{item.position_name}}</div>
            </div>
            <div class="right">
              <div >查看详情</div>
              <img src="../../assets/hui.png" alt />
            </div>
          </div>
          <div class="middle"></div>
          <div class="bottom clearfix">
            <div class="top"
            > 
            <div class="item">学历: {{item.education}}</div>
            <div class="item">招聘人数: {{item.people_num}}</div>
            <div class="item zhuanye">专业: {{item.major}}</div>
            </div  >
            <div class="item">工作地点: {{item.job_addr}}</div>
            <div class="item">发布时间: {{item.rel_time}}</div>
          </div>
        </div>
      </div>
      <!-- 占位 -->
      <div class="zhanwei"></div>
    </div>
  </div>
</template>
<script>
import api from "@/api/home";
export default {
  data() {
    return {
      typeid:'',
      currentIndex: 0,
      dataList: [],
    };
  },
  methods: {
    goToNavigation(path){
        this.$router.push({path:path})
      },
    mouseOver() {
      this.currentIndex = 1;
    },
    mouseLeave() {
      this.currentIndex = 0;
    },
    getPositionDetail(id) {
      this.$router.push({ path: "/recruitment/recruitDetails/" + id ,
       query: {
          typeid: this.typeid,
        }},
      );
    },
    getPositionList(id) {
      api.getPositionList(id).then((res) => {
        console.log(res, "res");
        this.dataList = res.data;
      });
    },
  },
  created() {
    let id = this.$route.query.id;
    this.typeid=this.$route.query.id;
    this.getPositionList(id);
  },
};
</script>

<style lang="scss" scoped>
.interest {
  text-align: center;
  font-size: 0.4rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.68rem;
  color: rgba(4, 19, 26, 1);
  opacity: 1;
  background-color: #f5f5f5;
  padding: 0 0.34rem;
  padding-top: 0.78rem;
}
.position {
  padding: 0 0.34rem;
  padding-top: 0.3rem;
  background-color: #f5f5f5;
}
.pItem {
  width: 100%;
  padding: 0.48rem 0.3rem;
  background-color: white;
  margin-bottom: 0.34rem;
box-shadow: 0px 2px 4px rgba(4, 19, 26, 0.2);
height: 3.52rem;
  .top {
    .left {
      display: flex;
      align-items: center;

      img {
        width: 0.32rem;
        height: 0.32rem;
      }
      div {
        margin-left: 0.16rem;
        font-size: 0.32rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 0.54rem;
        color: rgba(4, 19, 26, 1);
        opacity: 1;
      }
    }
    .right {
      display: flex;
      align-items: center;
      // width: 0.32rem;
      div {
        margin-right: 0.16rem;

        font-size: 0.24rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 0.34rem;
        color: rgba(149, 158, 162, 1);
        opacity: 1;
      }
      img {
        width: 0.12rem;
        height: 0.24rem;
      }
    }
  }
  .middle {
    width: 100%;
    height: 1px;
    background-color: rgba(149, 158, 162, 1);
    opacity: 1;
    margin: 0.26rem 0 0.36rem 0;
  }
  .zhuanye{
    margin-right: 0 !important;
  }
  .bottom {
    display: flex;
    flex-wrap: wrap;
    .top{
      display: flex;
      margin-bottom: 0.3rem;
    }
  }
  .bottom .item {
    font-size: 0.26rem;
    font-weight: 300;
    line-height: 0.48rem;
    color: rgba(106, 114, 117, 1);
    opacity: 1;
    margin-right: 0.34rem;
  }
}
.zhanwei {
  width: 100%;
  height: 0.68rem;
  background-color: #f5f5f5;
}
</style>