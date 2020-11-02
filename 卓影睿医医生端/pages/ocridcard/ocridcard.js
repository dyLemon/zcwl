// pages/ocridcard/ocridcard.js
const app=getApp();
const K=1024;
const M=1024*K;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:0,
    idcard:'',
    name:'',
    birth:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var e = this; 
    wx.getSystemInfo({
        success: function(t) {
          console.log(t)
            e.setData({
                height:( t.windowHeight- 158)* (750 / t.screenWidth)
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
    var that=this
    app.webpost('ocrinformation', {
      token: app.globalData.userData.token,
      user_id: app.globalData.userData.userid
    },function(e){
      console.log('userid',app.globalData.userData.userid)
      console.log(e)
      if(0==e.data.code){
        var n=''
        var id=e.data.id_card[0]
        for(var i=0;i<e.data.full_name.length;i++){
          if(i!=e.data.full_name.length-1){
            n+='*'
          }else{
            n+=e.data.full_name[e.data.full_name.length-1]
          }
        }
        for(var i=1;i<e.data.id_card.length;i++){
          if(i!=e.data.id_card.length-1){
            id+='*'
          }else{
            id+=e.data.id_card[e.data.id_card.length-1]
          }
    
        }
        that.setData({
          birth:e.data.birth,
          name:n,
          idcard:id
        })
      }else{
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
  select:function(e){
    var that=this;
    wx.chooseImage({
      success(res) {
        console.log('选择图片',res)
        if(60*M<res.tempFiles[0].size){
          app.servercode('图片超过60M')
          return
        }
        app.webpost('ocrcheck',{
          img_url:res.tempFilePaths[0]
        },function(re){console.log(re)})
        that.setData({
          img: res.tempFilePaths[0],
          notselect: false
        })
      }
    })
  }
})