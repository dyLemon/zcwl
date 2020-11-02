<template>
  <div class="container1" :class="type == 3 ? 'singleBg' :type == 4 ? 'zhongchuangBg' :''">
    <div class="medical1">
      <div class="med1A">{{dataInfo.menu}}</div>
      <div class="med1B">{{dataInfo.title}}</div>
      <div class="linear"></div>
      <div class="container33" :style="{backgroundImage: 'url(' + (bgc) + ')'}">
        <mytitle :big="big" :small="small"></mytitle>
        <div class="mymedicall" v-html="dataInfo.intro"></div>
      </div>
    </div>
  </div>
</template>
<script>
import mytitle from "@/components/mytitle";
export default {
  props: {
    dataInfo: Object,
    small: String,
    big: String,
    bgc: String,
  },
  data(){
    return{
      type:""
    }
  },
  created() {
    console.log(this.$route);

// 因为组件是公用的，背景图不一样，所以这里做个判断，

  if(this.$route.name == 'medicalDetails3' || this.$route.name == 'medicalDetails5' ){
    this.type = 3
  }else if(this.$route.name == 'medicalDetails4') {
    this.type = 4


  }



  },
  mounted(){
console.log('dataInfo',this.dataInfo)

  },
  components: {
    mytitle,
  },
  // watch:{
  //   $router(val,oldval){

  //     console.log("路由",this.$router)
  //   }
  // }
  //   watch:{
  //   $route(to,from){
  //     console.log(to.path);
  //   }
  // },
  watch: {
    $router(val, old) {
      // 当前路由
      console.log("当前路由", val);
    },
    deep: true,
      immediate: true,
  },
};
</script>
 1


<style lang="scss" scoped>
 
.container33 {
  background-size: 100%;
  padding-bottom: 0.68rem;
  background-image: none !important;
}
.container1 {
  margin-top: 0.68rem;
  background-image: url("http://zhongcwl.b.langqiyun.cn/uploads/other/20200821/2b46d3307d0051b165c620779706233e.png") !important;
  background-size: 100% 100%;
  .medical1 {
    padding: 0 0.34rem;
  }
  .med1A {
    font-size: 0.4rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.68rem;
    color: rgba(29, 151, 207, 1);
    opacity: 1;
    text-align: center;
  }
  .med1B {
    font-size: 0.28rem;
    font-family: Source Han Sans CN;
    font-weight: 300;
    line-height: 0.48rem;
    color: rgba(106, 114, 117, 1);
    opacity: 1;
    text-align: center;
 

overflow: hidden;
word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;






  }
  .linear {
    width: 100%;
    height: 1px;
    background-color: rgba(76, 79, 80, 1);
  }
  .mymedicall {
    // height: 6.38rem;
    font-size: 0.28rem;
    font-family: Source Han Sans CN;
    font-weight: 300;
    line-height: 0.4rem;
    color: rgba(106, 114, 117, 1);
    opacity: 1;
    // white-space: pre-wrap;
    // text-align: center;
    // padding-bottom: 0.68rem;
    // word-break: break-all;
    // text-overflow: ellipsis;
    // display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    // -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    // -webkit-line-clamp: 9; /** 显示的行数 **/
    // overflow: hidden;
  }
}

.singleBg{
  background-image: url('../assets/quxnueBG.png') !important;
}
.zhongchuangBg{

  background-image: url('../assets/zhongchuang.png') !important;
}
</style>