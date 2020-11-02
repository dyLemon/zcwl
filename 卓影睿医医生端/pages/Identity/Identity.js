// pages/Identity/Identity.js
var app = getApp();
var olddata={};   //已认证信息记录
const K=1024;
const M=1024*K;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    idcard: '',
    img: 'https://wxprogram.zc5l.com/img/picture_bg.png',
    imgsize:0,
    input: 0,
    state: 0,
    notselect: true,
    attestedunmodified:false,
    causefailure:'',
    clear:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.webpost('/api/account/querycheckinfo', {
        user_id: app.globalData.userData.userid,
        token: app.globalData.userData.token
      },
      function (e) {
        console.log('查询认证信息', e)
        
        if (0 == e.data.code) {
          var edum=false
          if(1==e.data.state){
            edum=true
          }

          olddata.name=e.data.name
          olddata.idcard=e.data.id_card
          that.setData({
            name: e.data.name,
            idcard: e.data.id_card,
            img: 'http://106.15.188.10:22339/' + e.data.img_path + '&token=' + app.globalData.stoken,
            checkid: e.data.check_id,
            state: e.data.state,
            causefailure:e.data.description,
            //state:1,
            notselect: true,
            attestedunmodified:edum,
            clear:false
          })
        } else {
          t.servercode(e.data.code);
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    app.webpost('ocrinformation', {
      token: app.globalData.userData.token,
      user_id: app.globalData.userData.userid
    },function(e){
      console.log('userid',app.globalData.userData.userid)
      console.log(e)
      if(0==e.data.code){
        console.log('身份',e.data)
        //that.setData({name:})
      }})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
  regInput(e) {
    var s = e.detail.value.slice(this.data.name.length);
    var regNum = new RegExp('[\u4e00-\u9fa5]', 'g');
    var rsNum = regNum.exec(s);

    if (!rsNum&&0!=s.length) {
      console.log('匹配失败')
      this.setData({
        name: this.data.name
      })
      return
    }
    if(1==this.data.state){
      if(olddata.name==e.detail.value){
        this.setData({
          attestedunmodified:true
        })
      }else{
        this.setData({
          attestedunmodified: false
        })
      }
    }
    this.setData({
      name: e.detail.value
    })
  },
  modifyidcard:function(s){
    if(1==this.data.state){
      if(olddata.idcard==s){
        this.setData({
          attestedunmodified:true
        })
      }else{
        this.setData({
          attestedunmodified: false
        })
      }
    }
  }
  ,
  inputidcard: function (e) {
    if (e.detail.value.length > 18) {
      var s = e.detail.value.slice(0, 18);
      this.modifyidcard(s);
      this.setData({
        idcard: s
      })
    }else{
      this.modifyidcard(e.detail.value.length);
    }
  },
  namefocus: function () {
    this.setData({
      input: 1
    })
  },
  idfocus: function () {
    this.setData({
      input: 2
    })
  },
  nameblur: function () {
    this.setData({
      input: 0
    })
  },
  idblur: function () {
    this.setData({
      input: 0
    })
  },
  showimg: function () {
    if (!this.data.notselect) {
      wx.navigateTo({
        url: '../../pages/Identityimg/Identityimg?img=' + this.data.img,
      })
    }
  },
  select: function () {
    var that = this
    wx.chooseImage({
      success(res) {
        console.log('选择图片',res)
        if(60*M<res.tempFiles[0].size){
          app.servercode('图片超过60M')
          return
        }
        that.setData({
          img: res.tempFilePaths[0],
          notselect: false
        })
        if(1==that.data.state){
          that.setData({attestedunmodified:false})
        }
      }
    })
  },
  reset:function(){
    this.setData({
      name: '',
      idcard: '',
      img: '',
      //state:1,
      notselect: true,
      clear:true
    })
  },
  confirm: function (e) {
    console.log('confirm')
    console.log(e.detail.value)
    if ('' == e.detail.value.name || '' == e.detail.value.idcard) {
      app.servercode("请输入姓名和身份证号");
      return;
    }
    if (15 != e.detail.value.idcard.length && 18 != e.detail.value.idcard.length) {
      app.servercode("请输入正确身份证号");
      return;
    }
    console.log('提交data',this.data)
    if ((0==this.data.state||2==this.data.state)&&this.data.notselect) {
      app.servercode("请添加图片");
      return;
    }
    var that = this;
    console.log(that.data.img)
    if (this.data.notselect) {
      console.log('不改图片')
      wx.request({
        //url: 'http://192.168.0.47:808'+'/api/upload_picture', 
        url: app.globalData.url + '/api/upload_picture',
        header:{'content-type': 'application/x-www-form-urlencoded'},
        data:{
          imgupload:0,
          name: e.detail.value.name,
          idcard: e.detail.value.idcard,
          id: app.globalData.userData.userid,
          check_id: that.data.checkid,
          token: app.globalData.userData.token,
          file:''
        },
        method: 'post',
        success(res){
          console.log(res.data)
          
          if (0 == res.data.code) {
            wx.navigateBack({
              delta: 1,
            })
          } else {
            app.servercode(res.data.code)
          }
        },
        fail(res){
          app.servercode('服务器连接失败')
        }
      })

    }else{
      wx.getImageInfo({
        src: that.data.img,
        success(e){
          console.log(e);
        },fail(e){
          console.log(e);
        }
      })
      wx.uploadFile({ //
        //url:'http://192.168.0.47:808'+'/api/upload_picture', 
        url: app.globalData.url + '/api/upload_picture',
        filePath: that.data.img,
        name: 'file',
        formData: {
          // Pramam:JSON.stringify({ 
          imgupload:1,  //0假 1真
          name: e.detail.value.name,
          idcard: e.detail.value.idcard,
          id: app.globalData.userData.userid,
          token: app.globalData.userData.token //})
          // id:1,
          // name:'说的',
          // idcard:12,
          // token:'sdfsf'
        },
        success(res) {
          console.log(res.data)
          var rt = JSON.parse(res.data)
          if (0 == rt.code) {
            wx.navigateBack({
              delta: 1,
            })
          } else {
            app.servercode(tr.code)
          }
          //do something
        },
        fail(e) {
          console.log(e)
        }
      })
    }

    
  },
  modify: function (e) {
    console.log(confirm)
    console.log(e.detail.value)
    if ('' == e.detail.value.name || '' == e.detail.value.idcard) {
      app.servercode("请输入姓名和身份证号");
      return;
    }
    if (15 != e.detail.value.idcard.length && 18 != e.detail.value.idcard.length) {
      app.servercode("请输入正确身份证号");
      return;
    }
    
    var that = this;
    console.log(that.data.img)
    console.log('token',app.globalData.userData.token)
    if (this.data.notselect) {
      console.log('不改图片')
      wx.request({
        //url: 'http://192.168.0.47:808'+'/api/modifyuserverification', 
        url: app.globalData.url + '/api/modifyuserverification',
        header:{'content-type': 'application/x-www-form-urlencoded'},
        data:{
          imgupload:0,
          name: e.detail.value.name,
          idcard: e.detail.value.idcard,
          id: app.globalData.userData.userid,
          check_id: that.data.checkid,
          token: app.globalData.userData.token,
          file:''
        },
        method: 'post',
        success(res){
          console.log(res.data)
          
          if (0 == res.data.code) {
            wx.navigateBack({
              delta: 1,
            })
          } else {
            app.servercode(res.data.code)
          }
        },
        fail(res){
          app.servercode('服务器连接失败')
        }
      })

    } else {
      wx.uploadFile({ //
        //url:'http://192.168.0.47:808'+'/api/modifyuserverification', 
        url: app.globalData.url + '/api/modifyuserverification',
        filePath: that.data.img,
        name: 'file',
        formData: {
          // Pramam:JSON.stringify({ 
          imgupload:1, 
          name: e.detail.value.name,
          idcard: e.detail.value.idcard,
          id: app.globalData.userData.userid,
          check_id: that.data.checkid,
          //id:0,
          //check_id:10,
          token: app.globalData.userData.token //})
          // id:1,
          // name:'说的',
          // idcard:12,
          // token:'sdfsf'
        },
        success(res) {
          console.log(res.data)
          var rt = JSON.parse(res.data)
          if (0 == rt.code) {
            wx.navigateBack({
              delta: 1,
            })
          } else {
            app.servercode(rt.code)
          }
          //do something
        },
        fail(e) {
          app.servercode('网络错误')
        }
      })
    }
  }
})