// pages/home1/home1.js
const db= wx.cloud.database()
let searchKey =''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    foodList:[]
  },

  onLoad:function (options) {
    this.getTopList()   
    this.getHotList()
    
  },
  // 获取用户输入内容
  getSearch(a) {
    console.log(a.detail.value)
    searchKey = a.detail.value
  },
  // 触发搜索在这里
  goSearch(){
    console.log('触发搜索', searchKey)
    if(searchKey && searchKey.length > 0){
// 搜索触发在这里喔

db.collection('food').where({
  // 搜索的关键词字段 
  name: db.RegExp({
    regexp: searchKey,
    // i不区分大小写
    options: 'i'
  })
}).get()
.then(res => {
  console.log('搜索成功', res)
})
.catch(res => {
  console.log('搜索失败', res)
})




    }else{
      wx.showToast({
        icon : 'error',
        title: '内容为空',
      })
    }
  },
  // 点击事件：去菜品页面
 click1() {
   wx.navigateTo({
   url: '/pages/food2/food2',
 })
},
// 去订单页
 click2() {
  wx.navigateTo({
  url: '/pages/myOrder/myOrder',
})
},
// 
click3() {
  wx.navigateTo({
  url: '/pages/address/address',
})
},
click4() {
  wx.navigateTo({
  url: '/pages/service/service',
})
},
// 获取首页轮播图
getTopList() {
  db.collection('lunbotu').get()
    .then(res => {
      console.log('获取轮播图成功', res)
      this.setData({
        list: res.data
      })
    })
    .catch(res =>{
      console.log('获取轮播图失败', res)
      this.setData({
        list:[
          {food1: '../../image/1.jpg'},
          {food1: '../../image/3.jpg'},
          {food1: '../../image/6.jpg'}
      ]
      })
    })
},
// 获取热门菜品
getHotList() {
  // 小程序端直接调取数据库
// db.collection('food')
// .where({
//   status:"上架"
// })
// .orderBy("sell", 'desc') 
// .limit(5)
// .get()
// .then(res => {
//   console.log("菜品列表", res)
// })

// 通过云函数调用数据
wx.cloud.callFunction({
  name:"getFoodList2"
})
.then(res => {
  console.log("菜品列表", res)
  this.setData({
    foodList:res.result.data
  })
})
}
})