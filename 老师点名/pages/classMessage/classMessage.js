// pages/classMessage/classMessage.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classname:'',
    newstudent:{
      studentId: '',
      studentName: ''
    },
    studentlist:[],
    id1:'',
    id2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id_course=options.id1;
    var id_class=options.id2;
    var list = app.globalData.classInfo[id_course].banji[id_class].banjiStudent;
    var className = app.globalData.classInfo[id_course].banji[id_class].banjimincheng;
    this.setData({
      id1: id_course,
      id2: id_class,
      classname: className,
      studentlist: list
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var id1 = this.data.id1;
    var id2 = this.data.id2;
    var list = app.globalData.classInfo[id1].banji[id2].banjiStudent;
    var className = app.globalData.classInfo[id1].banji[id2].banjimincheng;
    this.setData({
      classname: className,
      studentlist: list,
      newstudent: {
        studentId: '',
        studentName: ''
      }  
    })
  
  },
  response:function(){
    var globalData = app.globalData;
    var id = globalData.userId;
    db.collection('teachClassManagement').doc(id).set({
      data: {
        'globalData': globalData
      },
      success: function (res) {
        wx.showToast({
          title: '上传成功',
        })
      }
    })
    
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
    this.response();
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
  studentId:function(e){
    var studentName = this.data.newstudent.studentName;
    this.setData({
      newstudent:{
        studentId:e.detail.value,
        studentName: studentName
        }  
    })
  },
  studentName:function(e){
    var studentId = this.data.newstudent.studentId;
    this.setData({
      newstudent: {
        studentId :studentId,
        studentName: e.detail.value
      }  
    })

  },
  addStudent:function(){
    var newstudent = this.data.newstudent
    if (newstudent.studentId && newstudent.studentName) {
      var id1 = this.data.id1;
      var id2 = this.data.id2;
      app.globalData.classInfo[id1].banji[id2].banjiStudent.push(newstudent);
      this.onReady();
      var newstudent={
        studentName:'',
        studentId:''
      }
     this.setData({
       newstudent:newstudent
     })
    } else {
      wx.showToast({
        title: '请填写完整',
        icon: '',
        image: '',
        duration: 1500,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  deleteStudent:function(e){
    var id = e.currentTarget.dataset.id;
    var id1= this.data.id1;
    var id2 = this.data.id2;
    app.globalData.classInfo[id1].banji[id2].banjiStudent.splice(id, 1);
    this.onReady();
  }
})