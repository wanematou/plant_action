<template>
    <g-gantt-chart
      :chart-start="chartStart"
      :chart-end="chartEnd"
      precision="month"
      bar-start="myBeginDate"
      bar-end="myEndDate"
      color-scheme:vue
      font:Courier
      @drag-bar="onDragBar($event.bar, $event.e)"
    >
    <g-gantt-row 
        v-for="(barGroup, index) in barList" 
        :key="index" 
        :label="barGroup.label" 
        :bars="barGroup.bars" 
      />
    </g-gantt-chart> 
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
      console.log(allStartDates);
      const minStartDate = new Date(Math.min(...allStartDates));
      console.log(minStartDate);
      const formattedStartDate = `${minStartDate.getFullYear()}-${String(minStartDate.getMonth() + 1).padStart(2, '0')}-${String(minStartDate.getDate()).padStart(2, '0')} ${String(minStartDate.getHours()).padStart(2, '0')}:${String(minStartDate.getMinutes()).padStart(2, '0')}`;
      console.log(formattedStartDate);
      return formattedStartDate;
    },
    chartEnd() {
      const allBars = [...this.barList.flatMap(barGroup => barGroup.bars), ...this.myBarList];
      const allEndDates = allBars.map(bar => new Date(bar.myEndDate));
      const maxEndDate = new Date(Math.max(...allEndDates));
      const formattedEndDate = `${maxEndDate.getFullYear()}-${String(maxEndDate.getMonth() + 1).padStart(2, '0')}-${String(maxEndDate.getDate()).padStart(2, '0')} ${String(maxEndDate.getHours()).padStart(2, '0')}:${String(maxEndDate.getMinutes()).padStart(2, '0')}`;
      console.log(formattedEndDate);
      return formattedEndDate;
    }
  },
    data() {
      return {     
        myBarList: [],
      };
    }
    
  }
  </script>
  