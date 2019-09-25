// pages/zhuce/zhuce.js
const db = wx.cloud.database();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
     userid:"",
     password:"",
     password2:"",
     sex:"男",
     username:"",
     banji:"",
     flag:true,
    flag1: true,
    banji:true
  },
  //获取用户输入的密码1
  getpassword1 : function(e){
   this.setData({
     password:e.detail.value
   })
  },
  //获取用户输入的密码2
  getpassword2: function (e) {
    this.setData({
      password2:e.detail.value,
    })
  },
  //离开密码框触发的时间
 
  panduanyizhi : function(e){
   var that = this;
   this.setData({
     password2: e.detail.value
   });
   
    var p1=  that.data.password;
    var p2 =that.data.password2;
    wx: if (p1==p2) {
      this.setData({
          flag:true,
          flag1:false
      })
    }else{
      this.setData({
        flag:false,
        flag1: true
      })
    }
  },
  banji:function(e){
    wx:if(e.detail.value=="学生"){
    this.setData({
      'banji':false
    })
  }else{
      this.setData({
        'banji': true
      })
  }
  },
  /*
    注册页面的提交按钮对应的事件
  */
  formSubmit:function(e){
    wx.navigateBack({
      delta: 1
    })
    var value = e.detail.value;
    var shenfen =value.shenfen;
    var userId = value.userid;
    var userName= value.username;
    var userGradeclass=value.gradeclass;
    var password = value.password;
    var school = value.school;
    var sex = value.sex;
    var allData={
      "userId": userId,
      "userName":userName,
      classInfo: []
    };
    if(shenfen=='教师'){
      //往数据库teacherClassManagement里添加记录
    var that = this;
    db.collection('teachClassManagement').add({
      data: {
        _id:userId,
        globalData: allData
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        // wx.showToast({
        //   title: '新增记录成功',
        // })
        console.log('[teachClassManagement数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[teachClassManagement数据库] [新增记录] 失败：', err)
      }
    });
      //往数据库student_teacherusers添加数据
      db.collection('student_teacher').add({
        data: {
          _id:userId,
          alldianmingdan:[]
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          console.log('[student_teacher数据库] [新增记录] 成功，记录 _id: ', res.users.userid)
        },
        fail: err => {
          console.error('[student_teacher数据库数据库] [新增记录] 失败：', err)
        }
      })

    }
    var that = this;
    //往数据库users添加数据
    db.collection('users').add({
      data: {
        gradeclass: userGradeclass,
        password: password,
        school: school,
        sex: sex,
        shenfen: shenfen,
        userid: userId,
        username: userName
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[users数据库] [新增记录] 成功，记录 _id: ', res.users.userid)
       
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[users数据库] [新增记录] 失败：', err)
      }
    })
    
  },
  
  /**
   * 页面下拉触发的处理函数
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