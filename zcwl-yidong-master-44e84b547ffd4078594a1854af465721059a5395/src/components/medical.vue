<template>
  <div class="container">
    <div class="container1">
      <div class="top">{{dataInfo.menu}}</div>
      <div class="toptitle">{{dataInfo.title}}</div>
      <div class="linear"></div>
      <div class="smallSwiper">
        <div class="content">
          <div class="title2">产品介绍</div>
          <div class="title3">
            <div class="mysub1"></div>PRODUCT DESCRIPTION
            <div class="mysub2"></div>
          </div>
        </div>
      </div>
      <!-- 1111111 -->
      <div class="content2">
        <div v-html="dataInfo.intro"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataInfo: Object,
  },
};
</script>
<style lang="scss" scoped>
.container1 {
  width: 1200px;
  margin: 0 auto;
}
.top {
  padding-top: 120px;
  padding-bottom: 40px;
  font-size: 34px;
  font-weight: 800;
  text-align: center;
}
.toptitle {
  padding-bottom: 40px;
  font-size: 18px;
  font-weight: 800;
  text-align: center;
}
.linear {
  width: 1200px;
  height: 1px;
  background: rgba(76, 79, 80, 1);
  // margin-bottom: 80px;
  margin: 0 auto;
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
.content2 {
  margin-bottom: 117px;
  div {
    font-size: 18px;
    text-align: center;
    line-height: 32px;
  }
}
</style>