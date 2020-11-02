<template>
  <div>
    <medicalTitle :dataInfo="dataInfo" big='产品介绍' :small='small[0]' :bgc='bgc'></medicalTitle>
    <div class="eqiup">
      <mytitle big='设备介绍' :small='small[1]'></mytitle>
    </div>
    <div class="eqiup2">
      <img src="../../assets/jiqi.png" alt />
    </div>
    <!-- 上面两个 -->

<div class="content">

 
    <div class="eqiup4" style="paddingTop:0.68rem">
      <div class="left1">
        <div class="sub1 no1">
          {{introduction.detail[0].title}}
        </div>
        <div class="inner"></div>
        <div class="sub2" v-html="introduction.detail[0].intro">
        </div>
      </div>
      <div class="ccc"></div>
      <div class="left1">
        <div class="sub1 no2">
          {{introduction.detail[3].title}}
        </div>
        <div class="inner"></div>
        <div class="sub2" v-html="introduction.detail[3].intro">
        </div>
      </div>
    </div>
    <!-- 下面两个 -->
    <div class="eqiup4">
      <div class="left1">
        <div class="sub1">
          {{introduction.detail[1].title}}
        </div>
        <div class="inner"></div>
        <div class="sub2" v-html="introduction.detail[1].intro">
        </div>
      </div>
      <div class="ccc"></div>
      <div class="left1">
        <div class="sub1">
          {{introduction.detail[2].title}}
        </div>
        <div class="inner"></div>
        <div class="sub2" v-html="introduction.detail[2].intro">
        </div>
      </div>
    </div>
</div>
    <!-- 设备特点 -->
    <mytitle big='设备特点' :small='small[2]'></mytitle>
    <div class="features clearfix">
      <div class="fea" v-for="(item,index) in Features.detail" :key="index">
        <img
          :src="item.image"
          alt
        />
        <div class="fea3 myover">{{item.title}}</div>
        <div
          class="fea4"
          v-html="item.intro"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import medicalTitle from "@/components/medicalTitle";
import mytitle from "@/components/mytitle";
import api from "@/api/home";
export default {
  components: {
    medicalTitle,
    mytitle,
  },
  data() {
    return {
      bgc:'http://zhongcwl.b.langqiyun.cn/uploads/other/20200821/1882d14c8c1ce3f8287016759d79f317.png',
      small:['PRODUCT DESCRIPTION','EQUIPMENT INTRODUCTION','FEATURES'],
      dataInfo: {},
      modelList: [],
      introduction: {}, //设备介绍
      Features: {}, //设备特点
    };
  },
  methods: {
    operationDetail() {
      api.operationDetail(3).then((res) => {
        console.log(res, "res");
        this.dataInfo = res.data.operation;
        this.modelList = res.data.child_menu;

        this.modelList.forEach((item) => {
          if (item.menu == "设备介绍") {
            this.introduction = item;
          }
          if (item.menu == "设备特点") {
            this.Features = item;
            
          }
        });
      });
    },
  },
  created() {
    this.operationDetail();
  },
};
</script>
<style lang="scss" scoped>
.eqiup {
  background-color: #f5f5f5;
}
.eqiup2 {
  padding: 0 0.34rem;
  background-color: #f5f5f5;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  img {
    width: 4.28rem;
    height: 6.48rem;
  }
}
.content{
  padding-bottom: 0.7rem;
   background-color: #f5f5f5;
  box-sizing: border-box;
}
.eqiup4 {
  padding: 0 0.34rem;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  .left1 {
    flex: 1;
  }
  .ccc {
    width: 0.68rem;
  }
  .sub1 {
    font-size: 0.32rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.48rem;
    color: rgba(29, 151, 207, 1);
    opacity: 1;
  }
  .no1{
    width: 2.2rem;
  }
  .no2{
    width: 2.5rem;

  }
  .inner {
    width: 0.8rem;
    height: 0.04rem;
    background: rgba(29, 151, 207, 1);
    opacity: 1;
    margin-bottom: 0.18rem;
    margin-top: 0.1rem;
  }
  .sub2 {
    // height: 2.8rem;
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
    -webkit-line-clamp: 8; /** 显示的行数 **/
    overflow: hidden;
  }
}
.features {
  margin-bottom: 0.34rem;
  padding-left: 0.34rem;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
}
.fea {
  margin-bottom: 0.34rem;
  margin-right: 0.34rem;
  width: 3.24rem;
  height: 3.4rem;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(200, 200, 200, 1);
  opacity: 1;
  padding: 0.34rem;

  img {
    width: 0.65rem;
    height: 0.65rem;
  }
  .fea3 {
    font-size: 0.32rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.54rem;
    color: rgba(4, 19, 26, 1);
    opacity: 1;
  }
  .fea4 {
    height: 1.36rem;
    font-size: 0.24rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.34rem;
    color: rgba(144, 144, 144, 1);
    opacity: 1;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 4; /** 显示的行数 **/
    overflow: hidden;
  }
}
</style>