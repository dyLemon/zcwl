var a = getApp();

Page({
    data: {
        plandetail: {},
        patient: {},
        resource: "",
        starttime: "",
        endtime: "",
        stoken: ""
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            plandetail: a.globalData.plandetail,
            resource: a.globalData.surl,
            userdata: a.globalData.wxuser,
            starttime: a.globalData.plandetail.start_time,
            endtime: a.globalData.plandetail.endtime,
            stoken: a.globalData.stoken,
            patient: a.globalData.wxuser
        }), wx.getSystemInfo({
            success: function(a) {
                e.setData({
                    height: (a.windowHeight) * (750 / a.screenWidth)-630
                }), console.log("token", e.data.stoken);
                console.log(a)
                console.log(e.data.height)
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    payorder: function() {
        console.log(a.globalData.doctor), console.log(a.globalData.wxuser);
        var t = this;
        a.webpost('payoder', {
            study_id: t.data.plandetail.id,
            price: t.data.plandetail.price,
            open_id: a.globalData.wxuser.openid
        }, function(t) {
            console.log(t.data), wx.requestPayment({
                nonceStr: t.data.nonceStr,
                package: t.data.package,
                paySign: t.data.paySign,
                timeStamp: t.data.timeStamp,
                signType: "MD5",
                success: function(a) {
                    wx.showToast({
                        title: "支付成功",
                        icon: "success",
                        duration: 3e3
                    }), wx.switchTab({
                        url: "../../pages/orderlist/orderlist"
                    });
                },
                fail: function(e) {
                    a.servercode(e), console.log(t.data), a.webpost('closeoder', {
                        order_id: t.data.order_id
                    }, function(a) {
                        console.log(a);
                    });
                }
            });
        });
    },
    talk: function(a) {
        wx.switchTab({
            url: "../../pages/talk/talk"
        });
    }
});