const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skm: "",
    course: '',
    classInfo: [],
    location: '',
    selectid:'',
    dianmingdan:{},
    studentlist: [],
    alldianmingdan:[]
  },
  /*
   *随机数的事件
   */
  suiji: function(e) {
    var random = Math.floor(Math.random() * 10000000);
    this.setData({
      skm: random
    })
  },
  /**
   * 清空按钮的事件
   */
  qingkong: function(e) {
    this.setData({
      skm: "",
      course: ''
    })
    
  },
  /**
   * pick组件的变化事件
   */
  picker: function(e) {
    console.log(e)
    var id = e.detail.value;
    var courseName = this.data.classInfo[id].className;
    this.setData({
      selectid:id,
      course: courseName
    })
    
  },
  /**
   * 老师点名台提交按钮的事件--上传有关数据
   */
  fromsubmit: function(e) {
    if(this.data.selectid){
      //学生名单汇总
      var id = this.data.selectid;
      var student = this.data.classInfo[id].banji;
      var newStudentlist=[];
      for (var i = 0; i < student.length; i++) {
        var banjiStudent = student[i].banjiStudent;
        for (var j = 0; j < banjiStudent.length; j++) {
          var studentName = banjiStudent[j].studentName;
          var studentId = banjiStudent[j].studentId;
          var obj = {
            studentName: studentName,
            studentId: studentId,
            studentState:"未签到",
            lateReason:'',
            address:''
          }
          newStudentlist.push(obj)
        }
      }
      this.setData({
        studentlist: newStudentlist
      })
      //数据整理
      var course = this.data.course;
      var location = this.data.location;
      var userName = app.globalData.userName;
      var userid = app.globalData.userId;
      var studentlist = this.data.studentlist;
      var skm = this.data.skm;
      var newdianmingdan = {
        skm:skm,
        location: location,
        student: studentlist,
        state:'未完成'
      }
      var _alldianmingdan = this.data.alldianmingdan;
        //判断老师不是第一次用这个点名
      if (_alldianmingdan.length){

        var biaozhi = 0;//用来判断课程在不在数组里
        for (var i = 0; i < _alldianmingdan.length; i++) {
          //如果选择的课在数组里--证明老师之前点过一次名了
          if (_alldianmingdan[i].course == course) {
            biaozhi=1;
            var dianmingdan = _alldianmingdan[i].dianmingdan;
            this.set
            dianmingdan.push(newdianmingdan)
          } 
        }
        //判断标志如果这门课是第一次点名
        if(biaozhi==0){
          var obj_dianmingdan = [];
          obj_dianmingdan[0] = newdianmingdan;
          var obj_new_alldianmingdan = {
            course: course,
            dianmingdan: obj_dianmingdan
          }
          _alldianmingdan.push(obj_new_alldianmingdan);
        }
      }else{
        //如果老师第一次用点名
        var obj_dianmingdan = [];
        obj_dianmingdan[0]=newdianmingdan;
        var obj_new_alldianmingdan = {
          course: course,
          dianmingdan: obj_dianmingdan
        }
        var daitidianming=[];
        daitidianming[0] = obj_new_alldianmingdan
        _alldianmingdan = daitidianming;

      }
      this.setData({
        alldianmingdan:_alldianmingdan
      })
      var alldianmingdan_=_alldianmingdan;
      //将点名信息写到数据库
      db.collection('student_teacher').doc(userid).update({
        // data 传入需要局部更新的数据
        data: {
          alldianmingdan:alldianmingdan_
        },
        success: function (res) {
          console.log(res)
          console.log('student_teacher写入数据库成功')
          wx.showModal({
            title: '点名发布成功',
            content: '',
          })
        }
        
      })
    
    }else{
      wx.showModal({
        title: '还没选择点名的课程呢',
        content: '',
      })
    }
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

   
    wx.showLoading({
      title: '正在加载哦~~^_^',
    })
    var _this = this;
    var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
    //实例化腾讯地图API核心类
    var qqmapsdk = new QQMapWX({
      key: 'X3MBZ-XYMEG-ZUZQO-IXFKZ-7NUGO-CHFFQ' // 必填
    });
    //得到地址
    wx.getLocation({
      //type: "wgs84",
      type: 'gcj02', 
      success: function (res) {
        qqmapsdk.reverseGeocoder({

          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          // get_poi=1,
          // poi_options=radius = 10,
          success: function (addressRes) {
            var address = addressRes.result.address;
            _this.setData({
              'location': address,

            })
          }
        })
      },
    });


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading();
    var classInfo = app.globalData.classInfo; 
    this.setData({
      classInfo: classInfo
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.hideLoading();
    var classInfo = app.globalData.classInfo;
    this.setData({
      classInfo: classInfo
    })
    var userid = app.globalData.userId;
    //从数据库里读取数据
    var that = this;
    db.collection('student_teacher').doc(userid).get({
      success: function (res) {
        // res.data 包含该记录的数据
        that.setData({
          alldianmingdan: res.data.alldianmingdan
          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    onLoad() ;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  datafromDB:function(){

  }
})