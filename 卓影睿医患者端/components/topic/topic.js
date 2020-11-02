
Component({
  properties:{
    listobj:Object,
    userid:Number
  },
  data: {
    indexs:0,//从数组第一个开始
    textshow:false,
    nextshow:false,
    
    rarr:[], 
    checkarr:[],
    onlyobj:{}
  }, // 这里放的是子组件的私有数据，可用于模版渲染

   // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached() {
    console.log(this.data.listobj);
    this.data.listobj.listarr.forEach(item=>{
      item.contents=[];
      item.content.forEach(num=>{
        item.contents.push({
          title:num,
          check:false,
          text:''
        })
      })
    })
    this.setData({
      listobj:this.data.listobj
    })
    this.computeScrollViewHeight();
   },

  methods: {
    computeScrollViewHeight() {
      var _this = this;
      wx.getSystemInfo({
        success: function (t) {
          _this.setData({
                height: t.windowHeight * (750 / t.screenWidth),
            });
        }
    })
    },
    radiochange(e){
      console.log(e);
      this.setData({
        onlyobj:e.currentTarget.dataset.obj
      })
      this.setData({
        nextshow:true
      })

      if(e.currentTarget.dataset.obj.edit ==1 ){ //可编辑
        if(e.detail.value ==e.currentTarget.dataset.obj.content.length-1 ){
          this.setData({
            textshow:true
          })
        }else{
          this.setData({
            textshow:false
          })
        }
      }
      let flag = false;
      if(this.data.rarr.length>0){
        this.data.rarr.forEach(num=>{
          if(num.topic_id == e.currentTarget.dataset.obj.id){
            // num.options=e.currentTarget.dataset.obj.contents[e.detail.value].title
            num.options=e.detail.value
          }else{
            flag = true;
          }
        })
        if(flag){
          this.data.rarr.push({
            topic_id:e.currentTarget.dataset.obj.id,
            options:e.detail.value,
            type:e.currentTarget.dataset.obj.type
          })
        }
      }else{
        this.data.rarr.push({
          topic_id:e.currentTarget.dataset.obj.id,
          options:e.detail.value,
          type:e.currentTarget.dataset.obj.type
        })
      }
      
      //去重
      let obj = {};
     let person = this.data.rarr.reduce((cur,next) => {
        obj[next.topic_id] ? "" : obj[next.topic_id] = true && cur.push(next);
        return cur;
    },[])
      this.setData({
        rarr:person
      })
    },

    checkboxChange(e){
      this.setData({
        onlyobj:e.currentTarget.dataset.obj
      })
      this.setData({
        nextshow:true,
      })
      if(e.currentTarget.dataset.obj.edit ==1 ){ //可编辑
        if(e.detail.value.indexOf((e.currentTarget.dataset.obj.content.length-1).toString())>=0){
            this.setData({
            textshow:true
          })
        }else{
          this.setData({
            textshow:false
          })
        }
      }
      if(this.data.rarr.length>0){
        this.data.rarr=this.data.rarr.filter(item=>item.topic_id !=e.currentTarget.dataset.obj.id);
      }
      this.data.rarr.push({
        topic_id:e.currentTarget.dataset.obj.id,
        options:e.detail.value.join(","),
        type:e.currentTarget.dataset.obj.type
      })
      this.setData({
        rarr:this.data.rarr
      })

    },
    bindTextAreaBlur(e){
      if(e.detail.value.length==50){
        wx.showToast({
          title: '字数长度不能超过50位',
          icon:'none',
          duration: 2000
        })
        return;
      }
      let arr =JSON.stringify(this.data.rarr)
      let newarr= JSON.parse(arr)
      newarr.forEach((item=>{
        if(item.topic_id == e.currentTarget.dataset.obj.id){
          item.text =e.detail.value;
        }
      }))
      this.setData({
        rarr:newarr
      })

    },
    nextBtn(){
       console.log(this.data.rarr);

       //区分单选多选以及是否有其他是否text有值
       this.data.rarr.map((item=>{
         if(item.topic_id ==this.data.onlyobj.id ){

           if(this.data.onlyobj.edit ==1){
             if(item.type ==1){
              if(item.options == this.data.onlyobj.content.length-1){
                if(item.text){
                 this.setData({
                   indexs:this.data.indexs+1,
                   nextshow:false,
                   textshow:false,
                 })
                }else{
                 wx.showToast({
                   title: '请输入其他回答！',
                   icon: 'none',
                   duration: 2000
                 })
                }
              }else{
               this.setData({
                 indexs:this.data.indexs+1,
                 nextshow:false,
                 textshow:false,
               })
              }
             }else{
               let arr =[... item.options];
              if(arr.indexOf((this.data.onlyobj.content.length-1).toString())>=0){
                if(item.text){
                 this.setData({
                   indexs:this.data.indexs+1,
                   nextshow:false,
                   textshow:false,
                 })
                }else{
                 wx.showToast({
                   title: '请输入其他回答！',
                   icon: 'none',
                   duration: 2000
                 })
                }
              }else{
               this.setData({
                 indexs:this.data.indexs+1,
                 nextshow:false,
                 textshow:false,
               })
              }
             }
            
           }else{
            this.setData({
              indexs:this.data.indexs+1,
              nextshow:false,
              textshow:false,
            })
           }
         }
       }))

      // this.setData({
      //   indexs:this.data.indexs++,
      //   nextshow:false,
      //   textshow:false,
      // })

      // 如果要做上一级
      console.log(this.data.listobj);
      // this.data.listobj.forEach((item=>{

      // }))
    },
    backBtn(){
      this.setData({
        indexs:this.data.indexs-1,
        nextshow:false,
        textshow:false
      })
    },
    submitBtn(){
      this.data.rarr.forEach(item=>{
        if(!item.text){
          item.text=""
        }
        item.user_id=this.data.userid
      })

      this.triggerEvent("submitBtn",{
        arr: this.data.rarr
      },{})
    }
  },
  
})
