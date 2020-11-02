<template>
        <div class="smallSwiper">
        <div class="content">
          <div class="title2">产品介绍</div>
          <div class="title3">
            <div class="mysub1"></div>PRODUCT DESCRIPTION
            <div class="mysub2"></div>
          </div>
        </div>
      </div>
   

 
</template>
<style lang="scss" scoped>
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
</style>