// pages/personalsettings/personalsettings.js
var app = getApp()
import rpx2px from '../../utils/rpx2px.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    atteststate: 0, //账号认证状态  审核状态:默认0 3：待审核 1：已通过 2：未通过
    bindstate: 0, //账号绑定状态
    logintype: 0, //登录状态
    username: '',
    //goodat:'第三方师傅水电费水电费地方第三方大幅度水电费收费'    //擅长
    goodat: '', //擅长
    showqr: false,
    qrcodeurl: '',
    tag:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      logintype: app.globalData.logintype
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
  goodatshow: function () {
    var that = this
    app.webpost('goodatquery', {
      user_id: app.globalData.userData.userid,
      token: app.globalData.userData.token
    }, function (e) {
      console.log('擅长', e)
      if (0 == e.data.code) {
        that.setData({
          goodat: e.data.text
        })
      } else {
        app.servercode(e.data.code)
      }
    })
    var js = {
      doctorid: app.globalData.userData.userid
    }
    that.setData({
      qrcodeurl: JSON.stringify(js)
    })
  },
  gettagselect() {
    var that=this
    app.webpost('querytagselect', {
      user_id: app.globalData.userData.userid,
      token: app.globalData.userData.token
    }, function (e) {
      console.log(e.data.label_arr)
      if (0 == e.data.code||2==e.data.code) {
        if (null == e.data.label_arr) {
          app.globalData.tagselectlist = []
          that.setData({tag:'未选择'})
        } else {
          app.globalData.tagselectlist = e.data.label_arr
          var tl=app.globalData.tagselectlist
          var gs='';
          for (let index = 0; index < tl.length; index++) {
            if(index == tl.length-1){
              gs+=tl[index].name
            }else{
              gs+=tl[index].name+","
            }
          }
          that.setData({tag:gs})
        }
      } else {
        app.servercode(e.data.code)
      }
    })
  },
  getavatar:function(){
    var that=this
    app.webpost('queryavatar', {
      user_id: app.globalData.userData.userid,
      token: app.globalData.userData.token
    }, function (e) {
      console.log('头像',e)
      if(0==e.data.code){
        if(''!=e.data.img_url){
          that.setData({avatar:app.globalData.websurl+e.data.img_url})
        }else if(0==e.data.sex){
          that.setData({avatar:'https://wxprogram.zc5l.com/img/Doc_male_icon.png'})
        }else{
          that.setData({avatar:'https://wxprogram.zc5l.com/img/Doc_female_icon.png'})
        }
      }else{
        app.servercode(e.data.code)
      }
    })
  },
  onShow: function () {
    var that = this
    var name;
    this.goodatshow();
    this.gettagselect();
    this.getavatar();
    if (1 == app.globalData.logintype) {
      name = app.globalData.userData.doc_name
    } else {
      name = app.globalData.wxuserdata.nickName
    }
    that.setData({
      username: name
    })
    // app.webpost('querybindstate', {
    //     user_id: app.globalData.userData.userid,
    //     token: app.globalData.userData.token
    //   },
    //   function (res) {
    //     console.log('查询绑定状态', res)
    //     if (0 == res.data.code) {
    //       that.setData({
    //         bindstate: res.data.state
    //       })
    app.webpost('certificationstate', {
      user_id: app.globalData.userData.userid,
      token: app.globalData.userData.token
    }, function (e) {
      console.log('认证查询', e)
      if (0 == e.data.code || 2 == e.data.code) {
        that.setData({
          atteststate: e.data.state,
        })
      } else {
        app.servercode(e.data.code)
      }
    })
    //   } else {
    //     app.servercode(res.data.code);
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
  changeavatar: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      success(e) {
        console.log(e.tempFilePaths[0])
        let timg=e.tempFilePaths[0]
        let ft=timg.substring(timg.lastIndexOf('.')+1)
        console.log('格式',ft)
        if('jpg'!=ft&&'png'!=ft&&'jpeg'!=ft){
          wx.showModal({
            title:'格式错误',
            content:'合法格式为（jpg,png,jpeg）',
            showCancel:false
          })
          return
        }
        wx.navigateTo({
          url: '../screenshot/screenshot?data='+e.tempFilePaths[0],
        })
        return
        that.setData({
          avatar: e.tempFilePaths[0]
        })
        wx.uploadFile({
          filePath:  e.tempFilePaths[0],
          name: 'file',
          url:app.globalData.url + app.api('upavatar'),
          formData:{
            token: app.globalData.userData.token,
            user_id:app.globalData.userData.userid
          },
          success(e) {
            console.log(e)
            var js=JSON.parse(e.data)
            if (0 != js.code) {
              app.servercode(js.code)
            }else{
              that.getavatar();
            }
          }
        })
      }
    })
  },

  bind: function () {
    if (2 == this.data.bindstate)
      return;
    console.log(app.globalData.logintype)
    if (0 == app.globalData.logintype) {
      wx.navigateTo({
        url: '../bindaccount/bindaccount',
      })
    }
    // else {
    //   wx.login({
    //     success: function (e) {
    //       console.log(e)
    //     }
    //   })
    // }

  },
  toattest: function (state) {
    if (1 == state) {
      wx.navigateTo({
        url: "../attesting/attesting?state=success"
        //url:"../../doctorattestting/doctorcerattestting"
      });
    } else if(0==state) {
      wx.navigateTo({
                  //url: "../Identity/Identity"
                  url: "../doctorattestbegin/doctorattestbegin"
                });
      // app.webpost('ocrstate', {
      //     user_id: app.globalData.userData.userid,
      //     token: app.globalData.userData.token
      //   },
      //   function (e) {
      //     console.log('查询认证状态', e)
      //     if (0 == e.data.code) {
      //       if (1 == e.data.ocr_state) {
      //         wx.navigateTo({
      //           //url: "../Identity/Identity"
      //           url: "../doctorattestting/doctorcerattestting"
      //         });
      //       } else {
      //         wx.navigateTo({
      //           //url: "../Identity/Identity"
      //           url: "../doctorattestbegin/doctorattestbegin"
      //         });
      //       }
      //     } else {
      //       app.servercode(e.data.code);
      //     }
      //   })

    }else{} //审核失败，审核中
  },

  attest: function () {
    var that = this
    app.webpost('certificationstate', {
      user_id: app.globalData.userData.userid,
      token: app.globalData.userData.token
    }, function (e) {
      console.log('认证状态', e)
      if (0 == e.data.code || 2 == e.data.code) {
        that.toattest(e.data.state)
      } else {
        app.servercode(e.data.code)
      }
    })
  },
  goodat: function () {
    app.globalData.goodat = this.data.goodat
    wx.navigateTo({
      //url: "../Identity/Identity"
      url: "../goodat/goodat"
    });
  },
  tagselect: function () {
    wx.navigateTo({
      url: "../tagselect/tagselect"
    });
  },
  quit: function () {
    wx.removeStorage({
      key: 'pagedata',
    })
    app.globalData.userInfo = null;
    wx.redirectTo({
      url: '../../pages/wxlogin/wxlogin'
    })
  },
})