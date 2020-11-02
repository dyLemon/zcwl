<template>
        <div class="smallSwiper">
        <div class="content">
          <div class="title2">{{big}}</div>
          <div class="title3">
            <div class="mysub1"></div>{{small}}
            <div class="mysub2"></div>
          </div>
        </div>
      </div>
</template>
<script>
export default {
  props:{
    big:String,
    small:String
  }
}
</script>
<style lang="scss" scoped>
.smallSwiper {
  width: 100%;
  padding-top: 0.68rem;
  padding-bottom:0.34rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    // width: 300px;
    height: 0.76rem;
    // 高度为662
    // margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title2 {
    font-size:0.36rem;
      margin-bottom: 0.16rem;
        color: white;

    }
    .title3 {
      font-weight: 200;
     font-size:0.24rem;
    
      display: flex;
      align-items: center;
      justify-content: center;
        color: white;

      .mysub1 {
       width:0.8rem;
        height: 0px;
        border: 0.5px solid white;
        opacity: 1;
        margin-right: 0.14rem;
        color: white;
      }
      .mysub2 {
       width:0.8rem;
        height: 0px;
        border: 0.5px solid white;
        opacity: 1;
        margin-left: 0.14rem;
        color: white;

      }
    }
  }
}
</style>