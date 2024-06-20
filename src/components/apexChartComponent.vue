<template>
     <div id="chart">
        <apexchart type="rangeBar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
<script>
import axios from 'axios';
    export default{
        props: {
            projectId: String,
        },
        props: ['id_projet'],
        data(){
            return{
            series: [],
            chartOptions: {
                chart: {
                    height: 450,
                    type: 'rangeBar'
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '80%'
                    }
                },
                xaxis: {
                    type: 'datetime'
                },
                stroke: {
                    width: 1
                },
                fill: {
                    type: 'solid',
                    opacity: 0.6
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left'
                }
            },
            }
        },
        mounted(){
            this.readApex()
        },
        methods:{
            async readApex() {
            var data = new FormData();
            data.append('id_p', this.id_projet);
            await axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_apexresource',
                data: data
            }).then((response) => {
                console.log(response.data);
                const transformedData = {};
                response.data.forEach(item => {
                    var name = item.qui;
                    var task = item.tasklists;
                    var dateD = new Date(item.quandD).getTime();
                    var dateF = new Date(item.quandF).getTime();
                    transformedData[task] = {
                        name: name,
                        dateD: dateD,
                        dateF: dateF
                    };
                });
                this.series = Object.keys(transformedData).map(task => ({
                    name: transformedData[task].name,
                    data: [{
                        x: task,
                        y: [transformedData[task].dateD, transformedData[task].dateF]
                    }]
                }));
                console.log(this.series);


            }).catch((error) => {
                console.log(error)
            })
        },
        }
    }
</script>
<style scoped>
    #chart{
        width: 1000px!important;
    }
</style>