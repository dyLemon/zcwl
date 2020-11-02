// const { getavatar } = require("../../utils/api")

// pages/selectpatient/selectpatient.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    age: 0,
    painfularea: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this
    app.webpost('querypatientdetail', {
      patient_id: app.globalData.wxuser.userid,
      token: app.globalData.wxuser.token
    }, function (e) {
      if (0 == e.data.code) {
        console.log('患者详情', e.data)
        if (null != e.data.patient_name && '' != e.data.patient_name) {
          app.globalData.patientinfo = e.data
          that.setData({
            name: app.globalData.patientinfo.patient_name,
            age: app.globalData.patientinfo.patient_age,
            painfularea: app.globalData.patientinfo.pain_area
          })
        } else {
          app.globalData.patientinfo = {}
        }
      } else {
        app.servercode(e.data.code)
      }
    })
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
  change: function () {
    wx.navigateTo({
      url: '../entryinformation/entryinformation',
    })
  },
  getauthority() {
    var that = this
    wx.getSetting({
      withSubscriptions: true,
      success(e) {
        console.log('获取成功', e)
        if (e.authSetting["scope.userInfo"]) {
          console.log('允许信息')
          that.uploadavatar()
        }
      },
      fail(e) {
        console.log('获取失败', e)
        app.servercode('请开启获取基本信息')
        wx.openSetting({
          withSubscriptions: true,
          success(res) {
            if (e.authSetting["scope.userInfo"]) {
              that.confirm()
            }
          },
          fail(res) {}
        })
      }
    })
  },


  uploadavatar() {
    var that = this
    console.log('上传')
    wx.getUserInfo({
      success(res) {
        console.log(res)
        wx.downloadFile({
          url: res.userInfo.avatarUrl,
          success(e) {
            console.log(e)
            wx.uploadFile({
              filePath: e.tempFilePath,
              name: 'file',
              url: app.globalData.url + app.api('upavatar'),
              formData: {
                token: app.globalData.wxuser.token,
                id: app.globalData.wxuser.userid
              },
              success(e) {
                console.log(e)
                var je = JSON.parse(e.data)
                console.log('je', je)
                if (0 != je.code) {
                  app.servercode(je.code)
                } else {
                  that.seedoctor();
                }
              }
            })
          }
        })
      },
      fail(e) {
        app.servercode('请允许获取基本信息用于聊天显示')
      }
    })
  },
  seedoctor() {
    app.webpost('seeadoctor', {
      user_id: app.globalData.selectdoctor.doctorid,
      patient_id: app.globalData.wxuser.userid,
      see_doctor: app.globalData.selectdoctor.selecttype, //就诊方式  0线上  1当面
      token: app.globalData.wxuser.token
    }, function (e) {
      console.log(e)
      if (0 == e.data.code) {
        app.globalData.selectdoctor.selecttype = 0
        wx.redirectTo({
          url: '../talk/talk',
        })
      } else {
        app.servercode(e.data.code)
      }
    })
  },
  confirm: function () {
    if ('' == this.data.name) {
      app.servercode('请创建患者')
      return
    }

    this.getauthority();
  },
})