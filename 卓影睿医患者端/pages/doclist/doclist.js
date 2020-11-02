// pages/doclist/doclist.js
var app = getApp()
const pagecount = 15
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doclist: [],
    index: 1, //第几页
    search: '', //搜索
    resource: "",
    stoken: "",
    shownopublic: true,
    attetting: false,
    searchkey: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    console.log('页面传参',options)
    //if(null!=options.data&&'seedoctor'==options.data) //场景传值
    if(true)
    //if(false)
    {  
      app.globalData.selectdoctor.selecttype = 1 //就诊方式  0线上  1当面
      // app.globalData.topage.page='../doctor/doctor'
      // app.globalData.topage.type=2
      wx.navigateTo({
        url: '../index/index',
      })
      //app.onLogin(function(){    //查询unionid
        // app.webpost('getattentionstate', {
        //   patient_id: app.globalData.wxuser.userid,
        //   token: app.globalData.wxuser.token
        // }, function (e) {
        //   if (0 == e.data.code) {
        //     console.log(e)//查询doctorid
        //     if(''== e.data.unionid){
        //       app.servercode('请先关注卓颖睿医公众号')
        //       return
        //     }
            
          // }else{app.servercode(e.data.code)}})
      
    }else{
      if(!app.globalData.login){
        const info=wx.getAccountInfoSync()
        if (info.miniProgram.version == info.miniProgram.envVersion) {
          o.globalData = exitState.data.appdata
          o.globalData.pagedata = exitState.data.pagedata
          o.globalData.pageurl = exitState.data.page
          o.globalData.reconnectsokect = true
          o.globalData.login = false
          o.loding(true)
          o.onLogin()

      } else {
          wx.removeStorage({
              key: 'pagedata',
          })
      }
      }
    }


    wx.getSystemInfo({
      success: function (a) {
        that.setData({
          resource: app.globalData.wsurl,
          stoken: app.globalData.stoken,
          height: a.windowHeight - 150
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  shownopublic: function () {
    var that = this
    app.webpost('getattentionstate', {
      patient_id: app.globalData.wxuser.userid,
      token: app.globalData.wxuser.token
    }, function (e) {
      if (0 == e.data.code) {
        console.log('关注查询', e.data)
        that.setData({
          shownopublic: !e.data.union_id_state
        })
      } else {
        app.servercode(e.data.code)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  tosearch: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  clear: function () {
    this.setData({
      searchkey: ''
    })
    this.search('')
  },
  search: function (key) {
    var that = this
    app.webpost('getdoclist', {
        //token: app.globalData.wxuser.token,
        key_word: key,
        page_index: that.data.index,
        page_count: pagecount
      },
      function (e) {
        if (0 == e.data.code) {
          console.log(e)
          that.setData({
            doclist: e.data.doctor_list
          })
        } else {
          app.servercode(e.data.code)
        }
      })
  },
  onShow: function () {
    // if(1==app.globalData.selectdoctor.selecttype){
    //   wx.navigateTo({
    //     url: '../doctor/doctor?type=seedoctor',
    //   })
    // }
    // if(1==app.globalData.selectdoctor.selecttype){
    //   wx.navigateTo({
    //     url: '../doctor/doctor',
    // })
    //   return
    // }
    //this.shownopublic();
    this.setData({
      index: 1
    })
    this.search('');
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
  onsearch: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: 1
    })
    this.search(e.detail.value)
  },
  scanqr: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success(e) {
        console.log('扫描', e)
        if ('string' == typeof (e.result)) {
          console.log('数字', parseInt(e.result))
          if (!isNaN(parseInt(e.result)) && 0 != parseInt(e.result)) {
            console.log('有效')
            app.globalData.selectdoctor.doctorid = parseInt(e.result)
            app.globalData.selectdoctor.selecttype = 1
            wx.navigateTo({
              url: '../doctor/doctor',
            })
          } else {
            console.log('无效')
            app.servercode('请扫卓影睿医医生二维码')
          }
        }
      },
      fail(e) {
        console.log('调用失败', e)
      }
    })
  },
  attention: function () {
    // wx.navigateTo({
    //   url: '../attention/attention',
    // })
    console.log('调用')
  },
  attentionreturn:function(e){
    console.log(e)
  },
  toattention: function (e) {
    console.log(e)
  },
  attentionerror: function (e) {
    console.log(e)
  },
  closepno: function () {
    this.setData({
      shownopublic: false
    })
  },
  select: function (e) {
    console.log(e.currentTarget.id)
    app.globalData.selectdoctor.doctorid = this.data.doclist[e.currentTarget.id].id
    app.globalData.selectdoctor.selecttype = 0 //就诊方式  0线上  1当面
    wx.navigateTo({
      url: '../doctor/doctor',
    })

  }
})