<template>
    <g-gantt-chart
      chart-start="2021-07-12 12:00"
      chart-end="2027-12-14 12:00"
      precision="month"
      bar-start="myBeginDate"
      bar-end="myEndDate"
      color-scheme:vue
      font:Courier
      @drag-bar="onDragBar($event.bar, $event.e)"
    >
    <g-gantt-row :bars="barList"/>
      <g-gantt-row 
        v-for="(barGroup, index) in barList" 
        :key="index" 
        :label="barGroup.label" 
        :bars="barGroup.bars"
      />
      <g-gantt-row
        label=""
        :bars="myBarList"
      />
    </g-gantt-chart>
    <button @click=" addNewBar()">  ajouter</button>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    props: ['id_projet'],
    data() {
      return {
        barList: [],      
        myBarList: [],
        label:'',
      };
    },
    mounted(){
        this.readApex()
    },
    methods: {
      addNewBar() {
        const bar = {
          myBeginDate: "2021-07-11 17:00",
          myEndDate: "2022-07-12 03:00", 
          ganttBarConfig: {
            id: "some-id-blabla" ,
          }
        };
         console.log(this.myBarList);
        this.myBarList.push(bar);
        console.log(this.myBarList);
      },
      onDragBar(bar, e, datetime) {
        console.log('DragBar on bar:', bar, e, datetime);
      },
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
                    var id= item.id_task;
                    var name = item.qui;
                    var task = item.tasklists;
                    var dateD = item.quandD+' '+"07:00";
                    console.log(dateD);
                    var dateF = item.quandF+' '+"05:00";
                    console.log(dateF);
                    transformedData[task] = {
                        name: name,
                        id:id,
                        dateD: dateD,
                        dateF: dateF,
                        name:name,
                    }      
                });
                this.barList = Object.keys(transformedData).map(task => ({
                   bars:[
                    {
                        myBeginDate: transformedData[task].dateD,
                        myEndDate:transformedData[task].dateF,
                        ganttBarConfig: {
                        id: transformedData[task].id,
                        hasHandles: true,
                        label: task,
                        style: {
                        background: "#e09b69",
                        borderRadius: "20px",
                        color: "black"
                        }
                    }
                    }
                   ]
                }));
                console.log(this.barList);

            }).catch((error) => {
                console.log(error)
            })
        },
  }
  }
  </script>
  