// pages/entryinformation/entryinformation.js
const app = getApp();
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
    caseimg:"",
    inputing:0, //0 无， 1姓名  2病历号 3手机号 4年龄 5身份证 6备注 7临床诊断 8病例名称
    idcard:'',
    name:'',
    phoneno:'',
    age:'',
    painarea: '',
    remake: '',
    diagnose: '',
    can: false,
    contenth: 0,
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
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  optionTappd(e) {
    console.log(e)
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      paindurationidx: Index,
      showpd: !this.data.showpd
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (t) {
        that.setData({
          contenth: t.windowHeight * (750 / t.screenWidth) - 114,
        });
      }
    });
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
    this.setData({
      name:app.globalData.patientinfo.patient_name,
      index:app.globalData.patientinfo.patient_sex,
      age:app.globalData.patientinfo.patient_age,
      painarea:app.globalData.patientinfo.pain_area,
      paindurationidx:app.globalData.patientinfo.pain_cycle,
      diagnose:app.globalData.patientinfo.diagnosis,
      paindurationidx:0,
      index:0
    })
    this.canconfirm()
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
    // if ('' != this.data.diagnose && 5 > this.data.diagnose.length) {
    //   can = false
    // }
    if ('' == this.data.age) {
      can = false
    }
    this.setData({
      can: can
    })
    console.log(this.data.can)
  },
  regInput(e) {
    var that=this
    var s=''
    if ('string'==typeof(this.data.name) ){
      s= e.detail.value.slice(that.data.name.length);
    }
    var regNum = new RegExp('[\u4e00-\u9fa5]', 'g');
    var rsNum = regNum.exec(s);

    if (!rsNum && 0 != s.length) {
      console.log('匹配失败')
      this.setData({
        name: this.data.name
      })
      return
    }
    var s = e.detail.value
    if (e.detail.value.length > 5) {
      s = e.detail.value.slice(0, 5);
    }
    this.setData({
      name: s
    })
    this.canconfirm();
  },
  remakeInput(e) {
    var s = e.detail.value.slice(this.data.remake.length);
    var regNum = new RegExp('[\u4e00-\u9fa5]', 'g');
    var rsNum = regNum.exec(s);

    if (!rsNum && 0 != s.length) {
      console.log('匹配失败')
      this.setData({
        remake: this.data.remake
      })
      return
    }
    this.setData({
      remake: e.detail.value
    })
  },
  diagnoseInput(e) {
    var s=''
    if('string'==typeof(this.data.diagnose)){
      screen= e.detail.value.slice(this.data.diagnose.length);
    }
    var regNum = new RegExp('[\u4e00-\u9fa5]|[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]', 'g');
    var rsNum = regNum.exec(s);

    if (!rsNum && 0 != s.length) {
      console.log('匹配失败')
      this.setData({
        diagnose: this.data.diagnose
      })
      return
    }

    var s = e.detail.value
    if (e.detail.value.length > 100) {
      s = e.detail.value.slice(0, 100);
    }
    this.setData({
      diagnose: s
    })
    this.canconfirm();
  },
  painareaInput(e) {
    console.log('data',this.data)
    var s=''
    if('string'==typeof(this.data.painarea)){
      s= e.detail.value.slice(this.data.painarea.length);
    }
    var regNum = new RegExp('[\u4e00-\u9fa5]', 'g');
    var rsNum = regNum.exec(s);

    if (!rsNum && 0 != s.length) {
      console.log('匹配失败')
      this.setData({
        painarea: this.data.painarea
      })
      return
    }
    this.setData({
      painarea: e.detail.value
    })
    this.canconfirm();
  },
  ageInput: function (e) {
    this.setData({
      age: e.detail.value
    })
    this.canconfirm();
  },
  inputidcard: function (e) {
    if (e.detail.value.length > 18) {
      var s = e.detail.value.slice(0, 18);
      this.setData({
        idcard: s
      })
    }
  },
  inputphoneno: function (e) {
    if (e.detail.value.length > 11) {
      var s = e.detail.value.slice(0, 11);
      this.setData({
        phoneno: s
      })
    }
  },
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
  caseidfocus: function () {
    this.setData({
      inputing: 2
    })
  },
  phonenofocus: function () {
    this.setData({
      inputing: 3
    })
  },
  agefocus: function () {
    this.setData({
      inputing: 4
    })
  },
  idcardfocus: function () {
    this.setData({
      inputing: 5
    })
  },
  remakefocus: function () {
    this.setData({
      inputing: 6
    })
  },
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
  selectimg: function (e) {
    var that = this
    wx.chooseImage({
      success(res) {
        that.setData({
          caseimg: res.tempFilePaths[0],
        })
      }
    })
  },
  confirm: function (e) {
    console.log(e.detail.value)
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
    console.log(app.globalData.wxuser.token)
    console.log(that.data)
    app.webpost('modifypatient', {
        patient_id: app.globalData.wxuser.userid,
        name: e.detail.value.name,
        diagnosis: e.detail.value.diagnose,
        sex: that.data.index,
        age: parseInt(e.detail.value.age),
        pain_area: e.detail.value.painarea,
        pain_cycle: that.data.painduration[that.data.paindurationidx].id,
        token: app.globalData.wxuser.token
      },
      function (res) {
        console.log(res)
        if (0 == res.data.code) {
          wx.navigateBack({
          })
        } else {
          app.servercode(res.data.code)
        }
      }
    )
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
  },
  cancel:function(){
    wx.navigateBack({
    })
  }
})