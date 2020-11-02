// pages/doctorattested/doctorcerattested.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resource: '',
    token: '',
    hospitallist:[],
    hospitalselectidx:0,
    jobtitle:'',
    phone:''
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
    this.setData({
      resource: app.globalData.websurl,
      token: '&token=' + app.globalData.stoken
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
          that.getinfo();
          //that.getauditfailercause();
        } else {
          app.servercode(e.data.code)
        }
      }
    )
  },
  getinfo:function(){
    var that = this
    app.webpost('certificationinfo', {
      user_id: app.globalData.userData.userid,
      token: app.globalData.userData.token
    }, function (e) {
      console.log('认证信息', e)
      if (0 == e.data.code||2==e.data.code) {
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
        that.setData({
          imglist: l,
          hospitalselectidx: hidx,
          jobtitle:e.data.job_title,
          phone: e.data.phone_number
        })
        //that.getauditfailercause();
      } else {
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

  }
})