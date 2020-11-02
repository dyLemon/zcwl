// pages/fullinpatient/fullinpatient.js
const app = getApp();
import rpx2px from '../../utils/rpx2px.js'
var patientdata=new Object()
patientdata={
  patient_id: 0,
  name: '',
  // diagnosis: dos,
  //diagnosis:that.data.diagnose,
  diagnosis: '破去给哦热搜我和易敏儿哦哦，哦哦哦婆婆送你恶心咯阿松嗯热敏破瞎了眼婆婆我破下咯哦咯Rom是我咯后抹公婆哦破下咯破越来越咯后咯破咯咯哇热一下楼底下在咯破下咯给我咯咯我和同学热死我破下咯我咯咯婆婆需要我咯',
  sex: 0,
  age: 0,
  pain_area: '',
  pain_cycle: 0,
  token: ''
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['男', '女'], //下拉列表的数据
    index: 0, //选择的下拉列 表下标,
    showpd: false,
    painduration: [{
      id: 0,
      value: '三天'
    }, {
      id: 1,
      value: '一周'
    }, {
      id: 2,
      value: '两周'
    }, {
      id: 3,
      value: '一月'
    }],
    paindurationidx: 0,
    caseimg: "",
    inputing: 0, //0 无， 1姓名  2病历号 3手机号 4年龄 5身份证 6备注 7临床诊断 8病例名称
    idcard: '',
    name: '',
    phoneno: '',
    age: 0,
    painarea: '',
    remake: '',
    diagnose: '',
    can: false,
    qrcodeurl: '',
    showtips: true,
    showqr: false,
    contenth: 0,
    patientdata: {
        patient_id: 0,
        name: '',
        // diagnosis: dos,
        //diagnosis:that.data.diagnose,
        diagnosis: '',
        sex: 0,
        age: 0,
        pain_area: '',
        pain_cycle: 0,
        token: ''
    }
  },
  selectTap() {
    this.setData({
      show: !this.data.show,
    });
  },
  selectTappd() {
    this.setData({
      showpd: !this.data.showpd,
    });
  },
  // closetips() {
  //   this.setData({
  //     showtips: false,
  //   });
  // },
  onqrbtn() {
    this.setData({
      showqr: true,
    });
  },
  closeqr() {
    this.setData({
      showqr: false,
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
    patientdata.sex=Index
  },
  optionTappd(e) {
    console.log(e)
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      paindurationidx: Index,
      'patientdata.pain_cycle':this.data.painduration[Index].id,
      showpd: !this.data.showpd
    });
    patientdata.pain_cycle=this.data.painduration[Index].id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success(e) {
        console.log(e)
        that.setData({
          showtips: true,
          contenth: rpx2px(e.windowHeight * (750 / e.screenWidth) - 98 - 8) - 2,
          'patientdata.token':app.globalData.userData.token
        });
        patientdata.token=app.globalData.userData.token
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var qrurl = 'http://kangfu.zc5l.com/protocol_new.html?id=' +
      app.globalData.createpatientid + '&token=' + app.globalData.userData.token
    this.setData({
      qrcodeurl: qrurl,
      'patientdata.patient_id':app.globalData.createpatientid
    })
    patientdata.patient_id=app.globalData.createpatientid
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  canconfirm: function () {
    var can = true;
    if ('' == this.data.age || '' == this.data.name ||
      '' == this.data.painarea) {
      can = false
    }
    if ('' != this.data.diagnose && 5 > this.data.diagnose.length) {
      can = false
    }
    if ('' == this.data.age) {
      can = false
    }
    this.setData({
      can: can
    })
    console.log(this.data.can)
  },
  regInput(e) {
    var s = e.detail.value.slice(this.data.name.length);
    var regNum = new RegExp('[\u4e00-\u9fa5]', 'g');
    var rsNum = regNum.exec(s);

    if (!rsNum && 0 != s.length) {
      console.log('匹配失败')
      this.setData({
        name: this.data.name
        ,'patientdata.name':this.data.name
      })
      patientdata.name=this.data.name
      return
    }
    var s = e.detail.value
    if (e.detail.value.length > 5) {
      s = e.detail.value.slice(0, 5);
    }
    this.setData({
      name: s
      ,'patientdata.name':s
    })
    patientdata.name=s
    this.canconfirm();
  },
  // remakeInput(e) {
  //   var s = e.detail.value.slice(this.data.remake.length);
  //   var regNum = new RegExp('[\u4e00-\u9fa5]', 'g');
  //   var rsNum = regNum.exec(s);

  //   if (!rsNum && 0 != s.length) {
  //     console.log('匹配失败')
  //     this.setData({
  //       remake: this.data.remake
  //     })
  //     return
  //   }
  //   this.setData({
  //     remake: e.detail.value
  //   })
  // },
  diagnoseInput(e) {
    var s = e.detail.value.slice(this.data.diagnose.length);
    var regNum = new RegExp('[\u4e00-\u9fa5]|[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]', 'g');
    var rsNum = regNum.exec(s);

    if (!rsNum && 0 != s.length) {
      console.log('匹配失败')
      this.setData({
        diagnose: this.data.diagnose
        //,'patientdata.diagnosis': this.data.diagnose
      })
      patientdata.diagnosis=this.data.diagnose
      return
    }

    var s = e.detail.value
    if (e.detail.value.length > 100) {
      s = e.detail.value.slice(0, 100);
    }
    this.setData({
      diagnose: s
      //,'patientdata.diagnosis':s
    })
    patientdata.diagnosis=s
    this.canconfirm();
  },
  painareaInput(e) {
    var s = e.detail.value.slice(this.data.painarea.length);
    var regNum = new RegExp('[\u4e00-\u9fa5]', 'g');
    var rsNum = regNum.exec(s);

    if (!rsNum && 0 != s.length) {
      console.log('匹配失败')
      this.setData({
        painarea: this.data.painarea
        ,'patientdata.pain_area':this.data.painarea
      })
      patientdata.pain_area=this.data.painarea
      return
    }
    if (e.detail.value.length > 15) {
      s = e.detail.value.slice(0, 15);
    }
    this.setData({
      painarea:s
      ,'patientdata.pain_area':s
    })
    patientdata.pain_area=s
    this.canconfirm();
  },
  ageInput: function (e) {
    this.setData({
      age: e.detail.value
      ,'patientdata.age':e.detail.value
    })
    patientdata.age=e.detail.value
    this.canconfirm();
  },
  // inputidcard: function (e) {
  //   if (e.detail.value.length > 18) {
  //     var s = e.detail.value.slice(0, 18);
  //     this.setData({
  //       idcard: s
  //     })
  //   }
  // },
  // inputphoneno: function (e) {
  //   if (e.detail.value.length > 11) {
  //     var s = e.detail.value.slice(0, 11);
  //     this.setData({
  //       phoneno: s
  //     })
  //   }
  // },
  blur: function () {
    console.log('blur')
    this.setData({
      inputing: 0
    })
  },
  diagnoseblur: function () {
    console.log('diagnoseblur')
    if (7 == this.data.inputing) {
      this.setData({
        inputing: 0
      })
    }
  },
  namefocus: function () {
    this.setData({
      inputing: 1
    })
  },
  // caseidfocus: function () {
  //   this.setData({
  //     inputing: 2
  //   })
  // },
  // phonenofocus: function () {
  //   this.setData({
  //     inputing: 3
  //   })
  // },
  agefocus: function () {
    this.setData({
      inputing: 4
    })
  },
  // idcardfocus: function () {
  //   this.setData({
  //     inputing: 5
  //   })
  // },
  // remakefocus: function () {
  //   this.setData({
  //     inputing: 6
  //   })
  // },
  diagnosefocus: function () {
    this.setData({
      inputing: 7
    })
    console.log(this.data.inputing)
  },
  painareafocus: function () {
    this.setData({
      inputing: 8
    })
    console.log(this.data.inputing)
  },
  // selectimg: function (e) {
  //   var that = this
  //   wx.chooseImage({
  //     success(res) {
  //       that.setData({
  //         caseimg: res.tempFilePaths[0],
  //       })
  //     }
  //   })
  // },
  tt:function(){
    var that=this
    var dt = Date.now()
    console.log('开始调用')
    wx.request({
      url: app.globalData.url + app.api('modifypatient'),
      //data:that.data.patientdata,
      data: JSON.stringify(patientdata),
      //data: {
        // patient_id: app.globalData.createpatientid,
        // name: that.data.name,
        // // diagnosis: dos,
        // //diagnosis:that.data.diagnose,
        // diagnosis: '破去给哦热搜我和易敏儿哦哦，哦哦哦婆婆送你恶心咯阿松嗯热敏破瞎了眼婆婆我破下咯哦咯Rom是我咯后抹公婆哦破下咯破越来越咯后咯破咯咯哇热一下楼底下在咯破下咯给我咯咯我和同学热死我破下咯我咯咯婆婆需要我咯',
        // sex: that.data.index,
        // age: parseInt(that.data.age),
        // pain_area: that.data.painarea,
        // pain_cycle: that.data.painduration[that.data.paindurationidx].id,

        // patient_id: 34,
        // name: 'that.data.name',
        // // diagnosis: dos,
        // //diagnosis:that.data.diagnose,
        // diagnosis: '破去给哦热搜我和易敏儿哦哦，哦哦哦婆婆送你恶心咯阿松嗯热敏破瞎了眼婆婆我破下咯哦咯Rom是我咯后抹公婆哦破下咯破越来越咯后咯破咯咯哇热一下楼底下在咯破下咯给我咯咯我和同学热死我破下咯我咯咯婆婆需要我咯',
        // sex: 0,
        // age: 34,
        // pain_area: 'that.data.painarea',
        // pain_cycle: 4,
      //   token: app.globalData.userData.token
      // },
      method: "POST",
      header: {
        'content-type': 'application/application/json;charset=utf-8'
      },
      success: function (e) {
        console.log('延迟', Date.now() - dt)
      },
      fail(e) {}
    })
  },
  toserver:function(){
    console.log('调用')
    var that=this
    if ('' != that.data.diagnose && 5 > that.data.diagnose.length) {
      app.servercode('诊断至少输入5个字')
      return
    }
    if (200 < that.data.age) {
      app.servercode('请输入人类年龄')
      return
    }
    var that=this
    var dt = Date.now()
    console.log('toserver开始调用')
    app.webpost('modifypatient',  
    //patientdata,
    {patient_id: app.globalData.createpatientid,
      name: that.data.name,
      //diagnosis: dos,
      diagnosis:that.data.diagnose,
      //diagnosis: '破去给哦热搜我和易敏儿哦哦，哦哦哦婆婆送你恶心咯阿松嗯热敏破瞎了眼婆婆我破下咯哦咯Rom是我咯后抹公婆哦破下咯破越来越咯后咯破咯咯哇热一下楼底下在咯破下咯给我咯咯我和同学热死我破下咯我咯咯婆婆需要我咯',
      sex: that.data.index,
      age: parseInt(that.data.age),
      pain_area: that.data.painarea,
      pain_cycle: that.data.painduration[that.data.paindurationidx].id,
      token: app.globalData.userData.token},
    // {patient_id: 34,
    //     name: 'that.data.name',
    //     // diagnosis: dos,
    //     //diagnosis:that.data.diagnose,
    //     diagnosis: '破去给哦热搜我和易敏儿哦哦，哦哦哦婆婆送你恶心咯阿松嗯热敏破瞎了眼婆婆我破下咯哦咯Rom是我咯后抹公婆哦破下咯破越来越咯后咯破咯咯哇热一下楼底下在咯破下咯给我咯咯我和同学热死我破下咯我咯咯婆婆需要我咯',
    //     sex: 0,
    //     age: 34,
    //     pain_area: 'that.data.painarea',
    //     pain_cycle: 4,
    //     token: app.globalData.userData.token},
    //that.data.patientdata,
      function (res) {
        console.log(res)
        console.log(Date.now()-dt)
        if (0 == res.data.code) {
          app.globalData.patient.name=that.data.name
          app.globalData.patient.sex=that.data.index
          app.globalData.patient.age=parseInt(that.data.age)
          app.globalData.patient.diagnosis=that.data.diagnose
          app.globalData.patient.id=app.globalData.createpatientid
          app.globalData.patient.doctor_id=app.globalData.userData.userid
          app.globalData.patient.doctor_name=app.globalData.userData.doc_name
          wx.redirectTo({
            url: "../../pages/patientplan/patientplan"
          })
        } else {
          app.servercode(res.data.code)
        }
      }
    )
  },
  confirm: function (e) {
    
    //console.log(e.detail.value)
    var dt = Date.now()
    var that = this
    if ('' == e.detail.value.age || '' == e.detail.value.name ||
      '' == e.detail.value.painarea) {
      app.servercode('请输入必填项')
      return
    }
    if ('' != e.detail.value.diagnose && 5 > e.detail.value.diagnose.length) {
      app.servercode('诊断至少输入5个字')
      return
    }
    if (200 < e.detail.value.age) {
      app.servercode('请输入人类年龄')
      return
    }
      if ('' == that.data.age || '' == that.data.name ||
      '' == that.data.painarea) {
      app.servercode('请输入必填项')
      return
    }
    if ('' != that.data.diagnose && 5 > that.data.diagnose.length) {
      app.servercode('诊断至少输入5个字')
      return
    }
    if (200 < that.data.age) {
      app.servercode('请输入人类年龄')
      return
    }
    console.log(that.data.patientdata)
    console.log(app.globalData.userData.token)
    //var age=parseInt(that.data.age)
    // var name=e.detail.value.name
    // var dos=e.detail.value.diagnose
    // var sex=that.data.index
    // var pa=e.detail.value.painarea
    // var pc=that.data.painduration[that.data.paindurationidx].id
    //var name=that.data.name
    //var dos=that.data.diagnose
    //var dos='破去给哦热搜我和易敏儿哦哦，哦哦哦婆婆送你恶心咯阿松嗯热敏破瞎了眼婆婆我破下咯哦咯Rom是我咯后抹公婆哦破下咯破越来越咯后咯破咯咯哇热一下楼底下在咯破下咯给我咯咯我和同学热死我破下咯我咯咯婆婆需要我咯'
    // console.log(that.data.diagnose)
    // var sex=that.data.index
    // var pa=that.data.painarea
    // var pc=that.data.painduration[that.data.paindurationidx].id
    wx.request({
      url: app.globalData.url +app.api('modifypatient'),
      // data: {
      //   patient_id: app.globalData.createpatientid,
      //   name: that.data.name,
      //   // diagnosis: dos,
      //   //diagnosis:that.data.diagnose,
      //   diagnosis: '破去给哦热搜我和易敏儿哦哦，哦哦哦婆婆送你恶心咯阿松嗯热敏破瞎了眼婆婆我破下咯哦咯Rom是我咯后抹公婆哦破下咯破越来越咯后咯破咯咯哇热一下楼底下在咯破下咯给我咯咯我和同学热死我破下咯我咯咯婆婆需要我咯',
      //   sex: that.data.index,
      //   age: parseInt(that.data.age),
      //   pain_area: that.data.painarea,
      //   pain_cycle: that.data.painduration[that.data.paindurationidx].id,
      //   token: app.globalData.userData.token
      // },
      data: {
        patient_id: 34,
        name: 'that.data.name',
        // diagnosis: dos,
        //diagnosis:that.data.diagnose,
        diagnosis: '破去给哦热搜我和易敏儿哦哦，哦哦哦婆婆送你恶心咯阿松嗯热敏破瞎了眼婆婆我破下咯哦咯Rom是我咯后抹公婆哦破下咯破越来越咯后咯破咯咯哇热一下楼底下在咯破下咯给我咯咯我和同学热死我破下咯我咯咯婆婆需要我咯',
        sex: 0,
        age: 34,
        pain_area: 'that.data.painarea',
        pain_cycle: 4,
        token: app.globalData.userData.token
      },
      //data:that.data.patientdata,
      method: "POST",
      header: {
        'content-type': 'application/application/json;charset=utf-8'
      },
      success: function (e) {
        console.log('延迟', Date.now() - dt)
      },
      fail(e) {}
    })
    // var data={
    //   //   patient_id: app.globalData.createpatientid,
    //   //   name: name,
    //   //   diagnosis: dos,
    //   //  //diagnosis:'破去给哦热搜我和易敏儿哦哦，哦哦哦婆婆送你恶心咯阿松嗯热敏破瞎了眼婆婆我破下咯哦咯Rom是我咯后抹公婆哦破下咯破越来越咯后咯破咯咯哇热一下楼底下在咯破下咯给我咯咯我和同学热死我破下咯我咯咯婆婆需要我咯',
    //   //   sex: sex,
    //   //   age: age,
    //   //   pain_area: pa,
    //   //   pain_cycle: pc,
    //   patient_id: app.globalData.createpatientid,
    //   name:that.data.name,
    //   diagnosis:that.data.diagnose,
    //   sex:that.data.index,
    //   age:parseInt(that.data.age),
    //   pain_area:that.data.painarea,
    //   pain_cycle:that.data.painduration[that.data.paindurationidx].id,
    //   token: app.globalData.userData.token
    //   }
    // app.webpost('modifypatient', data,
    //   function (res) {
    //     console.log(res)
    //     console.log(Date.now()-dt)
    //     if (0 == res.data.code) {
    //       app.globalData.patient.name=name
    //       app.globalData.patient.sex=sex
    //       app.globalData.patient.age=age
    //       app.globalData.patient.diagnosis=dos
    //       app.globalData.patient.id=app.globalData.createpatientid
    //       app.globalData.patient.doctor_id=app.globalData.userData.userid
    //       app.globalData.patient.doctor_name=app.globalData.userData.doc_name
    //       wx.redirectTo({
    //         url: "../../pages/patientplan/patientplan"
    //       })
    //     } else {
    //       app.servercode(res.data.code)
    //     }
    //   }
    // )
    // if (''==this.data.caseimg) {
    //   wx.request({
    //     //url: 'http://192.168.0.47:808'+'/api/wxmodifypatient', 
    //     url: app.globalData.url + '/api/wxmodifypatient',
    //     header:{'content-type': 'application/x-www-form-urlencoded'},
    //     data:{
    //      // imgupload:0,
    //       age:e.detail.value.age,
    //       phone:e.detail.value.phoneno,
    //       username: e.detail.value.name,
    //       idcode: e.detail.value.idcard,
    //       sex:that.data.index,
    //       study_id: e.detail.value.caseid,
    //       patientid:app.globalData.wxuser.userid,
    //       //patientid:212,
    //       diagnosis: e.detail.value.diagnose,
    //       remarks:e.detail.value.remake,
    //       reportname:e.detail.value.casename,
    //       file:'',
    //       token: app.globalData.wxuser.token
    //     },
    //     method: 'post',
    //     success(res){
    //       console.log(res.data)

    //       if (0 == res.data.code) {
    //         wx.switchTab({
    //           url: "../../pages/sport/sport"
    //       })
    //       } else {
    //         app.servercode(res.data.code)
    //       }
    //     },
    //     fail(res){
    //       app.servercode('服务器连接失败')
    //     }
    //   })
    // } else {
    //   console.log('上传图片')
    //   wx.uploadFile({
    //     filePath: that.data.caseimg,
    //     name: 'file',
    //     //url: 'http://192.168.0.47:808'+'/api/wxmodifypatient', 
    //     url: app.globalData.url + '/api/wxmodifypatient',
    //     formData:{
    //       //imgupload:1,
    //       age:e.detail.value.age,
    //       phone:e.detail.value.phoneno,
    //       username: e.detail.value.name,
    //       idcode: e.detail.value.idcard,
    //       sex:that.data.index,
    //       study_id: e.detail.value.caseid,
    //       patientid:app.globalData.wxuser.userid,
    //       //patientid:212,
    //       diagnosis: e.detail.value.diagnose,
    //       remarks:e.detail.value.remake,
    //       reportname:e.detail.value.casename,
    //       token: app.globalData.wxuser.token
    //     },success(res){
    //       console.log(res)
    //       var js=JSON.parse(res.data)
    //       if (0 ==js.code) {
    //         wx.switchTab({
    //           url: "../../pages/sport/sport"
    //       })
    //       } else {
    //         app.servercode(js.code)
    //       }
    //     },fail(res){
    //       app.servercode('网络错误')
    //     }
    //   })
    // }
  }
})