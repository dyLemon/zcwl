// components/pvideolist/pvideolist.js
 const app=getApp();
Component({
  externalClasses: ['imgh','img'],
  /**
   * 组件的属性列表
   */
  properties: {
    pvideolist:{
      type:Array,
      value:[]
    },
    hight:{
      type:Number,
      value:0
    },
    wight:{
      type:Number,
      value:0
    },
    token:{type:String,value:''},
    resource:{type:String,value:''}
  },

  /**
   * 组件的初始数据
   */
  data: {
    pvideolist:[],
    hight:0,
    wight:0,
    // select:-1,
    // hover:-1,
    token:'',
    resource:''
  },
  
  // attached:function(){
  //     this.setData({
  //       token:app.globalData.stoken,
  //       resource:app.globalData.surl})
  //       console.log('ready',this.data)
  //   }
  // ,
  /**
   * 组件的方法列表
   */
  methods: {
    start:function(e){
      //this.setData({hover:e.currentTarget.id})
    },
    end:function(){
      //this.setData({hover:-1})
    },
    move:function(){
      //this.setData({hover:-1})
    },
    select:function(e){
      console.log('内部选择数据',e)
      this.triggerEvent('videoselect', e.currentTarget.id)
    },
    add:function(e){
      this.triggerEvent('videoadd', e.currentTarget.id)
    }
  }
})
