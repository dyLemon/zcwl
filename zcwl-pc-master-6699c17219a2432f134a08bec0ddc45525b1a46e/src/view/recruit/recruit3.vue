<template>
  <div class="container1">
    <div class="position clearfix">
      <div class="myitem">
        <div class="position1">
          <div class="sub1">岗位名称</div>
          <div class="sub2">{{detail.position_name}}</div>
        </div>
        <div class="linear1"></div>
        <div class="position1">
          <div class="sub1">所属机构</div>
          <div class="sub2">{{detail.orgin}}</div>
        </div>
        <div class="linear1"></div>
        <div class="position1">
          <div class="sub1">学历要求</div>
          <div class="sub2">{{detail.education}}</div>
        </div>
        <div class="linear1"></div>
        <div class="position1">
          <div class="sub1">工作地点</div>
          <div class="sub2">{{detail.job_addr}}</div>
        </div>
        <div class="linear1"></div>
        <div class="position1">
          <div class="sub1">薪资</div>
          <div class="sub2">{{detail.salary}}</div>
        </div>
      </div>
      <div class="linear8"></div>
      <div class="sub3">【岗位职责】</div>
      <div class="sub4" v-html="detail.post_responsibility"></div>
      <div class="sub3">【任职资格】</div>
      <div class="sub4" v-html="detail.competence_post"></div>
      <div class="apply" @click="onShow">申请岗位</div>
    </div>
    <div class="overlay" v-if="show">
      <div class="overlay1">
        <div class="mytop">
          <div class="sub5">填写信息</div>
          <div class="sub6" @click="onHide">×</div>
        </div>
        <div class="linear"></div>
        <!-- 1111111111111 -->
        <div class="acorss">
          <div class="myname">
            <div class="sub7">姓名</div>
            <input type="text" placeholder="请输入姓名" v-model="params.name" class="myinput" />
          </div>
          <div class="myname">
            <div class="sub7">手机</div>
            <input type="text" placeholder="请输入手机号码" v-model="params.phone" class="myinput" />
          </div>
        </div>
        <div class="myname">
          <div class="sub7">出生年月</div>
          <!-- <input type="text" value="123123" class="myinput" /> -->
          <div class="options date">
            <el-select placeholder="年" v-model="year">
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
        <div class="myname" style="margin-top:40px">
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
        <div style="margin-top:40px;">
          <div class="sub7">上传简历</div>
          <div class="sub8">
            <input type="text" disabled :value="fileName"  
            placeholder="应聘简历WORD"
            class="myinput1" />
            <div class="sub9">
              <el-upload
                class="upload-demo"
                name="resume"
                :on-success="uploadsuccess"
                :show-file-list="false"
                :on-change="uploadChange"
                accept=".doc, .docx"
                :action="baseURL+'/api/upload/upload_resume'"
              >
                <el-button size="small" type="text">上传简历文件</el-button>
              </el-upload>
            </div>
          </div>
        </div>
        <div style="margin-top:40px">
          <div class="sub7">验证码</div>
          <div class="sub8">
            <input type="text" v-model="params.code" 
            placeholder="请输入右边验证码"
            class="myinput2" />
            <img @click="getCodeImg" :src="randomNum" alt class="mysub" />
            <div class="mybtnb xycenter" @click="applyPosition()">提交信息</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 遮罩 -->
  <!-- </div> -->
</template>
<script>
import api from "@/api/home";
import {Message} from 'element-ui'
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
          message: '请输入姓名',
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.params.phone)) {
        Message({
          message: '请输入正确的电话号码',
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
      if(this.year==''||this.month==''||this.day==''){
         Message({
          message: '请输入出生年月',
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
      if (this.params.province == "") {
        Message({
          message: '请输入所在区域',
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
       if (this.params.resume_path == "") {
        Message({
          message: '请上传简历',
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
       if (this.params.resume_path == ""||this.params.suffix=='') {
        Message({
          message: '请上传简历',
          type: "error",
          duration: 2 * 1000
        });
        return false;
      }
      if(this.params.code == ""){
          Message({
          message: '请输入验证码',
          type: "error",
          duration: 2 * 1000
        });
        return false;

      }
      this.params.birthday = this.year + "-" + this.month + "-" + this.day;
      console.log(this.params);
      api.applyPosition(this.params).then(res => {
        console.log(res, "res");
        if(res.message=='申请成功'){
           Message({
          message: '提交成功',
          type: "success",
          duration: 1 * 1000
        });
        
        this.show=false

        }else{
            Message({
          message:res.message,
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
.container1 {
  width: 1200px;
  margin: 0 auto;
}

.position {
  width: 1200px;
  //   height: 234px;
  //   background-color: pink;
  margin-top: 143px;
}
.myitem {
  display: flex;
  align-items: center;
  padding-left: 50px;

  //   margin-bottom: 40px;
}
.position1 {
  display: flex;
  flex-direction: column;
}
.linear1 {
  width: 0px;
  height: 20px;
  border: 1px solid rgba(212, 216, 217, 1);
  opacity: 1;
  margin: 0 76px;
}
.sub1 {
  margin-bottom: 8px;
  font-size: 14px;
  color: rgba(149, 158, 162, 1);
}
.sub2 {
  font-size: 22px;
  font-weight: 500;
}
.linear8 {
  box-sizing: border-box;
  margin: 40px 0;
  width: 1200px;
  height: 0px;
  border: 1px solid rgba(212, 216, 217, 1);
  opacity: 1;
}
.sub3 {
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 18px;
}
.sub4 {
  margin-bottom: 54px;
  font-size: 14px;
}
.apply {
  width: 160px;
  height: 40px;
  background: rgba(29, 151, 207, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 131px;
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
  width: 640px;
  height: 690px;
  background-color: white;
  padding: 40px;
}
.mytop {
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sub5 {
  font-size: 22px;
  font-weight: 800;
}
.sub6 {
  color: #959ea2;
  font-size: 25px;
}
.linear {
  margin: 40px 0;
  width: 560px;
  height: 0px;
  border: 1px solid rgba(212, 216, 217, 1);
}
.myname {
  width: 100%;
  //   height: 232px;
  //   background-color: pink;
  margin-right: 40px;
}
.acorss {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}
.myinput {
  box-sizing: border-box;
  background-color: rgba(245, 245, 245, 1);
  width: 260px;
  height: 40px;
  padding-left: 10px;
}
.sub7 {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}
.sub8 {
  display: flex;
  align-items: center;
}
.sub9 {
  margin-left: 38px;
  // width:200px;
  color: #1d97cf;
  font-size: 14px;
}
.myinput1 {
  box-sizing: border-box;
  background-color: rgba(245, 245, 245, 1);
  width: 400px;
  height: 40px;
  padding-left: 10px;
}
.myinput2 {
  box-sizing: border-box;
  background-color: rgba(245, 245, 245, 1);
  width: 160px;
  height: 40px;
  padding-left: 10px;
}
.mysub {
  width: 100px;
  height: 40px;
  background-color: pink;
  margin-left: 40px;
  margin-right: 100px;
}
.mybtnb {
  width: 160px;
  height: 40px;
  background-color: #1d97cf;
  color: white;
  font-size: 14px;
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