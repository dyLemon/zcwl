const api = require('utils/api.js')
App({
    globalData: {
        // url: "http://192.168.0.47:808",
        // wsurl: "http://192.168.0.47:2080",
        // surl: "http://192.168.0.47:2080",
        // ws: "ws://192.168.0.33:1083/ws",
        ws: "wss://wxprogram.zc5l.com/wss",
        url: "https://wxprogram.zc5l.com",
        surl: "https://wxprogram.zc5l.com", //视频库资源
        wsurl: 'http://kangfu.zc5l.com', //网站资源

        autologin: false, //自动登录中
        reconnectsokect: false, //聊天服务器重连
        topage:{page:'../orderlist/orderlist',//想去哪个页面
                type:0},  //0 switchTab,1 reLaunch,2 redirectTo,3 avigateTo
        pageurl: '', //退出页面
        version: '', //小程序版本号
        pagedata: {}, //退出页面数据
        planlist: [],
        remind: !0,
        paystate: 0,
        stoken: "",
        sockettask: null,
        socketpageshow: 0,
        socketOnreconect: !1,
        userInfo: null,
        login: false,
        wxuser: null,
        searchkey: '', //医生搜索
        selectdoctor: {}, // 选择医生{doctorid,selecttype: 0为选择，1为扫码选择}
        patientinfo: {}, //患者信息记录最新提交的患者信息
        doctor: {}, //医生
        docter: {}, //方案
        entrance: "sports", //挑转 从公众号那得到，哪个按钮进入
        setInter: "",
        num: 0,
        count: 0,
        plandetail: null,
        talkp: null,
        limit: 0,
        timeout: 1e4,
        timeoutObj: null,
        serverTimeoutObj: null,
        freelist: {},
    },
    api(k) {
        let params = k.split('.'),
            len = params.length,
            apilet = api
        //console.log('k',k,',len',len,',apilet',apilet)
        for (let index = 0; index < len; index++) {
            apilet = apilet[params[index]];
            //console.log(',apilet',apilet)
            if (!apilet) {
                return ''
            }
        }
        return apilet
    },
    loding(b) {
        if (b) {
            wx.showLoading({
                title: '网络数据交互中',
                mask: true
            })
        } else {
            wx.hideLoading({
                success: (res) => {},
            })
        }
    },
    saveexit: function (data, page) {
        var bd = {};
        bd.pagedata = data
        bd.page = page
        bd.appdata = this.globalData
        wx.setStorage({
            data: bd,
            key: 'pagedata',
        })
    },
    start: function () {
        var o = this;
        o.globalData.num = 0, clearInterval(o.globalData.num), o.globalData.num = setInterval(function () {
            o.timer();
        }, 1e3);
    },
    stop: function () {
        clearInterval(this.globalData.num);
    },
    notice: function (o) {
        this.globalData.index = o;
    },
    timer: function () {
        var o = this;
        10 < o.globalData.count ? (o.stop(), o.globalData.login || wx.navigateTo({
            url: "../neterror/neterror",
            success: function (o) {},
            fail: function (o) {},
            complete: function (o) {}
        })) : o.globalData.count++;
    },
    base64encode: function (o) {
        var a, t, e, n, l, c, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
        for (e = o.length, t = 0, a = ""; t < e;) {
            if (n = 255 & o.charCodeAt(t++), t == e) {
                a += s.charAt(n >> 2), a += s.charAt((3 & n) << 4), a += "==";
                break;
            }
            if (l = o.charCodeAt(t++), t == e) {
                a += s.charAt(n >> 2), a += s.charAt((3 & n) << 4 | (240 & l) >> 4), a += s.charAt((15 & l) << 2),
                    a += "=";
                break;
            }
            c = o.charCodeAt(t++), a += s.charAt(n >> 2), a += s.charAt((3 & n) << 4 | (240 & l) >> 4),
                a += s.charAt((15 & l) << 2 | (192 & c) >> 6), a += s.charAt(63 & c);
        }
        return a;
    },
    onLaunch: function () {
        if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {
                console.log('onCheckForUpdate====', res)
                // 请求完新版本信息的回调
                if (res.hasUpdate) {
                    console.log('res.hasUpdate====')
                    updateManager.onUpdateReady(function () {
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function (res) {
                                console.log('success====', res)
                                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    })
                    updateManager.onUpdateFailed(function () {
                        // 新的版本下载失败
                        wx.showModal({
                            title: '自动更新失败',
                            content: '请您删除当前小程序，重新搜索打开'
                        })
                    })
                }
            })
        }
    },
    onLogin: function (fx=null) {
        var o = this,
            a = this;
        console.log("登录")
        wx.login({
            success: function (o) {
                console.log(o)
                //return
                wx.request({
                    url: a.globalData.url + a.api('wxlogin'),
                    data: {
                        code: o.code,
                        ishospital: 1
                    },
                    method: "POST",
                    success(o) {
                        if (0 == o.data.code) {
                            a.globalData.wxuser = o.data, console.log("e.data="), console.log(o),
                                a.globalData.stoken = a.base64encode(a.globalData.wxuser.token), console.log(o.data)
                            console.log('login', a.globalData.login)
                            // if (!a.globalData.login) { 
                                if (null != fx) {
                                    fx();
                                }
                            a.planlogin()
                            // } else {
                            //     a.loding(false)
                               

                            // }
                            console.log('appdata', a.globalData)
                        } else {
                            a.loding(false)
                            a.servercode(o.data.code), console.log('returnmsg', o);
                        }
                        //wx.removeStorageSync('sessionid');
                        //储存res.header['Set-Cookie']
                        //wx.setStorageSync("sessionid", o.header["Set-Cookie"]);
                    },
                    fail(o) {
                        a.loding(false)
                        a.servercode("服务器未反馈");
                    }
                });
            },
            fail(e) {
                console.log(e)
                a.servercode("微信登录失败");
            }
        }), wx.getSetting({
            success: function (a) {
                a.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function (a) {
                        o.globalData.userInfo = a.userInfo, o.logined && o.logined(a);
                    }
                });
            }

        });
    },
    logined: function (o) {
        console.log(o);
    },
    servercode: function (o) {
        var a = o;
        switch (o) {
            case 1:
                a = "服务器错误";
                break;

            case 2:
                a = "数据库错误";
                break;

            case 3:
                a = "账号已存在";
                break;

            case 4:
                a = "账号密码错误";
                break;

            case 5:
                a = "权限错误";
                break;

            case 6:
                a = "请求分页参数不对";
                break;

            case 7:
                a = "请求参数不对";
                break;

            case 8:
                a = "账号禁用";
                break;

            case 9:
                a = "上传文件错误";
                break;

            case 10:
                a = "视频数量超出限制";
                break;

            case 11:
                a = "医院没有视频包";
                break;

            case 12:
                a = "没有权限";
                break;

            case 13:
                a = "账号邮箱错误";
                break;

            case 14:
                a = "没有相关数据";
                break;
            case 15:
                a = "查询关键字没填";
                break;
            case 16:
                a = "训练方案已经创建";
                break;
            case 17:
                a = "训练次数已经完成";
                break;
            case 18:
                a = "密码输入错误次数达到上限";
                break;
            case 19:
                a = "方案视频数量为0";
                break;
            case 20:
                a = "支付状态不对";
                break;
            case 21:
                a = "查看反馈报告没有";
                break;
            case 22:
                a = "添加数据不能为空";
                break;
            case 23:
                a = "已有用户绑定患者信息";
                break;
            case 24:
                a = "验证码错误";
                break;
            case 25:
                a = "已审核通过";
                break;
        }
        wx.showToast({
            title: a,
            icon: "none"
        });
    },
    webpost: function (o, a, t) {
        var that = this
        that.loding(true)
        // wx.checkSession({
        //     success: (res) => {
        //         console.log('session未过期')
        wx.request({
            url: that.globalData.url + that.api(o),
            data: JSON.stringify(a),
            method: "POST",
            header: { //将sessionid放在cookie中以请求头的方式带回给服务端
                'cookie': wx.getStorageSync("sessionid")
            },
            success: function (o) {
                that.loding(false)
                t(o);
            },
            fail: function (e) {
                console.log(e, "接口", o);
                that.loding(false)
                that.servercode("服务器未反馈");
            }
        });
        // },
        //     fail() {
        //         console.log('session未过期')
        //         if(!that.globalData.autologin){
        //             that.onLogin(that.webpost(),o, a, t);
        //         }
        //     }
        // })
    },
    neterror: function (o) {
        console.log(o), wx.navigateTo({
            url: "../neterror/neterror",
            success: function (o) {},
            fail: function (o) {},
            complete: function (o) {}
        });
    },
    planlogin: function () {
        var o = this;
        this.connectsocket(), console.log("doctor"), o.globalData.login = true, o.logined && o.logined("logined");
        this.loding(false)
        console.log('方案登录')
        if(1==o.globalData.selectdoctor.selecttype){
            o.webpost('getqrdoctor', {
                unionid: o.globalData.wxuser.unionid, //e.data.
                token: o.globalData.wxuser.token
              }, function (res) {
                if (0 == res.data.code||2==res.data.code) {
                  o.globalData.selectdoctor.doctorid = res.data.doctor_id //扫码医生
                  wx.redirectTo({
                    url: '../doctor/doctor',
                    success(e){
                        console.log('跳转成功',e)
                    },
                    fail(e){
                        console.log('跳转失败',e)
                    }
                  })
                } else {
                  app.servercode(res.data.code)
                }
              })
        }else{
            switch(o.globalData.topage.type){
                case 0:{
                    wx.switchTab({
                        url:o.globalData.topage.page,
                      })
                }break
                case 1:{
                    wx.reLaunch({
                        url:o.globalData.topage.page,
                      })
                }break
                case 2:{
                    wx.redirectTo({
                        url:o.globalData.topage.page,
                      })
                }break
                case 3:{
                    wx.navigateTo({
                        url:o.globalData.topage.page,
                      })
                }break
            }
        }


        
       


        // if (1 == o.globalData.selectdoctor.selecttype) {
        //     console.log('扫码')
        //     wx.switchTab({
        //         url: '../doclist/doclist'
        //     })
        // } else if ("talk" == o.globalData.entrance) {
        //     console.log("talk")
        //     o.globalData.remind = !0
        //     wx.switchTab({
        //         url: '../mydoclist/mydoclist',
        //     })
        // } else if ("plan" == o.globalData.entrance) {
        //     o.globalData.remind = !0
        //     console.log("sport")
        //     wx.switchTab({
        //         url: "../plan/plan"
        //     })
        //     // }else if ("" == o.globalData.wxuser.patientname) {
        //     //     o.globalData.remind = !0
        //     //     console.log("information")
        //     //     wx.navigateTo({
        //     //         url: "../../pages/entryinformation/entryinformation"
        //     //     })
        // } else {
        //     o.globalData.remind = !0
        //     console.log("mydoclist")
        //     wx.switchTab({
        //         url: "../doclist/doclist"
        //     })
        // };
    },
    reconnect: function () {
        var o = this;
        o.servercode("聊天网络重新连接");
        console.log("重连"), console.log(o.globalData.limit), o.lockReconnect || (o.lockReconnect = !0,
            clearTimeout(o.timer), o.globalData.limit < 10 && (o.timer = setTimeout(function () {
                o.globalData.sockettask = null, o.connectsocket(), o.lockReconnect = !1, console.log("次数:" + o.globalData.limit);
            }, 5e3), o.globalData.limit = o.globalData.limit + 1));
    },
    connectsocket: function () {
        var o = this;
        console.log("连接调用"), o.globalData.sockettask = wx.connectSocket({
            url: o.globalData.ws,
            success: function (o) {
                console.log("connect");
            },
            fail: function (a) {

            }
        }), o.globalData.sockettask.onOpen(function (a) {
            if (null != o.globalData.sockettask) {
                o.globalData.limit = 0, o.globalData.sockettask.onClose(function (a) {
                        console.log("WebSocket 已关闭！"), o.reconnect();
                    }), console.log("连接"), console.log(o.globalData.sockettask), o.reset(), o.ping(),
                    o.globalData.sockettask.onError(o.neterror), o.globalData.sockettask.onMessage(function (a) {
                        "pong" == a.data ? (o.reset(), o.ping()) : o.receivemsg(a);
                    });
                var t = JSON.stringify({
                    token: o.globalData.wxuser.token,
                    msgid: 1
                });
                console.log('进入房间', t)
                o.globalData.sockettask.send({
                    data: t,
                    fail: function (a) {

                    }
                });
            }
        });
    },
    receivemsg: function (o) {
        var a = this,
            t = JSON.parse(o.data);
        console.log("聊天反馈")
        console.log(o)
        switch (t.msgid) {
            case 2:
                if (0 == t.code) {
                    if (a.globalData.reconnectsokect) {
                        a.globalData.reconnectsokect = false
                        console.log('关闭')
                        wx.hideLoading({
                            success: (res) => {},
                        })
                        if ("" != a.globalData.wxuser.patientname) {
                            wx.switchTab({
                                url: a.globalData.pageurl
                            })
                        }

                    }
                    1 == a.globalData.socketpageshow && a.globalData.talkp.reconnectdeal();
                }

                break;

            case 4:
                0 != t.code
                break;

            case 5:
                if(null != a.globalData.talkp){
                    a.globalData.talkp.receivetalk(t)
                }
                if(0== a.globalData.socketpageshow){
                    var p= getCurrentPages().slice(-1)
                    if('pages/doclist/doclist'==p[0].is||'pages/plan/plan'==p[0].is||'pages/orderlist/orderlist'==p[0].is){
                        wx.showTabBarRedDot({
                        index: 1,
                      })
                    } 
                }
                break;

            case 7:
                if (null != a.globalData.talkp) {
                    a.globalData.talkp.gethistory(t);
                }
                break;
            case 9:
                a.globalData.advisoryp.receivelist(t);
        }
    },
    reset: function (o) {
        var a = this;
        return clearTimeout(a.globalData.timeoutObj), clearTimeout(a.globalData.serverTimeoutObj),
            a;
    },
    randomWord: function (o, a, t) {
        var e = "",
            n = a,
            l = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        o && (n = Math.round(Math.random() * (t - a)) + a);
        for (var c = 0; c < n; c++) e += l[Math.round(Math.random() * (l.length - 1))];
        return e;
    },
    ping: function () {
        var o = this;
        //console.log("发ping开始");
        o.randomWord(!1, 16);
        o.globalData.timeoutObj = setTimeout(function () {
            // console.log("发送ping")
            wx.sendSocketMessage({
                data: JSON.stringify({
                    msgid: 12
                }),
                success: function () {
                    // console.log("发送ping成功");
                }
            }), o.globalData.serverTimeoutObj = setTimeout(function () {
                o.ping();
            }, o.globalData.timeout);
        }, o.globalData.timeout);
    }
});