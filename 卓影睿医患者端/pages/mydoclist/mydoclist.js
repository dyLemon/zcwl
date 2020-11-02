var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hight: 0,
    doclist: [],
    page: 0,
    count: 15,
    resource: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.login) {
      app.globalData.topage.page='../mydoclist/mydoclist'
      app.globalData.topage.type=0 
      wx.redirectTo({
        url: '../index/index',
      })
      return
    }
    var that = this
    app.globalData.advisoryp = this
    wx.getSystemInfo({
      success: function (a) {
        that.setData({
          hight: a.windowHeight * (750 / a.screenWidth),
          resource: app.globalData.wsurl
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
    if (!app.globalData.login) {
      return
    }
    wx.hideTabBarRedDot({
      index: 1,
    })
    app.globalData.socketpageshow = 2
    app.globalData.advisoryshow = true
    var that = this
    var s = JSON.stringify({
      token: app.globalData.wxuser.token,
      msgid: 8,
      page: this.data.page,
      pernumber: this.data.count
    });
    console.log('发送聊天信息')
    app.globalData.sockettask.send({
      data: s,
      fail: function (e) {
        //t.servercode("聊天网络重新连接");
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.socketpageshow = 0
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
  listtoshowlist: function (msglist, docinfolist) { //转换显示列表数组
    var tlist = []
    for (var i = 0; i < msglist.length; i++) {
      for (var j = 0; j < docinfolist.length; j++) {
        if (msglist[i].who == docinfolist[j].doctor_id) {
          console.log('消息源',msglist[i])
          console.log('消息查询',docinfolist[j])
          var t = {}
          t.avatar = docinfolist[j].img_url
          t.name = docinfolist[j].name
          t.jobtitle = docinfolist[j].job_title
          t.sex = docinfolist[j].sex //接口没反这个值
          if (0 == msglist[i].msg.t_type) {
            t.text = msglist[i].msg.text //需要判断是订单消息还是说话消息
          } else {
            t.text = '新的订单'
          }
          t.id = docinfolist[j].doctor_id
          t.time = msglist[i].msg.time
          var talkhistory = wx.getStorageSync("talk" + t.id)
          console.log('历史谈话',talkhistory)
          //该医生的历史最后一条谈话消息的编号小于刚搜到的消息编号
          t.unread = true
          if (null != talkhistory && 0 != talkhistory.length) {
            console.log('此次谈话',msglist[i].msg)
            if(t.id!=talkhistory[talkhistory.length - 1].from){
              t.unread=false
            }else{
              t.unread = msglist[i].msg.number > talkhistory[talkhistory.length - 1].number
            }
          }
          tlist.push(t)
          break
        }
      }
    }
    this.setData({
      doclist: tlist
    })
    console.log('显示列表', tlist)
  },
  deduplication(list){
    var li=[]
    var find
    for (let index = 0; index < list.length; index++) {
      find=false
      for (let i = 0; i < index; i++) {
        if(list[index].who==list[i].who&&list[index].number==list[i].number){
          find=true
          break
        }
      }
      if(!find){
        li.push(list[index])
      }
    }
    return li 
  },
  receivelist: function (e) {
    var that = this;
    console.log(e)
    var dlist = []
    var tl = that.deduplication(e.members)
    console.log(tl)
    for (var i = 0; i < tl.length; i++) {
      dlist.push(tl[i].who)
    }
    if(0==dlist.length)
    return
    app.webpost('querydochistlist', {
        token: app.globalData.wxuser.token,
        id_list: dlist
      },
      function (res) {
        console.log('历史列表', res)
        if (0 == res.data.code) {
          var rl = res.data.doctor_info_list
          that.listtoshowlist(tl, rl)
        } else {
          app.servercode(res.data.code)
        }
      })
  },
  talk: function (e) {
    console.log(e.detail)
    var that = this
    var idx=e.detail
    app.webpost('querydoctorinfo', {
      user_id: that.data.doclist[idx].id,
      token: app.globalData.wxuser.token
    }, function (e) {
      console.log(e)
      if (0 == e.data.code) {
        that.setData({
          doctor: e.data
        })
        app.globalData.doctor = e.data
        app.globalData.doctor.id = that.data.doclist[idx].id
        console.log('医生信息', app.globalData.doctor)
        wx.navigateTo({
          url: '../talk/talk',
        })
      } else {
        app.servercode(e.data.code)
      }
    })

  }
})