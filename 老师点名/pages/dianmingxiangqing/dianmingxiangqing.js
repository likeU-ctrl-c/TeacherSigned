// pages/dianmingxiangqing/dianmingxiangqing.js
const db = wx.cloud.database();
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id1:'',
    id2:'',
      allList:[],
      studentlist:[],
      lateReason:'',//迟到原因
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // console.log(app.dianmingdan)
    var id1=options.id1;
    var id2 = options.id2;
    this.setData({
      id1:id1,
      id2:id2,
      allList: app.dianmingdan,
      studentlist: app.dianmingdan[id1].dianmingdan[id2].student,
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.allList)
 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.dataFromDB();
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

  },
  //签到逻辑实现
qiandao:function(e){
console.log(e)
  var id = e.target.dataset.id;
  var key2 = "studentlist[" + id + "].studentState"
  this.setData({
    [key2]: '已签到',
  })
},
//修改逻辑实现
xiugai:function(e){
  var id=e.target.dataset.id;
  var reason = this.data.lateReason
  var key1="studentlist["+id+"].lateReason";
  var key2 = "studentlist[" + id + "].studentState"
  this.setData({
    [key1]:reason,
    [key2]:reason,
    lateReason:''
  })
},
//提交逻辑实现
tijiao:function(){
  var id1=this.data.id1;
  var id2=this.data.id2;
  var state = 'allList['+id1+'].dianmingdan['+id2+'].state';
  var studentlist =' allList['+id1+'].dianmingdan['+id2+'].student';
  var st = this.data.studentlist;
  this.setData({
    [state]:'已完成',
    [studentlist]:st
  })
  this.write2DB();
},

//input 组件的逻辑
    model_blur:function(e){
        var reason = e.detail.value;
        this.setData({
          lateReason:reason
        })
    },
    //将点名信息写到数据库
    write2DB:function(){
      var alldianmingdan_ = this.data.allList;
      var userid = app.globalData.userId;
      app.dianmingdan=alldianmingdan_;
      db.collection('student_teacher').doc(userid).update({
        // data 传入需要局部更新的数据

        data: {
          alldianmingdan: alldianmingdan_
        },
        success: function (res) {
          console.log(res)
          console.log('student_teacher写入数据库成功')
          wx.showToast({
            title: '点名截止成功',
          })
        },
      })
    }
})