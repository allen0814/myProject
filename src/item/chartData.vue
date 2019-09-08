<template>
    <div id="charts" style="padding: 20px;">
        <div id="china" :style="{width:'900px',height:'600px',float:'left',marginLeft:'40px'}"></div>
        <el-slider v-model="zoom" vertical height="250px" :min="0.75" :max="3" :step="0.01" :show-tooltip="false" style="display: flex;width: 40px;    left: -8px;top: 65px;">
        </el-slider>
        <div id="line" :style="{width:'300px',height:'300px',float:'left'}"></div>

        <div id="bar" :style="{width:'450px',height:'400px',float:'left'}"></div>
        <div id="pie" :style="{width:'400px',height:'300px',float:'left'}"></div>

        <el-checkbox v-model="disableSex"></el-checkbox>
        <el-switch :disabled="!disableSex" active-text="男" inactive-text="女" active-color="#13ce66" inactive-color="#ff4949" v-model='sex'></el-switch>

    </div>
</template>

<script>
    import '../../node_modules/echarts/map/js/china.js' // 引入中国地图数据

    export default {

        data() {
            return {
                zoom: 1,
                disableSex: false,
                sex: true,
                param: {
                    sex: ''
                }
            };
        },
        watch: {

        },
        beforeUpdate() {
            if (this.disableSex) {
                if (this.sex) {
                    this.param.sex = 'man'
                } else {
                    this.param.sex = 'woman'
                }
            } else {
                this.param.sex = ''
            }
        },
        updated() {
            var myChartBar = this.$echarts.init(document.getElementById('bar'));
            var myChartPie = this.$echarts.init(document.getElementById('pie'));
            var myChartLine = this.$echarts.init(document.getElementById('line'));
            var myChartChina = this.$echarts.init(document.getElementById('china'));
            let param = this.param;
            let barUrl = 'baseinfo/birthdayCount';
            this.$api.post(barUrl, param, null, r => {
                if (r.success) {
                    let data = r.data;
                    var xAxisData = [];
                    var seriesData = [];
                    for (var i = 0; i < data.length; i++) {
                        xAxisData.push(data[i].name);
                        seriesData.push(data[i].value);
                    }
                    myChartBar.setOption({
                        xAxis: {
                            data: xAxisData
                        },
                        series: [{
                            // 根据名字对应到相应的系列
                            name: '数量',
                            data: seriesData
                        }]
                    })
                } else {
                    this.$message({
                        message: '获取数据失败!',
                        type: 'error'
                    });
                    return [];
                }
            })

            let mapUrl = 'baseinfo/provinceCount';
            this.$api.post(mapUrl, param, null, r => {
                if (r.success) {
                    myChartChina.setOption({
                        series: [{
                            name: '数据',
                            zoom: this.zoom,
                            data: r.data
                        }]
                    })
                } else {
                    this.$message({
                        message: '获取数据失败!',
                        type: 'error'
                    });
                    return [];
                }
            })
        },
        // 生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            let param = this.param;

            var myChartBar = this.$echarts.init(document.getElementById('bar'));
            var myChartPie = this.$echarts.init(document.getElementById('pie'));
            var myChartLine = this.$echarts.init(document.getElementById('line'));
            var myChartChina = this.$echarts.init(document.getElementById('china'));
            // 柱状图
            myChartBar.setOption({
                // 设置标题
                title: {
                    text: '各月份人口数',
                    textStyle: {
                        color: '#80ADB5',
                        fontStyle: 'normal',
                        fontSize: 14
                    }
                },
                tooltip: {},
                xAxis: {
                    data: [],
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    z: 10,
                    name: '月',
                    nameTextStyle: {
                        color: '#80ADB5',
                        fontWeight: 'bold',
                        fontSize: 16
                    },
                    nameGap: 3
                },
                yAxis: {
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    },
                    name: '人',
                    nameTextStyle: {
                        color: '#80ADB5',
                        fontWeight: 'bold',
                        fontSize: 16
                    },
                    nameGap: 3
                },
                dataZoom: [{
                    type: 'inside'
                }],
                series: [{ // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0.05)'
                        }
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: this.dataShadow(),
                    animation: false
                }, {
                    name: '数量',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#83bff6',
                            // shadowColor: 'rgba(0, 0, 0, 0.5)',
                            // shadowBlur: 10,
                            opacity: 0.7
                        },
                        emphasis: {
                            color: '#83bff6'
                        }
                    },
                    data: []
                }]
            });
            let barUrl = 'baseinfo/birthdayCount';
            this.$api.post(barUrl, param, null, r => {
                if (r.success) {
                    let data = r.data;
                    var xAxisData = [];
                    var seriesData = [];
                    for (var i = 0; i < data.length; i++) {
                        xAxisData.push(data[i].name);
                        seriesData.push(data[i].value);
                    }
                    myChartBar.setOption({
                        xAxis: {
                            data: xAxisData
                        },
                        series: [{
                            // 根据名字对应到相应的系列
                            name: '数量',
                            data: seriesData
                        }]
                    })
                } else {
                    this.$message({
                        message: '获取数据失败!',
                        type: 'error'
                    });
                    return [];
                }
            })
            // 饼状图
            myChartPie.setOption({
                title: {
                    text: 'ECharts 饼状图 入门示例'
                },
                // 鼠标悬停提示
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    center: ['48%', '60%'],
                    itemStyle: {
                        normal: {
                            // 阴影的大小
                            shadowBlur: 10,
                            // 阴影水平方向上的偏移
                            shadowOffsetX: 0,
                            // 阴影垂直方向上的偏移
                            shadowOffsetY: 0,
                            // 阴影颜色
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: [{
                            value: 100,
                            name: '搜索引擎'
                        },
                        {
                            value: 100,
                            name: '直接访问'
                        },
                        {
                            value: 200,
                            name: '邮件营销'
                        },
                        {
                            value: 300,
                            name: '联盟广告'
                        },
                        {
                            value: 300,
                            name: '视频广告'
                        }
                    ]
                }]
            });
            // 折线图
            myChartLine.setOption({
                title: {
                    text: 'ECharts 折线图 入门示例'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['意向', '预购', '成交'],
                    top: 'bottom'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                        name: '成交',
                        type: 'line',
                        smooth: true,
                        data: [10, 12, 21, 54, 260, 830, 710]
                    },
                    {
                        name: '预购',
                        type: 'line',
                        smooth: true,
                        data: [30, 182, 434, 791, 390, 30, 10]
                    },
                    {
                        name: '意向',
                        type: 'line',
                        smooth: true,
                        data: [1320, 1132, 601, 234, 120, 90, 20]
                    }
                ]
            });
            // 地图
            myChartChina.setOption({

                backgroundColor: '#FFFFFF',
                title: {
                    text: '人口分布',
                    subtext: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },

                //左侧小导航图标
                visualMap: {
                    show: true,
                    x: 'left',
                    y: 'center',
                    splitList: [{
                            start: 25,
                            end: 30
                        }, {
                            start: 20,
                            end: 25
                        },
                        {
                            start: 15,
                            end: 20
                        }, {
                            start: 10,
                            end: 15
                        },
                        {
                            start: 5,
                            end: 10
                        }, {
                            start: 0,
                            end: 5
                        },
                    ],
                    color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
                },

                //配置属性
                series: [{
                    name: '数据',
                    type: 'map',
                    mapType: 'china',
                    roam: true, //scale缩放，move平移
                    label: {
                        normal: {
                            show: true //省份名称  
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: "#800080"
                            }

                        }
                    },
                    scaleLimit: { //缩放极限
                        min: 0.75,
                        max: 3
                    },
                    aspectScale: 0.75, //地图的长宽比
                    zoom: this.zoom,
                    data: []
                }]
            });
            let mapUrl = 'baseinfo/provinceCount';
            this.$api.post(mapUrl, param, null, r => {
                debugger
                if (r.success) {
                    myChartChina.setOption({
                        series: [{
                            name: '数据',
                            zoom: this.zoom,
                            data: r.data
                        }]
                    })
                } else {
                    this.$message({
                        message: '获取数据失败!',
                        type: 'error'
                    });
                    return [];
                }
            })
        },
        created() {},
        methods: {
            dataShadow() {
                var yMax = 20;
                var dataShadow = [];
                for (var i = 0; i < 12; i++) {
                    dataShadow.push(yMax);
                }
                return dataShadow;
            }
        }
    };
</script>
<style lang='scss' scoped>
</style>

<!-- [
    { name: '北京', value: '100' }, { name: '天津', value: this.randomData() },
    { name: '上海', value: this.randomData() }, { name: '重庆', value: this.randomData() },
    { name: '河北', value: this.randomData() }, { name: '河南', value: this.randomData() },
    { name: '云南', value: this.randomData() }, { name: '辽宁', value: this.randomData() },
    { name: '黑龙江', value: this.randomData() }, { name: '湖南', value: this.randomData() },
    { name: '安徽', value: this.randomData() }, { name: '山东', value: this.randomData() },
    { name: '新疆', value: this.randomData() }, { name: '江苏', value: this.randomData() },
    { name: '浙江', value: this.randomData() }, { name: '江西', value: this.randomData() },
    { name: '湖北', value: this.randomData() }, { name: '广西', value: this.randomData() },
    { name: '甘肃', value: this.randomData() }, { name: '山西', value: this.randomData() },
    { name: '内蒙古', value: this.randomData() }, { name: '陕西', value: this.randomData() },
    { name: '吉林', value: this.randomData() }, { name: '福建', value: this.randomData() },
    { name: '贵州', value: this.randomData() }, { name: '广东', value: this.randomData() },
    { name: '青海', value: this.randomData() }, { name: '西藏', value: this.randomData() },
    { name: '四川', value: this.randomData() }, { name: '宁夏', value: this.randomData() },
    { name: '海南', value: this.randomData() }, { name: '台湾', value: this.randomData() },
    { name: '香港', value: this.randomData() }, { name: '澳门', value: this.randomData() }
] -->