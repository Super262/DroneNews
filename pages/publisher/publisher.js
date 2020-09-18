const app = getApp()

Page({
  data: {
    publisherId:"",
    userId:"",
    faceUrl: "../resource/images/noneface.png",
    isFollow: false,
    videoSelClass: "video-info",
    isSelectedWork: "video-info-selected",
    isSelectedLike: "",
    isSelectedFollow: "",

    myVideoList: [],
    myVideoPage: 1,
    myVideoTotal: 1,

    likeVideoList: [],
    likeVideoPage: 1,
    likeVideoTotal: 1,

    followVideoList: [],
    followVideoPage: 1,
    followVideoTotal: 1,

    myWorkFalg: false,
    myLikesFalg: true,
    myFollowFalg: true

  },
  onLoad: function (params) {
    var me = this;
    // fixme 修改原有的全局对象为本地缓存
    var user = app.getGlobalUserInfo();
    var publisherId = params.publisherId;
    me.setData({
      publisherId:publisherId,
      userId: user.id,
    });

    wx.showLoading({
      title: '请等待...',
    });
    var serverUrl = app.serverUrl;
    // 调用后端
    wx.request({
      url: serverUrl + '/user/query?userId=' + publisherId + "&fanId=" + user.id,
      method: "POST",
      header: {
        'headerUserId': user.id,
        'headerUserToken': user.userToken,
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.status == 200) {
          var userInfo = res.data.data;
          var faceUrl = "../resource/images/noneface.png";
          if (userInfo.faceImage != null && userInfo.faceImage != '' && userInfo.faceImage != undefined) {
            faceUrl = serverUrl + userInfo.faceImage;
          }
          me.setData({
            faceUrl: faceUrl,
            fansCounts: userInfo.fansCounts,
            followCounts: userInfo.followCounts,
            receiveLikeCounts: userInfo.receiveLikeCounts,
            nickname: userInfo.nickname,
            isFollow: userInfo.follow
          });
        } else if (res.data.status == 502) {
          wx.showToast({
            title: res.data.msg,
            duration: 3000,
            icon: "none",
            success: function () {
              wx.redirectTo({
                url: '../userLogin/login',
              })
            }
          })
        }
      }
    })
    // me.getMyVideoList(1);
  },
  followMe: function (e) {
    var me = this;
    var user = app.getGlobalUserInfo();
    var publisherId = me.data.publisherId;
    var followType = e.currentTarget.dataset.followtype;
    // 1：关注 0：取消关注
    var url = '';
    if (followType == '1') {
      url = '/user/beyourfans?userId=' + publisherId + '&fanId=' + user.id;
    } else {
      url = '/user/dontbeyourfans?userId=' + publisherId + '&fanId=' + user.id;
    }
    wx.showLoading();
    wx.request({
      url: app.serverUrl + url,
      method: 'POST',
      header: {
        'headerUserId': user.id,
        'headerUserToken': user.userToken,
        'content-type': 'application/json', // 默认值
      },
      success: function () {
        wx.hideLoading();
        if (followType == '1') {
          me.setData({
            isFollow: true,
            fansCounts: ++me.data.fansCounts
          })
        } else {
          me.setData({
            isFollow: false,
            fansCounts: --me.data.fansCounts
          })
        }
      }
    })
  },
})