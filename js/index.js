(function(){

    // 监控区域 - 切换功能
     $(".content").eq(0).show()
     $(".monitor .tabs span").click(function(){
       const _index = $(this).index()
       $(this).addClass("active").siblings('span').removeClass("active")
       $(".content").eq(_index).show().siblings(".content").hide()
     }) 
     
     // each 遍历dom
    $(".marquee").each(function(){
      console.log($(this))
      const rows = $(this).children().clone()
      $(this).append(rows)
    })

})();


(function(){
 const pie = document.querySelector(".pie")
 const echartsInstance = echarts.init(pie)
 const option = {
  color : ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
   tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
  series: [
    {
      name: '销售统计',
      type: 'pie',
      radius: ["10%","70%"],
      center: ['50%', '50%'],
      roseType: 'radius',
      itemStyle: {
        borderRadius: 5
      },
       label: {
          fontSize: 10
        },
        labelLine : {
          // 连接到图形的线长度
          length: 6,
          // 连接到文字的线长度
          length2: 8
        },
      data: [
          { value: 20, name: "云南" },
          { value: 26, name: "北京" },
          { value: 24, name: "山东" },
          { value: 25, name: "河北" },
          { value: 20, name: "江苏" },
          { value: 25, name: "浙江" },
          { value: 30, name: "四川" },
          { value: 42, name: "湖北" }
      ]
    }
  ]
}
  echartsInstance.setOption(option)
  window.addEventListener("resize",()=>{
    echartsInstance.resize()
  })
})()

