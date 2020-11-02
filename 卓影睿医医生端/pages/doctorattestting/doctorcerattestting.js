const app = getApp()
const K = 1024;
const M = 1024 * K;
var upindex = -1; //上传图片下标
function myStringtoHex(str) {
  str = str.toLowerCase();
  let newBuffer = new ArrayBuffer(str.length / 2);
  let hexBuffer = new Uint8Array(newBuffer, 0);
  let h = 0,
    l = 0;
  for (let i = 0; i < str.length / 2; i++) {
    h = str.charCodeAt(2 * i);

    l = str.charCodeAt(2 * i + 1);
    if (48 <= h && h <= 57) {
      h = h - 48;
    } else {
      h = h - 97 + 10;
    }
    if (48 <= l && l <= 57) {
      l = l - 48;
    } else {
      l = l - 97 + 10;
    }
    hexBuffer[i] = h * 16 + l;
  }
  return hexBuffer;
}

function cellphone(tel) {
  var strTemp = /^0?1[3|4|5|8][0-9]\d{8}$/;

  if (strTemp.test(tel)) {

    return true;

  }

  return false;
}

function landline(tel) {
  var strTemp =/^0[0-9]{2,3}-?[0-9]{8}$/;

  if (strTemp.test(tel)) {

    return true;

  }

  return false;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resource: '',
    token: '',
    failtip:'',
    failshow:false,   //失败提示显示
    auditfailercause: '', //审核失败原因
    pagestate: 0, //页面状态0为上传页面，1为修改页面
    hospitalboxshow: false,
    jobtitleboxshow: false,
    imgshow: false,
    imglist: [],
    hospitalselectidx: 0,
    jobtitleselectidx: 0,
    phone: '',
    hospitallist: [{
      name: "系统方案",
      value: 0
    }, {
      name: "医院方案",
      value: 1
    }, {
      name: "我的方案",
      value: 2
    }],
    jobtitlelist: [{
      name: "康复治疗士",
      value: 0
    }, {
      name: "初级康复治疗师",
      value: 1
    }, {
      name: "中级治疗师",
      value: 2
    }, {
      name: "高级治疗师",
      value: 3
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    this.setData({
      resource: app.globalData.websurl,
      token: '&token=' + app.globalData.stoken
    })
    var that = this
    app.webpost('gethospitallist', {
        token: app.globalData.userData.token
      },
      function (e) {
        console.log(e)
        if (0 == e.data.code) {
          that.setData({
            hospitallist: e.data.hospitaldata,
            hospitalselectidx: 0,
            jobtitleselectidx: 0,
          })
          that.getcertificationinformation();
          //that.getauditfailercause();
        } else {
          app.servercode(e.data.code)
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  getauditfailercause() {
    var that = this
    app.webpost('certificationstate', {
      user_id: app.globalData.userData.userid,
      token: app.globalData.userData.token
    }, function (e) {
      console.log('认证查询', e)
      if (0 == e.data.code||2==e.data.code) {
        if (2 == e.data.state) {
          that.setData({
            failshow:true,
            //failtip:'审核失败，请重新上传',
            pagestate: 1,
            failtip: e.data.description
          })
        } else if(3==e.data.state){
          that.setData({
            failshow:true,
            pagestate: 0,
            failtip:'正在审核中，需要更改数据？'
          })
        }else {
          that.setData({
            pagestate: 0
          })
          
        }
      } else {
        app.servercode(e.data.code)
      }
    })
  },
  getcertificationinformation() {
    var that = this
    app.webpost('certificationinfo', {
      user_id: app.globalData.userData.userid,
      token: app.globalData.userData.token
    }, function (e) {
      console.log('认证信息', e)
      if (0 == e.data.code||2==e.data.code) {
        var l = []
        if (0 != e.data.work_img_path1.length) l.push({
          url: that.data.resource + e.data.work_img_path1 + that.data.token,
          change: false
        })
        if (0 != e.data.work_img_path2.length) l.push({
          url: that.data.resource + e.data.work_img_path2 + that.data.token,
          change: false
        })
        if (0 != e.data.work_img_path3.length) l.push({
          url: that.data.resource + e.data.work_img_path3 + that.data.token,
          change: false
        })
        if (0 != e.data.work_img_path4.length) l.push({
          url: that.data.resource + e.data.work_img_path4 + that.data.token,
          change: false
        })
        if (0 != e.data.work_img_path5.length) l.push({
          url: that.data.resource + e.data.work_img_path5 + that.data.token,
          change: false
        })
        if (0 != e.data.work_img_path6.length) l.push({
          url: that.data.resource + e.data.work_img_path6 + that.data.token,
          change: false
        })
        console.log('图片', l)
        var hidx = 0;
        for (var i = 0; i < that.data.hospitallist.length; i++) {
          if (e.data.hospital_id == that.data.hospitallist[i].id) {
            hidx = i
            break
          }
        }
        var jtidx = 0;
        for (var i = 0; i < that.data.jobtitlelist.length; i++) {
          if (e.data.job_title == that.data.jobtitlelist[i].name) {
            jtidx = i
            break
          }
        }
        that.setData({
          imglist: l,
          jobtitleselectidx: jtidx,
          hospitalselectidx: hidx,
          phone: e.data.phone_number
        })
        that.getauditfailercause();
      } else {
        app.servercode(e.data.code)
      }
    })
  },
  onShow: function () {

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
  inputphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    console.log('d', this.data.phone)
  },
  hospitalselect: function (e) {
    this.setData({
      hospitalselectidx: e.detail
    })
  },
  hospitalboxshow: function (e) {
    var v = this.data.jobtitleboxshow
    if (!e.detail) {
      v = false
    }
    this.setData({
      hospitalboxshow: !e.detail,
      jobtitleboxshow: v
    })
  },
  jobtitleselect: function (e) {
    this.setData({
      jobtitleselectidx: e.detail
    })
  },
  jobtitleboxshow: function (e) {
    var v = this.data.hospitalboxshow
    if (!e.detail) {
      v = false
    }
    this.setData({
      jobtitleboxshow: !e.detail,
      hospitalboxshow: v
    })
  },
  changeimg: function (e) {
    var that = this
    console.log(e)
    wx.chooseImage({
      success(res) {
        if (60 * M < res.tempFiles[0].size) {
          app.servercode('图片超过60M')
          return
        }
        var il = that.data.imglist
        var d={}
        d.url = res.tempFilePaths[0]
        d.change = true
        il[e.currentTarget.id]=d
        that.setData({
          imglist: il
        })
        console.log('选后',that.data)
      }
    })
  },
  addimg: function () {
    var that = this
    wx.chooseImage({
      success(res) {
        if (60 * M < res.tempFiles[0].size) {
          app.servercode('图片超过60M')
          return
        }
        let timg=res.tempFilePaths[0]
        let ft=timg.substring(timg.lastIndexOf('.')+1)
        console.log('格式',ft)
        if('jpg'!=ft&&'png'!=ft&&'jpeg'!=ft){
          wx.showModal({
            title:'格式错误',
            content:'合法格式为（jpg,png,jpeg）',
            showCancel:false
          })
          return
        }
        var il = that.data.imglist
        il.push({url:res.tempFilePaths[0],change:true})
        that.setData({
          imglist: il
        })
      }
    })
  },

  upimg: function () {
    var that = this
    if (0 > upindex || upindex > that.data.imglist.length - 1) {
      app.loding(false)
      if (upindex == that.data.imglist.length) {
        // wx.redirectTo({
        //   url: '../personalsettings/personalsettings',
        // })
        that.submitinfo();
      }
      return
    }
    console.log('上传数据', that.data)
    if (that.data.imglist[upindex].change) {
      wx.uploadFile({
        filePath: that.data.imglist[upindex].url,
        name: 'file',
        url: app.globalData.url + app.api('uploadimg'),
        //url:  'http://192.168.0.33:1081/api/userverification',
        //url:  app.globalData.url + '/api/modifyuserverification',
        formData: {
          token: app.globalData.userData.token,
          userid: app.globalData.userData.userid,
          index: upindex
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res);
          var rd = JSON.parse(res.data)
          // console.log(res.data.replace(/↵/g,"\n"))
          //console.log('16进制buffer',myStringtoHex(res.data))
          if (0 == rd.code) {
            upindex++
            that.upimg()
          } else {
            app.servercode(rd.code)
          }
        },
        fail(res) {
          console.log('失败原因', res)
          app.servercode('上传图片失败')
        }
      })
    }else{
      upindex++
      that.upimg()
    }
  },
  confirm: function () {
    var that = this
    if (!cellphone(this.data.phone) && !landline(this.data.phone)) {
      app.servercode('请输入正确的电话号码')
      return
    }
    if (0 == that.data.imglist.length) {
      app.servercode('请选择资格证图片')
      return
    }
    app.loding(true)
   console.log('用户id',app.globalData.userData.userid)
    upindex = 0
    that.upimg()
    // app.webpost('doctorcertification', {
    //   hospital_id: that.data.hospitallist[that.data.hospitalselectidx].id,
    //   job_title: that.data.jobtitlelist[that.data.jobtitleselectidx].name,
    //   phone_no: that.data.phone,
    //   token: app.globalData.userData.token,
    //   userid: app.globalData.userData.userid,
    // }, function (e) {
    //   console.log(e)
    //   if (0 == e.data.code) {
    //     upindex = 0
    //     that.upimg()
    //   } else {
    //     app.servercode(e.data.code)
    //   }
    // })
  },
  submitinfo:function(){
    var that=this
    console.log('提交数据',that.data.hospitallist[that.data.hospitalselectidx].id,
    that.data.jobtitlelist[that.data.jobtitleselectidx].name,that.data.phone,app.globalData.userData.userid)
    app.webpost('doctorcertification', {
      hospital_id: that.data.hospitallist[that.data.hospitalselectidx].id,
      job_title: that.data.jobtitlelist[that.data.jobtitleselectidx].name,
      phone_no: that.data.phone,
      token: app.globalData.userData.token,
      user_id: app.globalData.userData.userid,
    }, function (e) {
      console.log(e)
      if (0 == e.data.code) {
        wx.navigateBack({
          delta: 0,
        })
      } else {
        app.servercode(e.data.code)
      }
    })
  },
  closefail:function(){
    this.setData({failshow:false})
  }
})