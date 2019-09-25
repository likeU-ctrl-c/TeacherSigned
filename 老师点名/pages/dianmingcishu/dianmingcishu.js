// pages/dianmingcishu/dianmingcishu.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id1:'',
    alldianmingdan: [],
    varydianmingdan:[],
    StudentAllState:[],
    course: '',
    flag:true,
    dianjicishu:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.idx;
    this.setData({
      id1:id,
    course:app.dianmingdan[id].course,
    alldianmingdan: app.dianmingdan[id].dianmingdan,
    varydianmingdan:  app.dianmingdan[id].dianmingdan
    })
    console.log(this.data.alldianmingdan)
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
  /**
   * 点击相应的课程进入课程界面
   */
  studentlist: function (e) {
    var id1=this.data.id1;
    wx.navigateTo({
      url: '../dianmingxiangqing/dianmingxiangqing?id1='+id1+'&id2=' + e.currentTarget.dataset.id
    })
  },
  done:function(){
    var alldianmingdan=this.data.alldianmingdan;
    var newdianmingdan=[];
    console.log(alldianmingdan)
    for(var i=0;i<alldianmingdan.length;i++){
      if(alldianmingdan[i].state=='已完成'){
        newdianmingdan.push(alldianmingdan[i])
      }
    }
    this.setData({
      flag: true,
      varydianmingdan: newdianmingdan
    })
  },
  doing:function(){
    var alldianmingdan = this.data.alldianmingdan;
    var newdianmingdan = [];
    console.log(alldianmingdan)
    for (var i = 0; i < alldianmingdan.length; i++) {
      if (alldianmingdan[i].state == '未完成') {
        newdianmingdan.push(alldianmingdan[i])
      }
    }
    this.setData({
      flag: true,
      varydianmingdan: newdianmingdan
    })
  },
  all:function(){
    var alldianmingdan = this.data.alldianmingdan;
    this.setData({
      flag: true,
      varydianmingdan: alldianmingdan
    })
  },
  allStudent:function(){
    var alldianmingdan = this.data.alldianmingdan;
    var StudentAllState = this.data.StudentAllState;
    var dianjicishu = this.data.dianjicishu;
    
    for(var  i=0;i<alldianmingdan.length;i++){
      for (var j = 0; j < alldianmingdan[i].student.length;j++){
        if (dianjicishu==0){
         
          if (i == 0) {
            var late = 0;  //迟到的次数
            var come = 0;  //来的次数
            var other = 0;  //其他理由的次数
            if (alldianmingdan[i].student[j].studentState == "未签到") {
              late = 1;
            } else if (alldianmingdan[i].student[j].studentState == "已签到") {
              come = 1;
            } else {
              other = 1;
            }
            var obj = {
              studentid: alldianmingdan[i].student[j].studentId,
              studentName: alldianmingdan[i].student[j].studentName,
              StudentLate: late,
              StudentCome: come,
              StudentOther: other
            }
            StudentAllState.push(obj);
          } else {
            var late = 0;  //迟到的次数
            var come = 0;  //来的次数
            var other = 0;  //其他理由的次数
            if (alldianmingdan[i].student[j].studentState == "未签到") {
              StudentAllState[j].StudentLate += 1;
            } else if (alldianmingdan[i].student[j].studentState == "已签到") {
              StudentAllState[j].StudentCome += 1;
            } else {
              StudentAllState[j].StudentOther += 1;
            }
          }
        }else break;

      }
    }
    dianjicishu = 1;
    this.setData({
      dianjicishu: dianjicishu,
      flag:false,
      StudentAllState: StudentAllState
    })
  }
})