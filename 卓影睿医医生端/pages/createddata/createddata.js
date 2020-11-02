const app = getApp();
// pages/createddata/createddata.js
Page({

  /**
   * 页面的初始数据
   * 
   *   cycle: 1
       cycleType: 1是天 ，0是周
   * 
   */
  data: {
    editlistsize: null,
    plandetail:null,
    patient:null,
    tprice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log('创建后',options)
    wx.getSystemInfo({
      success: function (a) {
        console.log(a)
        that.setData({
          editlistsize: {
            wight: 750,
            hight: (a.windowHeight) * (750 / a.screenWidth) - 383       
          },
          tprice:options.price,
          token: app.globalData.stoken,
          resource: app.globalData.surl,
          patient:app.globalData.patient
        })
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
    this.setData({
      plandetail: app.globalData.plandetail
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
  editselect:function(e){
    console.log('select',e)
    app.globalData.videoid = e.detail, 
    app.globalData.plandetail=this.data.plandetail
    app.globalData.planauthority=0
    console.log('createddata',this.data.plandetail)
    wx.navigateTo({
        url: "../video/video"
    });
  },
  comfirm:function(){
    var that = this;
        app.webpost('querypatientdoingplan',{
          id: this.data.patient.id,
          page: 1,
          page_count: 1,
          token: app.globalData.userData.token},
          function(e){
            if (0 != e.data.plans.length){
              console.log('当前数据',that.data)
              app.globalData.talkp=null
              app.globalData.ordersend = true
              var pl=app.globalData.plandetail
              pl.totalprice=that.data.tprice
              pl.price=that.data.tprice
              pl.id=e.data.plans[0].train_id
               wx.redirectTo({
                  url: "../../pages/talk/talk"
              }), app.globalData.planauthority = 0;
              var o = JSON.stringify({
                  Seq: app.globalData.userData.userid,
                  to: app.globalData.patient.id,
                  to_name: app.globalData.patient.name,
                  msgid: 3,
                  t_type: 1,
                  text: JSON.stringify(pl)
              });
              console.log(app.globalData.sockettask)
               app.globalData.sockettask.send({
                  data: o,
                  fail: function (t) {
                    //app.servercode("聊天服务器连接失败");
                  }
              });
            }
          })
       
  }
})