var t = getApp();

Page({
    data: {
        top: 0,
        height: 0,
        select: 0,
        tk: "",
        resource: "",
        list: [],
        page: 1,
        count: 10,
    },
    onLoad: function (a) {
        var e = this;
        wx.getSystemInfo({
            success: function (a) {
                e.setData({
                    height: a.windowHeight * (750 / a.screenWidth) - 140,
                    tk: t.globalData.stoken,
                    resource: t.globalData.surl,
                }), console.log(e.data.height);
            }
        });
        if (!t.globalData.login) {
            t.globalData.topage.page='../orderlist/orderlist'
            t.globalData.topage.type=0 
            wx.redirectTo({
              url: '../index/index',
            })
            return
          }
    },
    onReady: function () {},
    onShow: function () {
        if (!t.globalData.login) {
            return
          }
        var a = this;
        console.log("user", t.globalData.wxuser), t.webpost('querypatientplanlist', {
            userid: t.globalData.wxuser.userid,
            option: a.data.select,
            pagecount: a.data.count,
            pagenumber: a.data.page,
            token: t.globalData.wxuser.token
        }, function (e) {
            console.log("我的"), console.log(e);
            var b = e.data.studypaystatelist;
            var o=[];
            if ( null != b&& 0 < b.length){
                for(var i=0;i<b.length;i++){
                    // if(0==b[i].ishospital)
                    {
                        o.push(b[i]);
                    }
                }
            }
            if (0 == e.data.code && 0 < o.length) {
                for (var s = [], i = 0; i < o.length; i++) s.push({
                    studyid: o[i].studyid
                });
                console.log('查询支付状态')
                t.webpost('querypaystatelist', {
                    paystatelistreq: s,
                    token: t.globalData.wxuser.token
                }, function (t) {
                    var e = t.data.paystatelistack;
                    console.log(e);
                    for (var s = 0; s < o.length; s++) {
                        for (var i = 0; i < e.length; i++) {
                            var n = e[i];
                            if (n.studyid == o[s].studyid) {
                                o[s].totalprice = n.totalprice, o[s].price = n.price;
                                break;
                            }
                        }
                    }
                    a.setData({
                        list: o
                    }), console.log("最终list"), console.log(o);
                });
            } else a.setData({
                list: []
            });
        });
    },
    onHide: function () {
        t.saveexit(this.data,'../orderlist/orderlist')
    },
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {
        var a = this,
            e = a.data.list;
        t.webpost('querypatientplanlist', {
            userid: t.globalData.wxuser.userid,
            option: a.data.select,
            pagecount: a.data.count,
            pagenumber: a.data.page + 1,
            token: t.globalData.wxuser.token
        }, function (t) {
            if (console.log("我的"), console.log(t), t.data.studypaystatelist.length > 0) {
                for (var o = 0; o < t.data.studypaystatelist.length; o++) e.push(t.data.studypaystatelist[o]);
                a.setData({
                    list: e,
                    page: a.data.page + 1
                });
            }
        });
    },
    onShareAppMessage: function () {},
    all: function () {
        0 != this.data.select && (this.setData({
            select: 0
        }), this.onShow());
    },
    paying: function () {
        1 != this.data.select && (this.setData({
            select: 1
        }), this.onShow());
    },
    payed: function () {
        2 != this.data.select && (this.setData({
            select: 2
        }), this.onShow());
    },
    scrollTopFun: function (t) {
        this.setData({
            top: t.detail.scrollTop
        });
    },
    pay: function (a) {
        var e = this,
            o = e.data.list[a.currentTarget.id].price;
        t.webpost('querypaystate', {
            studyid: e.data.list[a.currentTarget.id].studyid,
            token: t.globalData.wxuser.token
        }, function (s) {
            2 != s.data.paystate ? t.webpost('payoder', {
                study_id: e.data.list[a.currentTarget.id].studyid,
                price: o,
                open_id: t.globalData.wxuser.openid
            }, function (a) {
                console.log(t.globalData.doctor.study_id), console.log(t.globalData.wxuser.openid),
                    console.log(o), console.log("pay"), console.log(a.data), wx.requestPayment({
                        nonceStr: a.data.nonceStr,
                        package: a.data.package,
                        paySign: a.data.paySign,
                        timeStamp: a.data.timeStamp,
                        signType: "MD5",
                        success: function (t) {
                            wx.showToast({
                                title: "支付成功",
                                icon: "success",
                                duration: 3e3
                            }), e.onShow();
                        },
                        fail: function (o) {
                            console.log("fail"), t.servercode(o), t.webpost('closeoder', {
                                order_id: a.data.order_id
                            }, function (t) {
                                console.log(t);
                            }), e.onShow();
                        }
                    });
            }) : wx.showToast({
                title: "已被支付",
                icon: "none",
                duration: 3e3
            });
        });
    },
    refund: function (a) {
        var e = this;
        wx.showModal({
            cancelColor: "cancelColor",
            content: "确认退款",
            success: function (o) {
                o.confirm && t.webpost('querypaystate', {
                    studyid: e.data.list[a.currentTarget.id].studyid,
                    token: t.globalData.wxuser.token
                }, function (o) {
                    console.log("oderid"), console.log(o), t.webpost('refund', {
                        order_id: o.data.orderid,
                        fee: e.data.list[a.currentTarget.id].price
                    }, function (a) {
                        console.log('退款返回',a)
                        var ja=a.data
                        console.log(a), 0 == ja.code ? (wx.showToast({
                            title: "退款成功",
                            icon: "success",
                            duration: 3e3
                        }), t.globalData.remind = !1, e.onShow()) : t.servercode(ja.msg);
                    });
                });
            }
        });
    },
    select: function (a) {
        var e = this;
        console.log(e.data.list[a.currentTarget.id].studyid), t.webpost('queryplandetail', {
            token: t.globalData.wxuser.token,
            train_id: e.data.list[a.currentTarget.id].studyid
        }, function (a) {
            console.log(a);
            var e = a.data;
            t.webpost('querypaystate', {
                studyid: e.train_id,
                token: t.globalData.wxuser.token
            }, function (a) {
                if (console.log("paystate", a), 0 == a.data.code) {
                    e.actorlist = e.acts, e.daynum = e.day_num, e.cycleType = e.cycle_type, e.createtime = e.create_time,
                        e.endtime = e.end_time, e.gaptime = e.gap_time, e.groupNum = e.group_num, e.id = e.train_id,
                        e.paystate = a.data.paystate, e.price = a.data.price, e.totalprice = a.data.totalprice,
                        e.state = a.data.paystate, e.valid = !0;
                    for (var o = 0; o < e.acts.length; o++) e.actorlist[o].imgpath2 = e.acts[o].actor_display_url2,
                        e.actorlist[o].name = e.acts[o].actor_name, e.actorlist[o].repeatcount = e.acts[o].repeat_count,
                        e.actorlist[o].keeptime = e.acts[o].keep_time, e.actorlist[o].playcount = e.acts[o].play_count,
                        e.actorlist[o].actor_des = e.acts[o].actor_des, e.actorlist[o].imgpath2 = e.acts[o].actor_display_url2;
                    console.log("订单详情", e), t.globalData.plandetail = e, wx.navigateTo({
                        url: "../../pages/order/order"
                    });
                }
            });
        });
    }
});