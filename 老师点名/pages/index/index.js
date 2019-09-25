//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database();
Page({
  data: {
      userid:'',
      password:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.redirectTo({
      url: '../logs/logs'
    })
  },
  /**
   * 登录按钮监听事件
   */
  formSubmit:function(e){
   
  var usersid=e.detail.value.userid;
  app.globalData.userId = usersid;
  var password = e.detail.value.password;
    db.collection('users').where({
      'userid':usersid 
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          if(res.data.length==0){
              wx.showToast({
                title: '没有这个账号',
              })
          }else{
            app.globalData.userName = res.data[0].username;
            if(res.data[0].password==password){
              if (res.data[0].shenfen == '教师') {
                var usersid = app.globalData.userId;
                var appGlobalData = app.globalData;
                  db.collection('teachClassManagement').where({
                  '_id': usersid
                })
                  .get({
                    success: function (res) {
                      // res.data 是包含以上定义的两条记录的数组
                      console.log(res);
                      appGlobalData = res.data[0].globalData;
                      app.globalData = appGlobalData;
                      onShow();
                    }
                  })
                wx.switchTab({
                  url: '../teacher/teacher'
                })
              }else{ 
                wx.navigateTo({
                  url: '../student1/student1'
                })
              }
            }else{
              wx.showToast({
                title: '账号密码不匹配',
              })
            }
            
          }
        }
      })
  },
  /**
   * 注册按钮事件监听
   */
  zhuce:function(){
    wx.navigateTo({
      url: '../zhuce/zhuce',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading();
    
  },

  /**
   * 加载页面时的事件
   */
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  }
 }),
module.exports = Page.data;