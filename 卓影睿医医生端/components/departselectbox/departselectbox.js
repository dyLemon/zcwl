// components/departselectbox/departselectbox.js
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectdata:[],
    index:0,
    show:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectTap:function(){
      console.log(this.data.selectdata)
      // this.setData({
      //   show: !this.data.show,
      // });
      this.triggerEvent('dpsboxshow', this.data.show)
    },
    optionTap:function(e){
      this.setData({
        index:  e.currentTarget.dataset.index,
        show: !this.data.show
      });
      this.triggerEvent('departselect', this.data.index)
    }
  }
})
