var app = getApp();
const pagecount=15
Page({
    data: {
        nonempty: !1,
        searchkey: "",
        doclist: [],
        page: 1,
        resource: "",
        searched:false,
    },
    onLoad: function(t) {
        this.setData({
            resource: app.globalData.wsurl
        });
    },
    onReady: function() {},
    onShow: function() {
      app.globalData.searchkey=''
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onsearch: function(t) {
        console.log(t)
       this.search()
    },
    back: function() {
        console.log("退"), wx.navigateBack({});
    },
    inputing: function(a) {
      console.log(a.detail.value)
        this.setData({
            nonempty: "" != a.detail.value,
            searchkey: a.detail.value
        }), console.log(a.detail.value);
        app.globalData.searchkey=a.detail.value
    },
    reset: function() {
      console.log('重置')
        this.setData({
            nonempty: !1,
            searchkey: "",
            doclist: []
        });
        app.globalData.searchkey=''
    },
    select: function(t) {
      app.globalData.selectdoctor.doctorid  = this.data.doclist[t.currentTarget.id].id
      app.globalData.selectdoctor.selecttype = 0
        wx.navigateTo({
            url: "../doctor/doctor"
        });
    },
    search:function(key){
        var that = this
        app.webpost('getdoclist', {
          token: app.globalData.wxuser.token,
          key_word: that.data.searchkey,
          page_index: that.data.page,
          page_count: pagecount
        },
        function (e) {
          if (0 == e.data.code) {
            console.log(e)
            that.setData({
              doclist: e.data.doctor_list,
              searched:true
            })
          } else {
            app.servercode(e.data.code)
          }
        })
      },
    bottom: function(t) {
       this.setData({page:page+1})
       this.search(this.data.searchkey)
    }
});