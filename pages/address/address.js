Page({
  data:{
    // 标记点
    markers: [{
    id:0,
    name:"倍佳味餐馆",
    address:"广东省天河区迎龙路161号",
    latitude:23.196749,
    longitude:113.3597,
    width:30,
    height:30
  }]
  },
  clickMap(e) {
    console.log('点击地图上的标记点', e.currentTarget.dataset.maker)
  }
})