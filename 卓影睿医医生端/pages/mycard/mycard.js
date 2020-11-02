// pages/mycard/mycard.js
const app = getApp()
import rpx2px from '../../utils/rpx2px.js'
var type //type 选择，0正面   1反面
var imgWidth = 556;
var imgHeight = 360;
var efo
var result //认证返回
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: {
      fonturl: '',
      backurl: ''
    },
    frontdata: null,
    backdata: null,
    fontstate: 0, //0 空  1照相中  2照片选择完成 3认证
    backstate: 0, //0 空  1照相中  2照片选择完成 3认证
    showtool: false,
    showshutter: false,
    cameraallow:true,   //允许使用相机
    modify:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(null!=options.data&&'modify'==options.data){
      this.setData({modify:true})
    }
    wx.getSystemInfo({
      success: (result) => {
        efo = result
      },
    })
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


  },
  cameraallow(){
    var state
      if (0 == type) {
        state = 'fontstate'
      } else {
        state = 'backstate'
      }
      this.setData({
        [state]: 1,
        showshutter: true,
        showtool: false
      })
  },
  camarabtn() {
    var that=this
    if(this.data.cameraallow){
      that.cameraallow()
    }else{
       wx.getSetting({
      withSubscriptions: true,
      success(e){
        console.log(e.authSetting)
        if(e.authSetting.scope.camera){
          that.cameraallow()
        }else{
          app.servercode('请允许使用摄像机使用拍照功能')
        }
      },
      fail(e){
        console.log(e)
        app.servercode('请允许使用摄像机使用拍照功能')
      }
    })
    }
   
   
  },
  fontcameraerror(e){
    console.log('摄像机调用失败',e)
    this.setData({
      cameraallow:false,
      fontstate: 0,
      showshutter: false,
    })
  },
  backcameraerror(e){
    this.setData({
      cameraallow:false,
      backstate: 0,
      showshutter: false,
    })
  },
  shutter: function () {
    var that = this
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success(res) {
        console.log('照片成功', res)
        that.imgshow(res.tempImagePath)
      },
      fail(res) {
        if (0 == type) {
          state = 'fontstate'
        } else {
          state = 'backstate'
        }
        this.setData({
          [state]: 0,
          showshutter: false,
          showtool: false
        })
        console.log('照片失败', res)
      }
    })
  },
  //type 选择，0正面   1反面
  selectimgbtn() {
    const _this = this;
    _this.setData({
      showtool: false
    })
    wx.chooseImage({
      count: 1,
      success(res) {
        var img = res.tempFilePaths[0]
        _this.imgshow(img)
      }
    })
  },
  imgshow(img) {
    var that = this
    var canva
    var selects;
    var state

    if (0 == type) {
      canva = wx.createCanvasContext('front');
      selects = "img.fonturl"
      state = 'fontstate'
    } else {
      canva = wx.createCanvasContext('back');
      selects = "img.backurl"
      state = 'backstate'
    }
    that.setData({
      [selects]: img,
      [state]: 2,
      showshutter: false
    })
    wx.getImageInfo({
      src: img,
      success: function (info) {
        console.log(info)
        console.log('windinfo', efo)
        //旋转
        //正面照
        // if (0 == type) {
        if (info.height > info.width) {
          canva.translate(rpx2px(imgWidth), 0)
          canva.rotate(90 * Math.PI / 180)
          // canva.rotate(270 * Math.PI / 180)
          // canva.translate(0,-rpx2px(imgHeight)) 
          canva.drawImage(img, 0, 0, info.width, info.height, 0, 0, rpx2px(imgHeight), rpx2px(imgWidth))
          // if(info.height/info.width>imgWidth/imgHeight){
          //   canva.drawImage(img, 0, 0,info.height,info.width,0,0, rpx2px(imgWidth),rpx2px(imgHeight))
          // }else{
          //   canva.drawImage(img, 0, 0,rpx2px(imgHeight*(info.height/info.width)),rpx2px(imgHeight))
          // }
        } else {
          canva.drawImage(img, 0, 0, info.width, info.height, 0, 0, rpx2px(imgWidth), rpx2px(imgHeight))
          //canva.drawImage(img, 0, 0,rpx2px(imgWidth),rpx2px(imgHeight))
          // if(info.width/info.height>imgWidth/imgHeight){
          //   //canva.drawImage(img, 0, 0,rpx2px(imgWidth),rpx2px(imgWidth*(info.height/info.width)))
          //   canva.drawImage(img, 0, 0,rpx2px(imgHeight*(info.width/info.height)),rpx2px(imgHeight))
          // }else{
          //   canva.drawImage(img, 0, 0,rpx2px(imgWidth),rpx2px(imgWidth*(info.height/info.width)))
          //   //canva.drawImage(img, 0, 0,rpx2px(imgHeight*(info.width/info.height)),rpx2px(imgHeight))
          // }
        }
        // } else {
        //   if (info.height > info.width) {
        //     canva.drawImage(img, 0, 0,rpx2px(imgWidth),rpx2px(imgHeight))
        //   } else {
        //     canva.drawImage(img, 0, 0,rpx2px(imgWidth),rpx2px(imgHeight))
        //   }
        // }
        canva.draw()

        // }                       
      }
    })
  },
  uploadattest() {
    wx.uploadFile({
      url: app.globalData.url + app.api('ocrcheck'),
      filePath: res.tempFilePaths[0],
      name: 'img_url',
      success(num) {
        let data = JSON.parse(num.data);
        console.log(data);
        // console.log(JSON.parse(res.data));
        if (data.errcode == 0) { //获取图片成功


        } else {
          wx.showToast({
            title: '请上传正确的身份证',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //正面脸照片
  fontbtn() {
    if(this.data.showshutter){
      app.servercode('拍照期间不能切换操作')
      return
    }
    type = 0;
    this.setData({
      showtool: true,
      showshutter: false,
      frontdata: null
    })
    // return;
  },
  backbtn() {
    if(this.data.showshutter){
      app.servercode('拍照期间不能切换操作')
      return
    }
    type = 1;
    this.setData({
      showtool: true,
      showshutter: false,
      backdata: null
    })
  },
  cancelbtn() {
    this.setData({
      showtool: false
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
  confirm: function () {
    var that = this
    console.log(this.data)
    if(''==this.data.img.fonturl||''==this.data.img.backurl){
      app.servercode('请上传正反面照片')
      return
    }
    app.loding(true)
    that.attest(true)
    that.attest(false);
  },
  fontattest() {
    console.log('前认证')
    this.attest(true)
  },
  backattest() {
    this.attest(false)
  },
  attest(bfont) {
    var that = this
    var url;
    var ro
    if (bfont) {
      url = this.data.img.fonturl
    } else {
      url = this.data.img.backurl
    }
    console.log('认证调用',app.api('ocrcheck'))
    wx.uploadFile({
      filePath: url,
      name: 'img_url',
      url: app.globalData.url + app.api('ocrcheck'),
      formData: {
        user_id: app.globalData.userData.userid
        //user_id: 500
      },
      success: res => {
        ro = JSON.parse(res.data)
        console.log(ro)
        if (0 == ro.code) {
          if (bfont && 'Front' == ro.type || !bfont && 'Back' == ro.type) {
            var sset
            var state
            if (bfont) {
              sset = 'frontdata'
              state = 'fontstate'
            } else {
              sset = 'backdata'
              state = 'backstate'
            }
            that.setData({
              [sset]: ro,
            })
            if (null != that.data.frontdata && null != that.data.backdata) {
              app.servercode('认证成功')
              app.webpost('ocrattest', {
                  token: app.globalData.userData.token,
                  user_id: app.globalData.userData.userid
                },
                function (e) {
                  app.loding(false)
                  wx.redirectTo({
                    url: '../doctorattestting/doctorcerattestting',
                  })
                  // wx.navigateTo({
                  //   url: '../Identity/Identity',
                  // })
                })
            }
          } else {
            console.log('')
            app.servercode('请传正确面的照片')
          }
        } else if (1 == ro.code) {
          if (bfont) {
            app.servercode('前面认证失败请重传照片')
          } else {
            app.servercode('后面认证失败请重传照片')
          }
        } else {
          app.servercode('服务器过载')
        }
      }
    })
  }
})