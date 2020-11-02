<template>
  <div class="container">
    <div class="part" v-for="(item,index) in linearDeafultList"  :key="index" @click="jumpurl(index)">
      <div class="part1">{{item.menu}}</div>
      <img
        :src="item.image"
        alt
      />
    </div>
  </div>
</template>
<script>
import api from "@/api/home";
export default {
  data() {
    return {
      active: 0,
      linearDeafultList: [],
      list: [
        {
          name: "AI手术规划系统",
          path: "/medicalCenter/medicalDetails1",
        },
        {
          name: "形态量化分析服务",
          path: "/medicalCenter/medicalDetails2",
        },
        {
          name: "AI全血健康系统",
          path: "/medicalCenter/medicalDetails3",
        },

        {
          name: "中创医学影像云",
          path: "/medicalCenter/medicalDetails4",
        },
        {
          name: "数字化运动康复系统",
          path: "/medicalCenter/medicalDetails5",
        },
      ],
    };
  },
  methods: {
    jumpurl(index) {
        // console.log(this.list[index].path)
          this.$router.push({path:this.list[index].path})
    },
    getFiveList() {
      api.getFiveList().then((res) => {
        this.linearDeafultList = res.data;
      });
    },
  },
  created() {
    this.getFiveList();
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  background-color: #152047;
}
.part1 {
  padding-top: 1.5rem;
  font-size: 0.48rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.82rem;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  text-align: center;
  padding-bottom: 0.46rem;
}
img {
  width: 100%;
  height: 5.26rem;
}
</style>