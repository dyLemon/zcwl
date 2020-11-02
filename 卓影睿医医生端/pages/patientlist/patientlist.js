var a = getApp();

Page({
    data: {
        key: "",
        list: [],
        page: 1,
        count: 15,
        resource: "",
        height: 0,
        weburl:'',
    },
    onLoad: function (t) {
        var e = this;
        e.setData(a.globalData.pagedata)
        wx.getSystemInfo({
            success: function (t) {
                e.setData({
                    height: (t.windowHeight) * (750 / t.screenWidth) - 274,
                    resource: a.globalData.surl,
                    weburl:a.globalData.websurl
                });
            }
        });

    },
    onReady: function () {},
    onShow: function () {
        a.webpost('certificationstate', {
            user_id: a.globalData.userData.userid,
            token: a.globalData.userData.token
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

        var t = this;
        t.setData({
                page: 1
            }), console.log("searchkey"), console.log(a.globalData.search),
            a.webpost('querypaientlist', {
                token: a.globalData.userData.token,
                findname: "",
                page: t.data.page,
                page_count: t.data.count,
                // patient_id: 34,
                // name: 'that.data.name',
                // // diagnosis: dos,
                // //diagnosis:that.data.diagnose,
                // diagnosis: '破去给哦热搜我和易敏儿哦哦，哦哦哦婆婆送你恶心咯阿松嗯热敏破瞎了眼婆婆我破下咯哦咯Rom是我咯后抹公婆哦破下咯破越来越咯后咯破咯咯哇热一下楼底下在咯破下咯给我咯咯我和同学热死我破下咯我咯咯婆婆需要我咯',
                // sex: 0,
                // age: 34,
                // pain_area: 'that.data.painarea',
                // pain_cycle: 4,
            }, function (e) {
                if (0 == e.data.code) {
                    t.getavatar(e.data.patients)
                } else {
                    a.servercode(e.data.code)
                }
            });
    },
    getavatar: function (list) {
        var that = this
        var arr = []
        for (let index = 0; index < list.length; index++) {
            arr.push(list[index].id)
        }
        a.webpost('getavatar', {
            patient_id: arr,
            token: a.globalData.userData.token
        }, function (e) {
            if (0 == e.data.code) {
                var imgarr=e.data.img_url
                for (let index = 0; index < list.length; index++) {
                    var t = list[index]
                    for(var j=0;j<imgarr.length;j++){
                        if(t.id==imgarr[j].patient_id){
                            t.avatar = imgarr[j].img_url
                            break
                        }
                    }
                    list[index] = t
                }
                that.setData({
                    list: list
                })
            } else {
                a.servercode(e.data.code)
            }

        })
    },
    onHide: function () {
        a.saveexit(this.data, '../patientlist/patientlist')
    },
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    createpatient() {
        a.webpost('createpatient', {
                docter_id: a.globalData.userData.userid,
                token: a.globalData.userData.token
            },
            function (res) {
                if (0 == res.data.code) {
                    console.log('生成患者', res.data)
                    a.globalData.createpatientid = res.data.patient_id
                    wx.navigateTo({
                        //url: '../../pages/createpatient/createpatient',
                        url: '../../pages/fullinpatient/fullinpatient'
                    })
                } else {
                    a.servercode(res.data.code)
                }
            })
    },
    oncreatepatient: function () {
        var that = this
        a.webpost('certificationstate', {
            user_id: a.globalData.userData.userid,
            token: a.globalData.userData.token
        }, function (e) {
            console.log('认证状态', e)
            if (1 == e.data.state) {
                that.createpatient();
            } else {
                a.servercode('在“我的”页面完成认证后才能创建')
            }
        })
    },
    search: function () {
        var a = JSON.stringify({
            entrance: 1
        });
        wx.navigateTo({
            url: "../../pages/search/search?tempArr=" + encodeURIComponent(a),
            success: function (a) {},
            fail: function (a) {},
            complete: function (a) {
                console.log(a);
            }
        });
    },
    select: function (t) {
        a.globalData.patient = this.data.list[t.currentTarget.id], console.log(a.globalData.patient),
            wx.navigateTo({
                url: "../patientplan/patientplan",
                // complete(e){
                //     e.eventChannel.emit('ljios')
                //     //a.servercode('跳转'+JSON.stringify(e))
                // }
            });
    },
    bottom: function (t) {
        console.log("bottom");
        var e = this;
        a.webpost('querypaientlist', {
            token: a.globalData.userData.token,
            findname: a.globalData.search,
            page: e.data.page + 1,
            page_count: e.data.count
        }, function (t) {
            if (0 == t.data.code) {
                if (console.log(t), null != t.data.patients && 0 < t.data.patients.length) {
                    e.setData({
                        page: e.data.page + 1
                    });
                    for (var n = e.data.list, o = 0; o < t.data.patients.length; o++) {
                        var s = t.data.patients[o];
                        n.push(s);
                    }
                    e.setData({
                        list: n
                    });
                }
            } else a.servercode(t.data.code);
        });
    }
});