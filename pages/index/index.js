// pages/index/index.js
const app = getApp()

Page({
  data: {
    // 用于分页的属性
    totalPage: 1,
    page: 1,
    msgList: [],
    isSaveRecord: "0",
    screenWidth: 350,
    serverUrl: "",
  },

  onLoad: function (params) {
    var me = this;
    var user = app.getGlobalUserInfo();
    if (user == null || user == undefined || user == '') {
      wx.redirectTo({
        url: '../userLogin/login'
      })
    }
    var screenWidth = wx.getSystemInfoSync().screenWidth;
    me.setData({
      screenWidth: screenWidth,
    });

    // 获取当前的分页数
    var page = me.data.page;
    me.getAllMsgList(page, me.data.isSaveRecord);
  },

  getAllMsgList: function (page, isSaveRecord) {
    var me = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: '请等待，加载中...',
    });
    var searchContent = me.data.searchContent;
    wx.request({
      url: serverUrl + '/message/showAll?page=' + page + "&isSaveRecord=" + isSaveRecord,
      method: "POST",
      data: {
        title: searchContent
      },
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        //停止下拉刷新动画
        wx.stopPullDownRefresh();

        console.log(res.data);

        // 判断当前页page是否是第一页，如果是第一页，那么设置videoList为空
        if (page === 1) {
          me.setData({
            msgList: []
          });
        }

        var msgList = res.data.data.rows;
        var newMsgList = me.data.msgList;

        me.setData({
          msgList: newMsgList.concat(msgList),
          page: page,
          totalPage: res.data.data.total,
          serverUrl: serverUrl
        });

      }
    })
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.getAllMsgList(1, 0);
  },

  onReachBottom: function () {
    var me = this;
    var currentPage = me.data.page;
    var totalPage = me.data.totalPage;
    // 判断当前页数和总页数是否相等，如果想的则无需查询
    if (currentPage === totalPage) {
      wx.showToast({
        title: '已经没有新闻啦~~',
        icon: "none"
      })
      return;
    }
    var page = currentPage + 1;
    me.getAllMsgList(page, 0);
  },
  	  
  showMsgInfo: function (e) {
    var me = this;
    var msgList = me.data.msgList;
    var arrindex = e.target.dataset.arrindex;
    var msgInfo = JSON.stringify(msgList[arrindex]);
    wx.navigateTo({
      url: '../msgInfo/msgInfo?msgInfo=' + msgInfo
    })
  },
  showSearch: function () {
    wx.navigateTo({
      url: '../searchMsg/searchMsg',
    })
  }
})
