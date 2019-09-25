// pages/classManagement/classManagement.js
const app=getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: app.globalData.userName,
    newCourseName:'',
    classInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var list = app.globalData.classInfo;
    var userinfo = app.globalData.userName;
    this.setData({
      classInfo: list,
      userinfo:userinfo
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
  /**
   * 点击相应的课程进入课程界面
   */
  courseMessage:function(e){
    wx.navigateTo({
      url: '../../pages/courseMessage/courseMessage?idx=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 添加课程按钮对应事件
   */
addCourse:function(){
  if(this.data.newCourseName){
    var obj = {
      className: this.data.newCourseName,
      banji: []
    }
    app.globalData.classInfo.push(obj);
    this.setData({
      newCourseName:''
    })
    this.onReady();
  }else{
    wx.showToast({
      title: '请在按一下添加',
    })
  }

},
//将input内容写在后台的数据里
writeData:function(e){  
  this.setData({
    newCourseName: e.detail.value,
  })
},
//删除功能的实现
deleteCourse:function(e){
  var id = e.currentTarget.dataset.id;
  app.globalData.classInfo.splice(id, 1);
  this.onReady();
}
})