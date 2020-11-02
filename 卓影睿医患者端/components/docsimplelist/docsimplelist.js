// components/docsimplelist/docsimplelist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    doclist: {
      type: Array,
      value: []
    },
    hight: {
      type: Number,
      value: 0
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
    doclist:[],
    hight:0,
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

      for (var index in this.data.doclist) {
        var item = this.data.doclist[index]
        item.right = 0
      }
      this.setData({
        doclist: this.data.doclist,
        startX: touch.clientX,
      })

    },
    drawMove: function (e) {
      if (!this.data.deletable) return
      var touch = e.touches[0]
      var item = this.data.doclist[e.currentTarget.dataset.index]
      var disX = this.data.startX - touch.clientX

      if (disX >= 20) {
        if (disX > this.data.delBtnWidth) {
          disX = this.data.delBtnWidth
        }
        item.right = disX
        this.setData({
          isScroll: false,
          doclist: this.data.doclist
        })
      } else {
        item.right = 0
        this.setData({
          isScroll: true,
          doclist: this.data.doclist
        })
      }
    },
    drawEnd: function (e) {
      if (!this.data.deletable) return
      var item = this.data.doclist[e.currentTarget.dataset.index]
      console.log('dend', item)
      if (item.right >= this.data.delBtnWidth / 2) {
        item.right = this.data.delBtnWidth
        this.setData({
          isScroll: true,
          doclist: this.data.doclist
        })
      } else {
        item.right = 0
        this.setData({
          isScroll: true,
          doclist: this.data.doclist
        })
      }
    },
    select: function (e) {
      console.log('选择', e)
      this.triggerEvent('docsselect', parseInt(e.currentTarget.dataset.index))
    },
    delItem: function (e) {
      console.log('删除', e)
      this.triggerEvent('docsdelete',parseInt(e.currentTarget.id))
    }
  }
})
