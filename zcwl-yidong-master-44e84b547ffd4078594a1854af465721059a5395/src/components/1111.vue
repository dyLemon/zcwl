    <template>
  <div class="contenta">
    <div class="smallSwiper11">
      <div class="content">
        <div class="title2">产品特点</div>
        <div class="title3">
          <div class="mysub1"></div>FEATURES
          <div class="mysub2"></div>
        </div>
      </div>
    </div>
    
    <div class="kuang" >
        <img src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg" alt="">
      <div class="mydiv">1111111</div>
      <div class="aaa8" >222222222</div>
       <img class="img1" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg" alt="">
       <img class="img2" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg" alt="">
       <img class="img3" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg" alt="">
       <img class="img4" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg" alt="">
    </div>
   

    <!-- <div class="kuang" v-if="features.detail">
      <div class="mydiv">{{features.detail[0].title}}</div>
      <div class="aaa8" v-html="features.detail[0].intro"></div>
    </div> -->
  </div>
</template>

    <style lang="scss" scoped>
.contenta {
  width: 1920px;
  overflow: hidden;
  height: 900px;
  margin: 0 auto;
  background: url(../../../assets/wu.png) no-repeat center center;
  background-size: cover;
}
.smallSwiper11 {
  width: 100%;
  padding-top: 80px;
  padding-bottom: 30px;
  //   height: 267px;
  // 高度为662
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
      color: white;
      font-weight: 800;
      font-size: 30px;
      margin-bottom: 13px;
    }
    .title3 {
      font-weight: 200;
      font-size: 22px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      .mysub1 {
        width: 100px;
        height: 0px;
        border: 0.5px solid white;
        opacity: 1;
        margin-right: 16px;
      }
      .mysub2 {
        width: 100px;
        height: 0px;
        border: 0.5px solid white;
        opacity: 1;
        margin-left: 16px;
      }
    }
  }
}
.kuang {
    position: relative;
  width: 348px;
  height: 460px;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
background:rgba(19,101,139,0.4);
  img {
    width: 100px;
    height: 100px;
    margin-bottom: 40px;
     opacity: 1!important;
     
  }
  .mydiv {
    
    width: 248px;
    height: 70px;
    font-size: 26px;
    font-weight: 500;
    line-height: 44px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    text-align: center;
  }
  .aaa8 {
    width: 268px;
    height: 50px;
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    text-align: center;
  }
  .img1{
      position: absolute;
      left: -830px;
      top: 199px;
  }
  .img2{
      position: absolute;
      left: -425px;
      top: 199px;
  }
  .img3{
       position: absolute;
      left: 673px;
      top: 199px;
  }
    .img4{
       position: absolute;
      left: 1085px;
      top: 199px;
  }
}

</style>
    
   