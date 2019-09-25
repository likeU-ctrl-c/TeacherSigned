// pages/classManagement/classManagement.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alldianmingdan:[],
    userid: '',
    username: '',
    course:[]
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userid = app.globalData.userId;
    var username = app.globalData.userName;
    this.setData({
      userid: userid,
      username: username
    })
    var userid = this.data.userid;
    // 从数据库里读取数据
    var that = this;
    db.collection('student_teacher').doc(userid).get({
      success: function (res) {
        // res.data 包含该记录的数据
        var alldianmingdan = res.data.alldianmingdan
        app.dianmingdan = alldianmingdan;
        var courselist = [];
        for (var i = 0; i < alldianmingdan.length; i++) {
          courselist[i] = alldianmingdan[i].course;
        }
        that.setData({
          alldianmingdan: alldianmingdan,
          course: courselist
        })
      }
    })
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
  studentlist: function (e) {
    wx.navigateTo({
      url: '../dianmingcishu/dianmingcishu?idx=' + e.currentTarget.dataset.id
    })
  }
})