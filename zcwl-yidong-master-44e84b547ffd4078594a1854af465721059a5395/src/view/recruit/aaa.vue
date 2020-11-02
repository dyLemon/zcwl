<template>
  <div class="container1">
    <!-- <div class="apply" @click="onShow">申请岗位</div> -->
    <div class="overlay" v-if="show">
      <div class="overlay1">
        <div class="mytop">
          <div class="sub5">填写信息</div>
          <div class="sub6" @click="onHide">×</div>
        </div>
        <div class="linear"></div>
        <!-- 1111111111111 -->
        <div class="bigInput">
          <div class="youname">姓名</div>
          <input type="text" class="smallInput" placeholder="请输入姓名" v-model="params.name" />
        </div>
        <div class="bigInput">
          <div class="youname">手机</div>
          <input type="text" class="smallInput" placeholder="请输入手机号码" v-model="params.phone" />
        </div>
        <!-- <div class="acorss">
          <div class="myname">
            <div class="sub7">姓名</div>
            <input type="text" placeholder="请输入姓名" v-model="params.name" class="myinput" />
          </div>
        </div>
        <div class="acorss">
          <div class="myname">
            <div class="sub7">手机</div>
            <input type="text" placeholder="请输入手机号码" v-model="params.phone" class="myinput" />
          </div>
        </div>-->

        <div class="myname">
          <div class="sub7">出生年月</div>
          <div class="options date">
            <el-select placeholder="年" v-model="year" key="aaa">
              <el-option v-for="(item, index) in yearArr" :key="index" :value="item" :label="item"></el-option>
            </el-select>
            <el-select placeholder="月" v-model="month">
              <el-option v-for="(item, index) in 12" :key="index" :value="item" :label="item"></el-option>
            </el-select>
            <el-select placeholder="日" v-model="day">
              <el-option v-for="(item, index) in 31" :key="index" :value="item" :label="item"></el-option>
            </el-select>
          </div>
        </div>

        <div class="myname" style="margin-top:0.34rem">
          <div class="sub7">所在区域</div>
          <div class="options">
            <el-select placeholder="省" @change="changePrivence" v-model="params.province">
              <el-option
                v-for="(item, index) in area"
                :key="index"
                :value="index"
                :label="item.label"
              ></el-option>
            </el-select>
            <el-select placeholder="市" v-model="params.city">
              <el-option
                v-for="(item, index) in area[idx].children"
                :key="index"
                :value="index"
                :label="item.label"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div style="margin-top:0.34rem;">
          <div class="sub7">上传简历</div>
          <div class="sub8">
            <input type="text" disabled :value="fileName" placeholder="应聘简历WORD" class="myinput1" />
            <div class="sub9">
              <el-upload
                class="upload-demo"
                name="resume"
                :on-success="uploadsuccess"
                :show-file-list="false"
                :on-change="uploadChange"
                :action="baseURL+'/api/upload/upload_resume'"
              >
                <el-button size="small" type="text">上传简历文件</el-button>
              </el-upload>
            </div>
          </div>
        </div>
        <div style="margin-top:0.24rem;">
          <div class="sub7">验证码</div>
          <div class="sub8">
            <input type="text" v-model="params.code" placeholder="请输入右边验证码" class="myinput2" />
            <img @click="getCodeImg" :src="randomNum" alt class="mysub" />
          </div>
        </div>
        <!-- 提交信息 -->
        <div class="mybtnb xycenter" @click="applyPosition()">提交信息</div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/home";
import { Message } from "element-ui";
export default {
  data() {
    return {
      randomNum: "",
      show: false,
      detail: {},
      area: require("../../assets/recrement/area.json"),
      idx: 0,
      year: "",
      yearArr: [],
      day: "",
      month: "",
      fileName: "",
      params: {
        position_id: this.$route.params.id, //职位id
        name: "",
        phone: "",
        birthday: "", //生日，格式：2019-08-23
        resume_path: "", //简历路径，上传简历返回的file_path
        suffix: "", //文件后缀，上传简历返回的suffix
        province: "",
        city: "",
        code: ""
      }
    };
  },
  methods: {
    uploadChange(e) {
      this.fileName = e.name;
    },
    uploadsuccess(e) {
      if (e.code == 200) {
        this.params.resume_path = e.data.file_path;
        this.params.suffix = e.data.suffix;
      } else {
        this.fileName = "";
      }
    },
    changePrivence(e) {
      this.idx = e;
    },
    onHide() {
      this.show = false;
    },
    onShow() {
      this.getCodeImg();
      this.show = true;
    },
    getCodeImg() {
      this.$axios({
        method: "post",
        url: "/api/common/getVerifyCode",
        responseType: "blob"
      }).then(res => {
        this.randomNum = window.URL.createObjectURL(res.data);
        console.log(this.randomNum);
      });
    },
    getPositionDetail(id) {
      api.getPositionDetail(id).then(res => {
        this.detail = res.data;
      });
    },
    applyPosition() {
      if (this.params.name == "") {
        Message({
          message: "请输入姓名",
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.params.phone)) {
        Message({
          message: "请输入正确的电话号码",
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
      if (this.year == "" || this.month == "" || this.day == "") {
        Message({
          message: "请输入出生年月",
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
      if (this.params.province == "") {
        Message({
          message: "请输入所在区域",
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
      if (this.params.resume_path == "") {
        Message({
          message: "请上传简历",
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
      if (this.params.resume_path == "" || this.params.suffix == "") {
        Message({
          message: "请上传简历",
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
      if (this.params.code == "") {
        Message({
          message: "请输入验证码",
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
      this.params.birthday = this.year + "-" + this.month + "-" + this.day;

      let province = this.area[this.params.province].label;
      let city = this.area[this.params.province].children[this.params.city]
        .label;
      this.params.province = province;
      this.params.city = city;
      api.applyPosition(this.params).then(res => {
        console.log(res, "res");
        if (res.message == "申请成功") {
          this.show = false;
          this.$emit("myemit", "true");
          // Message(
          //   {
          //     message: "提交成功",
          //     type: "success",
          //     duration: 1 * 1000
          //   },
          //   800
          // );
          // setTimeout(() => {

          // }, 1500);
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
    let id = this.$route.params.id;
    this.getPositionDetail(id);
    let gone = new Date().getFullYear() - 99;
    for (let index = 1; index < 100; index++) {
      this.yearArr.push(gone + index);
    }
  }
};
</script>

<style lang="scss" scoped>
input::-webkit-input-placeholder {
  font-size: 0.28rem !important;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}
.overlay1 {
  width: 6.82rem;
  height: 12rem;
  background-color: white;
  padding: 0.34rem;
}
.mytop {
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sub5 {
  font-size: 0.32rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.5rem;
  color: rgba(4, 19, 26, 1);
  opacity: 1;
}
.sub6 {
  color: #959ea2;
  font-size: 25px;
}
.linear {
  margin: 0.34rem 0;
  width: 6.14rem;
  height: 0px;
  border: 1px solid rgba(212, 216, 217, 1);
}
.bigInput {
  width: 100%;
  height: 1.28rem;
  // background-color: pink;
}
.youname {
  font-size: 0.28rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  // line-height: 0.5rem;
  color: rgba(4, 19, 26, 1);
  opacity: 1;
}
.smallInput {
  box-sizing: border-box;
  width: 100%;
  height: 0.6rem;
  background-color: #f5f5f5;
  padding-left: 0.22rem;
  font-size: 0.28rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.5rem;
  color: rgba(4, 19, 26, 1);
  opacity: 1;
}

.myname {
  width: 100%;
  height: 1.05rem;
  // line-height: 1.05rem;
  //   background-color: pink;
  // margin-right: 40px;
  // font-size:
}
.acorss {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.24rem;
}
.myinput {
  box-sizing: border-box;
  background-color: rgba(245, 245, 245, 1);
  width: 6.14rem;
  height: 0.6rem;
  padding-left: 0.16rem;
  font-size: 0.28rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.5rem;
  color: rgba(4, 19, 26, 1);
  opacity: 1;
}
.sub7 {
  font-size: 0.28rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.5rem;
  color: rgba(4, 19, 26, 1);
  opacity: 1;
  margin-bottom: 0.16rem;
}
.sub8 {
  display: flex;
  align-items: center;
}
.sub9 {
  margin-left: 0.34rem;
  // width:200px;
  color: #1d97cf;
  font-size: 0.28rem;
}
.myinput1 {
  box-sizing: border-box;
  background-color: rgba(245, 245, 245, 1);
  width: 4.12rem;
  height: 0.6rem;
  padding-left: 0.16rem;
  font-size: 0.28rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.5rem;
  color: rgba(4, 19, 26, 1);
  opacity: 1;
}
.myinput2 {
  box-sizing: border-box;
  background-color: rgba(245, 245, 245, 1);
  width: 4.12rem;
  height: 0.6rem;
  padding-left: 0.16rem;
  font-size: 0.28rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0.5rem;
  color: rgba(4, 19, 26, 1);
  opacity: 1;
}
.mysub {
  width: 1.68rem;
  height: 0.6rem;
  // background-color: pink;
  margin-left: 40px;
  margin-right: 100px;
}
.mybtnb {
  margin-top: 0.34rem;
  width: 3.2rem;
  height: 0.8rem;
  background-color: #1d97cf;
  color: white;
  font-size: 0.28rem;
}
.options {
  width: 100%;
  display: flex;
  .el-select {
    margin-right: 10px;
    width: 260px;
  }
}
.date {
  > * {
    width: 30% !important;
  }
}
</style>