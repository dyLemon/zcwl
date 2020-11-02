// components/simplevlist/simplevlist.js
Component({
  externalClasses: ['vshot'],
  /**
   * 组件的属性列表
   */
  properties: {
    videolist: {
      type: Array,
      value: []
    },
    bgsize: {
      type: Object,
      value: null
    },
    deletable: {
      type: Boolean,
      value: false
    },
    token: {
      type: String,
      value: ''
    },
    resource: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    videolist: [],
    bgsize: null,
    deletable: false,
    delBtnWidth: 128,
    token: '',
    resource: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    drawStart: function (e) {
      // console.log("drawStart");  
      if (!this.data.deletable) return
      var touch = e.touches[0]

      for (var index in this.data.videolist) {
        var item = this.data.videolist[index]
        item.right = 0
      }
      this.setData({
        videolist: this.data.videolist,
        startX: touch.clientX,
      })

    },
    drawMove: function (e) {
      if (!this.data.deletable) return
      var touch = e.touches[0]
      var item = this.data.videolist[e.currentTarget.dataset.index]
      var disX = this.data.startX - touch.clientX

      if (disX >= 20) {
        if (disX > this.data.delBtnWidth) {
          disX = this.data.delBtnWidth
        }
        item.right = disX
        this.setData({
          isScroll: false,
          videolist: this.data.videolist
        })
      } else {
        item.right = 0
        this.setData({
          isScroll: true,
          videolist: this.data.videolist
        })
      }
    },
    drawEnd: function (e) {
      if (!this.data.deletable) return
      var item = this.data.videolist[e.currentTarget.dataset.index]
      console.log('dend', item)
      if (item.right >= this.data.delBtnWidth / 2) {
        item.right = this.data.delBtnWidth
        this.setData({
          isScroll: true,
          videolist: this.data.videolist
        })
      } else {
        item.right = 0
        this.setData({
          isScroll: true,
          videolist: this.data.videolist
        })
      }
    },
    select: function (e) {
      console.log('选择', e)
      this.triggerEvent('editselect', parseInt(e.currentTarget.dataset.index))
    },
    delItem: function (e) {
      console.log('删除', e)
      this.triggerEvent('editdelete',parseInt(e.currentTarget.id))
    }
  }
})