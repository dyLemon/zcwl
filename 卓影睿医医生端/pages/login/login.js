var e = require("../../utils/md5.js"), t = getApp();

Page({
    data: {
        input: 0,
        user: "",
        password: "",
        remember: !1,
        agree: !1,
        wait: !1
    },
    onLoad: function(e) {
        this.setData({
            user: wx.getStorageSync("userName"),
            password: wx.getStorageSync("userPassword"),
            remember: wx.getStorageSync("remember")
        });
        wx.getSystemInfo({
          complete: (res) => {
            console.log(res)
          },
        })
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            wait: !1
        }), wx.request({});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    login: function(a) {
        var o = this;
        o.setData({
            wait: true
        });
        var s = a.detail.value;
        0 != s.check.length ? (wx.setStorageSync("userName", s.user), wx.setStorageSync("userPassword", s.password), 
        wx.setStorageSync("remember", !0)) : (wx.setStorageSync("userName", ""), wx.setStorageSync("userPassword", ""), 
        wx.setStorageSync("remember", !1))
        t.globalData.accountdata={
                account: s.user,
                pwd: e.hexMD5(s.password),
                ishospital: 1
            }
        t.accountlogin(t.globalData.accountdata,function(){o.setData({
                wait: false
            });})
        
    },
    uerfocus: function() {
        this.setData({
            input: 1
        });
    },
    userblur: function() {
        this.setData({
            input: 0
        });
    },
    passwordfocus: function() {
        this.setData({
            input: 2
        });
    },
    passwordblur: function() {
        this.setData({
            input: 0
        });
    },
    checkchange: function(e) {
        console.log(e);
        var t = !1;
        0 != e.detail.value.length && (t = !0), this.setData({
            remember: t
        });
    },
    agreechange: function(e) {
        var t = !1;
        0 != e.detail.value.length && (t = !0), this.setData({
            agree: t
        });
    }
});