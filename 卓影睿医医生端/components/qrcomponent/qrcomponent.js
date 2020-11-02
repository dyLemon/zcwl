// components/qrcomponent/qrcomponent.js
const QRCode = require('../../utils/weapp-qrcode.js')
import rpx2px from '../../utils/rpx2px.js'
let qrcode;

// 300rpx 在6s上为 150px
const qrcodeWidth = rpx2px(300)

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type:String,
      value:"",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    text:'',
    image: '',
    qrcodeWidth
  },
  ready: function () {
    qrcode = new QRCode('canvas', {
      usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
      text: this.data.text,
      image: '',
      width: qrcodeWidth,
      height: qrcodeWidth,
      colorDark: "black",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  show:function(){
    console.log(this)
    qrcode.makeCode(this.data.text)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showqr:function(e){
      console.log('传进qr',e);
      qrcode.makeCode(e)
    }
  }
})
