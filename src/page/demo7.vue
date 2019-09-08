<template>
    <div id="charts">
        <div id="bar" :style="{width:'500px',height:'300px',float:'left',marginLeft:'40px'}"></div>
        <div id="pie" :style="{width:'300px',height:'300px',float:'left',marginLeft:'40px'}"></div>
        <div id="line" :style="{width:'300px',height:'300px',float:'left',marginLeft:'40px'}"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        // 生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            var myChartBar = this.$echarts.init(document.getElementById('bar'));
            var myChartPie = this.$echarts.init(document.getElementById('pie'));
            var myChartLine = this.$echarts.init(document.getElementById('line'));
            myChartBar.setOption({
                // 设置标题
                title: {
                    text: 'ECharts 柱状图 入门示例',
                    textStyle: {
                        color: 'red',
                        fontStyle: 'normal',
                        fontSize: 18
                    }
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
            myChartPie.setOption({
                title: {
                    text: 'ECharts 饼状图 入门示例'
                },
                // 鼠标悬停提示
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        itemStyle: {
                            normal: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data: [
                            { value: 100, name: '搜索引擎' },
                            { value: 100, name: '直接访问' },
                            { value: 200, name: '邮件营销' },
                            { value: 300, name: '联盟广告' },
                            { value: 300, name: '视频广告' }
                        ]
                    }
                ]
            });
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
                series: [
                    {
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
            })
        },
    };
</script>
<style lang='scss' scoped>
</style>