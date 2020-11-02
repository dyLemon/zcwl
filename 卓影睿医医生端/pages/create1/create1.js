// pages/create1/create1.js
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
        top: 0,
        patient: null,
        height: 0,
        bheight: 0,
        partselect: null,
        delBtnWidth: 128,
        isScroll: true,
        resource: "",
        video: [],
        selectlist: [],
        createdata: {},
        items: [{
            name: "天",
            value: 1,
            checked: !0
        }, {
            name: "周",
            value: 0
        }],
        itemsf: [{
            name: "每天",
            value: 0,
            checked: !0
        }, {
            name: "隔天",
            value: 1
        }],
        way: [{
            name: "使用方案",
            value: 0,
            img: "https://wxprogram.zc5l.com/img/logon_pass_icon_p.png",
            imgh: "https://wxprogram.zc5l.com/img/logon_pass_icon_n.png",
            checked: !0
        }, {
            name: "添加视频",
            value: 1,
            img: "https://wxprogram.zc5l.com/img/logon_user_icon_p.png",
            imgh: "https://wxprogram.zc5l.com/img/logon_user_icon_n.png"
        }],
        plantype: [{
            name: "系统方案",
            value: 0,
            checked: !0
        }, {
            name: "医院方案",
            value: 1
        }, {
            name: "我的方案",
            value: 2
        }],
        token: ""
    },
    onLoad: function (a) {
        var e = this;
        wx.getSystemInfo({
            success: function (a) {
                e.setData({
                    height: (a.windowHeight) * (750 / a.screenWidth) - 760,
                    bheight: (a.windowHeight) * (750 / a.screenWidth) - 95,
                    resource: t.globalData.surl,
                    token: t.globalData.stoken,
                    patient: t.globalData.patient
                }), console.log(e.data);
            }
        });
    },
    onReady: function () {},
    getvideo: function (list) {
        var that = this;
        var sl = list;
        var cl = that.data.createdata.actorlist;
        for (var l = 0; l < sl.length; l++) sl[l].repeatcount = 1, sl[l].keeptime = 1,
            sl[l].playcount = 1, sl[l].right = 0;
        for (var i = 0; i < sl.length; i++) {
            var haved = false;
            for (var j = 0; j < cl.length; j++) {
                if (sl[i].id == cl[j].id) {
                    haved = true;
                    break;
                }
            }
            if (!haved) {
                cl.push(sl[i]);
            }
        }
        that.setData({
            "createdata.actorlist": cl
        });

        t.globalData.createselectway = -1;
    },
    queryactor: function (a) {
        var that=this;
        var e 
        if ( 0 != t.globalData.planselect.template.id) {
            e=t.globalData.planselect.template.id
        }else if(0 != t.globalData.planselect.part.id){
            e=t.globalData.planselect.part.id
        }else if(null != t.globalData.planselect){
            e= t.globalData.planselect.position.id
        }
        if (0 == a) {
            console.log('查询视频id',e)
            t.webpost('queryvideolist', {
                token: t.globalData.userData.token,
                command: a,
                partid: e
            }, function (re) {
                if (0 == re.data.code) {
                    that.getvideo(re.data.actorlist)
                } else {
                    t.servercode(re.data.code)
                }
            });
        } else if (1 == a) {
            that.getvideo(t.globalData.videoselect)
        }

    },
    onShow: function () {
        var a = this;
        a.setData({
            // partselect: t.globalData.planselect,
            createdata: t.globalData.plandetail
        });
        console.log("showdata", this.data)
        var e;
        if (-1 != t.globalData.createselectway) {
            a.queryactor(t.globalData.createselectway);
        }
        //e = a.data.way[0].checked ? a.data.way[0].value : a.data.way[1].value, null != t.globalData.planselect && 
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    talk: function () {
        wx.navigateTo({
            url: "../../pages/talk/talk"
        });
    },
    cyclesubstract: function () {
        var a = this;
        if (1 < a.data.createdata.cycle) {
            var t = a.data.createdata;
            t.cycle = t.cycle - 1, a.setData({
                createdata: t
            });
        }
    },
    cycleadd: function () {
        var a = this.data.createdata;
        0 == a.cycleType && 4 > a.cycle ? (a.cycle = a.cycle + 1, this.setData({
            createdata: a
        })) : 1 == a.cycleType && 30 > a.cycle && (a.cycle = a.cycle + 1, this.setData({
            createdata: a
        }));
    },
    cyclechange: function (t) {
        for (var e, l = this.data.items, c = 0; c < l.length; ++c) l[c].checked = l[c].value == t.detail.value,
            l[c].checked && (e = l[c].value);
        this.setData(a({
            items: l
        }, "createdata.cycleType", e)), 0 == e && 4 < this.data.createdata.cycle && this.setData(a({}, "createdata.cycle", 1));
    },
    frequencychange: function (t) {
        for (var e, l = this.data.itemsf, c = 0; c < l.length; ++c) l[c].checked = l[c].value == t.detail.value,
            l[c].checked && (e = l[c].value);
        this.setData(a({
            itemsf: l
        }, "createdata.frequency", e));
    },
    groupsubstract: function () {
        var a = this;
        if (1 < a.data.createdata.groupNum) {
            var t = a.data.createdata;
            t.groupNum = t.groupNum - 1, a.setData({
                createdata: t
            });
        }
    },
    groupadd: function () {
        var a = this.data.createdata;
        a.groupNum = a.groupNum + 1, this.setData({
            createdata: a
        });
    },
    timessubstract: function () {
        var a = this;
        if (1 < a.data.createdata.daynum) {
            var t = a.data.createdata;
            t.daynum = t.daynum - 1, a.setData({
                createdata: t
            });
        }
    },
    timesadd: function () {
        var a = this.data.createdata;
        a.daynum = a.daynum + 1, this.setData({
            createdata: a
        });
    },
    gapsubstract: function () {
        var a = this;
        if (1 < a.data.createdata.gaptime) {
            var t = a.data.createdata;
            t.gaptime = t.gaptime - 1, a.setData({
                createdata: t
            });
        }
    },
    gapadd: function () {
        var a = this.data.createdata;
        a.gaptime = a.gaptime + 1, this.setData({
            createdata: a
        });
    },
    scrollTopFun: function (a) {
        console.log(a.detail), this.setData({
            top: a.detail.scrollTop
        });
    },
    selectplan: function (a) {
        //   for (var e, l, c = this, n = 0; n < c.data.way.length; ++n) if (c.data.way[n].checked) {
        //       e = 0;
        //       break;
        //   }
        var l;
        var c = this;
        for (var n = 0; n < c.data.plantype.length; ++n)
            if (c.data.plantype[n].checked) {
                l = c.data.plantype[n].value;
                break;
            }
        t.globalData.createselectway = 0;
        t.globalData.selectkind = {
            command: 0,
            index: l
        }, wx.navigateTo({
            url: "../../pages/classify/classify",
            success: function (a) {},
            fail: function (a) {},
            complete: function (a) {
                console.log(a);
            }
        });
    },
    selectvideo: function (a) {
        // for (var e, l, c = this, n = 0; n < c.data.way.length; ++n) if (c.data.way[n].checked) {
        //     e = c.data.way[n].value;
        //     break;
        // }
        var l;
        var c = this;
        for (var n = 0; n < c.data.plantype.length; ++n)
            if (c.data.plantype[n].checked) {
                l = c.data.plantype[n].value;
                break;
            }
        t.globalData.createselectway = 1;
        t.globalData.selectkind = {
            command: 1,
            index: l
        }, wx.navigateTo({
            url: "../../pages/classify/classify",
            success: function (a) {},
            fail: function (a) {},
            complete: function (a) {
                console.log(a);
            }
        });
    },
    waychange: function (a) {
        for (var e = this.data.way, l = 0; l < e.length; ++l) e[l].checked = e[l].value == a.detail.value;
        t.globalData.planselect = null, this.setData({
            way: e,
            partselect: null,
            video: []
        });
    },
    plantypechange: function (a) {
        for (var e = this.data.plantype, l = 0; l < e.length; ++l) e[l].checked = e[l].value == a.detail.value;
        t.globalData.planselect = null, this.setData({
            plantype: e,
            partselect: null,
            video: []
        });
    },
    //   selectplan: function() {
    //       for (var t = this.data.selectlist, e = 0; e < this.data.video.length; e++) {
    //           for (var l = !1, c = 0; c < t.length; c++) this.data.video[e].id == t[c].id && (l = !0);
    //           l || t.push(this.data.video[e]);
    //       }
    //       this.setData(a({
    //           selectlist: t
    //       }, "createdata.actorlist", t)), console.log(this.data);
    //   },
    //   selectvideo: function(t) {
    //       if (console.log(this.data.selectlist), console.log(this.data.video[t.currentTarget.id]), 
    //       this.data.way[1].checked) {
    //           for (var e = this.data.selectlist, l = !1, c = 0; c < e.length; c++) this.data.video[t.currentTarget.id].id == e[c].id && (l = !0);
    //           l || (e.push(this.data.video[t.currentTarget.id]), this.setData(a({
    //               selectlist: e
    //           }, "createdata.actorlist", e)));
    //       }
    //   },
    comfirm: function () {
        var that=this
        var a = this.data.createdata;
        if (0 == a.actorlist.length) {
            t.servercode("所选视频为空");
            return;
        }
        console.log('createdata',this.data.createdata)
        for (var i = 0; i < a.actorlist.length; i++) a.actorlist[i].actorid = a.actorlist[i].id;
        a.token = t.globalData.userData.token, console.log('创建方案数据',a), t.webpost('createplan', a, function (e) {
            if (0 == e.data.code) {
                console.log("创建成功")
                console.log(e)
                that.setData({createdata:{}})
                wx.redirectTo({
                    url: "../../pages/patientplan/patientplan"
                })
            } else {
                (console.log(e.data.code), t.servercode(e.data.code));
            }
        });
    },
    viewplan: function (e) {
        0 == this.data.createdata.actorlist.length ? wx.showModal({
            title: "提示",
            content: "暂无可查看方案，请选择方案后查看",
            showCancel: !1
        }) : (t.globalData.plandetail = this.data.createdata, console.log(this.data.createdata),
            t.globalData.videoid = e.currentTarget.id, console.log(e), t.globalData.planauthority = 1,
            wx.navigateTo({
                url: "../../pages/video/video"
            }));
        //   t.globalData.planauthority = 1, wx.navigateTo({
        //       url: "../../pages/plandetails/plandetails"
        //   }));
    },
    drawStart: function (e) {
        // console.log("drawStart");  
        var touch = e.touches[0]

        for (var index in this.data.createdata.actorlist) {
            var item = this.data.createdata.actorlist[index]
            item.right = 0
        }
        this.setData({
            "createdata.actorlist": this.data.createdata.actorlist,
            startX: touch.clientX,
        })

    },
    drawMove: function (e) {
        var touch = e.touches[0]
        var item = this.data.createdata.actorlist[e.currentTarget.dataset.index]
        var disX = this.data.startX - touch.clientX

        if (disX >= 20) {
            if (disX > this.data.delBtnWidth) {
                disX = this.data.delBtnWidth
            }
            item.right = disX
            this.setData({
                isScroll: false,
                "createdata.actorlist": this.data.createdata.actorlist
            })
        } else {
            item.right = 0
            this.setData({
                isScroll: true,
                "createdata.actorlist": this.data.createdata.actorlist
            })
        }
    },
    drawEnd: function (e) {
        var item = this.data.createdata.actorlist[e.currentTarget.dataset.index]
        console.log('dend', this.data)
        if (item.right >= this.data.delBtnWidth / 2) {
            item.right = this.data.delBtnWidth
            this.setData({
                isScroll: true,
                "createdata.actorlist": this.data.createdata.actorlist,
            })
        } else {
            item.right = 0
            this.setData({
                isScroll: true,
                "createdata.actorlist": this.data.createdata.actorlist,
            })
        }
    },
    delItem: function (e) {
        var l = this.data.createdata.actorlist;
        l.splice(e.target.id, 1)
        this.setData({
            isScroll: true,
            "createdata.actorlist": l
        })
        t.globalData.plandetail = this.data.createdata
        console.log(l)
        console.log(e);
    }
});