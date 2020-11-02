<template>
  <div class="container0">
    <div class="footer">
      <div class="footer1">
        <div class="left">产品</div>
        <div class="middle">公司</div>
        <div class="right">联系</div>
      </div>
      <div class="linear"></div>
      <div class="footer2">
        <div class="left1">
          <ul>
            <li @click="jumpUrl(1)">AI手术规划系统</li>
            <li @click="jumpUrl(2)">形态量化分析系统</li>
            <li @click="jumpUrl(3)">AI全血健康系统</li>
            <li @click="jumpUrl(4)">中创医学影像云</li>
            <li @click="jumpUrl(5)">数字化运动康复系统</li>
          </ul>
        </div>
        <div class="middle1">
          <ul>
            <li @click="jumpUrl(6)">研究院</li>
            <li @click="jumpUrl(7)">新闻动态</li>
            <li @click="jumpUrl(8)">招纳贤士</li>
          </ul>
        </div>
        <div class="right1">
          <ul>
            <li>{{dataList.address}}</li>
            <li>{{dataList.email}}</li>
            <li>{{dataList.tel}}</li>
          </ul>
        </div>
        <div class="logo1">
          <img @click="backtop" :src="dataList.footer_logo" alt />
        </div>
      </div>
      <div class="linear"></div>
      <div class="down">
        <div><a href="http://www.beian.gov.cn/portal/registerSystemInfo">{{dataList.copy_right}}</a></div>
        <div>技术支持：浪起科技有限公司</div>
      </div>
    </div>
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
    jumpUrl(id){
        switch(id){
          case 1:
             this.$router.push({path: "/medicalDetails/1"})
            break;
          case 2:
            this.$router.push({path: "/mEdicalDetails/2"})
            break;
          case 3:
            this.$router.push({path: "/mEdicaDetails/3"})
            break;
          case 4:
            this.$router.push({path: "/mEdicalDtails/4"})
            break;
          case 5:
            this.$router.push({path: "/mEdicalDtail/5"})
            break;
          case 6:
            this.$router.push({path: "/research"})
            break;
          case 7:
            this.$router.push({path: "/news"})
            break;
          case 8:
            this.$router.push({path: "/recruitment"})
            break;
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
        this.dataList=res.data;
      });
    },
  },
  created() {
    this.getWebConfig();
  },
};
</script>

<style lang="scss" scoped>
.container0 {
  background-color: rgba(45, 45, 45, 1);
}
.footer {
  width: 1200px;
  height: 402px;
  background-color: rgba(45, 45, 45, 1);
  margin: 0 auto;
}
.footer1 {
  width: 1200px;
  padding-top: 80px;
  box-sizing: border-box;
  display: flex;
}
.left,
.middle,
.right {
  width: 300px;
  font-size: 18px;
  font-weight: 500;
  color: white;
  margin-bottom: 20px;
}
.linear {
  width: 1200px;
  background-color: rgba(144, 144, 144, 1);
  height: 2px;
}
.footer2 {
  width: 1200px;
  display: flex;
}
.left1,
.middle1,
.right1 {
  box-sizing: border-box;
  padding: 36px 0;
  width: 300px;
  height: 230px;
}
.logo1 {
  box-sizing: border-box;
  width: 300px;
  height: 230px;
  padding-bottom: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.logo1 img {
  width: 142px;
  height: 100px;
}
.left1 li,
.middle1 li {
  font-size: 14px;
  font-weight: 400;
  color: rgba(144, 144, 144, 1);
  padding-bottom: 14px;
}
.right1 li {
  font-size: 14px;
  font-weight: 400;
  color: rgba(144, 144, 144, 1);
  padding-bottom: 5px;
  line-height:20px;
}
.down {
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 400;
  color: rgba(144, 144, 144, 1);
  a{
    color: #909090;
    text-decoration: none;
  }
}
</style>