var a = getApp();

Page({
    data: {
        nonempty: !1,
        entrance: 0,
        searchkey: "",
        list: [],
        page: 1,
        count: 15,
        resource: ""
    },
    onLoad: function(t) {
        var e = JSON.parse(decodeURIComponent(t.tempArr));
        this.setData({
            entrance: e.entrance,
            resource: a.globalData.surl
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    search: function(t) {
        a.globalData.search = this.data.searchkey;
        var e;
        if (console.log(this.data.entrance), 1 == this.data.entrance) {
            var n = this;
            n.setData({
                page: 1
            }), console.log("searchkey"), console.log(a.globalData.search), a.webpost('querypaientlist', {
                token: a.globalData.userData.token,
                findname: n.data.searchkey,
                page: n.data.page,
                page_count: n.data.count
            }, function(t) {
                0 == t.data.code ? (console.log(t.data), n.setData({
                    list: t.data.patients
                })) : a.servercode(t.data.code);
            });
        } else 2 == this.data.entrance && (e = "../../pages/advisory/advisory");
        wx.switchTab({
            url: e,
            success: function(a) {
                console.log("成功");
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    back: function() {
        console.log("退"), wx.navigateBack({});
    },
    inputing: function(a) {
        this.setData({
            nonempty: "" != a.detail.value,
            searchkey: a.detail.value
        }), console.log(a.detail.value);
    },
    reset: function() {
        this.setData({
            nonempty: !1,
            searchkey: "",
            list: []
        });
    },
    select: function(t) {
        a.globalData.patient = this.data.list[t.currentTarget.id], console.log(a.globalData.patient), 
        wx.navigateTo({
            url: "../../pages/patientplan/patientplan"
        });
    },
    bottom: function(t) {
        var e = this;
        e.setData({
            page: e.data.page + 1
        }), a.webpost('querypaientlist', {
            token: a.globalData.userData.token,
            findname: e.data.searchkey,
            page: e.data.page,
            page_count: e.data.count
        }, function(t) {
            if (0 == t.data.code) {
                for (var n = e.data.list, o = 0; o < t.data.patients.length; o++) {
                    var s = array[o];
                    n.push(s);
                }
                e.setData({
                    list: n
                });
            } else a.servercode(t.data.code);
        });
    }
});