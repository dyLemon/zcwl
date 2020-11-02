var o = getApp(), a = !1, t = !1;

Page({
    data: {
        resource: "",
        height: 0,
        advisorylist: [],
        page: 0,
        count: 15,
        weburl:''
    },
    onLoad: function(a) {
        console.log("初始化咨询页");
        var t = this;
        null != a.tempArr && JSON.parse(a.tempArr), wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    height: a.screenHeight * (750 / a.screenWidth) - 200,
                    resource: o.globalData.surl,
                    weburl:o.globalData.websurl
                }), console.log(a);
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        o.webpost('certificationstate', {
            user_id: o.globalData.userData.userid,
            token: o.globalData.userData.token
        }, function (e) {
            console.log('认证查询', e)
            if (0 == e.data.code || 2 == e.data.code) {
                if (1 != e.data.state) {
                    wx.switchTab({
                        url: '../myorderlist/myorderlist',
                    })
                    return
                }
            } else {
                t.servercode(e.data.code)
            }
        })
        wx.hideTabBarRedDot({
            index: 1,
          })
        o.globalData.advisoryp = this;
        o.globalData.socketpageshow = 2, o.globalData.advisoryshow = !0, o.globalData.search = "";
        var t = JSON.stringify({
            token: o.globalData.userData.token,
            msgid: 8,
            page: this.data.page,
            pernumber: this.data.count
        });
        o.globalData.sockettask.send({
            data: t,
            fail: function(t) {
                console.log(o.globalData.sockettask), a = !0, o.reconnect();
            }
        });
    },
    reconnectdeal: function() {
        if (a) {
            o.servercode('重连处理')
            var t = JSON.stringify({
                token: o.globalData.userData.token,
                msgid: 8,
                page: this.data.page,
                pernumber: this.data.count
            });
            o.globalData.sockettask.send({
                data: t,
                success: function(o) {
                    a = !1;
                },
                fail: function(t) {
                    console.log(o.globalData.sockettask), a = !0, o.reconnect();
                }
            });
        }
    },
    onHide: function() {
        o.saveexit(this.data,'../advisory/advisory')
        o.globalData.socketpageshow = 0, o.globalData.advisoryshow = !1, console.log("hide");
    },
    onUnload: function() {
        console.log("unload");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    search: function() {
        var o = JSON.stringify({
            entrance: 2
        });
        wx.navigateTo({
            url: "../../pages/search/search?tempArr=" + encodeURIComponent(o),
            success: function(o) {},
            fail: function(o) {},
            complete: function(o) {
                console.log(o);
            }
        });
    },
    delete: function(o) {
        var a = this;
        console.log(o), wx.showModal({
            title: "确认删除",
            content: "",
            success: function(t) {
                if (t.confirm) {
                    var e = a.data.advisorylist;
                    e.splice(o.currentTarget.id, 1), console.log(e), a.setData({
                        advisorylist: e
                    });
                } else t.cancel;
            }
        });
    },
    tstart: function(o) {
        this.startTime = o.timeStamp;
    },
    tend: function(o) {
        this.endTime = o.timeStamp;
    },
    talk: function(a) {
        this.endTime - this.startTime < 350 && (console.log(a.currentTarget.id), o.globalData.patient.id = this.data.advisorylist[a.currentTarget.id].who,
        o.globalData.patient.name=this.data.advisorylist[a.currentTarget.id].name,
        wx.navigateTo({
            url: "../../pages/talk/talk"
        }));
    },
    receivelist: function(a) {
        var e = this;
        console.log(a);
        var n = a.members;
        t && 0 < n.length && (e.setData({
            page: e.data.page + 1
        }), t = !1);
        for (var s = 0; s < n.length; s++) {
            n[s].unread = !0, o.globalData.userData.userid == n[s].msg.from ? n[s].name = n[s].msg.to_name : n[s].name = n[s].msg.from_name, 
            l = [], console.log("id" + n[s].who);
            try {
                var l = wx.getStorageSync("id" + n[s].who);
            } catch (a) {}
            console.log("历史"), console.log(n[s].who), console.log(l.length), 0 < l.length && (console.log(l), 
            console.log(n[s].msg.number), (n[s].msg.number <= l[l.length - 1].number || n[s].who == n[s].msg.to) && (console.log("已读"), 
            n[s].unread = !1));
        }
        e.getavatar(n);
    },
    getavatar: function (list) {
        console.log('传入list',list)
        var that = this
        var arr = []
        for (let index = 0; index < list.length; index++) {
            arr.push(list[index].who)
        }
        o.webpost('getavatar', {
            patient_id: arr,
            token: o.globalData.userData.token
        }, function (e) {
            if (0 == e.data.code) {
                var imgarr=e.data.img_url
                console.log(list);
                console.log(e.data);
                
                for (let index = 0; index < list.length; index++) {
                    var t = list[index]
                    for(var j=0;j<imgarr.length;j++){
                        if(t.who==imgarr[j].patient_id){
                            t.avatar = imgarr[j].img_url
                            break
                        }
                    }
                    list[index] = t
                }
                that.setData({
                    advisorylist: list
                })
                console.log(list);
                
            } else {
                o.servercode(e.data.code)
            }

        })
    },
    bottom: function() {
        t = !0;
        var e = JSON.stringify({
            token: o.globalData.userData.token,
            msgid: 8,
            page: this.data.page,
            pernumber: this.data.count
        });
        o.globalData.sockettask.send({
            data: e,
            fail: function(t) {
               //console.log(o.globalData.sockettask), a = !0, o.reconnect();
            }
        });
    }
});