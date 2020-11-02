<template>
  <div>
    <medical :dataInfo="dataInfo"></medical>
    <medicalSwiper5 :swiperList="customer.detail"></medicalSwiper5>
  
  </div>
</template>
<script>
import medical from "../../components/medical";
import medicalSwiper5 from "./components/medicalSwiper5";
import api from "@/api/home";

export default {
  components: {
    medical,
    medicalSwiper5
  },
    data() {
    return {
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
  },
};
</script>

<style lang="scss" scoped>

</style>