function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = getApp();

Page({
    data: {
        video: {},
        select: 0,
        resources: "",
        height: 0,
        token: "",
        play: "",
        realperson: !0,
        changeable: !1
    },
    onLoad: function(a) {
        var e = this;
        wx.getSystemInfo({
            success: function(a) {
                e.setData({
                    height: a.windowHeight * (750 / a.screenWidth) - 538,
                    token: t.globalData.stoken
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        console.log('选择视频',t.globalData.videoid)
        this.setData({
            video: t.globalData.plandetail.actorlist[t.globalData.videoid],
            play: t.globalData.plandetail.actorlist[t.globalData.videoid].filepath2,
            resources: t.globalData.surl,
            realperson: !0,
            changeable: 1 == t.globalData.planauthority
        }), console.log(this.data);
    },
    onHide: function() {
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    tips: function(a) {
        this.data.changeable && wx.navigateTo({
            url: "../../pages/actordes/actordes"
        });
    },
    turn: function() {
        var a;
        a = this.data.realperson ? t.globalData.plandetail.actorlist[t.globalData.videoid].filepath : t.globalData.plandetail.actorlist[t.globalData.videoid].filepath2, 
        this.setData({
            realperson: !this.data.realperson,
            play: a
        });
    },
    groupsubstract: function() {
        1 < this.data.video.repeatcount && (this.setData(a({}, "video.repeatcount", this.data.video.repeatcount - 1)), 
        t.globalData.plandetail.actorlist[t.globalData.videoid].repeatcount = this.data.video.repeatcount);
    },
    groupadd: function() {
        this.setData(a({}, "video.repeatcount", this.data.video.repeatcount + 1)), console.log(t.globalData.plandetail.actorlist[t.globalData.videoid].repeatcount), 
        t.globalData.plandetail.actorlist[t.globalData.videoid].repeatcount = this.data.video.repeatcount, 
        console.log(t.globalData.plandetail.actorlist[t.globalData.videoid].repeatcount);
    },
    timessubstract: function() {
        1 < this.data.video.keeptime && (this.setData(a({}, "video.keeptime", this.data.video.keeptime - 1)), 
        t.globalData.plandetail.actorlist[t.globalData.videoid].keeptime = this.data.video.keeptime);
    },
    timesadd: function() {
        this.setData(a({}, "video.keeptime", this.data.video.keeptime + 1)), t.globalData.plandetail.actorlist[t.globalData.videoid].keeptime = this.data.video.keeptime;
    },
    gapsubstract: function() {
        1 < this.data.video.playcount && (this.setData(a({}, "video.playcount", this.data.video.playcount - 1)), 
        t.globalData.plandetail.actorlist[t.globalData.videoid].playcount = this.data.video.playcount);
    },
    gapadd: function() {
        this.setData(a({}, "video.playcount", this.data.video.playcount + 1)), t.globalData.plandetail.actorlist[t.globalData.videoid].playcount = this.data.video.playcount;
    }
});