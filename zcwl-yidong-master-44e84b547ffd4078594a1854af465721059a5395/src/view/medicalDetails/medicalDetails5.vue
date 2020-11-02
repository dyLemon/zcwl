<template>
  <div>
    <medicalTitle :dataInfo="dataInfo" big='产品介绍' :small='small' :bgc='bgc'></medicalTitle>

  <!-- :style="{background: 'url( '+ item.image +') no-repeat 100%,center'}" -->
    <div class="artisan"   v-for="(item,index) in customer.detail" :key="index">
       <img
          :src="item.image"
          alt
        />
      <p class="title" v-html="item.title"></p>

    <div class="mantle"></div>
    </div>
    <!-- <div class="artisan" :style="{background: 'url( '+ myimg +') no-repeat 100%,center'}"></div> -->
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
      bgc:'http://zhongcwl.b.langqiyun.cn/uploads/other/20200821/8f84ea88de1e4bced2ee112901d9b96d.png',
      small:'PRODUCT DESCRIPTION',
      dataInfo: {},
      modelList: [],
      customer: {}, //私人订制化康复处方远程指导
    };
  },
  methods: {
    operationDetail() {
      api.operationDetail(5).then((res) => {
        console.log(res, "res");
        this.dataInfo = res.data.operation;
        this.modelList = res.data.child_menu;

        this.modelList.forEach((item) => {
          if (item.menu == "私人订制化康复处方远程指导") {
            this.customer = item;
          }
        });
      });
    },
  },
  created() {
    this.operationDetail();
  }
};
</script>
<style lang="scss" scoped>
.artisan {
  width: 100%;
  // height: 3.72rem;
  height: 4rem;
  display: flex;
  align-items: flex-end;
  // justify-content: flex-end;
  // padding-left: 0.34rem;
  // padding-bottom: 0.34rem;
  margin-bottom: 0.16rem;
  position: relative;
  img{
    width: 100%;
    height: 100%;
  }
}
.mantle{
  width: 100%;
  height: 100%;
  background: rgba(26,26,26,0.1);
  position: absolute;
}
.title {
  position: absolute;
  font-size: 0.29rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.48rem;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  left: 0.34rem;
  bottom: 0.16rem;
  z-index: 1;
}
</style>