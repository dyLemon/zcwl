var t = getApp(), a = 0;

Page({
    data: {
        startdate: "开始日期",
        enddate: "结束日期",
        list: [],
        topt: 0,
        topc: 0,
        left: 0,
        contentx: !1,
        contenty: !1,
        resource: "",
        height: 0
    },
    onLoad: function(a) {
        var o = this;
        wx.getSystemInfo({
            success: function(a) {
                o.setData({
                    height: (a.windowHeight - 140) * (750 / a.screenWidth),
                    resource: t.globalData.surl
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    scrollchangeleft: function(t) {
        0 != t.detail.scrollLeft && t.detail.scrollLeft != this.data.left && (this.setData({
            contentx: !0
        }), this.setData({
            left: t.detail.scrollLeft
        }), this.setData({
            contentx: !1
        }), console.log(this.data.left));
    },
    scrollchangetopt: function(t) {
        console.log("topt"), console.log(t.detail.scrollTop, a), console.log("tc", this.data.topt, this.data.topc), 
        0 != t.detail.scrollTop && t.detail.scrollTop != this.data.topc && 2 != a && (a = 1, 
        this.setData({
            topc: t.detail.scrollTop
        })), 2 == a && (a = 0);
    },
    scrollchangetopc: function(t) {
        console.log("topc"), console.log(t.detail.scrollTop, a), console.log("tc", this.data.topt, this.data.topc), 
        0 != t.detail.scrollTop && t.detail.scrollTop != this.data.topt && 1 != a && (a = 2, 
        this.setData({
            topt: t.detail.scrollTop
        })), 1 == a && (a = 0);
    },
    scrollchangetop: function(t) {
        0 != t.detail.scrollTop && t.detail.scrollTop != this.data.topc && (this.setData({
            contenty: !0
        }), this.setData({
            topc: t.detail.scrollTop
        }), this.setData({
            contenty: !1
        }), console.log(this.data.topc));
    },
    scorllend: function(t) {
        1 == a ? this.setData({
            topc: this.data.topt
        }) : 2 == a && this.setData({
            topt: this.data.topc
        }), console.log("end", a), console.log("tc", this.data.topt, this.data.topc);
    },
    onShareAppMessage: function() {},
    startdateselect: function(t) {
        console.log(t.detail.value), this.data.startdate != t.detail.value && this.setData({
            startdate: t.detail.value
        });
    },
    enddateselect: function(t) {
        this.data.enddate != t.detail.value && this.setData({
            enddate: t.detail.value
        });
    },
    search: function() {
        var a = this;
        "开始日期" != a.data.startdate && "结束日期" != a.data.enddate ? t.webpost('statistics', {
            token: t.globalData.userData.token,
            starttime: a.data.startdate,
            endtime: a.data.enddate
        }, function(t) {
            console.log(t.data.statisticslist), a.setData({
                list: t.data.statisticslist
            });
        }) : t.servercode("请选择日期");
    }
});