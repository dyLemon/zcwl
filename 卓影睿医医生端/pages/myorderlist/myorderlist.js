var t = getApp();
// const QRCode = require('../../utils/weapp-qrcode.js')
// //const QRCode = require('../../utils/wxqrcode.js')
import rpx2px from '../../utils/rpx2px.js'
// let qrcode;
// const qrcodeWidth = rpx2px(400)
var failuremsg = ''

Page({
    data: {
        top: 0,
        height: 0,
        resource: "",
        select: 0,
        doctorname: '',
        avatar: '',
        list: [],
        page: 1,
        count: 10,
        atteststate: 0,
        imgsrc: '',
        //qrcodeWidth:qrcodeWidth,
        //text: 'fsgfdgdfgd',
        //showqrcode: false,
        showqr: false,
        token: '',
        qrcodeurl: '',
        appletsqr: "", //小程序码
        accesstoken: ''
    },
    onLoad: function (a) { //avatarUrl
        var e = this;
        var url;
        if (1 == t.globalData.logintype) {
            url = t.globalData.surl + '/img/doctor_icon.png'
        } else {
            url = t.globalData.wxuserdata.avatarUrl
        }
        var n;
        console.log('appdata', t.globalData)
        if (1 == t.globalData.logintype) {
            n = t.globalData.userData.doc_name
        } else {
            n = t.globalData.wxuserdata.nickName
        }
        if ('' == n) {
            n = '----'
        }
        console.log(url)
        wx.getSystemInfo({
            success: function (a) {
                e.setData({
                    height: a.windowHeight * (750 / a.screenWidth) - 300,
                    resource: t.globalData.surl,
                    //avatar: url,
                    name: n,
                    doctorname: t.globalData.userData.doc_name,
                    qrcodeurl: t.globalData.userData.userid,
                    token: '&token=' + t.globalData.stoken
                }), console.log(a), console.log(e.data.height), console.log('数据', e.data);
            }
        });
    },
    // getQRCodeSize: function () {
    //     var size = 0;
    //     try {
    //       var res = wx.getSystemInfoSync();
    //       var scale = res.windowWidth / 750; //不同屏幕下QRcode的适配比例；设计稿是750宽
    //       var width = 300 * scale;
    //       size = width;
    //     } catch (e) {
    //       // Do something when catch error
    //       console.log("获取设备信息失败" + e);
    //       size = 150;
    //     }
    //     return size;
    //   },
    //   createQRCode: function (text, size) {
    //     //调用插件中的draw方法，绘制二维码图片

    //     let that = this
    //     try {
    //       // console.log('QRcode: ', text, size)
    //       let _img = QRCode.createQrCodeImg(text, {
    //         size: parseInt(size)
    //       })

    //       that.setData({
    //         'qrcode': _img
    //       })
    //     } catch (e) {
    //       console.warn(e)
    //     }

    //   },
    onReady: function () {
        const z = this

        console.log('ready')
        //  qrcode = new QRCode('canvas', {
        //      usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
        //      // text: "https://github.com/tomfriwel/weapp-qrcode",
        //      image: 'https://wxprogram.zc5l.com/img/code_icon_n.png',
        //      width: z.data.qrcodeWidth,
        //      height: z.data.qrcodeWidth,
        //      colorDark: "black",
        //      colorLight: "white",
        //      correctLevel: QRCode.CorrectLevel.H,
        //  });
    },
    getavatar() {
        var that = this
        t.webpost('queryavatar', {
            user_id: t.globalData.userData.userid,
            token: t.globalData.userData.token
        }, function (e) {
            console.log('头像', e)
            if (0 == e.data.code) {
                if ('' != e.data.img_url) {
                    that.setData({
                        avatar: t.globalData.websurl + e.data.img_url
                    })
                } else if (0 == e.data.sex) {
                    that.setData({
                        avatar: 'https://wxprogram.zc5l.com/img/Doc_male_icon.png'
                    })
                } else {
                    that.setData({
                        avatar: 'https://wxprogram.zc5l.com/img/Doc_female_icon.png'
                    })
                }
            } else {
                app.servercode(e.data.code)
            }
        })
    },
    onShow: function () {
        t.globalData.search = "";
        var a = this;
        // t.webpost('/api/account/getcheckstate', {
        //         user_id: t.globalData.userData.userid,
        //         token: t.globalData.userData.token
        //     },
        //     function (e) {
        //         console.log('查询认证状态', e)
        //         if (0 == e.data.code) {
        //             a.setData({
        //                 atteststate: e.data.state
        //             })
        //         } else {
        //             t.servercode(e.data.code);
        //         }
        //     })
        a.getavatar();
        // t.webpost('ocrstate', {
        //         user_id: t.globalData.userData.userid,
        //         token: t.globalData.userData.token
        //     },
        //     function (e) {
        //         console.log('查询认证状态', e)
        //         if (0 == e.data.code) {
        //             a.setData({
        //                 atteststate: e.data.ocr_state
        //             })
        //         } else {
        //             t.servercode(e.data.code);
        //         }
        //     })
        t.webpost('certificationstate', {
            user_id: t.globalData.userData.userid,
            token: t.globalData.userData.token
        }, function (e) {
            console.log('认证查询', e)
            if (0 == e.data.code || 2 == e.data.code) {
                a.setData({
                    atteststate: e.data.state,
                })
            } else {
                t.servercode(e.data.code)
            }
        })
        t.webpost('queryoderlist', {
            userid: t.globalData.userData.userid,
            option: a.data.select,
            pagecount: a.data.count,
            pagenumber: a.data.page,
            token: t.globalData.userData.token
        }, function (e) {
            console.log("我的"), console.log(e);
            var o = e.data.studypaystatelist;
            if (0 == e.data.code && null != o && 0 < o.length) {
                for (var s = [], i = 0; i < o.length; i++) s.push({
                    studyid: o[i].studyid
                });
                t.webpost('querypaystatelist', {
                    paystatelistreq: s,
                    token: t.globalData.userData.token
                }, function (t) {
                    var e = t.data.paystatelistack;
                    console.log(e);
                    for (var s = 0; s < o.length; s++)
                        for (var i = 0; i < e.length; i++) {
                            var l = e[i];
                            if (l.studyid == o[s].studyid) {
                                o[s].totalprice = l.totalprice, o[s].price = l.price;
                                break;
                            }
                        }
                    a.setData({
                        list: o,
                        statebtn: '去认证'
                    });
                    console.log(o)
                });
            } else a.setData({
                list: []
            });
        });
    },
    onHide: function () {
        t.saveexit(this.data, '../myorderlist/myorderlist')
    },
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {
        var a = this,
            e = a.data.list;
        t.webpost('queryoderlist', {
            userid: t.globalData.userData.userid,
            option: a.data.select,
            pagecount: a.data.count,
            pagenumber: a.data.page + 1,
            token: t.globalData.userData.token
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
    statistics: function () {
        wx.navigateTo({
            url: "../../pages/statistics/statistics"
        });
    },
    plandelete: function (a) {
        console.log(a.currentTarget.id);
        var e = this;
        console.log(e.data.list[a.currentTarget.id]), t.webpost('deleteplan', {
            token: t.globalData.userData.token,
            studyid: e.data.list[a.currentTarget.id].studyid
        }, function (a) {
            console.log("删除返回", a), 0 == a.data.code ? e.onShow() : t.servercode(a.data.code);
        });
    },
    select: function (a) {
        var e = this;
        var patient_id = e.data.list[a.currentTarget.id].patient_id
        console.log(e.data.list[a.currentTarget.id].studyid), t.webpost('queryplandetail', {
            token: t.globalData.userData.token,
            train_id: e.data.list[a.currentTarget.id].studyid
        }, function (a) {
            console.log("方案详情", a);
            var e = a.data;
            t.webpost('querypaystate', {
                studyid: e.train_id,
                token: t.globalData.userData.token
            }, function (a) {
                if (console.log("paystate", a), 0 == a.data.code) {
                    e.patientid = patient_id
                    e.actorlist = e.acts, e.daynum = e.day_num, e.cycleType = e.cycle_type, e.createtime = e.create_time,
                        e.starttime = e.start_time, e.endtime = e.end_time, e.gaptime = e.gap_time, e.groupNum = e.group_num, e.id = e.train_id,
                        e.paystate = a.data.paystate, e.price = a.data.price, e.totalprice = a.data.totalprice,
                        e.state = a.data.paystate, e.valid = !0;
                    for (var o = 0; o < e.acts.length; o++) e.actorlist[o].imgpath2 = e.acts[o].actor_display_url2,
                        e.actorlist[o].name = e.acts[o].actor_name, e.actorlist[o].repeatcount = e.acts[o].repeat_count,
                        e.actorlist[o].keeptime = e.acts[o].keep_time, e.actorlist[o].playcount = e.acts[o].play_count,
                        e.actorlist[o].actor_des = e.acts[o].actor_des, e.actorlist[o].imgpath = e.acts[o].actor_display_url,
                        e.actorlist[o].filepath2 = e.acts[o].actor_url2, e.actorlist[o].filepath = e.acts[o].actor_url;
                    console.log("订单详情", e), t.globalData.plandetail = e, t.globalData.planauthority = 0, wx.navigateTo({
                        url: "../../pages/plandetails/plandetails"
                    });
                }
            });
        });
    },
    atteststatebtn() {
        // wx.chooseImage({
        //     count: 1,
        //     success (res) {
        //       // tempFilePath可以作为img标签的src属性显示图片
        //       console.log(res);
        //       const tempFilePaths = res.tempFilePaths;
        //         wx.uploadFile({
        //             url: 'https://wxprogram.zc5l.com/api/ocr',
        //             filePath: tempFilePaths[0],
        //             name: 'img_url',
        //             success (res){
        //                 let data = JSON.parse(res.data);
        //                 // console.log(JSON.parse(res.data));
        //                 if(data.errcode == 0){  //获取图片成功

        //                 }else{
        //                     wx.showToast({
        //                         title: '请上传正确的身份证',
        //                         icon: 'none',
        //                         duration: 2000
        //                       })
        //                 }
        //                 const data = res.data

        //             }
        //             })
        //         }
        //   })

        // wx.navigateTo({
        //     url: "../../pages/Identity/Identity"
        // });
        if (-1 == this.data.atteststate) {
            wx.navigateTo({
                url: "../../pages/mycard/mycard"
            });
        } else {
            wx.navigateTo({
                url: "../../pages/ocridcard/ocridcard"
            });
        }

    },
    psettings: function () {
        wx.navigateTo({
            url: "../personalsettings/personalsettings"
        });
    },
    quit: function () {
        wx.removeStorage({
            key: 'pagedata',
        })
        wx.redirectTo({
            url: '../../pages/wxlogin/wxlogin'
        })
    },
    // renderCode(value) {
    //     const z = this
    //      console.log('make handler')
    //      qrcode.makeCode(value, () => {
    //          console.log('make')
    //          qrcode.exportImage(function(path) {
    //              console.log(path)
    //              z.setData({
    //                  imgsrc: path
    //              })
    //          })
    //      })
    // },
    getqrcode: function (e) {
        var that = this
        console.log(t.globalData.userData.userid);
        t.webpost('createpatient', {
                docter_id: t.globalData.userData.userid,
                token: t.globalData.userData.token
            },
            function (res) {
                if (0 == res.data.code) {
                    console.log('生成患者', res.data)
                    var qrurl = 'http://106.15.188.10:22339/protocol_new.html?id=' +
                        res.data.patient_id + '&token=' + t.globalData.userData.token
                    //that.renderCode(qrurl) 
                    //that.triggerEvent('showqr',{url:qrurl})   

                    //let qrcodeSize = that.getQRCodeSize()
                    // that.createQRCode('http://106.15.188.10:22339/protocol_new.html?id='+
                    //  res.data.patient_id+'&token='+t.globalData.userData.token, qrcodeSize)
                    that.setData({
                        showqrcode: true,
                        qrcodeurl: qrurl
                    })
                } else {
                    t.servercode(res.data.code)
                }
            })
    },
    docqrcode: function () {

        var that = this
        t.webpost('getpublicqr', {
            id: t.globalData.userData.userid,
            token: t.globalData.userData.token
        }, function (e) {
            if (0 == e.data.code) {
                var qrurl = e.data.url
                that.setData({
                    showqr: true,
                    qrcodeurl: qrurl
                })
            } else {
                t.servercode(e.data.code)
            }
        })
        // = 'http://kangfu.zc5l.com/tencent.html?doctorid=' +
        //     t.globalData.userData.userid + '&token=' + t.globalData.userData.token
        //that.renderCode(qrurl) 
        //that.triggerEvent('showqr',{url:qrurl})   

        //let qrcodeSize = that.getQRCodeSize()
        // that.createQRCode('http://106.15.188.10:22339/protocol_new.html?id='+
        //  res.data.patient_id+'&token='+t.globalData.userData.token, qrcodeSize)
    },
    closeqrcode: function () {
        this.setData({
            showqrcode: false
        })
    },
    onoder() {

        console.log('订单详情', t.globalData.plandetail)
        t.globalData.talkp = null
        t.globalData.planauthority = 0;
        t.globalData.ordersend = true
        wx.navigateTo({
            url: "../../pages/talk/talk"
        })
        var o = JSON.stringify({
            Seq: t.globalData.userData.userid,
            to: t.globalData.patient.id,
            to_name: t.globalData.patient.name,
            msgid: 3,
            t_type: 1,
            text: JSON.stringify(t.globalData.plandetail)
        });
        t.globalData.sockettask.send({
            data: o,
            fail: function (t) {
                //t.servercode("聊天服务器连接失败");
            }
        });
    },
    sendoder: function (s) {
        console.log('选择', s)
        var that = this;
        var patient_id = that.data.list[s.currentTarget.id].patient_id
        t.globalData.patient.id=patient_id
        t.globalData.patient.name=that.data.list[s.currentTarget.id].patientname
        t.webpost('queryplandetail', {
            token: t.globalData.userData.token,
            train_id: that.data.list[s.currentTarget.id].studyid
        }, function (e) {
            if (0 == e.data.code) {
                var e = e.data;
                t.webpost('querypaystate', {
                    studyid: e.train_id,
                    token: t.globalData.userData.token
                }, function (a) {
                    if (console.log("paystate", a), 0 == a.data.code) {
                        e.patientid = patient_id
                        e.actorlist = e.acts, e.daynum = e.day_num, e.cycleType = e.cycle_type, e.createtime = e.create_time,
                            e.starttime = e.start_time, e.endtime = e.end_time, e.gaptime = e.gap_time, e.groupNum = e.group_num, e.id = e.train_id,
                            e.paystate = a.data.paystate, e.price = a.data.price, e.totalprice = a.data.totalprice,
                            e.state = a.data.paystate, e.valid = !0;
                        for (var o = 0; o < e.acts.length; o++) e.actorlist[o].imgpath2 = e.acts[o].actor_display_url2,
                            e.actorlist[o].name = e.acts[o].actor_name, e.actorlist[o].repeatcount = e.acts[o].repeat_count,
                            e.actorlist[o].keeptime = e.acts[o].keep_time, e.actorlist[o].playcount = e.acts[o].play_count,
                            e.actorlist[o].actor_des = e.acts[o].actor_des, e.actorlist[o].imgpath = e.acts[o].actor_display_url,
                            e.actorlist[o].filepath2 = e.acts[o].actor_url2, e.actorlist[o].filepath = e.acts[o].actor_url;
                        console.log("订单详情", e), t.globalData.plandetail = e, t.globalData.planauthority = 0;
                        that.onoder()

                    } else {
                        t.servercode(a.data.code)
                    }
                });


            } else {
                t.servercode(e.data.code)
            }
        })
    },
    directtoqrcde: function () {
        var that = this

        wx.request({
            url: t.globalData.url + t.api('getappletscode'), //获取小程序B接口二维码

            method: "POST",

            responseType: 'arraybuffer', //这一行非常重要，重中之重

            data: {
                doctor_id: t.globalData.userData.userid
            },

            header: {
                'content-type': 'application/json;charset=utf-8'
            },
            success(res) {
                console.log('返回buff', res.data);
                var base64 = wx.arrayBufferToBase64(res.data);
                console.log('转换', base64);
                that.setData({
                    showqr: true,
                    appletsqr: "data:image/PNG;base64," + base64
                })
            }
        })
    },
    qrcode: function () {
        var that = this
        that.directtoqrcde()
        // t.webpost('getappletscode', {
        //     doctor_id: t.globalData.userData.userid
        // }, function (e) {
        //     // console.log('能用',wx.canIUse('arrayBufferToBase64')) 
        //     // let d=wx.arrayBufferToBase64(e.data)
        //     // console.log('qr',d)
        //     // that.setData({
        //     //     showqr: true,
        //     //     appletsqr:d
        //     // })
        //     let {
        //         buffer
        //     } = e.data;
        //     const wxFile = wx.getFileSystemManager();
        //     const filePath = wx.env.USER_DATA_PATH + '/test.jpg';
        //     //把图片写在本地
        //     wxFile.writeFile({
        //         filePath,
        //         encoding: "binary",
        //         data: buffer,
        //         success: res => {
        //             console.log(res); //writeFile:ok
        //             that.setData({
        //                 showqr: true,
        //                 appletsqr: filePath
        //             });
        //         }
        //     })
        // })
    },
    closeqr: function () {
        this.setData({
            showqr: false
        })
    },
    toattest: function () {
        var that = this
        t.webpost('certificationstate', {
            user_id: t.globalData.userData.userid,
            token: t.globalData.userData.token
        }, function (e) {
            if (0 == e.data.code || 2 == e.data.code) {
                if (2 == e.data.state) {
                    failuremsg = e.data.description
                }
                that.turnattest(e.data.state)
            } else {
                app.servercode(e.data.code)
            }
        })

    },
    turnattest: function (state) {
        switch (state) {
            case 0: {
                wx.navigateTo({
                    url: '../doctorattestbegin/doctorattestbegin',
                })
            }
            break
        case 1: {
            wx.navigateTo({
                url: '../attesting/attesting?state=success',
            })
        }
        break
        case 2: {
            wx.navigateTo({
                url: '../attesting/attesting?msg=' + failuremsg,
            })
        }
        break
        case 3: {
            wx.navigateTo({
                url: '../attesting/attesting',
            })
        }
        break
        }
    }
});