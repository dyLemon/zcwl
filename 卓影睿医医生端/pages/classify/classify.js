function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp();

Page({
    data: {
        svwidth: 0,
        positionlist: [],
        videolist:[],
        vcount:0,
        select: {},
        partheight: 0,
        templateheight: 0,
        command:0,        //选择  0方案  1视频
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        var t = this;
        a.servercode('onshow调用')
        a.webpost('getplanvideoclassify', {
            token: a.globalData.userData.token,
            command: a.globalData.selectkind.command,
            index: a.globalData.selectkind.index
        }, function(e) {
            if(0!=e.data.code){
                a.servercode(e.data.code)
                wx.navigateBack({
                  delta: 1,
                })
                return;
            }
                t.setData({
                    positionlist: e.data.positionlist,
                    command:a.globalData.selectkind.command
                }), console.log(t.data);
                for (var i = 0, l = 0; l < t.data.positionlist.length; l++) i += t.data.positionlist[l].name.length, 
                i += 3, console.log(i);
                if (i--, t.setData({
                    svwidth: 28 * i
                }), null == a.globalData.planselect) {
                    console.log("全局空"), console.log(t.data.positionlist);
                    var s = -1, n = -1, o = -1;
                    null != t.data.positionlist && 0 != t.data.positionlist.length && (s = 0), 0 == s && null != t.data.positionlist[0].partlist && 0 != t.data.positionlist[0].partlist.length && (n = 0), 
                    0 == s && 0 == n && null != t.data.positionlist[0].partlist[0].templatelist && 0 != t.data.positionlist[0].partlist[0].templatelist.length && (o = 0), 
                    a.globalData.planselect = {
                        position: {
                            index: s,
                            id: -1 == s ? 0 : t.data.positionlist[0].id,
                            name: -1 == s ? "" : t.data.positionlist[0].name
                        },
                        part: {
                            index: n,
                            id: -1 == n ? 0 : t.data.positionlist[0].partlist[0].id,
                            name: -1 == n ? "" : t.data.positionlist[0].partlist[0].name
                        },
                        template: {
                            index: o,
                            id: -1 == o ? 0 : t.data.positionlist[0].partlist[0].templatelist[0].id,
                            name: -1 == o ? "" : t.data.positionlist[0].partlist[0].templatelist[0].name
                        }
                    }, t.setData({
                        select: a.globalData.planselect
                    });
            
            } else t.setData({
                select: a.globalData.planselect
            });
            if (1==a.globalData.selectkind.command) {
                t.vedioquery(t.data.positionlist[0].partlist[0].id)
            }else{
                wx.getSystemInfo({
                success: function(a) {
                    t.setData({
                        partheight: a.windowHeight * (750 / a.screenWidth) - 200
                    });
                    var e = t.data.partheight, i = 0;
                    -1 != t.data.select.part.index && null != t.data.positionlist[t.data.select.position.index].partlist[t.data.select.part.index].templatelist && (i = 88 * t.data.positionlist[t.data.select.position.index].partlist[t.data.select.part.index].templatelist.length), 
                    e > i ? t.setData({
                        templateheight: i
                    }) : t.setData({
                        templateheight: e
                    });
                }})
            }
            
            console.log(t.data);
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    departmentchange: function(t) {
        var e = this, i = -1, l = -1;
        null != e.data.positionlist[t.detail.value].partlist && 0 != e.data.positionlist[t.detail.value].partlist.length && (i = 0), 
        0 == i && null != e.data.positionlist[t.detail.value].partlist[0].templatelist && 0 != e.data.positionlist[t.detail.value].partlist[0].templatelist.length && (l = 0), 
        e.setData({
            select: {
                position: {
                    index: t.detail.value,
                    id: e.data.positionlist[t.detail.value].id,
                    name: e.data.positionlist[t.detail.value].name
                },
                part: {
                    index: i,
                    id: -1 == i ? 0 : e.data.positionlist[t.detail.value].partlist[0].id,
                    name: -1 == i ? "" : e.data.positionlist[t.detail.value].partlist[0].name
                },
                template: {
                    index: l,
                    id: -1 == l ? 0 : e.data.positionlist[t.detail.value].partlist[0].templatelist[0].id,
                    name: -1 == l ? "" : e.data.positionlist[t.detail.value].partlist[0].templatelist[0].name
                }
            }
        }), a.globalData.planselect = e.data.select;
        var s = e.data.partheight, n = 0;
        -1 != e.data.select.part.index && null != e.data.positionlist[e.data.select.position.index].partlist[e.data.select.part.index].templatelist && (n = 88 * e.data.positionlist[e.data.select.position.index].partlist[e.data.select.part.index].templatelist.length), 
        s > n ? e.setData({
            templateheight: n
        }) : e.setData({
            templateheight: s
        });
    },
    partchange: function(e) {
        var i, l = this, s = -1;
        null != l.data.positionlist[l.data.select.position.index].partlist[e.detail.value].templatelist && 0 != l.data.positionlist[l.data.select.position.index].partlist[e.detail.value].templatelist.length && (s = 0), 
        console.log(s), l.setData((i = {}, t(i, "select.part", {
            index: e.detail.value,
            id: l.data.positionlist[l.data.select.position.index].partlist[e.detail.value].id,
            name: l.data.positionlist[l.data.select.position.index].partlist[e.detail.value].name
        }), t(i, "select.template", {
            index: s,
            id: -1 == s ? 0 : l.data.positionlist[l.data.select.position.index].partlist[e.detail.value].templatelist[s].id,
            name: -1 == s ? "" : l.data.positionlist[l.data.select.position.index].partlist[e.detail.value].templatelist[s].name
        }), i)), a.globalData.planselect = l.data.select;
        var n = l.data.partheight, o = 0;
        -1 != l.data.select.template.index && (o = 88 * l.data.positionlist[l.data.select.position.index].partlist[l.data.select.part.index].templatelist.length), 
        n > o ? l.setData({
            templateheight: o
        }) : l.setData({
            templateheight: n
        });
        if (1==l.data.command) {
          l.vedioquery(l.data.positionlist[l.data.select.position.index].partlist[e.detail.value].id)
        }
    },
    vedioquery:function(id){
        var that=this
        console.log('id',id)
          a.webpost('queryvideolist', {
                token: a.globalData.userData.token,
                command:a.globalData.selectkind.command,
                partid: id
            },function(res){
                console.log('视频查询',res)
                if (0==res.data.code) {
                    var vlist=[]
                    var v;
                    for(var i=0;i<res.data.actorlist.length;i++){
                        v=res.data.actorlist[i]
                        v.checked=false;
                        vlist.push(v)
                    }
                    that.setData({videolist:vlist,vcount:0})
                    a.globalData.videoselect=[]   //清空上次选的视频列表
                    wx.getSystemInfo({
                        success: function(a) {
                            that.setData({
                                partheight: a.windowHeight * (750 / a.screenWidth) - 200
                            });
                            var e = that.data.partheight, i = 0;
                            i = 88 * res.data.actorlist.length
                            e > i ? that.setData({
                                templateheight: i
                            }) : that.setData({
                                templateheight: e
                            });
                        }})


                }else{
                    a.servercode(res.data.code)
                }
            })
    },
    templatechange: function(e) {
        this.setData(t({}, "select.template", {
            index: e.detail.value,
            id: this.data.positionlist[this.data.select.position.index].partlist[this.data.select.part.index].templatelist[e.detail.value].id,
            name: this.data.positionlist[this.data.select.position.index].partlist[this.data.select.part.index].templatelist[e.detail.value].name
        })), a.globalData.planselect = this.data.select;
    },
    videochange:function(e){
        console.log(e)
        var sl=e.detail.value
        var vl=this.data.videolist
        var slconfirm=[]
        var checked
        for(var i=0;i<vl.length;i++){
            checked=false
            for(var j=0;j<sl.length;j++){
                if(i==sl[j]){
                    checked=true
                    slconfirm.push(vl[j])
                    break
                }
            }
            vl[i].checked=checked
        }
        a.globalData.videoselect=slconfirm
        this.setData({videolist:vl,vcount:slconfirm.length})
    },
    confirm: function() {
        wx.navigateBack({
            delta: 1
        });
    }
});