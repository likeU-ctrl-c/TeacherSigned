// pages/courseMessage/courseMessage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    courseName:'',
    courseInfo:[],
    message:"",
    newClassName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var idx=options.idx;
    var courseName = app.globalData.classInfo[idx].className;
    var list = app.globalData.classInfo[idx].banji;
    var that=this;
    if(list.length==0){
      that.setData({
        id: idx,
        courseInfo: list,
        message:"还没有班级哦~"
      })
      return;
    }else{
      that.setData({
        id: idx,
        courseName: courseName,
        courseInfo: list,
        message:''
      })
    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var id = this.data.id;
    var courseName = app.globalData.classInfo[id].className;
    var list = app.globalData.classInfo[id].banji;
    var that = this;
    if (list.length == 0) {
      that.setData({
        courseInfo: list,
        message: "还没有班级哦~",
        courseName: ''
      })
      return;
    } else {
      that.setData({
        courseName: courseName,
        courseInfo: list,
        message: ''
      })
    }

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
  classMessage: function (e) {
    var id1 = this.data.id;
    wx.navigateTo({
      url: '../../pages/classMessage/classMessage?id1='+id1+'&id2=' + e.currentTarget.dataset.id
    })
  },
  //添加班级功能实现
  addClass:function(e){
    var newClassName = this.data.newClassName
    if(newClassName){
      var obj = {
        banjimincheng: newClassName,
        banjiStudent: []

      }
      var id = this.data.id;
      app.globalData.classInfo[id].banji.push(obj);
      this.onReady();
      this.setData({
        newClassName:''
      })
    }else{
      wx.showToast({
        title: '请输入班级名称',
        icon: '',
        image: '',
        duration: 1500,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }

  }
  ,
  //将input内容写在后台的数据里
  writeData: function (e) {
    this.setData({
      newClassName: e.detail.value,
    })
  },
  //删除班级功能的实现
  deleteClass:function(e){
    console.log(e)
    var id2 = e.currentTarget.dataset.id;
    var id1 = this.data.id;
    app.globalData.classInfo[id1].banji.splice(id2,1);
    this.onReady();
  }
})