// components/dropdbox/dropdbox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectdata:{
      type:Array,
      value:[]
    },
    show:{
      type:Boolean,
      value:false
    },
    boxleft:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectdata:[],
    index:0,
    show:false,
    boxleft:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectTap:function(){
      console.log(this.data.selectdata)
      this.triggerEvent('dropboxshow', this.data.show)
    },
    optionTap:function(e){
      console.log(this.data)
      this.setData({
        index:  e.currentTarget.dataset.index,
        show: !this.data.show
      });
      this.triggerEvent('select', e.currentTarget.dataset.index)
    }
  }
})
