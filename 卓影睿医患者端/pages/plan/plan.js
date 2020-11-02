// pages/plan/plan.js
var app = getApp()

function add0(m) {
  return m < 10 ? '0' + m : m
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    planlist: [],
    showfootmark: true,
    state: 0,
    resource:app.globalData.wsurl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if (!app.globalData.login) {
      app.globalData.topage.page='../plan/plan'
      app.globalData.topage.type=0 
      wx.redirectTo({
        url: '../index/index',
      })

     
      return
    }
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
    var that = this
    that.setData({
      showfootmark: app.globalData.wxuser.is_question
    })
    app.webpost('querypatientplan', {
      token: app.globalData.wxuser.token,
      id: app.globalData.wxuser.userid //患者id
    }, function (e) {
      console.log('plan列表', e)
      if (0 == e.data.code) {
        app.globalData.planlist = e.data.plans;
        var state = 0
        if (null==app.globalData.planlist||0 == app.globalData.planlist.length) {
          that.setData({
            planlist: []
          })
          return
        }
        if ('' != e.data.plans[0].start_time) {
          state = 1
        }
        that.setData({
          state: state
        })
        app.webpost('queryplaninformation', {
          token: app.globalData.wxuser.token,
          user_id: app.globalData.wxuser.userid
        }, function (e) {
          console.log('方案详情', e)
          if (0 == e.data.code) {
            app.globalData.docter = e.data
            var plan = {}
            plan.docname = app.globalData.wxuser.doctorname;
            plan.trainplan = e.data.total_num + '/' + e.data.total_count + ' 次'
            plan.planvideo = e.data.acts.length + '个'
            var starts = app.globalData.planlist[0].start_time
            var ends = app.globalData.planlist[0].end_time
            var startt = new Date(starts.replace(/-/g, '/'))
            var endt = new Date(ends.replace(/-/g, '/'))
            starts = '- -月- -日'
            ends = '- -月- -日'
            if ('' != app.globalData.planlist[0].start_time) {
              starts = add0(startt.getMonth() + 1) + '月' + add0(startt.getDate()) + '日'
            }else if(1==app.globalData.planlist[0].ishospital&&''!=app.globalData.planlist[0].create_time){
              starts = app.globalData.planlist[0].create_time
              startt = new Date(starts.replace(/-/g, '/'))
              starts = add0(startt.getMonth() + 1) + '月' + add0(startt.getDate()) + '日'
            }
            if (1==that.data.state&&'' != app.globalData.planlist[0].end_time) {
              ends = add0(endt.getMonth() + 1) + '月' + add0(endt.getDate()) + '日'
            }

            console.log(starts)
            plan.cyclestart = starts
            plan.cycleend = ends
            var l = []
            l.push(plan)
            that.setData({
              planlist: l
            })
          }else if(14==e.data.code){
            //没有训练方案
          }
           else {

            app.servercode(e.data.code)
          }
        })
      } else {
        app.servercode(e.data.code)
      }

    })
  },

  writeBtn() {
    wx.navigateTo({
      url: '/pages/questaire/questaire'
    })
    this.setData({
      showfootmark: false
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.saveexit(this.data,'../plan/plan')
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
  planbtn: function (e) {
    console.log(e)
    var that=this
    if (null != app.globalData.planlist && 0 < app.globalData.planlist.length) {
      app.webpost('queryplandetail', {
        token: app.globalData.wxuser.token,
        train_id: app.globalData.planlist[0].train_id //方案id
      }, function (e) {
        if(0!=e.data.code){
          app.servercode(e.data.code)
          return
        }
        app.globalData.freelist = e.data;
        var o =app.globalData.freelist;
        console.log('freelist', app.globalData.freelist)
        app.webpost('querypaystate', {
          studyid: app.globalData.planlist[0].train_id,
          token: app.globalData.wxuser.token
        }, function (e) {
          //ishospital   0 医院创建   1院外创建
          app.globalData.paystate = e.data.paystate
            o.actorlist = o.acts, o.daynum = o.day_num, o.cycleType = o.cycle_type, o.createtime = o.create_time,
              o.endtime = o.end_time, o.gaptime = o.gap_time, o.groupNum = o.group_num, o.id = o.train_id,
              o.paystate = e.data.paystate, o.price = e.data.price, o.totalprice = e.data.totalprice,
              o.state = e.data.paystate, o.valid = !0;
              console.log('o',o)
            for (var l = 0; l < o.acts.length; l++) o.actorlist[l].imgpath2 = o.acts[l].actor_display_url2,
              o.actorlist[l].name = o.acts[l].actor_name, o.actorlist[l].repeatcount = o.acts[l].repeat_count,
              o.actorlist[l].keeptime = o.acts[l].keep_time, o.actorlist[l].playcount = o.acts[l].play_count,
              o.actorlist[l].actor_des = o.acts[l].actor_des, o.actorlist[l].imgpath2 = o.acts[l].actor_display_url2;
            app.globalData.plandetail = o
            app.globalData.remind = !1
            console.log( that.data.state)
            if (0 == e.data.price||1 == that.data.state) {
              wx.navigateTo({
                url: "../../pages/sport/sport"
              })
            } else {
              wx.navigateTo({
                url: "../../pages/order/order"
              })
            }
          
        })
      })
    }
  },
  closebtn: function () {
    this.setData({
      showfootmark: false
    })
  }
})