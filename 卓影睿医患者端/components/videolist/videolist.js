const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    surl:'',
    token:'',
    url:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
    var item = JSON.parse(decodeURIComponent(options.item))
    this.setData({
      list:item,
      surl:app.globalData.surl,
      token:app.globalData.wxuser.token, 
      url:`${app.globalData.surl}/${item.actor_url2}&token=${app.globalData.stoken}`
    
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

  }
})