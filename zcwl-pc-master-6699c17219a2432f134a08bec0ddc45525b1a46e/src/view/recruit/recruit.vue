<template>
  <div class="chance">
    <div class="chance1">
      <div style="font-size:22px;margin-bottom:40px">工作机会</div>
      <div style="font-size:30px;font-weight:800;margin-bottom:40px">不仅改变你的职业</div>
      <div
        style="font-size:18px;margin-bottom:10px"
      >你还在寻找新领域新挑战吗？你将有机会全面提升临床医疗水平、医疗体系化、信息化建设和医疗资源的高效利用</div>
      <div style="font-size:18px;">加入我们，找到合适你的职位</div>
    </div>
    <div class="myrecriut">
      <div  v-if="recruitList[0]">
        <img :src="recruitList[0].image" style="margin-right:80px" alt />
        <div class="sub1">
          <div class="subText">{{recruitList[0].title}}</div>
          <ul>
            <li v-for="i in recruitList[0].keywords" :key="i">
              <div class="circle"></div>
              {{i}}
            </li>
          </ul>
          <div class="sub2" @click="onPosition(recruitList[0].id)" style="fontSize:18px">
            <img src="@/assets/recrement/04.png" alt />
            查看职位
          </div>
        </div>
      </div>
      <div v-if="recruitList[1]">
        <img :src="recruitList[1].image" alt />
        <div class="sub1">
          <div class="subText">{{recruitList[1].title}}</div>
          <ul style="height:90px">
            <li v-for="i in recruitList[1].keywords" :key="i">
              <div class="circle"></div>
              {{i}}
            </li>
          </ul>
          <div class="sub2" @click="onPosition(recruitList[1].id)" style="fontSize:18px">
            <img src="@/assets/recrement/04.png" alt />
            查看职位
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/home";
export default {
  data() {
    return {
      recruitList: [],
      detail:{}
    };
  },
  methods: {
    onPosition(id) {
      this.$router.push({
        path: "/recruitment/recruitList",
        query: {
          id: id,
        },
      });
    },
    getRecruit() {
      api.getRecruit().then((res) => {
        this.recruitList = res.data.cate;
        this.detail=res.data.detail;
      });
    },
  },
  created() {
    this.getRecruit();
  },
};
</script>
<style lang="scss" scoped>
.chance {
  width: 100%;
  height: 1198px;
  .chance1 {
    padding-top: 147px;
    padding-bottom: 82px;
    text-align: center;
  }
}
.myrecriut {
  width: 100%;
  height: 670px;
  margin: 0 auto;
  display: flex;
  //   align-items: center;
  justify-content: center;

  img {
    width: 560px;
    height: 346px;
  }
  .sub1 {
    box-sizing: border-box;
    width: 560px;
    height: 324px;
    background: rgba(245, 245, 245, 1);
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .subText {
    font-size: 30px;
    // margin-bottom: 35px;
  }
  li {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    font-size: 18px;
  }
  .circle {
    width: 6px;
    height: 6px;
    background: rgba(19, 101, 139, 1);
    border-radius: 50%;
    margin: 0 6px;
  }
  .sub2 {
    width: 160px;
    height: 40px;
    border: 1px solid rgba(4, 19, 26, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 6px;
      height: 12px;
      margin-right: 6px;
    }
  }
}
</style>