// pages/wxlogin/wxlogin.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agree: false,
    showModal: false,
    url: ''
  },

  /**
   * 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //app.servercode('初始页'+JSON.stringify(options))
    //return
    //app.getcreatetype();
    const info = wx.getAccountInfoSync()
    console.log(info.miniProgram)
    wx.getStorage({
      key: 'pagedata',
      success(exitState) {
        // console.log('当前版本',info.miniProgram.version)
        // console.log('退出版本',exitState.data.appdata.version)
        if (info.miniProgram.version == info.miniProgram.envVersion) {
          //if(info.miniProgram.version==exitState.data.appdata.version){  
          app.globalData = exitState.data.appdata
          wx.getUserInfo({
            success(e) {
              console.log('获取信设置', e.userInfo)
              app.globalData.wxuserdata = e.userInfo
            }
          })
          app.globalData.pagedata = exitState.data.pagedata
          app.globalData.pageurl = exitState.data.page
          app.globalData.reconnectsokect = true
          if (0 == app.globalData.logintype) {
            app.loding(true)
            app.wxlogin()
            //app.loding(false)
          } else {
            app.loding(true)
            app.accountlogin(app.globalData.accountdata)
          }
        } else {
          wx.removeStorage({
            key: 'pagedata',
          })
          //app.globalData.version=info.miniProgram.envVersion
        }
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
    var that = this
    // wx.getLocation({
    //   altitude: 'altitude',
    //   success(e){
    //     console.log(e)
    //   }
    // })
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
  logindealwith() {
    var that = this
    app.wxlogin(function () {
      if (!app.globalData.userData.phone_num) { //无有手机号
        that.showDialogBtn();
      } else {
        app.webpost('certificationstate', {
          user_id: app.globalData.userData.userid,
          token: app.globalData.userData.token
        }, function (e) {
          console.log('认证查询', e)
          if (0 == e.data.code || 2 == e.data.code) {
            if (1 != e.data.state) {
              wx.switchTab({
                url: '../myorderlist/myorderlist',
              })
              return
            } else {
              wx.switchTab({
                url: "../patientlist/patientlist"
              })
            }
          } else {
            t.servercode(e.data.code)
          }
        })

      }
    })
  },
  wxlogin: function (n) {
    var that = this;
    app.globalData.wxuserdata = n.detail.userInfo;
    app.globalData.logintype = 0;
    app.loding(true)
    if ({} == app.globalData.wxuserdata || null == app.globalData.wxuserdata) {
      wx.getUserInfo({
        success(e) {
          app.globalData.wxuserdata = e.userInfo
          that.logindealwith()
        },
        fail() {
          app.servercode('未获取到用户信息，请重新登录')
          return
        }
      })
    } else {
      that.logindealwith()
    }
  },
  hideBaitiaoView: function (e) {
    this.setData({
      showModal: false
    })
  },
  //显示一键获取手机号弹窗
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  getPhoneNumber(e) {
    this.hideBaitiaoView();
    //是否允许授权
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      let json = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        user_id: wx.getStorageSync('userData').userid
      }
      console.log(JSON.stringify(json))
      app.webpost('getphone', json, (e) => {
        console.log('获取手机', e)
        if (e.data.code == 0) {
          wx.switchTab({
            url: "../../pages/patientlist/patientlist"
          })
        } else {
          app.servercode(e.data.code);
        }

      })

    } else {
      console.log('拒绝');

    }
  },
  alogin: function () {
    wx.navigateTo({
      url: '../../pages/login/login',
    })
  },
  agreechange: function (e) {
    var t = !1;
    0 != e.detail.value.length && (t = !0), this.setData({
      agree: t
    });
  }
})