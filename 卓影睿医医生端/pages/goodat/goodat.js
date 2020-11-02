// pages/goodat/goodat.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodat:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({goodat:app.globalData.goodat})
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
  input:function(e){
    //限制擅长输入字数
    if(300>e.detail.value.length){
      this.setData({goodat:e.detail.value})
    }
  },
  confirm:function(){
    var that=this
    console.log('擅长数据',that.data.goodat)
    app.webpost('goodatmodify',{
      user_id:app.globalData.userData.userid,
      text:that.data.goodat,
      token: app.globalData.userData.token
    },
    function(e){
      console.log(e)
      if(0==e.data.code){
        wx.navigateBack({
          delta: 1,
        })
      }else{app.servercode(e.data.code)}
    })
  }
})