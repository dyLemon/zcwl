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
        plandetail: {},
        patient: {},
        orderdata: {
            state: 0
        },
        resource: "",
        starttime: "",
        endtime: "",
        planauthority: 0,
        token: ""
    },
    onLoad: function (a) {
        var e = this;
        const exitState = this.exitState
        this.setData()
        console.log(t.globalData.userData.token), console.log("详情", t.globalData.plandetail),
            e.setData({
                patient: t.globalData.patient,
                starttime: t.globalData.plandetail.starttime,
                endtime: t.globalData.plandetail.endtime,
                resource: t.globalData.surl,
                planauthority: t.globalData.planauthority,
                token: t.globalData.stoken
            }), console.log(e.data), wx.getSystemInfo({
                success: function (a) {
                    console.log("res"), console.log(a), e.setData({
                        height: (a.windowHeight) * (750 / a.screenWidth) - 430
                    }), console.log(e.data.height);
                }
            });
    },
    onReady: function () {},
    onShow: function () {
        var that = this
        t.webpost('querypatientdetail', {
                token: t.globalData.userData.token,
                patient_id: t.globalData.plandetail.patientid
            },
            function (res) {
                if (0 == res.data.code) {
                    var patient = {};
                    patient.name = res.data.patient_name
                    patient.sex = res.data.patient_sex
                    patient.age = res.data.patient_age
                    that.setData({
                        patient: patient
                    });
                } else {
                    t.servercode(res.data.code)
                }

            })
        this.setData({
            plandetail: t.globalData.plandetail
        });
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    video: function (a) {
        console.log(this.data.plandetail.actorlist[a.currentTarget.id]), t.globalData.videoid = a.currentTarget.id,
            wx.navigateTo({
                url: "../../pages/video/video"
            });
    },
    sendoder: function () {
        if (!t.globalData.ordersend) {
            t.globalData.ordersend = !0, wx.navigateTo({
                url: "../../pages/talk/talk"
            });
            var a = JSON.stringify({
                Seq: t.globalData.userData.userid,
                to: t.globalData.patient.id,
                to_name: t.globalData.patient.name,
                msgid: 3,
                t_type: 1,
                text: JSON.stringify(t.globalData.plandetail)
            });
            console.log(t.globalData.sockettask), t.globalData.sockettask.send({
                data: a,
                fail: function (a) {
                    //t.servercode("聊天服务器连接失败");
                }
            });
        }
    },
    talk: function () {
        wx.navigateTo({
            url: "../../pages/talk/talk"
        });
    },
    comfirm: function () {
        wx.navigateBack({
            complete: function (a) {}
        });
    },
    plandelete: function (e) {
        console.log(e.currentTarget.id);
        var o = this.data.plandetail.actorlist;
        o.splice(e.currentTarget.id, 1), this.setData(a({}, "plandetail.actorlist", o)),
            t.globalData.plandetail.actorlist = o;
    }
});