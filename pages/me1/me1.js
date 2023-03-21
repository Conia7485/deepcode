Page({
  data:{
    userInfo: '',
  },
  onLoad(){
    let user = wx.setStorageSync('user')    
    console.log('进入小程序index页面获取缓存', user)

  },
  // 授权登录
  login() {
    wx.getUserProfile({
      desc: '必须授权才可使用',
      success: res => {
        let user = res.userInfo
        // 把用户信息缓存到本地
        wx.setStorageSync('user', user)
        console.log('用户信息', user)
        this.setData({
          userInfo: user
        })
      },
      fail: res => {
        console.log('授权失败', res)
      }
    })
  },
  // 退出登录
  loginOut(){
    this.setData({
    userInfo: ''
    })
    wx.setStorageSync('user', null)

  }
})