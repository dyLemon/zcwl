// pages/tagselect/tagselect.js
const app=getApp();
var taglibrary=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taglist:[],      //标签库  
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
    var that=this
    app.webpost('gettaglibrary',{
      token: app.globalData.userData.token
    },function(e){
      if(0==e.data.code){
        console.log(e.data)
        var tl=e.data.list
        var select
        for(var i=0;i<tl.length;i++){
        select=false
        for(var j=0;j<app.globalData.tagselectlist.length;j++){
          if(app.globalData.tagselectlist[j].id==tl[i].id){
            select=true
          }
        }
        tl[i].select=select
      }
        that.setData({taglist:tl})
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
    console.log(e.currentTarget.id)
    const sidx=e.currentTarget.id
    var s='taglist['+sidx+'].select'
    var select=this.data.taglist[sidx].select
    var sl=this.data.taglist
    if(select){
      this.setData({[s]:!select})
    }else{
      var count=0
      console.log(sl)
      for(var i=0;i<sl.length;i++){
        if(sl[i].select){
          count++
          if(4==count){
            return
          }
        }
      }console.log(s)
      this.setData({[s]:!select})
      console.log(this.data)
    }
  },
  confirm:function(){
    var that=this
    var sl=[]
    var tl=that.data.taglist
    for (let index = 0; index < tl.length; index++) {
      if(tl[index].select){
        sl.push(tl[index].id)
      }
    }
    app.webpost('tagselect',{
      user_id:app.globalData.userData.userid,
      label_id:sl,
      token: app.globalData.userData.token
    },function(e){console.log(e)
      if(0==e.data.code){
        wx.navigateBack({
          delta: 1,
        })
      }else{
        app.servercode(e.data.code)
      }
    })
  }
})