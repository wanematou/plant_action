<template>
  <g-gantt-chart
    chart-start="2021-07-12 12:00"
    chart-end="2023-12-14 12:00"
    precision="month"
    bar-start="myBeginDate"
    bar-end="myEndDate"
    push-on-overlap
    color-scheme:vue
    font:Courier
  >
    <g-gantt-row label="Colorier" :bars="row1BarList" />
    <g-gantt-row label="Vendre" :bars="row2BarList" />
    <g-gantt-row label="Vendre" :bars="row3BarList" />
    <g-gantt-row
      label="My row 1"
      :bars="myBarList"
    />
  </g-gantt-chart>
</template>

<script>
export default {
  data() {
    return {
      row1BarList: [
        {
          myBeginDate: "2021-07-13 13:00",
          myEndDate: "2021-12-13 19:00",
          ganttBarConfig: {
            id: "unique-id-1",
            label: "Lorem ipsum dolor"
          }
        }
      ],
      row2BarList: [
        {
          myBeginDate: "2021-07-13 00:00",
          myEndDate: "2021-10-14 02:00",
          ganttBarConfig: {
            id: "another-unique-id-2",
            hasHandles: true,
            label: "Hey, look at me",
            style: {
              background: "#e09b69",
              borderRadius: "20px",
              color: "black"
            }
          }
        }
      ],
      row3BarList: [
        {
          myBeginDate: "2021-07-13 00:00",
          myEndDate: "2022-10-14 02:00",
          ganttBarConfig: {
            id: "another-unique-id-3",
            hasHandles: true,
            label: "Hey, look at me",
            style: {
              borderRadius: "20px",
              color: "black"
            }
          }
        }
      ],
      myBarList: []
    };
  },
  methods: {
    addNewBar() {
      const bar = {
        myBeginDate: "2021-07-11 17:00",
        myEndDate: "2021-07-12 03:00",
        ganttBarConfig: {
          id: "some-id-blabla" // make sure this is unique!
        }
      };
      this.myBarList.push(bar);
    }
}
}
</script>
