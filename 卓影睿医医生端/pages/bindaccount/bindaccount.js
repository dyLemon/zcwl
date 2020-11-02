// pages/bindaccount/bindaccount.js
const app = getApp();
var md5 = require("../../utils/md5.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    success:false
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
  bind: function (e) {
    var that=this;
    console.log(e.detail.value)
    console.log(app.globalData.userData)
    app.webpost('bindaccount', {
        token: app.globalData.userData.token,
        openid: app.globalData.userData.openid,
        username: e.detail.value.id,
        password: md5.hexMD5(e.detail.value.password)
      },
      function (res) {
        console.log(res)
        if(0==res.data.code){
          that.setData({success:true})
        }else{
          app.servercode(res.data.code)
          that.setData({id:'',password:''})
        }
      })
  },
  ok:function(){
    
    wx.removeStorage({
      key: 'pagedata',
    })
    wx.redirectTo({
        url: '../../pages/wxlogin/wxlogin'
    })
  }
})