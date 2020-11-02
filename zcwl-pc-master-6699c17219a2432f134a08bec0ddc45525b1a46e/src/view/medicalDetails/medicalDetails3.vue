<template>
  <div>
    <medical :dataInfo="dataInfo"></medical>
    <img class="bigImg" src="@/assets/recrement/machine.png" alt />

    <div class="smallSwiper">
      <div class="content">
        <div class="title2">设备特点</div>
        <div class="title3">
          <div class="mysub1"></div>FEATURES
          <div class="mysub2"></div>
        </div>
      </div>
    </div>
    <div style="marginBottom:40px"></div>
    <div class="clearfix feture">
      <div class="fItem" v-for="(item,index) in Features.detail" :key="index">
        <img src="@/assets/c.png" alt/>
        <div>
          <div class="subA">{{item.title}}</div>
          <div class="subB">{{item.intro}}</div>
        </div>
      </div>
      <!-- <div class="fItem">
        <img src="@/assets/c.png" alt />
        <div>
          <div class="subA">asdf</div>
          <div class="subB">asdfasdf</div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import medical from "../../components/medical";
import api from "@/api/home";
export default {
  components: {
    medical,
  },
  data() {
    return {
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
.bigImg {
  width: 100%;
  height: 863px;
  object-fit: cover;
}
.smallSwiper {
  width: 100%;
  padding-top: 80px;
  padding-bottom: 30px;
  //   height: 267px;
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
.feture {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  .fItem {
    width: 374px;
    height: 150px;
    padding: 40px;
    border: 1px solid rgba(200, 200, 200, 1);
    display: flex;
    margin-bottom: 50px;
    margin-right: 35px;

    img {
      padding-right: 34px;
    }
    .subA {
      font-size: 22px;
      font-weight: 500;
      margin-bottom: 6px;
    }
    .subB {
      font-size: 14px;
      line-height: 20px;
      color: #909090;
    }
  }
}
.fItem:nth-child(3n) {
  margin-right: 0;
}
</style>