// 监控的逻辑
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

// 饼图
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
})();

// 柱状图
(function(){
  /**
   * 1. 下载echarts (完成)
   * 2. 引入charts (完成)
   * 3. 创建渲染的画布 (完成)
   * 4. 实例化echarts, 并指定要渲染的画布 (完成)
   * 5. 指定配置项
   * 6. 渲染配置项
   * 7. 图表自适应
   */

  const bar = document.querySelector(".bar")
  const echartsInstance = echarts.init(bar)
  const item = {
    value: 1200,
    itemStyle: {
      color: '#254065'
    },
    // 鼠标经过柱子颜色
    emphasis: {
      itemStyle: {
        color: '#254065'
      }
    },
    // 工具提示隐藏
    tooltip: {
      extraCssText: 'opacity:0'
    }
  };
  
  const option = {
    tooltip: {
      trigger: 'item'
    },
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: '#00fffb' // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#0061ce' // 100% 处的颜色
        }
      ],
      global: false // 缺省为 false
    },
    grid: {
      top: '3%',
      left: '0',
      right: '3%',
      bottom: '3%',
      containLabel: true,
      show: true,
      borderColor: 'rgba(0, 240, 255, 0.3)'
    },
    xAxis: {
      type: 'category',
      data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
      axisTick: { show: false, alignWithLabel: false },
      axisLabel: {
        color: '#4c9bfd',
        fontSize : 8
     },
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 240, 255, 0.3)'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisTick: {
        // 不显示刻度
        show: false
      },
      // y坐标轴文字标签样式设置
      axisLabel: {
        color: '#4c9bfd'
     },
     // y坐标轴颜色设置
      axisLine:{
        lineStyle:{
             color:'rgba(0, 240, 255, 0.3)',
            // width:8,  x轴线的粗细
            // opcity: 0,   如果不想显示x轴线 则改为 0
           }
      },
      // y轴 分割线的样式 
       splitLine: {
          lineStyle: {
              color: 'rgba(0, 240, 255, 0.3)'
          }
       }
    },
    series: [
      {
        barWidth : "50%",
        data: [
          2100,
          1900,
          1700,
          1560,
          1400,
          item,
          item,
          item,
          900,
          750,
          600,
          480,
          240
        ],
        type: 'bar'
      }
    ]
  }
  echartsInstance.setOption(option)
  window.addEventListener("resize", () => {
    echartsInstance.resize()
  })

})();

// 订单逻辑
(function(){
  //数据源
  var data = {
    day365: { orders: '20,301,987', amount: '99834' },
    day90: { orders: '301,987', amount: '9834' },
    day30: { orders: '1,987', amount: '3834' },
    day1: { orders: '987', amount: '834' }
  }

  // 获取显示 订单数量 容器
  const $h4rders = $(".order h4").eq(0)
  // // 获取显示 金额数量 容器
  const $h4Amount = $(".order h4").eq(1)
  $h4rders.html(data["day365"].orders)
  $h4Amount.html(data["day365"].amount)



  $(".order .filter span").click(function(){
    let _index = $(this).index()
    render(_index)
  })
 
  function render(index){
    const key = $(".order .filter span").get(index).dataset.index
    $(".order .filter span").eq(index).addClass("active").siblings("span").removeClass("active")
    const item = data[key]
    $h4rders.html(item.orders)
    $h4Amount.html(item.amount)
  }
  let timer
  let i = 0
  function autoToggle(){
    timer = setInterval(()=>{
      i++;
      if(i > 3){
        i = 0
      }
      render(i)
    },1000)
  }
  autoToggle()
  


  $(".order").hover(function(){
    clearInterval(timer)
  },function(){
    autoToggle()
  })
  
})();

// 销售额逻辑
(function(){
 

 

  /***
   * 1. 下载echarts (完成)
   * 2. 引入echarts (完成)
   * 3. 创建渲染的画布 (完成)
   * 4. 实例化echarts, 并指定渲染的画布   (完成)
   * 5. 创建配置项  (完成)
   * 6. 渲染数据
   * 7. 设置图表自适应
   */

 

  const line = document.querySelector(".line")
  const echartsInstance = echarts.init(line)
  
  const data = {
    year: {
      info: [
        '2099年',
        '2199年',
        '2299年',
        '2399年',
        '2499年',
        '2599年',
        '2699年',
        '2799年',
        '2899年',
        '2999年',
        '3099年',
        '3199年'
      ],
      detail: [
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
      ]
    },
  
    quarter: {
      info: ['1季度', '2季度', '3季度', '4季度'],
      detail: [
        [23, 75, 12, 97],
        [43, 31, 65, 23]
      ]
    },
  
    month: {
      info: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ],
      detail: [
        [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
        [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
      ]
    },
  
    week: {
      info: ['近1周', '近2周', '近3周', '近4周', '近5周', '近6周'],
      detail: [
        [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
        [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
      ]
    }
  };
  
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['预期销售额', '实际销售额'],
      // 图例的文字颜色
      textStyle: {
        color: '#4c9bfd'
      },
      // 设置图例距离右侧10%的间距
      right: '10%'
    },
    // 网格
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      // 是否显示网格边框
      show: true,
      // 设置边框颜色
      borderColor: '#012f4a',
      // 是否显示在刻度轴内
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.year.info,
      // x刻度轴显示与隐藏
      axisTick: {
        show: false
      },
      // x刻度轴文本的颜色
      axisLabel: {
        color: '#4c9bfd' // 文本颜色
      },
      //去除 x 轴线 
      axisLine: {
        show: false // 去除轴线
      }
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false // 去除刻度
      },
      axisLabel: {
        color: '#4c9bfd' // 文字颜色
      },
      splitLine: {
        lineStyle: {
          color: '#012f4a'
        }
      }
    },
    color: ['#00f2f1', '#ed3f35'],
    series: [
      {
        name: '预期销售额',
        type: 'line',
        stack: 'Total',
        // 折线修饰为圆滑
        smooth: true,
        data: data.year.detail[0]
      },
      {
        name: '实际销售额',
        type: 'line',
        stack: 'Total',
        // 折线修饰为圆滑
        smooth: true,
        data: data.year.detail[1]
      }
    ]
  }

  echartsInstance.setOption(option)
  window.addEventListener("resize", () => {
    echartsInstance.resize()
  })

  

  $(".caption span").click(function(){
    const index = ($(this).index()) - 1
    render(index)
    
  })

  function render(index){
    $(".caption span").eq(index).addClass("active").siblings("span").removeClass("active")
    const item = data[$(".caption span").get(index).dataset.index]
    option.xAxis.data = item.info
    option.series[0].data = item.detail[0]
    option.series[1].data = item.detail[1]
    echartsInstance.setOption(option)
  }

  let i = 0
  let timer = -1
  function autoToggle(){
    timer = setInterval(()=>{
      i++;
      if(i > 3){
        i = 0
      }
      render(i)
  
    },1000)
  }
  autoToggle()

  $(".sales").hover(()=>{
    clearInterval(timer)
  },()=>{
    autoToggle()
  })

})();

// 渠道分布逻辑
(function(){
  /**
   * 1. 下载echarts (完成)
   * 2. 引入echarts (完成)
   * 3. 创建渲染的画布 (完成)
   * 4. 实例化echarts并指定渲染的画布 (完成)
   * 5. 设置配置项
   * 6. 渲染echarts图表
   * 7. 实现图表自适应
   */
  const radar = document.querySelector(".radar")
  const echartsInstance = echarts.init(radar)
  const dataBJ = [[90, 19, 56, 11, 34]];


const option = {
  tooltip: {
    show: true,
    // 控制提示框组件的显示位置
    position: ['40%', '10%'],
  },
  radar: {
      center: ['50%', '50%'],
      // 外半径占据容器大小
      radius: '50%',
    indicator: [
      { name: '淘宝', max: 90 },
      { name: '京东', max: 22 },
      { name: '苏宁', max: 75 },
      { name: '微商', max: 22 },
      { name: '其他', max: 132 }
    ],
    shape: 'circle',
    splitNumber: 4,
    name: {
      // 修饰雷达图文本颜色
       textStyle: {
         color: '#4c9bfd'
       }
    },
   
    splitLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.5)'
      }
    },
    splitArea: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.5)'
      }
    }
  },
  series: [
    {
      name : '上海',
      type: 'radar',
      lineStyle: {
        normal: {
             color: '#fff',
             // width: 1
        }
      }, 
      areaStyle: {
        color: 'rgba(238, 197, 102, 0.6)',
      },
      data: dataBJ,
      symbol: 'circle',
      // 拐点的大小  
      symbolSize: 5, 
      itemStyle: {
       color : "#fff"
      } 
    }
  ]
}
  echartsInstance.setOption(option)
  window.addEventListener("resize", () => {
    echartsInstance.resize
  })
})();


