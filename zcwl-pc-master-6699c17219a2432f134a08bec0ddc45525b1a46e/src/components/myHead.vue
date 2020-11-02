<template>
  <div class="container">
    <div class="content">
      <img @click="myjump" :src="dataList.top_logo" />
      <div class="nav">
        <ul>
          <li
            v-for="(item,index) in navData"
            :key="index"
            @click="switchPath(item,index)"
            :class="$route.path==item.path?'active':''"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>  
<script>
import api from "@/api/home";
export default {
  data() {
    return {
      currentIndex: 0,
      navData: [
        { name: "首页", path: "/" },
        { name: "智慧医疗中心", path: "/medicalCenter" },
        { name: "研究院", path: "/research" },
        { name: "新闻动态", path: "/news" },
        { name: "招纳贤士", path: "/recruitment" },
        { name: "关于我们", path: "/aboutUs" },
        { name: "联系我们", path: "/contactUS" },
      ],
      dataList: {},
    };
  },
  methods: {
    switchPath(item, index) {
      this.$router.push({ path: item.path });
      this.currentIndex = index;
    },
    myjump() {
      this.$router.push("/");
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

<style lang='scss' scoped>
// 头部组件
.container {
  min-width: 1200px;
  width: 100%;
  height: 100px;
  background-color: #101f44;
  .content {
    width: 1200px;
    margin: 0 auto;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 210px;
      height: 48px;
    }
    .nav {
      width: 600px;
      height: 100px;
    }
  }
}
.nav ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding-top: 8px;
  li {
    cursor: pointer;
    font-weight: 500;
    color: #ffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
}
.active {
  color: #1d97cf !important;
}
</style>
  
