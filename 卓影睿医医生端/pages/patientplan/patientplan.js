var a = getApp();

Page({
    data: {
        patient: {},
        list: [],
        token: "",
        page: 1,
        count: 10,
        showqr: false,
        qrbtn: false,
        delBtnWidth:128,
        qrcodeurl:'',
        study_id:0,
        painfularea:'',
        painfulcycle:0,//0 三天 1一周 2两周 3一月
        diagnosis:'',
        //show:false
    },
    onLoad: function (t) {
        console.log('onload')
        var that=this   
        this.setData({
            patient: a.globalData.patient,
            resource: a.globalData.surl,
            token: a.globalData.stoken
        });
        // const eventChannel = this.getOpenerEventChannel()
        // eventChannel.on('ljios',function(){that.onShow()})
        // console.log('patient',a.globalData.patient)
     
    },
    onShow: function () {
        console.log('onshow')
        var t = this;
        // if(!t.data.show){
        //     t.setData({show:true})
        // }else{
        //     return
        // }
        //a.servercode('onshow');
        a.globalData.planselect = null, 
        t.setData({
            page: 1
        }), console.log(t.data.patient.id), 
        t.getplan() 
        t.detail();
       // t.showqrbtn();  版本更新后就不用了
    },
    onReady: function () {},
    onHide: function () {
        this.setData({show:false})
    },
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    showqrbtn: function () {
        var that = this  
        a.webpost('checkplanonpatient', //查询方案有没有绑定患者
            {
                patient_id: that.data.patient.id,
                token: a.globalData.userData.token
            },
            function (e) {
                console.log('查询方案绑定', e)
                if (0 == e.data.code) {
                    if (1==that.data.page) {
                        console.log('显示二维码btn',!e.data.union_id_state)
                        that.setData({
                            qrbtn: !e.data.union_id_state
                        })
                    }
                } else {
                    a.servercode(e.data.code)
                }
            })
    },
    getqrcode:function(){
        var qrurl='http://kangfu.zc5l.com/protocol_new.html?id='+
        a.globalData.patient.id+'&token='+a.globalData.userData.token
        console.log('qr',qrurl)
             this.setData({showqr: true,qrcodeurl:qrurl})
    },
    closeqrcode: function () {
        this.setData({
            showqr: false
        })
    },
    detail:function(){
        var that=this
        a.webpost('querypatientdetail',{ 
            token: a.globalData.userData.token,
            patient_id: that.data.patient.id},
            function(res){
                console.log('患者详情',res)
                if(0==res.data.code){
                    a.globalData.patient.painfularea=res.data.pain_area
                    a.globalData.patient.painfulcycle=res.data.pain_cycle
                    that.setData({
                        painfularea:res.data.pain_area,
                        painfulcycle:res.data.pain_cycle,
                        diagnosis:res.data.diagnosis})
                        //a.servercode(res.data.diagnosis)         
                }else{
                    a.servercode(res.data.code);        
                }
                //that.getplan() 
        })
    },
    getplan:function(){
        var t=this
        a.webpost('querypatientplanlist', {
            token: a.globalData.userData.token,
            patientid: t.data.patient.id,
            page: t.data.page,
            page_count: t.data.count
        }, function (e) {
            if (0 == e.data.code && null != e.data.recordlist && 0 < e.data.recordlist.length) {
                console.log(e.data);
                for (var o = [], l = e.data.recordlist, n = 0; n < l.length; n++) o.push({
                    studyid: l[n].id
                });
                a.webpost('querypaystatelist', {
                    paystatelistreq: o,
                    token: a.globalData.userData.token
                }, function (res) {
                    if(0!=res.data.code)
                    {
                        a.servercode(res.data.code);
                        //t.showqrbtn();
                        return
                    }
                    var e = res.data.paystatelistack;
                    t.setData({
                        study_id:e[0].studyid
                    })
                    for (var o = 0; o < l.length; o++)
                        for (var n = 0; n < e.length; n++)
                            if (l[o].id == e[n].studyid) {
                                var i = l[o];
                                i.state = e[n].paystate, i.totalprice = e[n].totalprice, i.price = e[n].price, l[o] = i,
                                console.log(i);
                                break;
                            }
                    t.setData({
                        list: l
                    }), console.log("tlist", l);
                    //t.showqrbtn();
                    //t.detail();
                   //判定二维码按键显示
                });
            } else {
                //t.detail();
                //t.showqrbtn();
                t.setData({
                    list: []
                })
                if (0 != e.data.code) {
                    a.servercode(e.data.code);
                }
            }
        });
    },
   
    createplan: function () {
        a.webpost('querypatientdoingplan', {
            id: this.data.patient.id,
            page: 1,
            page_count: 1,
            token: a.globalData.userData.token
        }, function (t) {
            a.globalData.planauthority=0
            console.log("当前方案"), console.log(t)
            if(0 == t.data.plans.length) {
                a.globalData.plandetail = {
                patientid: a.globalData.patient.id,
                recordnumber: a.globalData.patient.study_id,
                cycle: 1,
                cycleType: 1,
                frequency: 0,
                gaptime: 1,
                groupNum: 1,
                daynum: 1,
                actorlist: []
            }
             wx.navigateTo({
                url: "../../pages/create/create",
                success: function (a) {},
                fail: function (a) {},
                complete: function (a) {}
            })} else a.servercode("已有方案正在进行中");
        });
    },
    plandelete: function (t) {
        var e = this;
        console.log("删除"), console.log(e.data.list[t.currentTarget.id]), a.webpost('deleteplan', {
            token: a.globalData.userData.token,
            studyid: e.data.list[t.currentTarget.id].id
        }, function (t) {
            console.log("删除返回", t), 0 == t.data.code ? e.onShow() : a.servercode(t.data.code);
        });
    },
    select: function (t) {
        var e = this;
        console.log("选择"), a.globalData.plandetail = e.data.list[t.currentTarget.id], a.globalData.plandetail.valid = !0,
            console.log(a.globalData.plandetail), a.globalData.planauthority = 0
            a.globalData.plandetail.patientid=e.data.patient.id
            a.globalData.plandetail.starttime=a.globalData.plandetail.startime
             wx.navigateTo({
                url: "../../pages/plandetails/plandetails"
            });
    },
    scrollTopFun: function(a) {
        console.log(a.detail), this.setData({
            top: a.detail.scrollTop
        });
    },
    drawStart: function (e) {
        // console.log("drawStart");  
        var touch = e.touches[0]
    
        for(var index in this.data.list) {
          var item = this.data.list[index]
          item.right = 0
        }
        this.setData({
         list: this.data.list,
          startX: touch.clientX,
        })
    
      },
      drawMove: function (e) {
          console.log(e)
        var touch = e.touches[0]
        var item = this.data.list[e.currentTarget.dataset.index]
        var disX = this.data.startX - touch.clientX
        
        if (disX >= 20) {
          if (disX > this.data.delBtnWidth) {
            disX = this.data.delBtnWidth
          }
          item.right = disX
          this.setData({
            isScroll: false,
            list: this.data.list
          })
        } else {
          item.right = 0
          this.setData({
            isScroll: true,
            list: this.data.list
          })
        }
      },  
      drawEnd: function (e) {
        var item = this.data.list[e.currentTarget.dataset.index]
        console.log('dend',this.data)
        if (item.right >= this.data.delBtnWidth/2) {
          item.right = this.data.delBtnWidth
          this.setData({
            isScroll: true,
            list: this.data.list,
          })
        } else {
          item.right = 0
          this.setData({
            isScroll: true,
            list: this.data.list,
          })
        }
      },
    talk: function () {
        wx.navigateTo({
            url: "../../pages/talk/talk"
        });
    },
    sendoder: function (t) {
        console.log('选择',t)
        var e = this;
        a.globalData.talkp=null
        a.globalData.ordersend = !0, wx.navigateTo({
            url: "../../pages/talk/talk"
        }), a.globalData.plandetail = e.data.list[t.currentTarget.id], a.globalData.planauthority = 0;
        console.log('订单详情',a.globalData.plandetail)
        var o = JSON.stringify({
            Seq: a.globalData.userData.userid,
            to: a.globalData.patient.id,
            to_name: a.globalData.patient.name,
            msgid: 3,
            t_type: 1,
            text: JSON.stringify(a.globalData.plandetail)
        });
        console.log(a.globalData.sockettask), a.globalData.sockettask.send({
            data: o,
            fail: function (t) {
               // a.servercode("聊天服务器连接失败");
            }
        });
    },
    bottom: function (t) {
        var e = this;
        e.setData({
            page: e.data.page + 1
        }), a.webpost('querypatientplanlist', {
            token: a.globalData.userData.token,
            patientid: e.data.patient.id,
            page: e.data.page,
            page_count: e.data.count
        }, function (t) {
            if (0 == t.data.code) {
                for (var o = e.data.list, l = 0; l < t.data.recordlist.length; l++) {
                    var n = array[l];
                    o.push(n);
                }
                e.setData({
                    list: o
                });
            } else a.servercode(t.data.code);
        });
    },
    seeBtn(){
        let json={
            study_id:parseInt(this.data.study_id),
            token:a.globalData.userData.token
          }
          a.webpost('queryfeedbacklist',json,(e)=>{
            if(e.data.code ==0){
              let par= encodeURIComponent(JSON.stringify(e.data));
              wx.navigateTo({
                url:`/pages/feedback/feedback?par=${par}`,
              }) 
            }else if(e.data.code ==21){ 
              wx.showToast({
                title: '暂无评价反馈',
                icon: 'none',
                duration: 2000,
              })
      
            }else{
              a.servercode(e.data.code)
      
            }
        })
            
    },
});