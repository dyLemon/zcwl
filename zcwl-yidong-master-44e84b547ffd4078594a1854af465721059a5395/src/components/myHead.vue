<template>
  <div>
    <!-- <div class="head1 xybtn"  :class="$route.path=='/'||$route.path=='/medicalCenter'?'':'active2'">
      <img @click="myjump" class="headLeft1" src="../assets/vv.png" alt />
      <img @click="showPopup" class="headLeft2" src="../assets/san.png" alt />
    </div>-->
    <div class="head1 xybtn" v-if="$route.path=='/'||$route.path=='/medicalCenter/medicalIndx'">
      <img @click="myjump" class="headLeft1" src="../assets/vv.png" alt />
      <img @click="showPopup" class="headLeft2" src="../assets/san.png" alt />
    </div>
    <div class="head2 xybtn .active2" v-else>
      <img @click="myjump" class="headLeft1" src="../assets/ggh.png" alt />
      <img @click="showPopup" class="headLeft2" src="../assets/123.png" alt />
    </div>
    <!-- <div class="head1 xybtn"  :class="$route.path=='/'||$route.path=='/medicalCenter'?'':'active2'">
      <img @click="myjump" class="headLeft1" src="../assets/ggh.png" alt />
      <img @click="showPopup" class="headLeft2" src="../assets/123.png" alt />
    </div>-->
    <van-popup class="dialog" v-model="show" position="right" :style="{ width: '50%',height:'100%' }">
      <div class="popTop xycenter">
        <img class="popLogo" src="../assets/bb.png" alt />
      </div>
      <!-- 11111 -->
      <ul class="popContent">
        <li
          class="xypopItem"
          v-for="(item,index) in navData"
          :key="item.id"
          @click="switchPath(item,index)"
          :class="$route.meta.id == item.meta.id?'active':''"
        >
          <div class="circle"></div>
          {{item.name}}
        </li>
      </ul>
    </van-popup>
  </div>
</template>  
<script>
import api from "@/api/home";
import { Switch } from "element-ui";
export default {
  data() {
    return {
      show: false,
      currentIndex: 0,
      navData: [
        { name: "首页", path: "/", isActive: false },
        { name: "智慧医疗中心", path: "/medicalCenter", isActive: false },
        { name: "研究院", path: "/research", isActive: false },
        { name: "新闻动态", path: "/news", isActive: false },
        { name: "招纳贤士", path: "/recruitment", isActive: false },
        { name: "关于我们", path: "/aboutUs", isActive: false },
        { name: "联系我们", path: "/contactUS", isActive: false }
      ],
      dataList: {}
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    switchPath(item, index) {
      console.log(1111111);
      this.$router.push({ path: item.path });
      this.currentIndex = index;

      for (let i = 0; i < this.navData.length; i++) {
        if (i == this.currentIndex) {
          this.navData[i].isActive = true;
        } else {
          this.navData[i].isActive = false;
        }
      }
         this.show = false
    },
    myjump() {
      this.$router.push("/");
    },
    getWebConfig() {
      api.getWebConfig().then(res => {
        this.dataList = res.data;
      });
    }
  },
  created() {
    this.getWebConfig();
    console.log(this.$router)
    this.navData = this.$router.options.routes
  }
};
</script>

<style lang='scss' scoped>
.active2 {
}
.active {
  background-color: #1d97cf !important;
  color: white !important;
}
.head2 {
  width: 100%;
  height: 0.88rem;
  background-color: white !important;

  padding: 0 0.34rem;
}
.head1 {
  width: 100%;
  height: 0.88rem;
  background-color: #152047;
  padding: 0 0.34rem;
}

.headLeft1 {
  width: 2.68rem;
  height: 0.6rem;
}
.headLeft2 {
  width: 0.44rem;
  height: 0.36rem;
}
.popTop {
  width: 100%;
  height: 4.7rem;
}
.popLogo {
  width: 2.8rem;
  height: 1.96rem;
}
.popContent {
  width: 100%;
}
.xypopItem {
  font-size: 0.32rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.54rem;
  // color:rgba(255,255,255,1);
  opacity: 1;
  width: 100%;
  height: 0.8rem;
  // background-color: pink;
  display: flex;
  align-items: center;
  .circle {
    width: 0.2rem;
    height: 0.2rem;
    background-color: white;
    border-radius: 50%;
    margin: 0 0.48rem;
  }
}


.dialog{
  /deep/ .van-overlay{
    
  }
}
</style>
  
