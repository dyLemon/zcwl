<template>
  <div class="myFoot clearfix">
    <div class="backTop xycenter" @click="backtop">
      <img src="../assets/lll.png" alt />
    </div>
    <!-- 产品公司联系 -->

    <div class="footContent clearfix">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="产品" name="1" class="footA">
          <div class="hhh hxx" @click="jumpUrl(1)">AI手术规划系统</div>
          <div class="hhh" @click="jumpUrl(2)">形态量化分析系统</div>
          <div class="hhh" @click="jumpUrl(3)">AI全血健康系统</div>
          <div class="hhh" @click="jumpUrl(4)">中创医学影像云</div>
          <div class="hhh" @click="jumpUrl(5)">数字化运动康复系统</div>
        </el-collapse-item>
        <el-collapse-item title="公司" name="2">
          <div class="hhh hxx" @click="jumpUrl(9)">关于我们</div>
          <div class="hhh " @click="jumpUrl(6)">研究院</div>
          <div class="hhh" @click="jumpUrl(7)">新闻动态</div>
          <div class="hhh" @click="jumpUrl(8)">招纳贤士</div>
        </el-collapse-item>
        <el-collapse-item title="联系" name="3">
          <div class="hhh hxx">{{dataList.address}}</div>
          <div class="hhh">{{dataList.email}}</div>
          <div class="hhh">{{dataList.tel}}</div>
        </el-collapse-item>
      </el-collapse>
      <!-- <div class="top xybtn">
        <div class="footA">产品</div>
        <div class="footB">+</div>
      </div>-->
      <!-- <ul  class="bottom">
          <li class="bottomA"> 研究院</li>
           <li class="bottomA"> 研究院</li>
      </ul>-->
    </div>
    <!-- 2222222222 -->
    <div class="down">
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo">{{dataList.copy_right}}</a>
    </div>
    <!-- 333333333 -->
    <div class="support">技术支持：浪起科技有限公司</div>
  </div>
</template>
<script>
import api from "@/api/home";
export default {
  mounted() {
    window.addEventListener("scroll", this.showbtn, true);
  },
  data() {
    return {
      dataList: {},
      activeName: [""],
    };
  },
  methods: {
    // 显示回到顶部按钮
    showbtn() {
      let that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
    },
    jumpUrl(id) {
      if (id <= 5) {
        this.$router.push({ path: `/medicalCenter/medicalDetails${id}` });
      } else {
        switch (id) {
          case 6:
            this.$router.push({ path: "/research" });
            break;
          case 7:
            this.$router.push({ path: "/news" });
            break;
          case 8:
            this.$router.push({ path: "/recruitment" });
            break;
                 case 9:
            this.$router.push({ path: "/aboutUs" });
            break;
        }
      }
    },
    /**
     * 回到顶部功能实现过程：
     * 1. 获取页面当前距离顶部的滚动距离（虽然IE不常用了，但还是需要考虑一下兼容性的）
     * 2. 计算出每次向上移动的距离，用负的滚动距离除以5，因为滚动的距离是一个正数，想向上移动就是做一个减法
     * 3. 用当前距离加上计算出的距离，然后赋值给当前距离，就可以达到向上移动的效果
     * 4. 最后记得在移动到顶部时，清除定时器
     */
    backtop() {
      var timer = setInterval(function () {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 30);
    },
    getWebConfig() {
      api.getWebConfig().then((res) => {
        this.dataList = res.data;
      });
    },
  },
  created() {
    this.getWebConfig();
  },
};
</script>


<style lang="scss">
.footContent {
  /deep/ .el-icon-arrow-right:before {
    content: "+";
    font-size: 0.40rem;
    font-weight: 550;
    // margin-top: -0.2rem;
    // transform: translateY(-30px);
  }
}
</style>


<style lang="scss" scoped>
.myFoot {
  width: 100%;
  padding: 0 0.34rem;
  background-color: #04131a;
  .backTop {
    width: 100%;
    height: 0.96rem;
    margin-bottom: -9px;

    border-bottom: 1px solid rgba(112, 112, 112, 1);
    img {
      width: 0.52rem;
      height: 0.28rem;
    }
  }
}
// 111111111
.footContent {
  width: 100%;
  padding: 0.17rem 0;
  // height: 0.96rem;
  // border-bottom: 1px solid rgba(112, 112, 112, 1);
  color: rgba(255, 255, 255, 1);

  .footA {
  }
  .hhh {
    padding-left: 0.34rem;
    font-size: 0.28rem;
    font-family: Source Han Sans CN;
    font-weight: 500;
    line-height: 0.48rem;
    color: rgba(149, 158, 162, 1);
    opacity: 1;
    background-color: #04131a !important;
    color: #959ea2;
  }
  .hxx {
    margin-top: 0.2rem;
  }
  .footB {
    font-size: 0.5rem;
  }
  .bottomA {
    padding-left: 0.34rem;
    font-weight: 500;
    font-size: 0.28rem;
    line-height: 0.48rem;
    color: rgba(149, 158, 162, 1);
  }
}
// 222222
.rights {
  width: 100%;
  height: 1.18rem;
  font-size: 0.24rem;
  line-height: 0.34rem;
  color: rgba(144, 144, 144, 1);
  text-align: center;
}
.support {
  margin-top: 0.18rem;
  width: 100%;
  height: 0.68rem;
  text-align: center;
  font-size: 0.24rem;
  line-height: 0.34rem;
  color: rgba(144, 144, 144, 1);
}
.down {
  width: 100%;
  height: 0.68rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // font-size: 12px;
  font-weight: 400;
  color: rgba(144, 144, 144, 1);
  a {
    text-align: center;
    color: #909090;
    text-decoration: none;
    font-size: 0.24rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.34rem;
    color: rgba(144, 144, 144, 1);
    opacity: 1;
  }
}
.el-collapse-item__header {
  background-color: #04131a !important;
}
</style>