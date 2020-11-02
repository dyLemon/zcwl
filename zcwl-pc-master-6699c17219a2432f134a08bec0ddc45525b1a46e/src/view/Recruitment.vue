<template>
  <div class="container">
    <div class="mynav">
      <img :src="detail.top_image" />
    </div>
     <div class="xyaaa">
        <div class="xynav xybtn">
          <div class="left">
            <div class="sub1">首页＞</div>
            <div class="sub2">招纳贤士</div>
          </div>

          <img
            class="right"
            src="../assets/shubiao.png"
            alt
          />
        </div>
      </div>
    <!-- <div class="breadNav">2344444444</div> -->
    <!-- 1111111111 -->
    <router-view></router-view>

    </div>


    <!-- 2222222222222 -->

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
    getRecruit() {
      api.getRecruit().then((res) => {
        this.detail=res.data.detail;
      });
    },
  },
  created() {
    this.getRecruit();
  },
};
</script>
<style lang="scss" scoped>
.container {
  min-width: 1200px;
  margin: 0 auto;
}
.mynav {
  width: 100%;
  height: 560px;
  img {
    width: 100%;
    object-fit:cover;
    height: 560px;
  }
}
// 面包屑


</style>