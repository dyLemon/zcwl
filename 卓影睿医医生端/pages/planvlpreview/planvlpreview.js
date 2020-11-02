// pages/planvlpreview/planvlpreview.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resource: '',
    token: '',
    videolist: [],
    partlisthight: 0,
    plandata: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var jd = JSON.parse(options.data)
    wx.getSystemInfo({
      success: function (a) {
        that.setData({
          partlisthight: (a.windowHeight) * (750 / a.screenWidth) - 94,
          token: app.globalData.stoken,
          resource: app.globalData.surl,
          plandata: jd
        })
        console.log('预览页面数据', that.data)
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
    var that = this
    app.webpost("queryvideolist", {
      token: app.globalData.userData.token,
      command: 0,
      partid: that.data.plandata.id
    }, function (e) {
      console.log('视频查询', e)
      if (0 == e.data.code) {
        that.setData({
          videolist: e.data.actorlist
        })
      } else {
        app.severcode(e.data.code)
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
  select: function (e) {
    console.log('select',e)
    console.log( app.globalData.plandetail)
    app.globalData.videoid = e.detail,
      app.globalData.plandetail.actorlist = this.data.videolist
    app.globalData.planauthority = 0
    wx.navigateTo({
      url: "../video/video"
    });
  }
})