var o = getApp();

Page({
    data: {
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        agreed: !1,
        showpublic: false
    },
    bindViewTap: function () {
        //o.onLogin();
        this.getinfo();
    },
    onShareAppMessage: function () {

    },
    onLoad: function (options) {
        return
        console.log('加载', options)
        var js = null
        const scene = decodeURIComponent(options.scene)
        console.log(typeof (scene))
        if ('string' == typeof (scene) && 'undefined' != scene) {
            js = JSON.parse(scene)
        } else if ('object' == typeof (scene)) {
            js = scene
        }
        console.log(js)
        if (null != js && null != js.doctor_id) {
            o.globalData.selectdoctor.doctorid = js.doctor_id
            o.globalData.selectdoctor.selecttype = 1 //就诊方式  0线上  1当面
            this.setData({
                showpublic: true
            })
            return
        }

        if (null != options.data) {
            o.globalData.entrance = options.data;
        }
        const info = wx.getAccountInfoSync()
        console.log(info.miniProgram)
        // wx.clearStorage({
        //   success: (res) => {},
        // })
        wx.getStorage({
            key: 'pagedata',
            success(exitState) {
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
        })
    },
    logindealwith(){
        wx.showModal({
            cancelColor: "#000000",
            confirmColor: "#3C4CC1",
            content: "确认登录",
            success: function (a) {
                if (a.confirm) { 
                    o.onLogin()                
                }

            }
        });
    },
    getUserInfo: function (n) {
        console.log(n);
        var e = this;
        e.data.agreed
        o.globalData.wxuserdata=n.detail.userInfo
        if ({} == o.globalData.wxuserdata || null == o.globalData.wxuserdata) {
            e.getinfo()
        }else{
            e.logindealwith()
        }
        
    },
    getinfo(){
        wx.getUserInfo({
            success(re){
              e.setData({
                  userInfo: re.userInfo,
                  hasUserInfo: !0
              })
              e.logindealwith()
            },fail(){
                o.servercode('未获取到用户信息，请重新登录')
            }
          })
    },
    onShow: function () {},
    checkchange: function (o) {
        var n = !1;
        0 != o.detail.value.length && (n = !0), this.setData({
            agreed: n
        });
    },
    toattention: function (e) {
        console.log('关注成功调用', e)
        this.setData({
            showpublic: false
        })
    },
    attentionerror: function (e) {
        console.log('关注失败调用', e)
        //o.servercode(JSON.stringify(e.detail))
    }
});