var t = getApp();

Page({
    data: {
        inputv: ""
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        this.setData({
            inputv: t.globalData.plandetail.actorlist[t.globalData.videoid].actordes
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    input: function(t) {
        console.log(t), this.setData({
            inputv: t.detail.value
        });
    },
    save: function(a) {
        t.globalData.plandetail.actorlist[t.globalData.videoid].actordes = this.data.inputv, 
        wx.navigateBack({
            complete: function(t) {}
        });
    }
});