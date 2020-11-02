<template>
  <div class="container">
    <div
      class="subitem"
      v-for="(item,index) in linearDeafultList"
      :key="index"
      @click="jumpurl(index)"
      :class="{active:active == index}"
      @mouseenter="active = index"
    >
      <div>
        <div class="sub1">{{item.menu}}</div>
        <img :src="item.image" alt />
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/home";
export default {
  data() {
    return {
      active: 0,
      linearDeafultList: [],
      list: [
        {
          name: "AI手术规划系统",
          img: require("../assets/recrement/12.png"),
          path: "/medicalDetails/1",
        },
        {
          name: "形态量化分析服务",
          img: require("../assets/recrement/13.png"),
          path: "/mEdicalDetails/2",
        },
        {
          name: "AI全血健康系统",
          img: require("../assets/recrement/14.png"),
          path: "/mEdicaDetails/3",
        },

        {
          name: "中创医学影像云",
          img: require("../assets/recrement/15.png"),
          path: "/mEdicalDtails/4",
        },
        {
          name: "数字化运动康复系统",
          img: require("../assets/recrement/16.png"),
          path: "/mEdicalDtail/5",
        },
      ],
    };
  },
  methods: {
    jumpurl(index) {
        // console.log(this.list[index].path)
          this.$router.push({path:this.list[index].path})
    },
    getFiveList() {
      api.getFiveList().then((res) => {
        this.linearDeafultList = res.data;
      });
    },
  },
  created() {
    this.getFiveList();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  // background-color: pink;
  height: 800px;
  display: flex;
  background-color: #101f44;
}
.subitem.active {
  width: 520px;
  opacity: 1;
}
.subitem {
  opacity: 0.5;
  width: 350px;
  height: 800px;
  // background-color:yellow ;
  transition: all 0.2s linear;
  box-sizing: content-box;
  overflow: hidden;
  position: relative;
  & > div {
    width: 100%;
  }
  img {
    width: 520px;
    height: 364px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
.sub1 {
  font-size: 30px;
  font-weight: 800;
  color: white;
  margin: 120px 0;
  text-align: center;
}
</style>