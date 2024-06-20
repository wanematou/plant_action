<template>
    <div >
      <g-gantt-chart 
      immobile:true
      :chart-start="chartStart"
      :chart-end="chartEnd"
      precision="month"
      bar-start="myBeginDate"
      bar-end="myEndDate"
      color-scheme:vue
      font:Courier
      >
      <g-gantt-row 
          v-for="(barGroup, index) in barList" 
          :key="index" 
          :bars="barGroup.bars" 
        />
      </g-gantt-chart>
    </div> 
    
</template>
  
  <script>
  export default {
    props: {
    barList: Array,
    projectId: String
  },
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
      };
    },
    methods:{
    
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