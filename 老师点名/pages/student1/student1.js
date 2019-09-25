// pages/student1/student1.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'',
    userName:'',
    teacherId:''
  },
  //input框的输入事件
  write2data:function(e){
      var teacher=e.detail.value;
      this.setData({
        teacherId: teacher
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId = app.globalData.userId;
    var userName = app.globalData.userName;
    this.setData({
      userid: userId,
      userName: userName,
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

  },
  //提交按钮功能实现
  submit:function(e){
    var teacherId = this.data.teacherId;
    db.collection('student_teacher').doc(teacherId).get({
      success: function (res) {
     
          app.dianmingdan = res.data.alldianmingdan
          wx.navigateTo({
            url: '../student2/student2',
          })
      },
      fail:function(res){
        wx.showToast({
          title: '没有老师信息',
        })
      }
    });
  }
})