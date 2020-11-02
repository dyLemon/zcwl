// function a(a, t, e) {
//     return t in a ? Object.defineProperty(a, t, {
//         value: e,
//         enumerable: !0,
//         configurable: !0,
//         writable: !0
//     }) : a[t] = e, a;
// }

//创建方案数据结构
// PatientID		int    	`json:"patientid"`
// 	RecordNumber    string  `json:"recordnumber"`
// 	Cycle    		int		`json:"cycle"`
// 	CycleType		int		`json:"cycleType"`
// 	Frequency		int		`json:"frequency"`
// 	Gaptime			int		`json:"gaptime"`
// 	GroupNum		int		`json:"groupNum"`
// 	DayNum			int		`json:"daynum"`
// 	ActorsList		[]SchemeData   `json:"actorlist"`
//     type actorlist struct {
//         ActorID				int    	`json:"actorid"`
//         RepeatCount			int		`json:"repeatcount"`
//         KeepTime			int		`json:"keeptime"`
//         PlayCount			int		`json:"playcount"`
//         ActorDes			string	`json:"actordes"`
//     }
import gps from '../../utils/distance.js'
// import bd09togcj02 from '../../utils/distance.js'
// import gcj02towgs84 from '../../utils/distance.js'
// import getDistance from '../../utils/distance.js'
var app = getApp();

Page({
    data: {
        editlistsize:null, //编辑列表宽高
        edithight:0,  //编辑弹框背景整高
        editlistsize:{width:690,hight:594},  //编辑列表size
        partlisthight: 0, //部位表高
        top: 0,
        patient: null,
        height: 0,
        emptyh: 0,
        partselect: null,
        resource: "",
        video: [],
        selectlist: [],
        createdata: {},
        tprice: 100,// 价格show函数直接查询
        // items: [{
        //     name: "天",
        //     value: 1,
        //     checked: !0
        // }, {
        //     name: "周",
        //     value: 0
        // }],
        // itemsf: [{
        //     name: "每天",
        //     value: 0,
        //     checked: !0
        // }, {
        //     name: "隔天",
        //     value: 1
        // }],
        dpsboxshow: false, //选科室boxshow
        plantyboxshow: false, //选方案类型boxshow
        way: 0, //0选择方案，1选择视频
        plantypeselect: 0,
        selectstruct: [], //选择结构，科室，部位，动作组 
        departindex: 0, //科室选择
        partindex: 0, //部位选择
        videolist: [], //视频列表（选择结构下的视频--基础视频库）
        plantype: [{
            name: "系统方案",
            value: 0
        }, {
            name: "医院方案",
            value: 1
        }, {
            name: "我的方案",
            value: 2
        }],
        token: ""
    },
    updatavideolist: function (id) { //传参查询情况,传小于1的id即清空列表
        if (0 >= id) {
            this.setData({
                videolist: []
            })
            return
        }
        var that = this
        console.log('id', id)
        app.webpost("queryvideolist", {
            token: app.globalData.userData.token,
            command: that.data.way,
            partid: id
        }, function (e) {
            console.log('updatavideolist',e)
            if (0 == e.data.code) {
                that.setData({
                    videolist: e.data.actorlist
                })
                console.log('页面updatavideolist',that.data)
            }
        })
    },
    onLoad: function (a) {
        var that = this;
        wx.getSystemInfo({
            success: function (a) {
                console.log(a)
                that.setData({
                    partlisthight: (a.windowHeight) * (750 / a.screenWidth) - 394,
                    // edithight: (a.windowHeight) * (750 / a.screenWidth) - 140,
                    // editlistsize:{width: 690,
                    //     hight: (a.windowHeight) * (750 / a.screenWidth)-585},
                    token: app.globalData.stoken,
                    resource: app.globalData.surl,
                    createdata: {patientid: app.globalData.patient.id,
                    recordnumber: app.globalData.patient.study_id,
                    cycle: 1,
                    cycleType: 1,
                    frequency: 0,
                    gaptime: 1,
                    groupNum: 1,
                    daynum: 1,
                    actorlist: []}
                })
                console.log('stoken', app.globalData.stoken)
                // e.setData({
                //     height: (a.screenHeight - 170) * (750 / a.screenWidth),
                //     emptyh: a.screenHeight * (750 / a.screenWidth) - 1080,
                //     resource: t.globalData.surl,
                //     token: app.globalData.stoken,
                //     patient: t.globalData.patient
                // }), console.log(e.data);
            }
        });
        
    },
    getprice:function(){
        var that=this
        app.webpost('getparice',{
            patient_id:app.globalData.patient.id,
            token:app.globalData.userData.token
        },function(e){
            if(0==e.data.code){
                that.setData({tprice:e.data.price})
            }
        })
    },
    onReady: function () {},
    // getvideo: function (a) {
    //     if (console.log(a), 0 == a.data.code) {
    //         for (var e = a.data.actorlist, l = 0; l < e.length; l++) e[l].repeatcount = 1, e[l].keeptime = 1,
    //             e[l].playcount = 1;
    //         this.setData({
    //             video: e
    //         });
    //     } else app.servercode(a.data.code);
    // },
    getvideo: function (list) {
        console.log('添加视频',list)
        var that = this;
        var sl = list;
        var cl = that.data.createdata.actorlist;
        for (var l = 0; l < sl.length; l++) sl[l].repeatcount = 1, sl[l].keeptime = 1,
            sl[l].playcount = 1, sl[l].right = 0;
        for (var i = 0; i < sl.length; i++) {
            var haved = false;
            for (var j = 0; j < cl.length; j++) {
                if (sl[i].id == cl[j].id) {
                    haved = true;
                    break;
                }
            }
            if (!haved) {
                cl.push(sl[i]);
            }
        }
        that.setData({
            "createdata.actorlist": cl
        });
        console.log('视频添加刷新后',that.data)

        // t.globalData.createselectway = -1; //弃用，查询视频列表限制等待用的
    },
    queryactor: function (a) {
        var e;
        e = 0 != app.globalData.planselect.template.id ? app.globalData.planselect.template.id : 0 != app.globalData.planselect.part.id ? app.globalData.planselect.part.id : app.globalData.planselect.position.id,
            null != app.globalData.planselect && app.webpost("/api/queryactorlist", {
                token: app.globalData.userData.token,
                command: a,
                partid: e
            }, this.getvideo());
    },
    onShow: function () {
        console.log('显示数据',this.data)
        this.getprice()
        if( 1==app.globalData.planauthority){
            console.log('视频数据更新',app.globalData.plandetail)
            app.globalData.planauthority=0
            this.setData({createdata: app.globalData.plandetail})
        }
        this.updatapage();
        // return
        // a.setData({
        //     partselect: app.globalData.planselect,
        //     createdata: app.globalData.plandetail
        // });
        // var e;
        // e = a.data.way[0].checked ? a.data.way[0].value : a.data.way[1].value, null != t.globalData.planselect && a.queryactor(e);
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    updatapage: function () { //更新页面，根据方式科室类别等更新列表和
        console.log(this.data)
        var that = this
        app.webpost('getplanvideoclassify', {
            token: app.globalData.userData.token,
            command: that.data.way,
            index: that.data.plantypeselect
        }, function (e) {
            if (0 == e.data.code) {
                console.log('刷新页面updatapage',e.data.positionlist)
                that.setData({
                    selectstruct: e.data.positionlist
                })
                if (1 == that.data.way) {
                    that.updatavideolist(that.data.selectstruct[that.data.departindex].partlist[that.data.partindex].id)
                }
            } else {
                app.servercode(e.data.code)
            }
        })
    },
    plantypeselect: function (e) {
        console.log('plantypeselect', e)
        this.setData({
            plantypeselect: e.detail
        })
    },
    wayplan: function () {
        this.setData({
            way: 0,
            departindex: 0,
            partindex: 0
        })
        this.updatapage();
    },
    wayvideo: function () {
        this.setData({
            way: 1,
            departindex: 0,
            partindex: 0,
            plantyboxshow: false
        })
        console.log('当前数据',this.data)
        this.updatapage();
        console.log('刷新数据',this.data)
    },
    plantyboxshow: function (e) {
        if (1 == this.data.way) return
        var v = this.data.dpsboxshow
        if (!e.detail) {
            v = false
        }
        this.setData({
            plantyboxshow: !e.detail,
            dpsboxshow: v
        })
    },
    dpsboxshow: function (e) {
        var v = this.data.plantyboxshow
        if (!e.detail) {
            v = false
        }
        this.setData({
            dpsboxshow: !e.detail,
            plantyboxshow: v
        })
    },
    departselect: function (e) {
        console.log(e.detail)
        this.setData({
            departindex: e.detail
        })
        if(1 == this.data.way){
            this.updatavideolist(this.data.selectstruct[this.data.departindex].partlist[this.data.partindex].id)
        }
    },
    partselect: function (e) {
        this.setData({
            partindex: e.detail
        })
        if (1 == this.data.way) {
            this.updatavideolist(this.data.selectstruct[this.data.departindex].partlist[this.data.partindex].id)
        }
    },
    onplanselect:function(e){
        console.log('plan选择',e.detail,this.data.selectstruct[this.data.departindex].partlist[this.data.partindex])
        wx.navigateTo({
          url: '../planvlpreview/planvlpreview?data='+JSON.stringify(this.data.selectstruct[this.data.departindex].partlist[this.data.partindex].templatelist[e.detail]),
        })
    },
    onplanadd:function(e){
        var that=this
        var sd=that.data.selectstruct[that.data.departindex].partlist[that.data.partindex].templatelist[e.detail]
        console.log('添加数据方案',sd)
        app.webpost("queryvideolist", {
          token: app.globalData.userData.token,
          command: 0,
          partid:sd.id
      },function(e){
        console.log('视频查询',e)
        if(0==e.data.code){
          that.getvideo(e.data.actorlist)
        }else{
          app.severcode(e.data.code)
        }
      })
    },
    onvideoselecttt:function(e){
        console.log('onvideoselect当前页面数据',this.data)
        console.log('选择',e)
        app.globalData.videoid = e.detail
        var ls=this.data.videolist
        app.globalData.plandetail.actorlist=ls
        app.globalData.planauthority=0
        console.log('当前页面数据',this.data)
        wx.navigateTo({
            url: "../../pages/video/video"
        });
    },
    onvideoadd:function(e){
        var list=[]
        app.globalData.planauthority=0
        list.push(this.data.videolist[e.detail])
        console.log('添加视频',list)
        console.log('添加前数据',this.data)
        this.getvideo(list)
    },

    scrollTopFun: function (a) {
        console.log(a.detail), this.setData({
            top: a.detail.scrollTop
        });
    },
    // selectkind: function (a) {
    //     for (var e, l, c = this, n = 0; n < c.data.way.length; ++n)
    //         if (c.data.way[n].checked) {
    //             e = c.data.way[n].value;
    //             break;
    //         }
    //     for (n = 0; n < c.data.plantype.length; ++n)
    //         if (c.data.plantype[n].checked) {
    //             l = c.data.plantype[n].value;
    //             break;
    //         }
    //     t.globalData.selectkind = {
    //         command: e,
    //         index: l
    //     }, wx.navigateTo({
    //         url: "../../pages/classify/classify",
    //         success: function (a) {},
    //         fail: function (a) {},
    //         complete: function (a) {
    //             console.log(a);
    //         }
    //     });
    // },
    // waychange: function (a) {
    //     for (var e = this.data.way, l = 0; l < e.length; ++l) e[l].checked = e[l].value == a.detail.value;
    //     t.globalData.planselect = null, this.setData({
    //         way: e,
    //         partselect: null,
    //         video: []
    //     });
    // },
    // plantypechange: function (a) {
    //     for (var e = this.data.plantype, l = 0; l < e.length; ++l) e[l].checked = e[l].value == a.detail.value;
    //     t.globalData.planselect = null, this.setData({
    //         plantype: e,
    //         partselect: null,
    //         video: []
    //     });
    // },
    // selectplan: function () {
    //     for (var t = this.data.selectlist, e = 0; e < this.data.video.length; e++) {
    //         for (var l = !1, c = 0; c < t.length; c++) this.data.video[e].id == t[c].id && (l = !0);
    //         l || t.push(this.data.video[e]);
    //     }
    //     this.setData(a({
    //         selectlist: t
    //     }, "createdata.actorlist", t)), console.log(this.data);
    // },
    // selectvideo: function (t) {
    //     if (console.log(this.data.selectlist), console.log(this.data.video[t.currentTarget.id]),
    //         this.data.way[1].checked) {
    //         for (var e = this.data.selectlist, l = !1, c = 0; c < e.length; c++) this.data.video[t.currentTarget.id].id == e[c].id && (l = !0);
    //         l || (e.push(this.data.video[t.currentTarget.id]), this.setData(a({
    //             selectlist: e
    //         }, "createdata.actorlist", e)));
    //     }
    // },
    cart:function(){
        var that=this
        app.globalData.plandetail=that.data.createdata
        if(!that.data.planeditshow){//console.log('创建数据',a)
        console.log('方案创建列表',that.data.createdata.actorlist)
        app.globalData.planauthority=1
        wx.navigateTo({
            url: "../createdit/createdit?price="+that.data.tprice
        })
    }
    },
    
      
    comfirm: function () {
        var that=this
        app.globalData.plandetail=that.data.createdata
        var a = this.data.createdata;
        var judgedata
        if (0 == a.actorlist.length) {
            app.servercode("所选视频为空");
            return;
        }
       app.webpost('seeadoctorjudgeinfo',{
        token: app.globalData.userData.token,
        patient_id:app.globalData.patient.id,
        doctor_id:app.globalData.userData.userid
       },function(e){
           if(0==e.data.code){
            judgedata=e.data
            wx.getSetting({
                withSubscriptions: true,
                success(e){
                    console.log('获取成功',e)
                    if(e.authSetting["scope.userLocation"]){
                        console.log('允许地址信息')
                        that.dealwithposition(judgedata)
                    }else{
                        wx.authorize({
                          scope: 'scope.userLocation',
                          success(res){
                            that.dealwithposition(judgedata)                 
                          },
                          fail(res){
                              console.log(res)
                            app.servercode('获取权限失败请删除小程序后重试')
                          }
                        })
                    }
                },fail(e){
                    console.log('获取失败',e)
                    wx.authorize({
                        scope: 'scope.userLocation',
                        success(res){
                            that.dealwithposition(judgedata)
                        },
                        fail(res){
                            console.log(res)
                          app.servercode('请开启位置权限')
                        }
                      })
            }
              })
           
                  //console.log('位置信息失败',res)
                  
                 
            //       wx.openSetting({
            //         withSubscriptions: true,
            //         success(e){console.log('允许',e.authSetting)
            //         var jb=JSON.parse(JSON.stringify(e.authSetting)) 
            //         console.log(jb)
                  
            //         if(jb['scope.userLocation']){
            //             that.comfirm();
            //         }
            //         },
            //         fail(e){
            //             console.log(e)
            //             app.servercode('请开启位置权限')
            //         }
            //       })
            //     }
            //   })
           }else{
            app.servercode(e.data.code)
           }
        })
       
            
        
    },
    dealwithposition(judgedata){
        var that=this
        wx.getLocation({
            altitude: 'altitude',
            type:'gcj02',
            success(res){
                console.log('位置信息',res)
                var distance= gps.GetDistance(judgedata.longitude,judgedata.latitude,res.longitude,res.latitude)
                console.log('距离',distance)
                var vl=JSON.parse(JSON.stringify(gps.bd09togcj02(judgedata.longitude,judgedata.latitude)))  
                console.log(judgedata.longitude)
           console.log('百度转火星',vl)
                that.data.createdata.is_hospital=(1==judgedata.see_doctor&&judgedata.ranges>distance)?1:0
                //院内外状态 1 院内 ,0 院外  
                console.log('院内外状态',that.data.createdata.is_hospital)
                that.createplan();
            },
            fail(res){
                console.log('获取位置失败',res)
                app.servercode('请到系统设置应用权限管理将位置权限打开后重试')
            }})
    },
    createplan:function(){
        var that=this
        var a = this.data.createdata;
        for (var i = 0; i < a.actorlist.length; i++) a.actorlist[i].actorid = a.actorlist[i].id;
            a.token = app.globalData.userData.token, console.log(a)
        app.webpost("createplan", a, function (e) {
            if (0 == e.data.code) {
                
                console.log("创建成功")
                console.log(e)
                var ps=that.data.tprice;
                if(1==that.data.createdata.is_hospital){
                    ps=0
                }console.log('价格',ps)
                wx.redirectTo({
                    url: "../createddata/createddata?price="+ps
                })
            } else {
                (console.log(e.data.code), app.servercode(e.data.code));
            }
        });
    }
    // viewplan: function () {
    //     0 == this.data.createdata.actorlist.length ? wx.showModal({
    //         title: "提示",
    //         content: "暂无可查看方案，请选择方案后查看",
    //         showCancel: !1
    //     }) : (t.globalData.plandetail = this.data.createdata, console.log(this.data.createdata),
    //         t.globalData.planauthority = 1, wx.navigateTo({
    //             url: "../../pages/plandetails/plandetails"
    //         }));
    // }
});