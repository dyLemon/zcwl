// pages/attesting/attesting.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    id:'',
    failuremsg:'',
    success:false,
    jobtitlelist: [{
      name: "康复治疗士",
      value: 0
    }, {
      name: "初级康复治疗师",
      value: 1
    }, {
      name: "中级治疗师",
      value: 2
    }, {
      name: "高级治疗师",
      value: 3
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var s=false
    if(null!=options.state&&'success'==options.state){
      s=true
    }
    console.log('成功',s,options)
    this.setData({
      resource: app.globalData.websurl,
      token: '&token=' + app.globalData.stoken,
      failuremsg:options.msg,
      success:s
    })
    var that = this
    app.webpost('gethospitallist', {
        token: app.globalData.userData.token
      },
      function (e) {
        console.log(e)
        if (0 == e.data.code) {
          that.setData({
            hospitallist: e.data.hospitaldata,
            hospitalselectidx: 0,
            jobtitleselectidx: 0,
          })
          that.getjobinfo()
          // that.getcertificationinformation();
          //that.getauditfailercause();
        } else {
          app.servercode(e.data.code)
        }
      }
    )
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
    this.getidinfo()
    
  },
  getidinfo(){
    var that=this
    app.webpost('ocrinformation', {
      token: app.globalData.userData.token,
      user_id: app.globalData.userData.userid
    },function(e){
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
          that.setData({name:n,id:id})
        }
      }else{
        app.servercode(e.data.code)
      }
    })
  },
  getjobinfo(){
    var that=this
    app.webpost('certificationinfo', {
      user_id: app.globalData.userData.userid,
      token: app.globalData.userData.token
    }, function (e) {
      if (0 == e.data.code||2==e.data.code){
        console.log('认证信息',e)
        var l = []
        if (0 != e.data.work_img_path1.length) l.push({
          url: that.data.resource + e.data.work_img_path1 + that.data.token,
          change: false
        })
        if (0 != e.data.work_img_path2.length) l.push({
          url: that.data.resource + e.data.work_img_path2 + that.data.token,
          change: false
        })
        if (0 != e.data.work_img_path3.length) l.push({
          url: that.data.resource + e.data.work_img_path3 + that.data.token,
          change: false
        })
        if (0 != e.data.work_img_path4.length) l.push({
          url: that.data.resource + e.data.work_img_path4 + that.data.token,
          change: false
        })
        if (0 != e.data.work_img_path5.length) l.push({
          url: that.data.resource + e.data.work_img_path5 + that.data.token,
          change: false
        })
        if (0 != e.data.work_img_path6.length) l.push({
          url: that.data.resource + e.data.work_img_path6 + that.data.token,
          change: false
        })
        console.log('图片', l)
        var hidx = 0;
        for (var i = 0; i < that.data.hospitallist.length; i++) {
          if (e.data.hospital_id == that.data.hospitallist[i].id) {
            hidx = i
            break
          }
        }
        var jtidx = 0;
        for (var i = 0; i < that.data.jobtitlelist.length; i++) {
          if (e.data.job_title == that.data.jobtitlelist[i].name) {
            jtidx = i
            break
          }
        }
        that.setData({
          imglist: l,
          jobtitleselectidx: jtidx,
          hospitalselectidx: hidx,
          phone: e.data.phone_number
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
    this.setData({failuremsg:''})
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
  idmodify:function(){
    wx.navigateTo({
      url: '../mycard/mycard?data=modify',
    })
  },
  jobmodify:function(){
    wx.navigateTo({
      url: '../doctorattestting/doctorcerattestting',
    })
  },
  confirm:function(){
    wx.navigateTo({
      url: '../',
    })
  }
})