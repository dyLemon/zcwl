<template>
  <div class="container1">
    <div class="news">
      <div class="xyaaa">
        <div class="xynav xybtn">
          <div class="left">
            <div class="sub1" @click.self="goToNavigation('/')">
              首页＞
              <span @click.self="goToNavigation('/recruitment')">招纳贤士＞</span>
            </div>
            <div class="sub2" v-if="typeid==1">社会招聘</div>
            <div class="sub2" v-if="typeid==2">校园招聘</div>
          </div>

          <img class="right" src="../../assets/shubiao.png" alt />
        </div>
      </div>
      <!-- 1111111111111 -->
      <div class="pcontent">
        <div class="top">
          <div class="pItem">
            <div class="pname">岗位名称</div>
            <div class="pdesc">{{detail.position_name}}</div>
          </div>|
          <div class="pItem" style="textAlign:center">
            <div class="pname">所属机构</div>
            <div class="pdesc">{{detail.orgin}}</div>
          </div>
        </div>
        <div class="bottom">
          <div class="pItem">
            <div class="pname">学历要求</div>
            <div class="pdesc">{{detail.education}}</div>
          </div>|
          <div class="pItem" style="textAlign:center">
            <div class="pname">工作地点</div>
            <div class="pdesc">{{detail.job_addr}}</div>
          </div>|
          <div class="pItem" style="textAlign:center">
            <div class="pname">薪资</div>
            <div class="pdesc">{{detail.salary}}</div>
          </div>
        </div>
      </div>
      <!-- 111111 -->
      <div class="container9">
        <!-- 占位的线 -->
        <div class="linear"></div>
        <div class="pRespon">
          <div class="respon1">【岗位职责】</div>
          <div class="respon2" v-html="detail.post_responsibility"></div>
        </div>
        <!-- 111111111 -->
        <div class="pRespon">
          <div class="respon1">【任职资格】</div>
          <div class="respon2" v-html="detail.competence_post"></div>
        </div>
      </div>
      <!-- 2222222222 -->
      <div class="apply" @click="parentMethod" style="fontSize:0.29rem;">申请职位</div>

      <!-- 遮罩 -->
      <div>
        <lay ref="child1" @myemit="myemit"></lay>
      </div>
    </div>
    <img v-if="isShow" class="success" src="../../assets/recrement/success.png" alt />
  </div>
</template>
<script>
import lay from "./aaa.vue";
import api from "@/api/home";
export default {
  components: {
    lay,
  },
  data() {
    return {
      typeid: "",
      isShow: false,
      detail: {},
    };
  },
  methods: {
    goToNavigation(path) {
      this.$router.push({ path: path });
    },
    myemit() {
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    },
    parentMethod() {
      console.log(this.$refs.child1); //返回的是一个vue对象，所以可以直接调用其方法
      this.$refs.child1.onShow();
    },
    getPositionDetail(id) {
      api.getPositionDetail(id).then((res) => {
        this.detail = res.data;
      });
    },
  },
  created() {
    this.typeid = this.$route.query.typeid;
    let id = this.$route.params.id;
    this.getPositionDetail(id);
  },
};
</script>

<style lang="scss" scoped>
.container1 {
  position: relative;
}
.success {
  width: 4rem;
  height: 3.54rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.pcontent {
  margin-top: 0.96rem;
  padding: 0 0.86rem;
  padding-top: 0.96rem;
  margin-bottom: 0.68rem;
  font-size: 10px;
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.33rem;
  }
  .pItem {
    width: 50%;
    // background-color: yellow;
  }
  .pname {
    font-size: 0.24rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.34rem;
    color: rgba(149, 158, 162, 1);
    opacity: 1;
  }
  .pdesc {
    font-size: 0.32rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 0.54rem;
    color: rgba(4, 19, 26, 1);
    opacity: 1;
  }
  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.container9 {
  padding: 0 0.34rem;
  .linear {
    width: 100%;
    height: 1px;
    background-color: rgba(212, 216, 217, 1);
  }
  .pRespon {
    margin-top: 0.68rem;
    .respon1 {
      font-size: 0.32rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 0.54rem;
      color: rgba(4, 19, 26, 1);
      opacity: 1;
    }
    .respon2 {
      font-size: 0.28rem;
      font-family: Source Han Sans CN;
      font-weight: 300;
      line-height: 0.4rem;
      color: #6a7275;
      opacity: 1;
    }
  }
}
.apply {
  margin: 0.68rem 0;
  margin-left: 0.34rem;

  width: 2.4rem;
  height: 0.6rem;
  background: rgba(29, 151, 207, 1);
  opacity: 1;
  color: white;
  font-size: 0.29rem !important;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.62rem;
  text-align: center;
}
</style>