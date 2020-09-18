// pages/msgInfo/msgInfo.js
var WxParse = require('../wxParse/wxParse.js');
const app = getApp()

Page({
  data: {
    msgId: "",
    msgInfo: {},
    userLikeMsg: false,
    commentsPage: 1,
    commentsTotalPage: 1,
    commentsList: [],
    placeholder: "说点什么..."
  },
  onLoad: function (params) {
    var me = this;

    // 获取上一个页面传入的参数
    var msgInfo = JSON.parse(params.msgInfo);
    console.log(msgInfo);

    me.setData({
      msgId: msgInfo.id,
      msgInfo: msgInfo,
    });

    var serverUrl = app.serverUrl;
    var user = app.getGlobalUserInfo();
    if (user == null || user == undefined || user == '') {
      wx.redirectTo({
        url: '../userLogin/login'
      })
    }
    wx.request({
      url: serverUrl+"/message/getHTML?id="+me.data.msgId,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var article = res.data.data;
        console.log(article);
        var baseUrl=serverUrl+"/msg/"+me.data.msgId+"/html"
        WxParse.wxParse('article', 'html', article, me, 15,baseUrl);
      }
    })
  },





  
})