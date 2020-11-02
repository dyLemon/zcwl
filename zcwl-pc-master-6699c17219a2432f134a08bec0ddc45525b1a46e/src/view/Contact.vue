<template>
  <div class="container">
    <div class="aaa">
      
      <div class="contact">
        <div class="left">
          <div class="leftTop">
            <div class="sub1">联系电话</div>
            <div class="sub2">+86-028-83125832</div>
            <div class="sub3" style="margin-bottom:5px">（工作日：9:00-18:00）</div>
            <div class="sub3">（节假日：10:00-15:00）</div>
          </div>
          <div class="leftBottom">
            <div class="sub5">我的地址</div>
            <div class="sub3">四川省成都市高新区益州大道中段722号复城国际T1-27楼</div>
          </div>
        </div>
        <div class="right">
          <div class="rightTop">
            <div class="sub6">联系我们</div>
            <div class="sub7">生活因您的来电而美</div>
            <div class="sub8">CONTACTUS</div>
          </div>
          <div class="rightBottom">
            <div class="map"><a href="https://map.baidu.com/search/%E4%B8%AD%E5%88%9B%E4%BA%94%E8%81%94/@11586924.135,3553934.02,16.95z?querytype=s&da_src=shareurl&wd=%E4%B8%AD%E5%88%9B%E4%BA%94%E8%81%94&c=75&src=0&pn=0&sug=0&l=17&b=(11583123.958000582,3552483.122866606;11585914.607631464,3553891.5288521904)&from=webmap&biz_forward=%7B%22scaler%22:1,%22styles%22:%22pl%22%7D&device_ratio=1" target="_blank">查看地图</a></div>
          </div>
        </div>
      </div>
       <div class="xyaaa">
        <div class="xynav xybtn">
          <div class="left">
            <div class="sub1">首页＞</div>
            <div class="sub2">联系我们</div>
          </div>

          <img
            class="right"
            src="../assets/shubiao.png"
            alt
          />
        </div>
      </div>
    </div>
    <!-- 1111111111 -->
    <div class="mybanner">
       <div class="smallSwiper1">
      <div class="content">
        <div class="title2">留言表单</div>
        <div class="title3">
          <div class="mysub1"></div>MESSAGE FORM
          <div class="mysub2"></div>
        </div>
      </div>
    </div>
      <!-- 22222222222 -->
      <div class="banner1" >
        <div>有任何问题</div>
        <div>欢迎在此留言并留下您的联系方式</div>
        <div>我们将尽快回复您</div>
      </div>
         
      <!-- 3333333333333 -->
      <div class="banner2">
        <div class="subBanner">
          <div class="sub9">
            姓名
            <div class="mysub1">Name</div>
          </div>
          <input type="text" placeholder="请输入姓名" v-model="message.name" />
          <div class="linear"></div>
        </div>
        <div class="subBanner">
          <div class="sub9">
            手机
            <div class="mysub1">Cell Phone</div>
          </div>
          <input type="text" placeholder="请输入手机号码" v-model="message.tel_phone" />
          <div class="linear"></div>
        </div>
      </div>
      <!-- 444444444444444 -->
      <div class="banner2">
        <div class="subBanner2">
          <div class="sub9">
            留言
            <div class="mysub1">leave a message</div>
          </div>
          <input type="text" placeholder="请输入留言"
          @input='onInput' 
          maxlength="100"
          v-model="message.content" />
          <div class="linear2"></div>
          <div class="num">{{mynum}}/100</div>
        </div>
      </div>
      <!-- 5555555555555555 -->
      <div class="onSubmit">
        <div class="submit" @click="leaveMessage()">
          提交
        </div>
         <img src="../assets/recrement/success.png" alt="" class="xysuccess" v-if="isShow">
      </div>
    </div>
 
  </div>
 
</template>

<script>
import {
    Message
} from 'element-ui'
import api from "@/api/home";
export default {
  data() {
    return {
      mynum:0,
      isShow:false,
      message:{
        name:'',
        tel_phone:'',
        content:''
      }
    };
  },
  methods: {
    onInput(e){
      console.log(e.target.value.length)
      this.mynum=e.target.value.length
    },

    leaveMessage() {
      if(this.message.name==''){
        Message({
                message: '请输入姓名',
                type: 'error',
                duration: 2 * 1000
            })
        return false
      }
       if( (!(/^1[3456789]\d{9}$/.test(this.message.tel_phone)))){
        Message({
                message: '请输入正确的手机号码',
                type: 'error',
                duration: 2 * 1000
            })
        return false
      }
       if(this.message.content==''){
        Message({
                message: '请输入留言',
                type: 'error',
                duration: 2 * 1000
            })
        return false
      }
      
      api.leaveMessage(this.message).then((res) => {
        console.log(res,"res")
        if(res.status=="SUCCESS"){
          this.isShow=true
          setTimeout(()=>{
            this.isShow=false

          },2000)
          //弹出成功框
          // alert(res.message)
          this.message={}
        }else{
            Message({
                message: res.message,
                type: 'error',
                duration: 2 * 1000
            })
        }
      });
    },
  },
  created() {
  },
};
</script>
<style lang="scss" scoped>

.aaa {
  // max-width: 1920px;
  width: 100%;
  //  background: url(../assets/recrement/66.png) no-repeat;
  background:  url(../assets/recrement/555.png) no-repeat center center;
  background-size:cover;
}
.contact {
  box-sizing: border-box;
  width: 1200px;
  margin: 0 auto;
  height: 560px;
  // background-color: skyblue;
  padding-top: 120px;
  display: flex;
  justify-content: space-between;
  .left {
    color: rgba(255, 255, 255, 1);
  }
  .right {
    text-align: right;
  }

  .leftTop {
    height: 320px;
  }
  .sub1 {
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: 500;
  }
  .sub2 {
    font-weight: 400;
    font-size: 30px;
    margin-bottom: 5px;
  }
  .sub3 {
    font-size: 14px;
  }
  .sub5 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 6px;
  }
  .sub6 {
    font-size: 68px;
    margin-bottom: 14px;
    font-weight: 800;
  }
  .sub7 {
    font-size: 18px;

    margin-bottom: 9px;
  }
  .sub8 {
    font-size: 68px;
    color: rgba(42, 188, 255, 1);
    font-weight: 200;
  }
  .rightTop {
    height: 320px;
    color: white;
  }
  .rightBottom {
    display: flex;
    justify-content: flex-end;
  }
  .map {
    width: 160px;
    height: 40px;
    background: rgba(42, 188, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: white;
  }
  a{
    color: white;
     text-decoration:none;

  }
}
.mybanner {
  width: 1200px;
  margin: 0 auto;
  height: 805px;
  // background-color: pink;
}
.smallSwiper1 {
  width: 100%;
  padding-top: 120px;
  padding-bottom: 50px;
  // 高度为662
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
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
.banner1 {
  width: 270px;
  height: 90px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  margin-bottom: 76px;
}
.banner2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.subBanner {
  width: 560px;
  height: 60px;
  margin-bottom: 40px;
}
.subBanner2 {
  width: 1200px;
  height: 60px;
  // background-color: green;
  input {
    width: 100%;
  }
  .linear2 {
    width: 1200;
    height: 0px;
    border: 0.5px solid rgba(4, 19, 26, 1);

  }
}
.sub9 {
  display: flex;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 16px;
  margin-right: 6px;
}
.banner2 {
  input {
    border: none;
    margin-bottom: 8px;
    font-size: 14px;
  }
  .linear {
    width: 560px;
    height: 0px;
    border: 0.5px solid rgba(4, 19, 26, 1);
  }
}
.mysub1 {
  margin-left: 6px;
  font-size: 14px;
  color: #d4d8d9;
}
.num {
  width: 1200px;
  text-align: right;
  color: #959ea2;
  font-size: 14px;
  margin-top: 8px;
}
.onSubmit{
  position: relative;

  width: 1200px;
  margin: 0 auto;
  margin-top: 60px;
  display: flex;
  justify-content: center;
 

}
.submit{
  width:160px;
height:40px;
border:1px solid rgba(4,19,26,1);
 display: flex;
    align-items: center;
    justify-content: center;
}
.xysuccess{
  position: absolute;
  top:-300px;
  left: 50%;
  transform: translate(-50%)
}
</style>