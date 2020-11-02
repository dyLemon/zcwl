var t = getApp(),
    e = "",
    o = [],
    a = (wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight,
        0),
    l = 0,
    s = 0,
    n = !1;

var totallist, orderlist;

function sortlist(list) {
    var idx
    for (var i = 0; i < list.length - 1; i++) {
        idx = i
        for (var j = i + 1; j < list.length; j++) {
            if (list[idx].number > list[j].number) {
                idx = j
            }
        }
        if (idx != i) {
            var tm = list[i]
            list[i] = list[idx]
            list[idx] = tm
        }
    }
}

Page({
    data: {
        page: 0,
        count: 15,
        scrollHeight: 0,
        inputBottom: 0,
        patient: 0,
        rdate: "1970-01-01 00:00:00",
        resource: "",
        wresource: '',
        toView: "",
        doctorname: "",
        token: "",
        avatar: '',
        selfavatar: '',
        sex: 0,
        msgList: []
    },
    showdate: function (t, e) {
        var o = new Date(this.data.rdate).getTime()
        var a
        if (null != t) {
            a = new Date(t).getTime();
        } else {
            a = new Date().getTime();
        }

        return !(o <= a) || 1e3 * e < a - o;
    },
    onLoad: function (e) {
        var o = this;
        t.globalData.talkp = o, o.setData({
            patient: t.globalData.wxuser.userid,
            resource: t.globalData.surl,
            wresource: t.globalData.wsurl,
            token: t.globalData.stoken,
            doctorname: t.globalData.doctor.username
        }), wx.getSystemInfo({
            success: function (t) {
                a = t.windowHeight, l = t.screenWidth;
            }
        }), o.setData({
            scrollHeight: a * (750 / l) - 100
        });
        wx.setNavigationBarTitle({
            title:o.data.doctorname
         })

    },
    outdate: function (t) {
        var e = new Date()
        var o = new Date(t)
        var a
        if (null == e) {
            a = e
        } else {
            a = new Date(e);
        }

        return a.setDate(e.getDate() - 90), o < a;
    },
    showdatelist: function () { //显示消息前调用显示时间处理
        for (var i = 0; i < totallist.length; i++) {
            totallist[i].tshow = this.showdate(totallist[i].time)
        }
    },
    odermsgdetail: function (list) {
        var that = this
        t.webpost('querypaystatelist', {
            paystatelistreq: list,
            token: t.globalData.wxuser.token
        }, function (res) {
            if (0 == res.data.code) {
                console.log('查询返回', res)
                var tl = res.data.paystatelistack
                var find
                for (var i = 0; i < orderlist.length; i++) {
                    find = -1
                    for (var j = 0; j < tl.length; j++) {
                        if (tl[j].studyid == totallist[orderlist[i]].text.id) {
                            find = j
                            break
                        }
                    }
                    console.log()
                    if (-1 != find) {

                        var oder = totallist[orderlist[i]].text
                        oder.price = tl[find].price
                        oder.state = tl[find].paystate
                        oder.valid = true
                        totallist[orderlist[i]].text = JSON.parse(JSON.stringify(oder))
                    } else {
                        console.log('无', totallist[orderlist[i]])
                        totallist[orderlist[i]].text.valid = false
                    }
                }
                console.log('查完价格totallist', totallist)
                sortlist(totallist)
                that.showdatelist() //显示消息前调用显示时间处理
                console.log('写入力士的两倍',totallist)
                wx.setStorage({
                    data: totallist,
                    key: "talk" + t.globalData.doctor.id,
                    fail(e){
                        t.servercode(e)
                    }
                })
                that.setData({
                    msgList: totallist,
                    inputVal: '',
                    toView: "msg-" + (totallist.length - 1)
                })
            } else {
                t.servercode(res.data.code)
                sortlist(totallist)
                that.showdatelist() //显示消息前调用显示时间处理
                wx.setStorage({
                    data: totallist,
                    key: "talk" + t.globalData.doctor.id,
                    fail(e){
                        t.servercode(e)
                    }
                })
                that.setData({
                    msgList: totallist,
                    inputVal: '',
                    toView: "msg-" + (totallist.length - 1)
                })
            }
        })
    },
    tototaillist: function (msglist, histlist) {
        console.log('hist列表', histlist)
        console.log('msf列表', msglist)
        var tr=[]
        if ('undefined' != typeof (histlist) && 0 != histlist.length) {
            totallist = JSON.parse(JSON.stringify(histlist))
            tr=JSON.parse(JSON.stringify(totallist))
            var samemsg
            for (var i = 0; i < msglist.length; i++) {
                samemsg = false;
                for (var j = 0; j < histlist.length; j++) {
                    if (msglist[i].number == histlist[j].number) {
                        samemsg = true
                        break
                    }
                }
                if (!samemsg) {
                    totallist.push(msglist[i])
                    tr.push(msglist[i])
                }
            }
        } else {
            console.log(msglist)
            totallist = JSON.parse(JSON.stringify(msglist))
            tr== JSON.parse(JSON.stringify(msglist))
        }
        console.log('总列表', t.globalData.doctor.id, totallist)
        
        console.log('历史写入',tr)
        
    },
    getorderlist: function () {
        var rl = []
        orderlist = []
        console.log('getoder', totallist)
        for (var i = 0; i < totallist.length; i++) {
            console.log(totallist[i])
            if (1 == totallist[i].t_type) {
                orderlist.push(i)
                var text={}
                if ('object' == typeof (totallist[i].text)) {
                    text = JSON.parse(JSON.stringify(totallist[i].text))
                } else if ('' != totallist[i].text) {
                    text = JSON.parse(totallist[i].text)
                }
                console.log('text', text)
                text.state = 0
                text.valid = false
                totallist[i].text = text
                if ('undefined' != typeof (text.id)) {
                    rl.push({
                        studyid: text.id
                    })
                }
            }
        }
        console.log('订单列表生成后', totallist, rl, orderlist)
        return rl
    },
    gethistory: function (msg) {
        var that = this
        //oder数组(在totallist的index)
        totallist = [] //最终消息数组
        var msglist = msg.msglist
        wx.getStorage({
            key: "talk" + t.globalData.doctor.id,
            complete: function (res) {
                var histlist = res.data
                that.tototaillist(msglist, histlist) //得到总消息列表               
                var reqlist = that.getorderlist() //得到订单消息列表
                console.log(reqlist)
                if (0 != reqlist.length) {
                    that.odermsgdetail(reqlist) //处理订单消息
                } else {
                    sortlist(totallist)
                    console.log('下入列表力士',totallist)
                    wx.setStorage({
                        data: totallist,
                        key: "talk" + t.globalData.doctor.id,
                        fail(e){
                            t.servercode(e)
                        }
                    })
                    that.setData({
                        msgList: totallist,
                        inputVal: '',
                        toView: "msg-" + (totallist.length - 1)
                    })
                }
                // wx.setStorage({
                //     data: that.data.msgList,
                //     key: "talk" + t.globalData.doctor.id
                // })
                console.log('显示', that.data.msgList)
            }
        })
    },
    // gethistory2: function (a) {
    //     var l = this;
    //     o = [], console.log("历史消息"), console.log(a.msglist);
    //     var s = [],
    //         n = [],
    //         i = [];
    //     wx.getStorage({
    //         key: "talk" + t.globalData.wxuser.userid,
    //         complete: function (r) {
    //              "getStorage:ok" == r.errMsg && (s = r.data, n = r.data);
    //             a.msglist;
    //             for (var g, c = 0; c < a.msglist.length; c++) {
    //                 for (var d = !1, u = 0; u < s.length; u++)
    //                     if (s[u].number == a.msglist[c].number) {
    //                         d = !0;
    //                         break;
    //                     }
    //                 if (!d) {
    //                     g = a.msglist[c];
    //                     var p = a.msglist[c].text;
    //                     0 != a.msglist[c].t_type && "" != a.msglist[c].text && (p = JSON.parse(a.msglist[c].text)),
    //                         g.text = p, console.log(p), n.push(g);
    //                 }
    //                 console.log(a.msglist[c]);
    //             }
    //             console.log("读取list"), console.log(n);
    //             for (var f = n.length - 1; f >= 0; f--) {
    //                 var h = n[f];
    //                 console.log('h.time',h)
    //                 l.outdate(h.time) && n.splice(f, 1);
    //             }
    //             o = n.sort(function (t, e) {
    //                 return t.number - e.number;
    //             });
    //             for (c = 0; c < o.length; c++)(g = o[c]).tshow = l.showdate(o[c].time, 60), o[c] = g,
    //             console.log('o[c].time',o[c]),1 == o[c].t_type && i.push({
    //                     studyid: o[c].text.id
    //                 });
    //             wx.setStorage({
    //                 data: n,
    //                 key: "talk" + t.globalData.wxuser.userid
    //             }),

    //             if(0 < i.length){
    //                 l.odermsgdetail(i)
    //             }
    //             console.log(i), console.log(o),  ? t.webpost('querypaystatelist', {
    //                 paystatelistreq: i,
    //                 token: t.globalData.wxuser.token
    //             }, function (t) {
    //                 console.log("订单数组"), console.log(t);
    //                 var a = t.data.paystatelistack;
    //                 console.log(o);
    //                 for (var s, n = [], r = 0; r < i.length; r++) {
    //                     s = !1;
    //                     if(null!=a){
    //                     for (c = 0; c < a.length; c++)
    //                         if (i[r].studyid == a[c].studyid) {
    //                             s = !0;
    //                             break;
    //                         }
    //                     }
    //                     console.log(s), s || n.push(i[r]);
    //                 }
    //                 console.log("overv", n);
    //                 for (r = 0; r < o.length; r++)
    //                     if (1 == o[r].t_type) {
    //                         var g = o[r];
    //                         g.text.valid = !0;
    //                         if (null != a) {
    //                             for (c = 0; c < a.length; c++)
    //                                 if (o[r].text.id == a[c].studyid) {
    //                                     g.text.state = a[c].paystate, g.text.totalprice = a[c].totalprice, g.text.price = a[c].price;
    //                                     break;
    //                                 }
    //                         }
    //                         for (var c = 0; c < n.length; c++)
    //                             if (o[r].text.id == n[c].studyid) {
    //                                 g.text.valid = !1;
    //                                 break;

    //                             }

    //                         o[r] = g;
    //                     }
    //                 e = "", l.setData({
    //                     msgList: o,
    //                     inputVal: e
    //                 }), console.log(l.data);
    //             }) : (e = "", l.setData({
    //                 msgList: o,
    //                 inputVal: e
    //             })), l.setData({
    //                 toView: "msg-" + (o.length - 1)
    //             });
    //         }
    //     }), console.log(this.data);
    // },
    receivetalk: function (a) {
        console.log('处理接受', a);
        var that = this
        if (a.from != t.globalData.doctor.id && a.to != t.globalData.doctor.id) {
            return
        }
        console.log('开始列表', that.data.msgList, 't.globalData.doctor.id', t.globalData.doctor.id)
        wx.getStorage({
            key: "talk" + t.globalData.doctor.id,
            success: function (rt) {
                that.talkdatadetial(rt.data, a)
            }
        })

    },
    talkdatadetial: function (rn, a) {
        var l = this,
            n = [],

            s = a
        var i = a.text;
        n = JSON.parse(JSON.stringify(rn))
        o = n
        console.log('异常前', n)
        0 != a.t_type && (i = JSON.parse(a.text)), s.text = i;
        var r = false
        for (var g = 0; g < n.length; g++)
            if (n[g].number == s.number) {
                r = !0;
                break;
            }
        var c = n;
        if (r) {
            n.push(s)
        }
        console.log('数据', n)

        c = n.sort(function (t, e) {
            return t.number - a.number;
        })
        wx.setStorage({
            data: c,
            key: "talk" + t.globalData.doctor.id
        })
        console.log('出生地c', c)
        s.tshow = l.showdate(a.time, 60)
        if (1 == s.t_type) {
            t.webpost('querypaystate', {
                studyid: s.text.id,
                token: t.globalData.wxuser.token
            }, function (t) {
                console.log("查询支付状态", t)
                if (0 == t.data.code) {
                    s.text.state = t.data.paystate
                    s.text.orderid = t.data.orderid
                    s.text.totalprice = t.data.totalprice
                    s.text.price = t.data.price
                    s.text.valid = true
                } else if (14 == t.data.code) {
                    s.text.valid = false
                }
                o.push(s),
                    e = ""
                sortlist(o)
                l.setData({
                    msgList: o,
                    inputVal: e
                });
            })
        } else {
            o.push(s),
                e = ""
            sortlist(o)
            l.setData({
                msgList: o,
                inputVal: e
            })
            l.setData({
                toView: "msg-" + (o.length - 1)
            });
            console.log('最终列表', l.data.msgList)
        }
    },
    onReady: function () {},
    getavatar() {
        var that = this
        // var ar=[]
        // ar.push(t.globalData.wxuser.userid)
        t.webpost('getavatar', {
            patient_id: [parseInt(t.globalData.wxuser.userid)],
            token: t.globalData.wxuser.token
        }, function (e) {
            console.log('头像返回', e)
            if (0 == e.data.code) {
                that.setData({
                    selfavatar: e.data.img_url[0].img_url
                })
            } else {
                t.servercode(0 == e.data.code)
            }
        })
    },
    onShow: function () {
        this.getavatar()
        // wx.hideTabBarRedDot({
        //     index: 1,
        //   })
        this.setData({
            avatar: t.globalData.doctor.img_url,
            sex: t.globalData.doctor.sex
        })
        t.globalData.socketpageshow = 1, console.log(t.globalData.docter);
        var e = JSON.stringify({
            who: t.globalData.doctor.id,
            msgid: 6
        });
        console.log("showsocket"), console.log(t.globalData.sockettask), t.globalData.sockettask.send({
            data: e,
            fail: function (e) {
                console.log(e),
                    //t.servercode("聊天网络重新连接"), 
                    t.lockReconnect = !1, n = !0;
            }
        });
    },
    reconnectdeal: function () {
        if (n) {
            var e = JSON.stringify({
                who: t.globalData.doctor.id,
                msgid: 6
            });
            console.log("showsocket"), console.log(t.globalData.sockettask), t.globalData.sockettask.send({
                data: e,
                success: function (t) {
                    n = !1;
                },
                fail: function (e) {
                    //t.servercode("聊天网络重新连接"), 
                    t.lockReconnect = !1, n = !0;
                }
            });
        }
    },
    onHide: function () {
        console.log("隐藏"), t.globalData.socketpageshow = 0;
        t.saveexit(this.data, '../talk/talk')
    },
    onUnload: function () {
        // console.log("断开"), t.globalData.sockettask.close({
        //     code: 1e3
        // });
        //t.globalData.talkp = null
        t.globalData.socketpageshow = 0;
    },
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    focus: function (t) {
        s = t.detail.height, console.log(s);
    },
    blur: function (t) {
        this.setData({
            scrollHeight: a * (750 / l) - 100,
            inputBottom: 0
        });
    },
    oninput: function (t) {
        e = t.detail.value;
    },
    tosend() {
        var that = this
        t.webpost('querypatientdetail', {
            patient_id: t.globalData.wxuser.userid,
            token: t.globalData.wxuser.token
        }, function (e) {
            if (0 == e.data.code) {
                that.sendmsg(e.data.patient_name)
            } else {
                t.servercode(e.data.code)
            }
        })
    },
    sendmsg: function (name) {
        var that = this
        var s = JSON.stringify({
            Seq: t.globalData.wxuser.userid,
            to: t.globalData.doctor.id,
            to_name: name,
            msgid: 3,
            t_type: 0,
            text: e
        });
        console.log('发送聊天信息')
        t.globalData.sockettask.send({
            data: s,
            success: function () {
                that.setData({
                    inputVal: ''
                })
            },
            fail: function (e) {
                //t.servercode("聊天网络重新连接");
            }
        });
    },
    sendClick: function (o) {
        var that = this;
        var b = !0;
        console.log(e.length);
        for (var l = 0; l < e.length; l++)
            if (" " != e[l] && "" != e[l]) {
                console.log("非空"), console.log(e[l]), console.log("非空"), b = !1;
                console.log(b)
                break;
            }
        if (b) {
            return
        }
        that.tosend();
        // t.webpost(
        //     '/api/doctorMsgSecCheck ',
        //     {content:e},
        //     function(msgc) {
        //         console.log('内容反馈',msgc);
        //         if(0!=msgc.data.errcode){
        //            // t.servercode('内容含有违法违规内容');
        //             that.setData({inputVal:''})
        //         }else{
        //             that.sendmsg();
        //         }
        //     }
        // );
    },
    orderclick: function (e) {
        console.log(e), t.globalData.plandetail = this.data.msgList[e.currentTarget.id].text,
            t.globalData.planauthority = 0, t.webpost('querypaystate', {
                studyid: t.globalData.plandetail.id,
                token: t.globalData.wxuser.token
            }, function (e) {
                t.globalData.plandetail.state = e.data.paystate, t.globalData.plandetail.orderid = e.data.orderid,
                    t.globalData.plandetail.totalprice = e.data.totalprice, t.globalData.plandetail.price = e.data.price,
                    console.log(e), console.log("方案详情", t.globalData.plandetail), wx.navigateTo({
                        url: "../../pages/order/order"
                    });
            });
    }
});