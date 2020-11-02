// components/planvlist/planvlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    templatelist:{
      type:Array,
      value:[]
    },
    hight:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    templatelist:[],
    //select:0,
    hight:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ontap:function(e){
      //this.setData({select:e.target.id})
      this.triggerEvent('planselect', e.currentTarget.id)
    },
    onadd:function(e){
      this.triggerEvent('planadd', e.currentTarget.id)
    }
  }
})
