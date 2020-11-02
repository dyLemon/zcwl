// pages/screenshot/screenshot.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showImage: {
      url: '',
      height: '',
      width: ''
    },
    imgMaxWidth: '',
    imgMaxHeight: '',
    showBtn: true,
    x: 0,
    y: 0,
    scale: 1,
    pxratio:1,
    vheight:0,
    cheight:0,
    moveViewWidth: '',
    moveViewHeight: '',
    lastImage: ''
  },

  /**
   * 图片加载获取图片参数
   */
  onImageLoad: function (e) {
    this.data.showImage.height = e.detail.height;
    this.data.showImage.width = e.detail.width;
    // let bili = e.detail.width / e.detail.height
    // if (bili > this.data.moveViewWidth / this.data.moveViewHeight) {
    //   wx.showToast({
    //     title: '请选择正确比例的图片',
    //   })
    //   this.setData({ showBtn: true })
    //   return;
    // }

    this.data.showImage.width = this.data.imgMaxWidth;
    this.data.showImage.height = e.detail.height * this.data.imgMaxWidth / e.detail.width

    this.setData({ showImage: this.data.showImage })
    var context = wx.createCanvasContext('canvasOne');
    var hi=(this.data.pxratio*this.data.vheight-this.data.showImage.height)/2
    console.log('hi',hi)
    context.drawImage(this.data.showImage.url, 0,hi , this.data.showImage.width, this.data.showImage.height)
    context.draw()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('传参',options)
    var that=this
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let hh = res.windowHeight
        that.setData({
          imgMaxWidth: ww * 0.9,
          pxratio:res.windowWidth/750,
          vheight:res.windowHeight*(750/res.windowWidth)-120,
          cheight:res.windowHeight-120*(res.windowWidth/750),
          bwidth:res.windowWidth/2-1,
          y:(res.windowHeight-120*(res.windowWidth/750)-ww * 0.9)/2
        });
        that.setData({ imgMaxHeight: hh })
        that.setData({ moveViewWidth: ww * 0.9 })
        that.setData({ moveViewHeight: this.data.moveViewWidth})
        that.setData({'showImage.url':options.data})
        console.log('onlaod',that.data.showImage)
      }
    })
  },
  /**
   * 截图完成将指定canvas区域生成图片
   */
  jieDone: function () {
    var that = this
    // var hi= that.data.y-((that.data.pxratio*that.data.vheight-that.data.showImage.height)/2)
    // if(0<hi){
    //   hi=0
    // }
    wx.canvasToTempFilePath({
      x: 0,
      y:that.data.y,
      width: that.data.moveViewWidth * that.data.scale,
      height: that.data.moveViewHeight * that.data.scale,
      destWidth: that.data.moveViewWidth * that.data.scale,
      destHeight: that.data.moveViewHeight * that.data.scale,
      canvasId: 'canvasOne',
      success: function (res) {
        // that.data.showImage.url = res.tempFilePath
        // that.data.showImage.height = that.data.moveViewWidth * that.data.scale
        // that.data.showImage.width = that.data.moveViewHeight * that.data.scale
        // that.setData({ showImage: that.data.showImage })
        // //that.setData({ showBtn: true })
        // that.setData({ lastImage: res.tempFilePath })
        console.log(that.data.moveViewHeight, that.data.moveViewWidth)
        console.log(that.data.showImage.height, that.data.showImage.width)
        wx.uploadFile({
          filePath:  res.tempFilePath,
          name: 'file',
          url:app.globalData.url + app.api('upavatar'),
          formData:{
            token: app.globalData.userData.token,
            user_id:app.globalData.userData.userid
          },
          success(e) {
            console.log(e)
            var js=JSON.parse(e.data)
            if (0 != js.code) {
              app.servercode(js.code)
            }else{
              //that.getavatar();
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      },
      fail(res) {
        wx.hideLoading()
        wx.showModal({
          title: '截取失败',
          content: res.errMsg
        })
        console.log("fail res:")
        console.log(res)
      }
    })
  },
  onChange: function (e) {
    console.log('')
    console.log(e.detail)
    //this.setData({ x: e.detail.x })
    this.data.y=e.detail.y
   // this.setData({ y: e.detail.y })
  },
  cancelImg: function (e) {
    wx.navigateBack({
      delta: 1,
    })
  }
})