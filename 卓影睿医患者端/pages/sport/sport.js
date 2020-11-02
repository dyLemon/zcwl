var a = getApp();

Page({
    data: {
        video: [],
        select: 0,
        play: "",
        resources: "",
        height: 0,
        tk: "",
        completions: !1,
        realperson: !0,
        idx: 1,
        showModal: false,
        total: {
            total_count: 0,
            total_num: 0
        },
        comshow:true,
        showsModal:false,
        strat_time:'',
        end_time:''

    },
    onLoad: function (t) {
        var e = this;
        wx.getSystemInfo({
            success: function (t) {
                e.setData({
                    height: t.windowHeight * (750 / t.screenWidth) - 538,
                    tk: a.globalData.stoken
                });
            }
        })

    },
    onReady: function () {},
    showwhat: function () {
        var t = this;
        t.getshowdata();
        // null != a.globalData.planlist && 0 < a.globalData.planlist.length ? a.webpost("/api/queryplandetail", {
        //     token: a.globalData.wxuser.token,
        //     train_id: a.globalData.planlist[0].train_id //方案id
        // }, function (e) {
        //     var o = e.data;
        //     a.globalData.freelist = e.data;
        //     a.webpost("/api/pay/getpaystate", {
        //         studyid: o.train_id,
        //         token: a.globalData.wxuser.token
        //     }, function (e) {
        //         //ishospital   0 医院创建   1院外创建
        //         a.globalData.paystate = e.data.paystate
        //         if (0 == e.data.code && 1 == a.globalData.planlist[0].ishospital && 2 != e.data.paystate && 3 != e.data.paystate) {
        //             o.actorlist = o.acts, o.daynum = o.day_num, o.cycleType = o.cycle_type, o.createtime = o.create_time,
        //                 o.endtime = o.end_time, o.gaptime = o.gap_time, o.groupNum = o.group_num, o.id = o.train_id,
        //                 o.paystate = e.data.paystate, o.price = e.data.price, o.totalprice = e.data.totalprice,
        //                 o.state = e.data.paystate, o.valid = !0;
        //             for (var l = 0; l < o.acts.length; l++) o.actorlist[l].imgpath2 = o.acts[l].actor_display_url2,
        //                 o.actorlist[l].name = o.acts[l].actor_name, o.actorlist[l].repeatcount = o.acts[l].repeat_count,
        //                 o.actorlist[l].keeptime = o.acts[l].keep_time, o.actorlist[l].playcount = o.acts[l].play_count,
        //                 o.actorlist[l].actor_des = o.acts[l].actor_des, o.actorlist[l].imgpath2 = o.acts[l].actor_display_url2;
        //             a.globalData.plandetail = o, a.globalData.remind && (a.globalData.remind = !1,
        //                 wx.navigateTo({
        //                     url: "../../pages/order/order"
        //                 })
        //             );
        //         } else {
        //             if ((2 == a.globalData.paystate && 1 == a.globalData.planlist[0].ishospital) || 0 == a.globalData.planlist[0].ishospital) {
        //                 t.getshowdata();
        //             } else {
        //                 t.setData({
        //                     video: [],
        //                     play: ""
        //                 })
        //             }
        //         }
        //     });
        // }) : t.setData({
        //     video: [],
        //     play: ""
        // });

    },
    //隐藏
    hideBaitiaoView(e) {
        this.setData({
            showModal: false,
        })

        if (this.data.total.total_count == this.data.total.total_num) {
            this.setData({
                showModal: false,
                showsModal: true
            })
        }
        this.backtext();

    },
    backtext() {
        a.webpost('getplantime', {
            study_id: Number(a.globalData.freelist.train_id),
            token: a.globalData.wxuser.token
        }, (e) => {
            if (e.data.code == 0) {
                this.setData({
                    strat_time: e.data.strat_time,
                    end_time: e.data.end_time
                })
            } else {
                a.servercode(e.data.code);
            }

        });
    },
    hideBaitiaoViews() {
        this.setData({
            showsModal: false
        })
    },
    getshowdata: function () {
        var t = this;
       
                var o;
                console.log('视频列表信息',a.globalData.docter.acts)
                o = t.data.realperson ? a.globalData.docter.acts[0].actor_url2 : a.globalData.docter.acts[0].actor_url,
                    t.setData({
                        video: a.globalData.docter.acts,
                        play: o,
                        resources: a.globalData.surl,
                        completions: a.globalData.docter.total_num == a.globalData.docter.total_count
                    }), a.webpost('setrefundtag', {
                        token: a.globalData.wxuser.token,
                        studyid: a.globalData.docter.study_id
                    }, function (a) {});
        
    },
    onShow: function () {
        var _this = this;
        _this.setData({
            video: [],
            play: ""
        });
        _this.showwhat();
        // a.webpost("/api/querytrainplanpatient", {
        //     token: a.globalData.wxuser.token,
        //     id: a.globalData.wxuser.userid //患者id
        // }, (e) => {
        //     let {
        //         code,
        //         plans
        //     } = e.data;
        //     console.log(e);

        //     if (code == 0) {
                let json = {
                    study_id: (a.globalData.planlist[0]).train_id,
                    token: a.globalData.wxuser.token
                }
                a.webpost('getplanendtime', json, res => {
                    console.log(res);
                    if (res.data.code == 14) {
                        this.setData({
                            comshow: false
                        })
                    } else if (res.data.code == 0) {
                        this.setData({
                            comshow: true
                        })
                    } else {
                        a.servercode(res.data.code);
                    }
                })
        //     }

        // })



    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    selectv: function (a) {
        var t;
        t = this.data.realperson ? this.data.video[a.target.id].actor_url2 : this.data.video[a.target.id].actor_url,
            this.setData({
                play: t,
                select: a.target.id
            });
    },
    complete: function () {
        var t = this;

        a.webpost('accomplishsport', {
            study_id: a.globalData.docter.study_id,
            token: a.globalData.wxuser.token
        }, function (e) {
            if (e.data.code == 0) {
                t.setData({
                    ["total.total_num"]: e.data.total_num,
                    ["total.total_count"]: e.data.total_count,
                    showModal: true
                })

            } else {
                a.servercode(e.data.code);
            }

        });
        t.onShow();
    },
    //进入反馈
    feedbackbtn() {

        wx.navigateTo({
            url: `../../pages/feedback/feedback?total=${JSON.stringify(this.data.total)}`
        })
        this.setData({
            showModal: false
        })
    },
    turn: function () {
        var a;
        a = this.data.realperson ? this.data.video[this.data.select].actor_url : this.data.video[this.data.select].actor_url2,
            this.setData({
                realperson: !this.data.realperson,
                play: a
            });
    },
   
});