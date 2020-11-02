<template>
<div class="container7">
      <swiper :options="swiperOption">
            <swiper-slide class="swiper-slide" v-for="(item,index) in 2" :key="index">
                <img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg" alt="">
            </swiper-slide>
            <!-- 分页器 -->
            <div class="swiper-pagination"  slot="pagination"></div>   
             <!-- 左右箭头 --> 
           
        </swiper>
         <div class="prev myleft" slot="button-prev">
             <img src="@/assets/recrement/19.png" alt=""></div> 
            <div class="next myright" slot="button-next">
                <img src="@/assets/recrement/18.png" alt=""></div> 

</div>
  
</template>

<script>
    export default {
        data(){
            return {
                swiperOption:{
                    //显示分页
                    pagination: {
                    //   el: '.swiper-pagination'
                    },
                    //设置点击箭头
                    navigation: {
                      nextEl: '.swiper-button-next', 
                      prevEl: '.swiper-button-prev'
                    },
                    //自动轮播
                    // autoplay: {
                    //   delay: 2000,
                    //   //当用户滑动图片后继续自动轮播
                    //   disableOnInteraction: false,
                    // },
                    //开启循环模式
                    // loop: true
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
.swiper-slide{
    img{
        width:120vw;
        height: 410px;
        object-fit: cover;
    }

}
.container7{
    position: relative;

}
.myleft{
    position: absolute;
    left: -74px;
    top: 50%;
    img{
        width: 92px;
        height: 92px;
    }
}
.myright{
     position: absolute;
    right: -74px;
    top: 50%;
     img{
        width: 92px;
        height: 92px;
    }
}
</style>
