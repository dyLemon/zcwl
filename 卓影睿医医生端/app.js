const api = require('utils/api.js')
//const tkp=require('pages/talk/talk.js')
var begin

var QQMapWX = require('utils/qqmap-wx-jssdk.js')

App({
  onLaunch: function () {
    var e = this
    //   a = wx.getStorageSync("logs") || [];
    // a.unshift(Date.now()), wx.setStorageSync("logs", a), 
    // wx.removeStorage({
    //   key: 'logs',
    // })
    // wx.login({
    //   success: function (e) {}
    // }), wx.getSetting({
    //   success: function (a) {
    //     a.authSetting["scope.userInfo"] && wx.getUserInfo({
    //       success: function (a) {
    //         e.globalData.userInfo = a.userInfo, e.userInfoReadyCallback && e.userInfoReadyCallback(a);
    //       }
    //     });
    //   }
    // });

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
  globalData: {
    url: "https://wxprogram.zc5l.com",
    websurl: "http://kangfu.zc5l.com",
    surl: "https://wxprogram.zc5l.com",
    ws: "wss://wxprogram.zc5l.com/wss",
    // websurl:"http://192.168.0.47:2080",
    // url: "http://192.168.0.47:808",
    // surl: "http://192.168.0.47:2080",
    // ws: "ws://192.168.0.33:1083/ws",
    stoken: "",

    userInfo: null,
    userData: {
      token: ""
    },
    tagselectlist: [],
    accountdata: {},
    //patientfullin:{},
    reconnectsokect: false, //聊天服务器重连
    //attestmodyfy
    goodat: '', //擅长
    pageurl: '', //退出页面
    pagedata: {}, //退出页面数据
    logintype: 0, //登录方式  0 微信登录   1账号登录
    autologin: false, //自动登录
    wxuserdata: null, //微信用户信息
    atteststate: 0, //认证状态 myorderlist页show函数获取 //审核状态;默认为0；3：待审核；1：已通过；2：未通过；
    createpatientid: 0, //新建的患者id
    socketpageshow: 0,
    ordersend: !1,
    search: "",
    planselect: null, //创建方案方案类别选择
    videoselect: [], //创建方案视频选择
    patient: {},
    createselectway: -1,
    selectkind: null,
    plandetail: {},
    sockettask: null,
    videoid: 0,
    planauthority: 0, //video页可编辑  0 不可编辑  1可编辑
    talkp: null,
    advisoryp: null,
    advisoryshow: !1,
    limit: 0,
    timeout: 1e4,
    timeoutObj: null,
    serverTimeoutObj: null,
    feedquery: false
  },
  api(k) {
    if ('' == k)
      return ''
    let params = k.split('.'),
      len = params.length,
      apilet = api
    //console.log('k',k,',len',len,',apilet',apilet)
    for (let index = 0; index < len; index++) {

      //console.log(',前apilet',apilet)
      if (null != apilet) {
        apilet = apilet[params[index]];
      }

      // console.log(',后apilet',apilet)
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
  base64encode: function (e) {
    var a, t, o, c, n, s, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    for (o = e.length, t = 0, a = ""; t < o;) {
      if (c = 255 & e.charCodeAt(t++), t == o) {
        a += l.charAt(c >> 2), a += l.charAt((3 & c) << 4), a += "==";
        break;
      }
      if (n = e.charCodeAt(t++), t == o) {
        a += l.charAt(c >> 2), a += l.charAt((3 & c) << 4 | (240 & n) >> 4), a += l.charAt((15 & n) << 2),
          a += "=";
        break;
      }
      s = e.charCodeAt(t++), a += l.charAt(c >> 2), a += l.charAt((3 & c) << 4 | (240 & n) >> 4),
        a += l.charAt((15 & n) << 2 | (192 & s) >> 6), a += l.charAt(63 & s);
    }
    return a;
  },
  servercode: function (e) {
    var a;
    switch (e) {

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
        a = "用户权限错误";
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
        a = "权限错误";
        break;
      case 16:
        a = "已有正在进行方案";
        break;
      case 17:
        a = "锻炼次数错误";
        break;
      case 18:
        a = "密码输入错误次数达到上限";
        break;
      case 19:
        a = "方案视频数量为零";
        break;
      case 20:
        a = "方案状态不允许删除";
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
        a = '已审核不能修改';
        break;
      case -41001:
        a = "encodingAesKey非法";
        break;
      case -41003:
        a = "aes解密失败";
        break;
      case -41004:
        a = "解密后得到的buffer非法";
        break;

      default:
        a = e;
    }
    wx.showToast({
      title: a,
      icon: "none",
      duration: 1500
    });
  },
  accountlogin: function (data, fx) {
    var that = this
    wx.request({
      url: that.globalData.url + that.api('login'),
      data: JSON.stringify(data),
      method: "POST",
      success: function (e) {
        if (console.log("账号密码", data), 0 == e.data.code) {

          for (var a = false, n = 0; n < e.data.perissionIDList.length; n++)
            if (3004 == e.data.perissionIDList[n]) {
              a = true;
              break;
            }
          if (a) {
            that.globalData.userData = e.data, that.globalData.stoken = that.base64encode(that.globalData.userData.token),
              console.log(e.data)
            console.log('返回数据', that.globalData.userData)
            console.log(that.globalData.stoken)
            that.connectsocket()
            that.globalData.logintype = 1
            wx.hideLoading({})
            wx.switchTab({
              url: "../../pages/patientlist/patientlist"
            })
          } else {
            wx.hideLoading({})
            that.servercode("没有权限")
            if (null != fx) {
              fx()
            }
          }
        } else {
          wx.hideLoading({})
          if (null != fx) {
            fx()
          }
        }
      },
      fail: function (e) {
        wx.hideLoading({})
        console.log("服务器未反馈"), t.servercode("服务器未反馈"), o.setData({
          wait: !1
        });
      }
    });
  },
  wxlogin(t, x, y, z) {
    var that = this
    //that.servercode('微信登录')
    begin = Date.now();
    wx.login({
      success: function (e) {
        console.log(e);
        var b = Date.now() - begin
        console.log('微信登录时间', b)
        //return
        //var code=e.code
        console.log(wx.canIUse('request'))
        wx.request({
          url: that.globalData.url + that.api('wxlogin'),
          data: JSON.stringify({
            code: e.code
          }),
          method: "POST",
          header: {
            'content-type': 'application/application/json;charset=utf-8'
          },
          success(e) {
            if (0 == e.data.code) {
              // var a = false;
              // if (null != e.data.perissionIDList) {
              //   for (var n = 0; n < e.data.perissionIDList.length; n++) {
              //     if (3004 == e.data.perissionIDList[n]) {
              //       a = true;
              //       break;
              //     }
              //   }
              // }
              // if (a) {
              var d = Date.now() - begin
              console.log('登录后时间1', d)
              console.log('登录时间', Date.now())
              begin = Date.now()
              that.globalData.userData = e.data
              that.globalData.stoken = that.base64encode(that.globalData.userData.token)
              that.connectsocket()
              //wx.removeStorageSync('sessionid');
              //储存res.header['Set-Cookie']
              //   wx.setStorageSync("sessionid", a.header["Set-Cookie"]);
              console.log('登录后数据', e);

              wx.removeStorage({
                key: 'userData',
              })
              wx.setStorage({
                data: that.globalData.userData,
                key: 'userData',
              })
              console.log('获取app', getApp())
              that.globalData.talkp = null
              console.log('talk指针', )
              //if(that.globalData.autologin){that.globalData.autologin=false}
              //wx.hideLoading({})
              that.loding(false)
              if (null != t) {
                t(x, y, z);
              }
              var d = Date.now() - begin
              console.log('登录后时间', d)
              // wx.showModal({
              //   title:api+'时间'+d,
              //   cancelColor: 'cancelColor',
              // })
              //if(that.globalData.autologin){}


              // } else {
              //   //wx.hideLoading({})
              //   that.servercode("该账号没有权限");
              // }
            } else {
              //wx.hideLoading({})
              that.servercode(e.data.code);
            }
          },
          fail(e) {
            console.log(e)
          }
        })

      }
    })
  },
  wxpost(e, a, t) { // 该页内部使用
    var that = this
  },
  webpost: function (e, a, t) {
    var that = this;
    begin = Date.now();
    let j = a;
    j = {};
    var api = e
    that.loding(true)
    wx.request({
      url: that.globalData.url + that.api(e),
      data: JSON.stringify(a),
      //data:a,
      method: "POST",
      header: {
        'content-type': 'application/application/json;charset=utf-8'
      },
      success: function (e) {
        //console.log('接口调用')
        //wx.hideLoading({})
        if (that.globalData.autologin) {
          that.globalData.autologin = false
        }
        that.loding(false)
        t(e);
        var d = Date.now() - begin
        console.log('时间', d)
        // wx.showModal({
        //   title:api+'时间'+d,
        //   cancelColor: 'cancelColor',
        // })
      },
      fail: function (e) {
        if (that.globalData.autologin) {
          that.globalData.autologin = false
        }
        //wx.hideLoading({})
        that.loding(false)
        that.servercode("服务器未反馈");
      }
    });
    //that.wxpost(e, a, t)
    //that.servercode('wp调用'+JSON.stringify(e)+ JSON.stringify(a))
    //if (0 == that.globalData.logintype) {
    // wx.checkSession({
    //   success: (res) => {
    //     console.log('session未过期')
    //that.globalData.autologin = true
    //that.wxlogin(that.webpost(), e, a, t)
    // that.wxpost(e, a, t)
    // },
    // fail() {
    // session_key 已经失效，需要重新执行登录流程
    //that.servercode('session过期')
    //     if(!that.globalData.autologin)
    //     {
    //       that.globalData.autologin = true          
    //       that.wxlogin(that.webpost(), e, a, t)
    //     }

    //   }
    // })
    //} else {
    //  that.wxpost(e, a, t)
    //}
  },
  receivemsg: function (e) {
    var a = this,
      t = JSON.parse(e.data);
    switch (console.log("聊天反馈"), console.log(e), t.msgid) {
      case 2:
        if (0 == t.code) {
          console.log("socket连接成功")
          if (a.globalData.reconnectsokect) {
            a.globalData.reconnectsokect = false
            wx.switchTab({
              url: a.globalData.pageurl
            })
          }
          1 == a.socketpageshow ? a.globalData.talkp.reconnectdeal() : 2 == a.socketpageshow && a.globalData.advisoryp.reconnectdeal();
        }
        break;

      case 4:
        0 != t.code
        break;

      case 5: {
        console.log('处理消息5', a.globalData.talkp)
        if (null != a.globalData.talkp) {
          a.globalData.talkp.receivetalk(t)
        };
        if(0==a.globalData.socketpageshow&&!a.globalData.ordersend){
          var p=getCurrentPages().slice(-1)
          console.log(p)
          if('pages/patientlist/patientlist'==p[0].is||'pages/myorderlist/myorderlist'==p[0].is){
            wx.showTabBarRedDot({
            index: 1,
          })
        } 
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
  initEventHandle: function () {
    var e = this;
    wx.onSocketClose(function (a) {
      console.log("WebSocket 已关闭！"), console.log(e.globalData.sockettask), e.reconnect();
    });
  },
  neterror: function (e) {
    console.log("WebSocket连接打开失败"), that.reconnect();
    console.log('断开时间', Date.now())
    console.log('断开间隔', Date.now() - begin)
  },
  reset: function (e) {
    var a = this;
    return clearTimeout(a.globalData.timeoutObj), clearTimeout(a.globalData.serverTimeoutObj),
      a;
  },
  ping: function () {
    var e = this;
    e.randomWord(!1, 16);
    e.globalData.timeoutObj = setTimeout(function () {
      console.log("发送ping"), wx.sendSocketMessage({
        data: JSON.stringify({
          msgid: 12
        }),
        success: function () {
          console.log("发送ping成功");
        }
      }), e.globalData.serverTimeoutObj = setTimeout(function () {
        e.ping();
      }, e.globalData.timeout);
    }, e.globalData.timeout);
  },
  randomWord: function (e, a, t) {
    var o = "",
      c = a,
      n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    e && (c = Math.round(Math.random() * (t - a)) + a);
    for (var s = 0; s < c; s++) o += n[Math.round(Math.random() * (n.length - 1))];
    return o;
  },
  reconnect: function () {
    var e = this;
    // e.servercode("聊天网络重新连接");
    e.lockReconnect || (e.lockReconnect = !0, clearTimeout(e.timer), e.globalData.limit < 10 && (e.timer = setTimeout(function () {
      e.globalData.sockettask = null, e.connectsocket(), e.lockReconnect = !1, console.log("次数:" + e.globalData.limit);
    }, 5e3), e.globalData.limit = e.globalData.limit + 1));
  },
  connectsocket: function () {
    var e = this;
    e.globalData.sockettask = wx.connectSocket({
      url: e.globalData.ws,
      success: function (e) {},
      fail: function (a) {}
    }), e.globalData.sockettask.onOpen(function (a) {
      if (null != e.globalData.sockettask) {
        begin = Date.now()

        e.globalData.limit = 0, e.initEventHandle(), console.log("连接"), console.log(e.globalData.sockettask),
          e.reset(), e.ping(), e.globalData.sockettask.onError(e.neterror), e.globalData.sockettask.onMessage(function (a) {
            "pong" == a.data ? (e.reset(), e.ping()) : e.receivemsg(a);
          });
        var t = JSON.stringify({
          token: e.globalData.userData.token,
          msgid: 1
        });
        e.globalData.sockettask.send({
          data: t,
          fail: function (a) {}
        });
      }
    });
  },
  getcreatetype() { //获取创建方式，获取位置计算范围内距离
    var that = this
    var qqmap = new QQMapWX({
      key: 'N4PBZ-2LSC5-FCRIT-QO26B-HUYMJ-2MB2R'
    })
    wx.getLocation({
      altitude: 'altitude',
      type: 'gcj02',
      // isHighAccuracy:true,
      success(res) {
        console.log(res)

        qqmap.reverseGeocoder({
          location: {
            latitude: res.latitude, //纬度
            longitude: res.longitude //经度
          },
          success(red) {
            console.log('腾讯地图', red)
          },
          fail(red) {
            console.log('腾讯地图', red)
          }
        })
        var latitude = res.latitude //纬度
        var longitude = res.longitude //经度
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
        })
        latitude = ((latitude - 30.550555) / 0.00001) * 1.1
        longitude = (longitude - 104.055687) / 0.00001
        console.log(latitude)
        console.log(longitude)
        var d2 = Math.pow(latitude, 2) + Math.pow(longitude, 2)
        var distance = Math.sqrt(d2)
        console.log('距离', distance)
      },
      fail() {
        that.servercode('获取位置失败')
      }
    })
  }
});