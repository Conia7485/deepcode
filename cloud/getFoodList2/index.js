// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ 
  env: cloud.DYNAMIC_CURRENT_ENV 
})
const db=cloud.database()
 // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }

 return await db.collection('food')
.where({
  status:"上架"
})
.orderBy("sell", 'desc') 
.limit(5)
.get()
}