<template>
    <div >
      <g-gantt-chart class="gant"
      :chart-start="chartStart"
      :chart-end="chartEnd"
      precision="month"
      bar-start="myBeginDate"
      bar-end="myEndDate"
      color-scheme:vue
      font:Courier
      @drag-bar="onDragBar($event.bar, $event.e)"
      >
      <g-gantt-row class="gant"
          v-for="(barGroup, index) in barList" 
          :key="index" 
          :label="barGroup.label" 
          :bars="barGroup.bars" 
        />
      </g-gantt-chart>
    </div> 
    
</template>
  
  <script>
  import axios from 'axios';
  export default {
    props: {
    barList: Array,
    projectId: String
  },
  emits: ['triggerReadTA', 'triggerAddBar'],
  computed: {
    chartStart() {
      const allBars = [...this.barList.flatMap(barGroup => barGroup.bars), ...this.myBarList];
      const allStartDates = allBars.map(bar => new Date(bar.myBeginDate));
      const minStartDate = new Date(Math.min(...allStartDates));
      const formattedStartDate = `${minStartDate.getFullYear()}-${String(minStartDate.getMonth() + 1).padStart(2, '0')}-${String(minStartDate.getDate()).padStart(2, '0')} ${String(minStartDate.getHours()).padStart(2, '0')}:${String(minStartDate.getMinutes()).padStart(2, '0')}`;
      return formattedStartDate;
    },
    chartEnd() {
      const allBars = [...this.barList.flatMap(barGroup => barGroup.bars), ...this.myBarList];
      const allEndDates = allBars.map(bar => new Date(bar.myEndDate));
      const maxEndDate = new Date(Math.max(...allEndDates));
      const formattedEndDate = `${maxEndDate.getFullYear()}-${String(maxEndDate.getMonth() + 1).padStart(2, '0')}-${String(maxEndDate.getDate()).padStart(2, '0')} ${String(maxEndDate.getHours()).padStart(2, '0')}:${String(maxEndDate.getMinutes()).padStart(2, '0')}`;
      return formattedEndDate;
    }
  },
    data() {
      return {     
        myBarList: [],
        quandF:'',
        quandD:'',
        taskId:'',
      };
    },
    methods:{
      onDragBar(bar, e, datetime) {
        this.taskID= bar.ganttBarConfig.id;
        this.quanD= bar.myBeginDate;
        this.quandF= bar.myEndDate;
        this.updatebar=true;  
        var data = new FormData();
            data.append('id', bar.ganttBarConfig.id); 
            data.append('quandD', bar.myBeginDate.substring(0, 10));
            data.append('quandF', bar.myEndDate.substring(0, 10));
        axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=update_tableauactionmm',
                data: data
            }).then((response) => {
              this.showModal = true;
         this.$emit('triggerReadTA');
              this.$emit('triggerAddBar');
              this.updatebar=false;
            }).catch((error) => {
                console.log(error)
            })
      }
    }
    
  }
  </script>
  <style scoped>
    .gant{
      z-index: 1!important;
    }
    .btn{
      margin-left:1000px;
    }
  </style>