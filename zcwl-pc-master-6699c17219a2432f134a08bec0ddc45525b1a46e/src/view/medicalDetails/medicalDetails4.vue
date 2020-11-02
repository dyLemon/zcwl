<template>
  <div>
    <medical :dataInfo="dataInfo"></medical>
    <div class="aaa8">
      <div class="container2">
        <div class="cBox" v-if="customer.detail">
          <img
            class="cImg"
            :src="customer.detail[0].image"
            alt
          />
          <div class="cBoxItem">
            <img src="@/assets/recrement/yonghu.png" alt />
            <div>{{customer.detail[0].intro}}</div>
          </div>
        </div>
        <div class="cBox" v-if="medical.detail">
          <div class="cBoxItem cbb">
            <img src="@/assets/recrement/yiliao.png" alt />
            <div>{{medical.detail[0].intro}}</div>
          </div>
          <img
            class="cImg ccc"
            :src="medical.detail[0].image"
            alt
          />
        </div>
      </div>
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
.aaa8 {
  background: rgba(245, 245, 245, 1);
}
.container2 {
  width: 1200px;
  height: 1198px;
  margin: 0 auto;
  padding-top: 120px;
  .cBox {
    display: flex;
    .cBoxItem {
      height: 420px;
      display: flex;
      flex-direction: column;
      margin-top: 128px;
      img {
        width: 120px;
        height: 30px;
        margin-bottom: 20px;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
  .cImg {
    width: 600px;
    height: 418px;
    padding-right: 120px;
  }
}
.cbb {
  width: 378px;
  margin-right: 222px;
}
.ccc {
  padding-right: 0 !important;
}
</style>