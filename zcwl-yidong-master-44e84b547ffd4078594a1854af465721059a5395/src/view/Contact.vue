<template>
  <div class="container">
    <div class="aaa">
      <div class="contact">
        <div class="left">
          <div class="leftTop">
            <div class="sub1 zzSub1">联系电话</div>
            <div class="sub2">{{dataList.tel}}</div>
            <div class="rightBottom">
              <div class="map">
                <a
                  href="https://map.baidu.com/search/%E4%B8%AD%E5%88%9B%E4%BA%94%E8%81%94/@11586924.135,3553934.02,16.95z?querytype=s&da_src=shareurl&wd=%E4%B8%AD%E5%88%9B%E4%BA%94%E8%81%94&c=75&src=0&pn=0&sug=0&l=17&b=(11583123.958000582,3552483.122866606;11585914.607631464,3553891.5288521904)&from=webmap&biz_forward=%7B%22scaler%22:1,%22styles%22:%22pl%22%7D&device_ratio=1"
                  target="_blank"
                >查看地图</a>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="rightTop">
            <div class="sub6">联系我们</div>
            <div class="sub7">生活因您的来电而美</div>
            <div class="sub8">CONTACTUS</div>
          </div>
        </div>
      </div>
      <div class="xyaaa">
        <div class="xynav xybtn">
          <div class="left">
            <div class="sub1" @click="goToNavigation('/')" >首页＞</div>
            <div class="sub2">联系我们</div>
          </div>

          <img class="right" src="../assets/shubiao.png" alt />
        </div>
      </div>
    </div>
    <!-- 1111111111 -->
    <div class="zhanwei"></div>
    <!-- 占位 -->
    <mytitle big="留言表单" :small="small"></mytitle>
    <div class="cItem">
      <div>有任何问题</div>
      <div>欢迎在此留言并留下您的联系方式</div>
      <div>我们将尽快回复您</div>
    </div>
    <div class="contact1">
      <div class="conflex">
        <div class="contact2">姓名</div>
        <div class="contact3">Name</div>
      </div>
      <div>
        <input type="text" placeholder="请输入姓名" v-model="message.name" />
      </div>
      <div class="liearD"></div>
    </div>
    <!-- 22222222222222 -->
    <div class="contact1">
      <div class="conflex">
        <div class="contact2">手机</div>
        <div class="contact3">Cell Phone</div>
      </div>
      <div>
        <input type="text" placeholder="请输入手机号码" v-model="message.tel_phone" />
      </div>
      <div class="liearD"></div>
    </div>
    <div class="contact1 free">
      <div class="conflex">
        <div class="contact2">留言</div>
        <div class="contact3">Leave A Message</div>
      </div>
      <div>
        <input
          type="text"
          placeholder="请输入留言"
          @input="onInput"
          maxlength="100"
          v-model="message.content"
        />
      </div>
      <div class="liearD"></div>
    </div>
    <div class="submit xycenter" @click="leaveMessage()">提交</div>
    <img src="../assets/recrement/success.png" alt class="xysuccess" v-if="isShow" />
  </div>
</template>

<script>
import { Message } from "element-ui";
import mytitle from "@/components/mytitle";
import api from "@/api/home";
export default {
  components: {
    mytitle
  },
  data() {
    return {
      small: "MESSAGE FORM",
      mynum: 0,
      isShow: false,
      message: {
        name: "",
        tel_phone: "",
        content: ""
      },
      dataList: {}
    };
  },
  methods: {
    goToNavigation(path){
        this.$router.push({path:path})
      },
    onInput(e) {
      console.log(e.target.value.length);
      this.mynum = e.target.value.length;
    },

    getWebConfig() {
      api.getWebConfig().then(res => {
        this.dataList = res.data;
      });
    },

    leaveMessage() {
      if (this.message.name == "") {
        Message({
          message: "请输入姓名",
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.message.tel_phone)) {
        Message({
          message: "请输入正确的手机号码",
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
      if (this.message.content == "") {
        Message({
          message: "请输入留言",
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }

      api.leaveMessage(this.message).then(res => {
        console.log(res, "res");
        if (res.status == "SUCCESS") {
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
          //弹出成功框
          // alert(res.message)
          this.message = {};
        } else {
          Message({
            message: res.message,
            type: "error",
            duration: 2 * 1000
          });
        }
      });
    }
  },
  created() {
    this.getWebConfig();
  }
};
</script>
<style lang="scss" scoped>


.container{
  position: relative;
}
.aaa {
  // max-width: 1920px;
  width: 100%;
  //  background: url(../assets/recrement/66.png) no-repeat;
  background: url(../assets/recrement/555.png) no-repeat center center;
  background-size: cover;
}
.contact {
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 0 0.34rem;
  height: 3.5rem;
  // background-color: skyblue;
  padding-top: 0.68rem;
  display: flex;
  justify-content: space-between;
  .left {
    color: rgba(255, 255, 255, 1);
  }
  .right {
    text-align: right;
  }

  .leftTop {
    // height: 320px;
  }
  .sub1 {
    font-size: 0.28rem;
    font-family: Source Han Sans CN;
    font-weight: 500;
    line-height: 0.48rem;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    text-align: left;
  }
  .sub2 {
    font-size: 0.28rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.4rem;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    text-align: left;
  }
  .sub3 {
    font-size: 14px;
    padding: 0;
    height: 15px;
    line-height: 15px;
    margin-bottom: 0px;
  }
  .sub5 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 6px;
  }
  .sub6 {
    font-size: 0.4rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    margin-bottom: 0.12rem;
    // line-height:0.68rem;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
  }
  .sub7 {
    font-size: 0.2rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.3rem;
    color: rgba(212, 216, 217, 1);
    opacity: 1;
  }
  .sub8 {
    font-size: 0.4rem;
    font-family: Source Han Sans CN;
    font-weight: 200;
    line-height: 0.68rem;
    color: rgba(42, 188, 255, 1);
    opacity: 1;
    color: rgba(42, 188, 255, 1);
  }
  .rightTop {
    // height: 320px;
    color: white;
  }
  .rightBottom {
    margin-top: 0.75rem;
    display: flex;
    // justify-content: flex-end;
  }
  .map {
    width: 2.8rem;
    height: 0.6rem;
    opacity: 1;
    background: rgba(42, 188, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: white;
  }
  a {
    font-size: 0.28rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.4rem;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    color: white;
    text-decoration: none;
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
.cItem {
  font-size: 0.29rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.4rem;
  color: rgba(29, 151, 207, 1);
  opacity: 1;
  text-align: center;
  margin-bottom: 0.34rem;
}
.contact1 {
  padding: 0 0.34rem;

  // height: 1.04rem; 
  width: 100%;
  margin-bottom: 0.38rem;
 


  input {
    width: 100%;
    font-size: 0.29rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.48rem;
    color: black;
    opacity: 1;
  }
}
.conflex {
  display: flex;
  margin-bottom: 0.26rem;
}
.contact2 {
  font-size: 0.32rem;
  font-family: Source Han Sans CN;
  font-weight: 500;
  line-height: 0.48rem;
  color: rgba(4, 19, 26, 1);
  opacity: 1;
  margin-right: 0.16rem;
}
.contact3 {
  font-size: 0.24rem;
  font-family: Source Han Sans CN;
  font-weight: 200;
  line-height: 0.48rem;
  color: rgba(212, 216, 217, 1);
  opacity: 1;
}

.liearD {
  width: 100%;
  height: 1px;
  background-color: rgba(4, 19, 26, 1);
}

.submit {
  margin: 0 auto;
  margin-top: 0.68rem;
    margin-bottom: 0.68rem;
  width: 2.4rem;
  height: 0.6rem;
  border: 1px solid rgba(4, 19, 26, 1);
  opacity: 1;

  font-size:0.29rem;
// font-family:Source Han Sans CN;
// font-weight:400;
// line-height:0.64rem;
// color:rgba(4,19,26,1);
// opacity:1;
}
.free{
      margin-bottom: 0rem;
      // background: red;
}
.zhanwei {
  margin-top: 0.3rem;
}
.xysuccess{
  width:4rem;
height:3.54rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%)
  

}

.zzSub1{
  line-height: 0.5rem !important;
}
</style>