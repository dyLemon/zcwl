const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freelist:{},
    surl:'',
    stoken:'',
    showIndex:1,
    checklist:[{
      name:'简单',
      value:1
    },{
      name:'一般',
      value:2
    },{
      name:'有难度',
      value:3
    },{
      name:'无法完成',
      value:4
    }],
    height:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
console.log(options);

    this.setData({
     freelist:JSON.parse(decodeURIComponent(options.par))
    })

    this.computeScrollViewHeight();
    
  },
  computeScrollViewHeight() {
    var _this = this;
    wx.getSystemInfo({
      success: function (t) {
        _this.setData({
              height: t.windowHeight * (750 / t.screenWidth),
          });
      }
  })
   
  },
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } 
    else {
      this.setData({
        showIndex: 0
      })
    }    
  },
    //每个视频列表详情
    videolist(item){
      
      var par= encodeURIComponent(JSON.stringify(item.currentTarget.dataset.item));
      wx.navigateTo({
        url: "/components/videolist/videolist?item="+par,
      })
    },
  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      surl:app.globalData.surl,
      stoken:app.globalData.stoken,
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

  }
})