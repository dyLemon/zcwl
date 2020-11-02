const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctor: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      resource: app.globalData.wsurl,
      stoken: app.globalData.stoken
    })
    // if ('seedoctor' == options.type) {
    //   app.webpost('getqrdoctor', {
    //     unionid: app.globalData.wxuser.unionid, //e.data.
    //     token: app.globalData.wxuser.token
    //   }, function (res) {
    //     if (0 == res.data.code) {
    //       app.globalData.selectdoctor.doctorid = res.data.doctor_id //扫码医生
    //       // wx.navigateTo({
    //       //   url: '../doctor/doctor',
    //       // })
    //     } else if (2 != res.data.code) {
    //       app.servercode(res.data.code)
    //     }
    //   })
    // }
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

    console.log(getCurrentPages().slice(-1))
    app.webpost('querydoctorinfo', {
      user_id:parseInt(app.globalData.selectdoctor.doctorid),
      // token: app.globalData.wxuser.token
    }, function (e) {
      console.log('医生详情', e)
      if (0 == e.data.code) {
        that.setData({
          doctor: e.data
        })
        app.globalData.doctor = e.data
        app.globalData.doctor.id = app.globalData.selectdoctor.doctorid
      } else {
        app.servercode(e.data.code)
      }
    })
    // that.setData({
    //   doctor:app.globalData.doctor
    // })
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
  confirm: function () {
    if (app.globalData.login) {
      wx.navigateTo({
        url: '../selectpatient/selectpatient',
      })
    } else {
      app.globalData.topage.page = '../selectpatient/selectpatient'
      app.globalData.topage.type = 2
      wx.navigateTo({
        url: '../index/index',
      })
    }
  }
})