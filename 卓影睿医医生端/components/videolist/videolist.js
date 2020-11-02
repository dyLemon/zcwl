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
    height:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
    var item = JSON.parse(decodeURIComponent(options.item))
    this.setData({
      list:item,
      surl:app.globalData.surl,
      token:app.globalData.userData.token, 
      url:`${app.globalData.surl}/${item.actor_display}&token=${app.globalData.stoken}`
    
    })
    
  },
  computeScrollViewHeight() {
    var _this = this;
    wx.getSystemInfo({
      success: function (t) {
        _this.setData({
              height: t.windowHeight * (750 / t.screenWidth) - 422,
          });
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
    this.computeScrollViewHeight();
  },

 
 
})