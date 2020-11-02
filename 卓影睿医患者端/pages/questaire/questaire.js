const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showquest:true,
    userid:'', 
    token:'',
    listobj:{
      listarr:[],
      total:0
    },
    height:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let {userid,token} = app.globalData.wxuser
    this.setData({
      userid:userid,
      token:token
    })
    this.questlist();
    this.computeScrollViewHeight();

  },
  addquest(){
    this.setData({
      showquest:false
    })

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
  questlist(){
    app.webpost('getquestionnaire',{token:this.data.token},(res)=>{
      let {code , list,totalcount} =res.data;
      if(code ==0 ){
        this.setData({
          ['listobj.listarr'] :list,
          ['listobj.total'] :totalcount,
        })
      }else{
        app.servercode(code)
      }
    })
    
  },
  submitBtn(event){
    console.log(event);
    let json={
      commit_list:event.detail.arr,
      token:this.data.token
    }
    app.webpost('questionnairecommit',json,(res)=>{
      let {code , list,totalcount} =res.data;
      console.log(res);
      
      if(code ==0 ){
        wx.showToast({
          title: '填写问卷成功',
          icon: 'success',
          duration: 2000
        })
        app.globalData.wxuser.is_question=false
        setTimeout(()=>{
          wx.navigateBack({
            delta:1
          })
        },2000)
        
      }else{
        app.servercode(code)
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