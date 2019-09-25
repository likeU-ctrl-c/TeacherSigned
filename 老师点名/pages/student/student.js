// pages/student/student.js
var _config =require('../../config/config.js');
const app = getApp();
const db = wx.cloud.database();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    userid:'',
    location:"",
    skm_st:'',
    flag_cg:true,
    flag_sb:true,
    falsereason:'',
    y_n_login:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    console.log(options);
    var userid = app.globalData.userId;
    var username = app.globalData.userName;
    var id=options.idx;
    var allList = app.dianmingdan;
    console.log(allList);
    var length_1 = allList[id].dianmingdan.length-1;
    var studentlist = allList[id].dianmingdan[length_1].student;
    var dianmingdan_state = allList[id].dianmingdan[length_1].state;
    var teacher_location = allList[id].dianmingdan[length_1].location;
    var zai=0;
    var zhuangtai =0;
    if (dianmingdan_state=='已完成'){
      this.setData({
        id: id,
        userid: userid,
        flag_sb: false,
        falsereason: '此次点名已经结束！',
      })
    }else{

      for (var i = 0; i < studentlist.length; i++) {
        if (userid == studentlist[i].studentId) {
          zai = 1;
          if (studentlist[i].studentState == '未签到') {
            zhuangtai = 1;
            this.setData({
              id: id,
              userid: userid
            })
          }
        }
      }
      if (zai == 0) {
        this.setData({
          id: id,
          userid: userid,
          flag_sb: false,
          falsereason: '没在老师的名单',
        })
      }
      if (zhuangtai == 0 && zai != 0) {
        this.setData({
          id: id,
          userid: userid,
          flag_sb: false,
          falsereason: '您已经签过到了*^_^*',
          y_n_login: true
        })
      }

    }
    
    
    var _this = this;
    var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
    //实例化腾讯地图API核心类
    var qqmapsdk = new QQMapWX({
      key: 'X3MBZ-XYMEG-ZUZQO-IXFKZ-7NUGO-CHFFQ' // 必填
      });
    wx.getLocation({
      type: "wgs84",
      success: function(res) {
        qqmapsdk.reverseGeocoder({
          location:{
            latitude:res.latitude,
            longitude:res.longitude
          },
          success:function(addressRes){
            var address = addressRes.result.address;
            if (address != teacher_location){
              _this.setData({
                flag_sb: false,
                falsereason: '您的位置信息跟老师的不一致；您的位置在' + address + ";\n老师的位置是：" + teacher_location,
              })
            }else{
              _this.setData({
                'location': address
              })
            }
           
          }
        })
    }
  })
 },
 /**
  * 签到按钮的监听事件
  */
  formSubmit:function(e){
    var id = this.data.id;
    var allList = app.dianmingdan;
    var length_1 = allList[id].dianmingdan.length - 1;
    var skm = allList[id].dianmingdan[length_1].skm;
    var studentlist = allList[id].dianmingdan[length_1].student;
    var skm_st = this.data.skm_st;
    var userid= this.data.userid;
    var lateReason = this.data.falsereason;
    var address = this.data.location;
    if (this.data.flag_sb){
      if (skm == skm_st) {
        for (var i = 0; i < studentlist.length; i++) {
          if (userid == studentlist[i].studentId) {
            allList[id].dianmingdan[length_1].student[i].studentState = '已签到';
            allList[id].dianmingdan[length_1].student[i].lateReason = lateReason;
            allList[id].dianmingdan[length_1].student[i].address = address;
          }
        }
        app.dianmingdan = allList;
        db.collection('student_teacher').doc(userid).update({
          // data 传入需要局部更新的数据
          data: {
            alldianmingdan: allList
          },
          success: function (res) {
            console.log(res)
            console.log('student_teacher写入数据库成功')
            
          },
        })
      } else {
        this.setData({
          flag_sb: false,
          falsereason: '您的上课码输入错误了，(づ￣3￣)づ╭❤～',
        })
      }
    }else{
      wx.showToast({
        title: '签到失败*^_^*',
        icon:'none'
      })
    }


  },
  //上课码框的逻辑
  skm:function(e){
  this.setData({
    skm_st: e.detail.value
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
  shuaxin:function(){
    wx.navigateTo({
      url:"../student1/student1",
    })
  }
})