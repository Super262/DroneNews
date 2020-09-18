const app = getApp()

Page({
  data: {

  },

  doRegist: function(e) {
    var me = this;
    var formObject = e.detail.value;
    var username = formObject.username;
    var password1 = formObject.password1;
    var password2 = formObject.password2;

    // 简单验证
    if (username.length == 0 || password1.length == 0) {
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none',
        duration: 3000
      })
    } else if (password1!=password2){
      wx.showToast({
        title: '密码不一致',
        icon: 'none',
        duration: 3000
      })
    }
    else {
      var serverUrl = app.serverUrl;
      wx.showLoading({
        title: '请等待...',
      });
      wx.request({
        url: serverUrl + '/regist',
        method: "POST",
        data: {
          username: username,
          password: password1
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data);
          wx.hideLoading();
          var status = res.data.status;
          if (status == 200) {
            wx.showToast({
              title: "用户注册成功~！！！",
              icon: 'none',
              duration: 3000
            });
          } else if (status == 500) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
    }
  },

  goLoginPage: function() {
    wx.navigateTo({
      url: '../userLogin/login',
    })
  }
})