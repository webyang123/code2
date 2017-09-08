      function createCharts(id,nodesData,linksData) {
            $("#" + id).css("display", "block");
            require.config({
                paths: {
                    echarts: 'http://echarts.baidu.com/build/dist'
                }
            });
            require(["echarts", "echarts/chart/force"], function (ec) {
                var myChart = ec.init(document.getElementById(id)); 
                var option = {
                    tooltip: {
                        show: false
                    },
                    series: [{
                        type:'force',
                        ribbonType: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#333'
                                    }
                                },
                                nodeStyle: {
                                    brushType: 'both',
                                    borderColor: 'rgba(255,215,0,0.4)',
                                    borderWidth: 1,
                                }
                            }
                        },
                        categories : [
                            {
                                name: '核心'
                            },
                            {
                                name: '技术'
                            },
                            {
                                name: '机构'
                            },
                            {
                                name: '专家'
                            }
                        ],
                        nodes:nodesData,
                        links:linksData
                    }]
                };

                var ecConfig = require('echarts/config');
                    function focus(param) {
                        var data = param.data;
                        var links = option.series[0].links;
                        var nodes = option.series[0].nodes;
                        if (
                            data.source !== undefined
                            && data.target !== undefined
                        ) { //点击的是边
                            var sourceNode = nodes.filter(function (n) {return n.name == data.source})[0];
                            var targetNode = nodes.filter(function (n) {return n.name == data.target})[0];
                            // console.log("选中了边 " + sourceNode.name + ' -> ' + targetNode.name + ' (' + data.weight + ')');
                        } else { // 点击的是点
                            console.log(data);
                            // console.log("选中了" + data.name + '(' + data.value + ')');
                        }
                    }
                    myChart.on(ecConfig.EVENT.CLICK, focus)

                    myChart.on(ecConfig.EVENT.FORCE_LAYOUT_END, function () {
                        // console.log(myChart.chart.force.getPosition());
                    });


                myChart.setOption(option);
            });
        }
        var nodesSynth = [{ id: 0, category: 0, name: '0', label: '氢氧化锂', symbolSize: 40},{ id: 1, category: 1, name: '1', label: '锂离子电池', symbolSize: 30 , value:4},{ id: 2, category: 1, name: '2', label: '锰酸锂', symbolSize: 25 , value:4},{ id: 3, category: 1, name: '3', label: '碳酸锂', symbolSize: 23 , value:4},{ id: 4, category: 2, name: '4', label: '王永强', symbolSize: 25 , value:4},{ id: 5, category: 2, name: '5', label: '徐明江', symbolSize: 20 , value:3},{ id: 6, category: 2, name: '6', label: '金鹏', symbolSize: 20 , value:3},{ id: 7, category: 3, name: '7', label: '格林美公司', symbolSize: 25 , value:3},{ id: 8, category: 3, name: '8', label: '赣锋锂业公司', symbolSize: 28 , value:2}];
        var linksSynth = [{ source: 1, target: 0, weight : 1 },{ source: 2, target: 0, weight : 2 },{ source: 3, target: 0, weight : 1 },{ source: 4, target: 0, weight : 1 },{ source: 5, target: 0, weight : 1 },{ source: 6, target: 0, weight : 1 },{ source: 7, target: 0, weight : 1 },{ source: 8, target: 0, weight : 1 }];
        createCharts("main",nodesSynth,linksSynth);

        function createChartsBar() {
            // 路径配置
        require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }
        });      
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('box')); 
                
                var option = {
                    tooltip: {
                        show: true
                    },
                    grid:{
                        x:1,
                        y:20,
                        x2:20,
                        y2:20,
                        borderWidth:0
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
                            splitLine:{
                    　　　　     show:false
                    　　　　},
                            axisLabel: {
                                textStyle: {
                                    fontSize: 1
                                }
                            },
                            axisLine: {
                                lineStyle:{
                                    color:'#D0D0D0'
                                }
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel:{
                                show:false
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#D0D0D0'
                                }
                            },
                            splitLine:{
                    　　　　　  show:false
                    　　　　}
                        }
                    ],
                    series : [{
                        itemStyle: {
                            normal:{
                                color:"#F27A7A"
                            }
                        },
                            "name":"",
                            "type":"bar",
                            "barCategoryGap": '5%',
                            "data":[12, 11, 10, 9, 8, 7,6, 5, 4, 3, 2, 1]
                        }
                    ]
                };
        
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );
        }
        createChartsBar();   

        function createChartsbarBarTwo() {
        // 路径配置
        require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }
        });  
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('porc')); 
                
                var option = {
                    tooltip : {
                        trigger: 'axis'
                    },
                    grid:{
                        x:100,
                        y:20,
                        x2:10,
                        y2:20,
                        borderWidth:1,
                        borderColor:'#D3E6F0'
                    },
                    toolbox: {
                        show : true,           
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'value',
                            splitLine:{
                    　　　　　  lineStyle:{
                                    color:'#D3E6F0'
                                }
                    　　　　},
                            axisLabel: {
                                textStyle: {
                                    fontSize: 1,
                                    color:'#608FAD'
                                }
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#ABCADF'
                                }
                            },
                            boundaryGap : [0, 0.01]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
                            splitLine:{
                    　　　　　  lineStyle:{
                                    color:'#D3E6F0'
                                }
                    　　　　},
                            axisLabel: {
                                textStyle: {
                                    fontSize: 1,
                                    color:'#608FAD'
                                }
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#ABCADF'
                                }
                            },
                            data : ['浙江大学学报自然课','电子学报','计算机应用','计算机工程','中国机械工程','计算机应用研究','软件学报','计算机研究与发展','计算机科学','计算机辅助设计']
                        }
                    ],
                    series : [
                        {
                            type:'bar',
                            itemStyle: {
                                normal:{
                                    color:"#E0B044",
                                    label:{
                                        show: true, 
                                        textStyle:{
                                            color:'#847657',
                                            fontSize:1
                                        }
                                    },
                                }
                            },
                            data:[4,5,6,13,17,20,30,35,40,52]
                        }
                    ]
                };
                    
        
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );
        }
    createChartsbarBarTwo(); 

    //获取可视化图谱数据
    // function GetChartDate(action,author,orgs,id,obj) {
    //     $.ajax({
    //         url:"weixin/ChartHandler.aspx",
    //         type:"POST",
    //         dataType:"text",
    //         data:{
    //             cmd:action,
    //             author:author,
    //             orgs:orgs,
    //         },
    //         beforeSend:function () {
    //             obj.find("span").html("<img src='images/loading.gif' height='24' style='margin-bottom:-6px;'>");
    //             $("#" + id).css("display","none");
    //         },
    //         error:function () {
    //             $("#" + id).html("无相关数据");
    //         },
    //         success:function (json) {
    //             var data = eval("(" + json + ")");
    //             var d1 = eval(data.data1);
    //             var d2 = eval(data.data2);
    //             createCharts(id,d1,d2);
    //             obj.find("span").html("");
    //         }
    //     });
    // }


