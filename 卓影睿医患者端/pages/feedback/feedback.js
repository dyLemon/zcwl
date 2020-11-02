const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex:1,
    token:'',
    stoken:'',
    surl:'',
    freelist:{},
    checkeddata:[],
    listarr:[],
    min: 5,
    max: 30,
    currentNoteLen:0,
    height:0,
    total:{},
    showModal:false,
    strat_time:'',
    end_time:'',
    textshow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.setData({
      freelist:app.globalData.freelist,
      token:app.globalData.wxuser.token,
      stoken:app.globalData.stoken,
      surl:app.globalData.surl,
      total:JSON.parse(options.total),
      textshow:true
    })
      this.data.freelist.acts.forEach((item,index)=>{
        item.checklist=[{
          check:false,
          name:'简单',
          id:1
        },{
          check:false,
          name:'一般',
          id:2
        },{
          check:false,
          name:'有难度',
          id:3
        },{
          check:false,
          name:'无法完成',
          id:4
        }]
        item.text = ''
      })
      this.setData({
        freelist:this.data.freelist
      })
        
      this.computeScrollViewHeight();
    
    },
    
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } 
    else {
      this.setData({
        showIndex: 0
      })
    }    
  },
    computeScrollViewHeight() {
      var _this = this;
      wx.getSystemInfo({
        success: function (t) {
          _this.setData({
                height: t.windowHeight * (750 / t.screenWidth)-130,
            });
        }
    })
    },
  //每个视频列表详情
  videolist(item){
    var par= encodeURIComponent(JSON.stringify(item.currentTarget.dataset.item));
    wx.navigateTo({
      url: "/components/videolist/videolist?item="+par,
    })
  },
  binditext(e){
    var arr = this.data.freelist;
    arr.acts.forEach((item,index)=>{
      if(e.currentTarget.dataset.id.act_id ==item.act_id ){
       item.text = e.detail.value
      }
    })
    var value = e.detail.value;
    var len = parseInt(value.length);
    if (len > this.data.max) return;
    this.setData({
      currentNoteLen: len
    });
    if(this.data.currentNoteLen == 30 ){
 
      wx.showToast({
        title: '字数长度不能超过30位',
        icon: 'none',
        duration: 2000
      })
    }

    this.setData({
      freelist:arr
     })
  },
  checkchange(e){
    var arr = this.data.freelist;
    arr.acts.forEach((item,index)=>{
      if(e.currentTarget.dataset.id.act_id ==item.act_id ){
        item.checklist.forEach(num=>{
          if(num.id == e.detail.value){
            num.check = true;
          }else{
            num.check = false;
          }
        })
      }
    })
      this.setData({
      freelist:arr
      })

  },
  translate(arr1=[],params=[]){
    return  arr1.reduce((a,b)=>{
      let index=null
      let flag=a.filter((v,i)=>{
          index=i
         return v.study_case_id===b.study_case_id
      })
      if(flag.length){
         if(this.getNumber(flag[0],params)<this.getNumber(b,params)){
              a.splice(index,1)
         }
      }    
      a.push(b)
      return a
  
    },[])
  },
  getNumber(a,b=[]){
    let num=0
        b.map(v=>{
            if(a[v])num++
        })
        return  num
    },
  submit(){
    this.setData({
      textshow:false
    })
    let arr =[];
    this.data.freelist.acts.map((item,index)=>{
      if(item.text){
        arr.push({
          study_case_id:item.id,
          text:item.text,
          option:0,
        })
      }
        item.checklist.forEach((text)=>{
          if(text.check){
            arr.push({
              study_case_id:item.id,
              option:text.id, //选项
              text:item.text
            })
          }
      })
    })
    
    let newarr =this.translate(arr,["option","text"]);
    if(newarr.length==0 ){
        wx.showToast({
          title: '评论反馈至少有一个',
          icon:'none',
          duration: 2000
        })
    }else{
      let json={
        study_id:Number(this.data.freelist.train_id),
        feedback_list:newarr,
        token:this.data.token
      }
    app.webpost('feedbackcommit', json, (res)=> {
      if(res.data.code ==0){
        if(this.data.total.total_count == this.data.total.total_num){ //如果是最后一次训练
          this.setData({
            showModal:true
          })
        }else{
          wx.showToast({
            title: '评论反馈成功',
            icon:'success',
            duration: 1000
          })
         setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          })
         },1000)
        }
      }else{
        app.servercode(res.data.code);
      }
    
  });
  }
    
    this.backtext();
  },
  backtext(){
    app.webpost('getplantime', {
      study_id: Number(this.data.freelist.train_id),
      token: this.data.token
  },  (e)=> {
      if(e.data.code ==0){
        this.setData({
          strat_time:e.data.strat_time,
          end_time:e.data.end_time
        })
      }else{
        app.servercode(e.data.code);
      }
    
  });
  },
  hideBaitiaoView(){
    this.setData({
      showModal:false
    })
    wx.navigateBack({
        delta: 1
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

  }
})