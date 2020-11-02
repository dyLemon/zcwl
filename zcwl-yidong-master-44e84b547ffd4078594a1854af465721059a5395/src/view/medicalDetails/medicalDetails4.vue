<template>
  <div>
    <medicalTitle  :dataInfo="dataInfo" big='产品介绍'   :small='small' :bgc='bgc'></medicalTitle>
    <div class="ddd" v-if="customer.detail">
      <img
        class="medical4"
        :src="customer.detail[0].image"
      />
      <div class="user">
        <div class="user1" style="marginTop:0.34rem">{{customer.detail[0].title}}</div>
        <div class="user2"></div>
        <div
          class="user3"
          v-html="customer.detail[0].intro"
        ></div>
      </div>
    </div>
    <div class="ddd"  v-if="medical.detail">
      <img
        class="medical4"
        style="marginTop:0.34rem"
        :src="medical.detail[0].image"
      />
      <div class="user">
        <div class="user1" style="marginTop:0.34rem">{{medical.detail[0].title}}</div>
        <div class="user2"></div>
        <div
          class="user3"
          v-html="medical.detail[0].intro"
        ></div>
      </div>
    </div>
    <div class="zhanwei4"></div>
  </div>
</template>
<script>
import medicalTitle from "@/components/medicalTitle";
import api from "@/api/home";
export default {
  components: {
    medicalTitle,
  },
  data() {
    return {
      bgc:'http://zhongcwl.b.langqiyun.cn/uploads/other/20200821/57a8a03cf2f71a8bc4a3fc79ff860e5c.png',
      small:'PRODUCT DESCRIPTION',
      dataInfo: {},
      modelList: [],
      customer: {}, //用户端
      medical: {}, //医疗端
    };
  },
  methods: {
    operationDetail() {
      api.operationDetail(4).then((res) => {
        console.log(res, "res");
        this.dataInfo = res.data.operation;
        this.modelList = res.data.child_menu;

        this.modelList.forEach((item) => {
          if (item.menu == "用户端") {
            this.customer = item;
          }
          if (item.menu == "医疗端") {
            this.medical = item;
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
.medical4 {
  width: 100%;
  height: 5.2rem;
}
.ddd {
  background-color: #f5f5f5;
}
.user {
  padding: 0 0.34rem;
  .user1 {
    font-size: 0.4rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.68rem;
    color: rgba(4, 19, 26, 1);
    opacity: 1;
  }
  .user2 {
    width: 1.6rem;
    height: 0.04rem;
    // line-height:0.01rem;
    background: rgba(29, 151, 207, 1);
    opacity: 1;
    margin-top: -0.15rem;
  }
  .user3 {
    // height: 1.96rem;
    // padding: 0.34rem 0;
    margin-top: 0.34rem;
    font-size: 0.29rem;
    font-family: Source Han Sans CN;
    font-weight: 300;
    line-height: 0.4rem;
    color: rgba(106, 114, 117, 1);
    opacity: 1;
    // word-break: break-all;
    // text-overflow: ellipsis;
    // display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    // -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    // -webkit-line-clamp: 5; /** 显示的行数 **/
    // overflow: hidden;
  }
}
.zhanwei4 {
  width: 100%;
  height: 0.68rem;
  background-color: #f5f5f5;
}
</style>