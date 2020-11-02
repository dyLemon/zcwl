// pages/creatededit/creatededit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    createdata: null,
    tprice: 0, // 价格show函数直接查询
    items: [{
      name: "天",
      value: 1,
      checked: !0
    }, {
      name: "周",
      value: 0
    }],
    itemsf: [{
      name: "每天",
      value: 0,
      checked: !0
    }, {
      name: "隔天",
      value: 1
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    this.setData({
      tprice: options.price
    })
    wx.getSystemInfo({
      success: function (a) {
        console.log(a)
        that.setData({
          edithight: (a.windowHeight) * (750 / a.screenWidth) - 140,
          editlistsize: {
            width: 690,
            hight: (a.windowHeight) * (750 / a.screenWidth) - 585
          },
          token: app.globalData.stoken,
          resource: app.globalData.surl,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
    var cycle=this.data.items
    var frequency=this.data.itemsf
   for (let index = 0; index < cycle.length; index++) {
    cycle[index].checked=app.globalData.plandetail.cycleType==cycle[index].value 
   }
   for (let index = 0; index < frequency.length; index++) {
    frequency[index].checked=app.globalData.plandetail.frequency==frequency[index].value 
   }
   this.setData({
    createdata: app.globalData.plandetail,
    items:cycle,
    itemsf:frequency
  })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.plandetail=this.data.createdata
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  cyclesubstract: function () {
    var a = this;
    if (1 < a.data.createdata.cycle) {
      var t = a.data.createdata;
      t.cycle = t.cycle - 1, a.setData({
        createdata: t
      });
    }
  },
  cycleadd: function () {
    var a = this.data.createdata;
    0 == a.cycleType && 4 > a.cycle ? (a.cycle = a.cycle + 1, this.setData({
      createdata: a
    })) : 1 == a.cycleType && 30 > a.cycle && (a.cycle = a.cycle + 1, this.setData({
      createdata: a
    }));
  },
  cyclechange: function (t) {
    for (var e, l = this.data.items, c = 0; c < l.length; ++c) l[c].checked = l[c].value == t.detail.value,
      l[c].checked && (e = l[c].value);
    this.setData({
      items: l,
      "createdata.cycleType": e
    }), 0 == e && 4 < this.data.createdata.cycle && this.setData({"createdata.cycle": 1});
  },
  frequencychange: function (t) {
    for (var e, l = this.data.itemsf, c = 0; c < l.length; ++c) l[c].checked = l[c].value == t.detail.value,
      l[c].checked && (e = l[c].value);
    this.setData({
      itemsf: l,"createdata.frequency": e
    });
  },
  groupsubstract: function () {
    var a = this;
    if (1 < a.data.createdata.groupNum) {
      var t = a.data.createdata;
      t.groupNum = t.groupNum - 1, a.setData({
        createdata: t
      });
    }
  },
  groupadd: function () {
    var a = this.data.createdata;
    a.groupNum = a.groupNum + 1, this.setData({
      createdata: a
    });
  },
  timessubstract: function () {
    var a = this;
    if (1 < a.data.createdata.daynum) {
      var t = a.data.createdata;
      t.daynum = t.daynum - 1, a.setData({
        createdata: t
      });
    }
  },
  timesadd: function () {
    var a = this.data.createdata;
    a.daynum = a.daynum + 1, this.setData({
      createdata: a
    });
  },
  gapsubstract: function () {
    var a = this;
    if (1 < a.data.createdata.gaptime) {
      var t = a.data.createdata;
      t.gaptime = t.gaptime - 1, a.setData({
        createdata: t
      });
    }
  },
  gapadd: function () {
    var a = this.data.createdata;
    a.gaptime = a.gaptime + 1, this.setData({
      createdata: a
    });
  },
  editselect: function (e) {
    console.log('editselect', e)
    app.globalData.videoid = e.detail,
    app.globalData.plandetail = this.data.createdata
    console.log(this.data.videolist)
    app.globalData.planauthority = 1
    wx.navigateTo({
      url: "../../pages/video/video"
    });
  },
  editdelete: function (e) {
    console.log('editdelete', e)
    var l = this.data.createdata.actorlist;
    l.splice(e.detail, 1)
    this.setData({
      isScroll: true,
      "createdata.actorlist": l
    })
  },
  comfirm:function(){
    var that=this
    var a = this.data.createdata;
    for (var i = 0; i < a.actorlist.length; i++) a.actorlist[i].actorid = a.actorlist[i].id;
        a.token = app.globalData.userData.token, console.log(a)
        app.webpost("createplan", a, function (e) {
            if (0 == e.data.code) {
                
                console.log("创建成功")
                console.log(e)
                wx.navigateTo({
                    url: "../createddata/createddata?price="+that.data.tprice
                })
            } else {
                (console.log(e.data.code), app.servercode(e.data.code));
            }
        });
  }
})