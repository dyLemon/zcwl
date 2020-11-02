<template>
  <div style=" background:rgba(245,245,245,1)">
    <div class="container">
      <div class="big">请选择您感兴趣的职位</div>
      <!-- <div class="bigbig">
      <div
        @mouseover="mouseOver"
        @mouseleave="mouseLeave"
        @click="getPositionDetail(item.id)"
        :class="[currentIndex==1?'active':'','position1']"
        v-for="item in dataList" :key="item.id"
      >
        <div class="top">
          <div class="topLeft">
            <img
              class="leftImg"
              src="../../assets/ren2.png"
              alt
            />
            <div class="sub2">{{item.position_name}}</div>
          </div>
          <div class="topRight ">
            <div class="sub3">查看详情</div>
            <img
              class="imgRight"
              src="../../assets/right.png"
              alt
            />
          </div>
        </div>
        <div :class="[currentIndex==1?'active1':'','lineat']"></div>
        <div class="right" >
          <div>学历：{{item.education}}</div>
          <div>招聘人数：{{item.people_num}}</div>
          <div>专业：{{item.major}}</div>
          <div>工作地点：{{item.job_addr}}</div>
          <div>发布日期：{{item.rel_time}}</div>
        </div>
      </div>
      </div> -->
    </div>

  </div>
</template>
<script>
import api from "@/api/home";
export default {
  data() {
    return {
      currentIndex: 0,
      dataList: [],
    };
  },
  methods: {
    mouseOver() {
      this.currentIndex = 1;
    },
    mouseLeave() {
      this.currentIndex = 0;
    },
    getPositionDetail(id) {
      this.$router.push({ path: "/recruitment/recruit/"+id });
    },
    getPositionList(id) {
      api.getPositionList(id).then((res) => {
        this.dataList = res.data;
      });
    },
  },
  created() {
    let id = this.$route.query.id;
    this.getPositionList(id);
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  //   background:rgba(245,245,245,1);
}
.bigbig{
  padding-bottom: 140px;
}
.big {
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  padding-top: 147px;
}
.position1 {
  width: 1200px;
  margin: 0 auto;
  height: 156px;
  background: white;
  color: black;
  box-shadow: 0px 2px 4px rgba(29, 151, 207, 0.2);
  padding: 40px;
  margin-top: 40px;
  // margin-bottom: 40px;
  box-shadow: 0px 2px 4px rgba(4, 19, 26, 0.2);
}
.active {
  background: rgba(29, 151, 207, 1);
  color: white;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .topLeft,
  .topRight {
    display: flex;
  }

  .leftImg {
    width: 22px;
    height: 22px;
    margin-right: 20px;
  }
  .sub2 {
    font-size: 22px;
    font-weight: 500;
  }
  .sub3 {
    font-size: 14px;
    margin-right: 10px;
  }
  .imgRight {
    width: 6px;
    height: 12px;
    margin-top: 3px;
  }
}
.lineat {
  width: 1120px;
  // background-color: rgba(149,158,162,1);
  height: 2px;
  font-size: 22px;
  // margin-top: 30px;
  margin-bottom: 26px;
  background-color: #959ea2;
}
.active1 {
  background-color: white;
}

.right {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  div {
    // margin-right: 132px;
  }
}
</style>