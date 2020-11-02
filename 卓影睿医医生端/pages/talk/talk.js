var t = getApp(),
    a = "",
    e = [],
    o = (wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight,
        0),
    l = 0,
    n = 0,
    s = !1;

Page({
    data: {
        page: 0,
        count: 15,
        scrollHeight: 0,
        inputBottom: 0,
        user: 0,
        rdate: "1970-01-01 00:00:00",
        resource: "",
        wresource:"",
        avatar:"",
        patientavatar:'',
        sex:0,
        token: "",
        patient: null,
        showcreate: !1
    },
    showdate: function (t, a) {
        var e, o = new Date(this.data.rdate).getTime(),
            l = new Date(t).getTime();
        return console.log(a), (e = !(o <= l) || 1e3 * a < l - o) && this.setData({
            rdate: t
        }), console.log(e), e;
    },
    onLoad: function (a) {
        var e = this;
        e.setData({
            user: t.globalData.userData.userid,
            resource: t.globalData.surl,
            wresource: t.globalData.websurl,
            token: t.globalData.stoken,
            patient: t.globalData.patient
        }), wx.getSystemInfo({
            success: function (t) {
                o = t.windowHeight, l = t.screenWidth;
            }
        }), e.setData({
            scrollHeight: o * (750 / l) - 100
        });
      
    },
    onReady: function () {},
    outdate: function (t) {
        var a = new Date(),
            e = new Date(t),
            o = new Date(a);
        return o.setDate(a.getDate() - 90), e < o;
    },
    gethistory: function (o) {
        var l = this;
        e = [], console.log("历史消息"), console.log(o.msglist);
        var n = [],
            s = [],
            i = [];
        wx.getStorage({
            key: "id" + t.globalData.patient.id,
            complete: function (g) {
                "getStorage:ok" == g.errMsg && (n = g.data, s = g.data);
                o.msglist;
                for (var r, c = 0; c < o.msglist.length; c++) {
                    for (var d = !1, u = 0; u < n.length; u++)
                        if (n[u].number == o.msglist[c].number) {
                            d = !0;
                            break;
                        }
                    if (!d) {
                        r = o.msglist[c];
                        var p = o.msglist[c].text;
                        0 != o.msglist[c].t_type && "" != o.msglist[c].text && (p = JSON.parse(o.msglist[c].text)),
                            r.text = p, s.push(r);
                    }
                    console.log(o.msglist[c]);
                }
                console.log(s);
                for (var f = s.length - 1; f >= 0; f--) {
                    var D = s[f];
                    l.outdate(D.time) && s.splice(f, 1);
                }
                e = s.sort(function (t, a) {
                    return t.number - a.number;
                }), console.log("排序后wreadl", e, s);
                i = []
                for (c = 0; c < e.length; c++) {
                    (r = e[c]).tshow = l.showdate(e[c].time, 60)
                    e[c] = r
                    if (1 == e[c].t_type) {
                        if (null != e[c].text.id) {
                            i.push({
                                studyid: e[c].text.id
                            })
                        }
                    }
                }
                console.log("orderver"), console.log(i), wx.setStorage({
                    data: s,
                    key: "id" + t.globalData.patient.id,
                    success: function (a) {
                        console.log("写入"), console.log("id" + t.globalData.patient.id), console.log(s);
                    },
                    fail: function (t) {
                        console.log("写入失败"), console.log(t);
                    }
                }), 0 < i.length ? t.webpost('querypaystatelist', {
                    paystatelistreq: i,
                    token: t.globalData.userData.token
                }, function (t) {
                    console.log("订单数组"), console.log(t);
                    var o = t.data.paystatelistack;
                    console.log("查询字符状态数组", o), console.log(e);
                    for (var n, s = [], g = 0; g < i.length; g++) {
                        n = !1;
                        if (null == o) break;
                        for (c = 0; c < o.length; c++)
                            if (i[g].studyid == o[c].studyid) {
                                n = !0;
                                break;
                            }
                        console.log(n), n || s.push(i[g]);
                    }
                    console.log("overv", s);
                    for (g = 0; g < e.length; g++)
                        if (1 == e[g].t_type) {
                            var r = e[g];
                            console.log('聊天消息', e[g])
                            if ('string' == typeof (r.text)) {
                                console.log('是字符串', r.text)
                                break;
                            }
                            r.text.valid = true;
                            if (null != o) {
                                for (c = 0; c < o.length; c++)
                                    if (e[g].text.id == o[c].studyid) {
                                        r.text.state = o[c].paystate, r.text.totalprice = o[c].totalprice, r.text.price = o[c].price,
                                            console.log(r);
                                        break;
                                    }
                            }

                            for (var c = 0; c < s.length; c++)
                                if (e[g].text.id == s[c].studyid) {
                                    e[g].text.valid = false;
                                    break;
                                }
                            e[g] = r;
                        }
                    a = "", l.setData({
                        msgList: e,
                        inputVal: a
                    }), console.log(l.data);
                }) : (a = "", l.setData({
                    msgList: e,
                    inputVal: a
                })), l.setData({
                    toView: "msg-" + (e.length - 1)
                });
            }
        }), console.log(this.data);
    },
    receivetalk: function (o) {
        if(o.from!=t.globalData.patient.id&&o.to!=t.globalData.patient.id){
            return
        }
        var l = this;
        if (t.globalData.ordersend) t.globalData.ordersend = !1;
        else {
            console.log("接收"), console.log(o);
            var n = o,
                s = [];
            wx.getStorage({
                key: "id" + t.globalData.patient.id,
                success: function (t) {
                    null != t && (s = t.data);
                }
            });
            var i = o.text;
            0 != o.t_type && (i = JSON.parse(o.text)), n.text = i;
            for (var g = !1, r = 0; r < s.length; r++)
                if (s[r].number == n.number) {
                    g = !0;
                    break;
                }
            var c = s;
            g || (s.push(n), c = s.sort(function (t, a) {
                return t.number - a.number;
            })), wx.setStorage({
                data: c,
                key: "id" + t.globalData.patient.id,
                success: function (a) {
                    console.log("写入"), console.log("id" + t.globalData.patient.id), console.log(s);
                },
                fail: function (t) {
                    console.log("写入失败"), console.log(t);
                }
            }), n.tshow = l.showdate(o.time, 60)
            if (1 == n.t_type) {
                t.webpost('querypaystate', {
                    studyid: t.globalData.plandetail.id,
                    token: t.globalData.userData.token
                }, function (t) {
                    console.log("查询支付状态反馈")
                    if(0 == t.data.code){
                        n.text.state = t.data.paystate 
                        n.text.orderid = t.data.orderid
                        n.text.totalprice = t.data.totalprice
                        n.text.price = t.data.price, n.text.valid = true
                    }else if(14 == t.data.code){
                        n.text.valid = false  
                    } 
                    a = ""
                    if(0!=t.data.orderid){
                        e.push(n)
                    }
                    l.setData({
                        msgList: e,
                        inputVal: a
                    })
                })
            } else(e.push(n), a = "", l.setData({
                msgList: e,
                inputVal: a
            })), l.setData({
                toView: "msg-" + (e.length - 1)
            });
        }
    },
    getavatar(){
        var that=this
        // var arr=[]
        // arr.push(t.globalData.patient.id)
        t.webpost('getavatar', {
          patient_id:  [parseInt(t.globalData.patient.id)],
          token: t.globalData.userData.token
        }, function (e) {
          console.log('患者头像',e)
          if(0==e.data.code){
              that.setData({patientavatar:e.data.img_url[0].img_url})
          }else{
              t.servercode(e.data.code)
          }
        })
      },
      getselfavatar(){
        var that=this
        t.webpost('queryavatar', {
          user_id: t.globalData.userData.userid,
          token: t.globalData.userData.token
        }, function (e) {
          console.log('头像',e)
          if(0==e.data.code){
            if(''!=e.data.img_url){
              that.setData({avatar:t.globalData.websurl+e.data.img_url})
            }else if(0==e.data.sex){
              that.setData({avatar:'https://wxprogram.zc5l.com/img/Doc_male_icon.png'})
            }else{
              that.setData({avatar:'https://wxprogram.zc5l.com/img/Doc_female_icon.png'})
            }
          }else{
            app.servercode(e.data.code)
          }
        })
      },
    onShow: function () {
        wx.setNavigationBarTitle({
            title:t.globalData.patient.name
         })
     this.getavatar()
     this.getselfavatar()
        t.globalData.talkp=this
        t.globalData.socketpageshow = 1;
        var a = JSON.stringify({
            who: t.globalData.patient.id,
            msgid: 6
        });
        t.globalData.sockettask.send({
            data: a,
            fail: function (a) {
                s = !0;
            }
        });
       
    },
    reconnectdeal: function () {
        if (s) {
            var a = JSON.stringify({
                who: t.globalData.patient.id,
                msgid: 6
            });
            t.globalData.sockettask.send({
                data: a,
                success: function (t) {
                    s = !1;
                },
                fail: function (a) {
                    s = !0;
                }
            });
        }
    },
    onHide: function () {
        console.log("talk页隐藏")
        t.globalData.talkp=null
         t.globalData.socketpageshow = 0;
    },
    onUnload: function () {
        console.log("断开");
        t.globalData.talkp=null
         t.globalData.socketpageshow = 0;
    },
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    focus: function (t) {
        n = t.detail.height, console.log(n), this.setData({
            showcreate: !1
        });
    },
    blur: function (t) {
        this.setData({
            scrollHeight: o * (750 / l) - 100,
            inputBottom: 0
        });
    },
    oninput: function (t) {
        a = t.detail.value, console.log(t.detail.value);
    },
    tosend:function(){
        var that=this
        t.webpost('ocrinformation', {
            user_id: t.globalData.userData.userid,
            token: t.globalData.userData.token
          }, function (e) {
            console.log('医生详情',e)
            if (0 == e.data.code) {
               that.sendmsg(e.data.full_name)
            }else{
                t.servercode(e.data.code)
            }
        })
    },
    sendmsg: function (name) {
        var that=this
        var n = JSON.stringify({
            Seq: t.globalData.userData.userid,
            to: t.globalData.patient.id,
            to_name: name,
            msgid: 3,
            t_type: 0,
            text: a
        });
        console.log("发送信息"), console.log(n), t.globalData.sockettask.send({
            data: n,
            success:function(){
                that.setData({inputVal:''})
            },
            fail: function (a) {

            }
        });
    },
    sendClick: function (e) {
        console.log('发送')
        var that = this;
        var o = !0;
        console.log(a.length);
        for (var l = 0; l < a.length; l++)
            if (" " != a[l] && "" != a[l]) {
                console.log("非空"), console.log(a[l]), console.log("非空"), o = !1;
                break;
            }
        if (o) {
            return
        }
        that.tosend();
        // t.webpost(
        //     '/api/doctorMsgSecCheck ',
        //     {content:a},
        //     function(msgc) {
        //         console.log('内容反馈',msgc);
        //         if(0!=msgc.data.errcode){
        //             t.servercode('内容含有违法违规内容');
        //             that.setData({inputVal:''})
        //         }
        //         else{
        //             that.sendmsg();
        //         }
        //     }
        // );
    },
    orderclick: function (a) {
        console.log(a), t.globalData.plandetail = this.data.msgList[a.currentTarget.id].text,
            t.globalData.planauthority = 0, t.webpost('querypaystate', {
                studyid: t.globalData.plandetail.id,
                token: t.globalData.userData.token
            }, function (a) {
                t.globalData.plandetail.state = a.data.paystate, t.globalData.plandetail.orderid = a.data.orderid,
                    t.globalData.plandetail.totalprice = a.data.totalprice, t.globalData.plandetail.price = a.data.price,
                    console.log('点击订单', a),
                    console.log(t.globalData.plandetail),
                    wx.navigateTo({
                        url: "../../pages/plandetails/plandetails"
                    });
            });
    },
    create: function () {
        console.log("患者"), console.log(t.globalData.patient), t.webpost('querypatientdoingplan', {
            id: this.data.patient.id,
            page: 1,
            page_count: 1,
            token: t.globalData.userData.token
        }, function (a) {
            if (0 == a.data.plans.length) {
                // t.globalData.plandetail = {
                //     patientid: t.globalData.patient.id,
                //     recordnumber: t.globalData.patient.study_id,
                //     cycle: 1,
                //     cycleType: 0,
                //     frequency: 0,
                //     gaptime: 1,
                //     groupNum: 1,
                //     daynum: 1,
                //     actorlist: []
                // }
                wx.navigateTo({
                    url: "../../pages/create/create",
                    success: function (t) {},
                    fail: function (t) {},
                    complete: function (t) {}
                })
            } else t.servercode("已有方案正在进行中");
        });
    },
    add: function () {
        this.setData({
            showcreate: !this.data.showcreate
        });
    }
});