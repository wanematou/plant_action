<template>
    <div>
      <!-- Bouton pour ouvrir le modal -->
      <button type="button" class="btn btn-outline-info btn-sm mb-2" @click="showModal = true">
       +
      </button> 
      
      <!-- Modal -->
      <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog modaldialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Notification</h5>
              <button type="button" class="close" @click="showModal = false" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">                
                Message envogé
           </div>
          </div>
        </div>
      </div>
      <div v-if="showModal" class="modal-backdrop fade show"></div>
    </div>












  <g-gantt-chart
    chart-start="2021-07-12 12:00"
    chart-end="2023-12-14 12:00"
    precision="month"
    bar-start="myBeginDate"
    bar-end="myEndDate"
    push-on-overlap
    color-scheme:vue
    font:Courier
    @mousedown-bar="onMousedownBar($event.bar, $event.e, $event.datetime)"
    @dblclick-bar="onMouseupBar($event.bar, $event.e, $event.datetime)"
    @mouseenter-bar="onMouseenterBar($event.bar, $event.e)"
    @mouseleave-bar="onMouseleaveBar($event.bar, $event.e)"
    @dragstart-bar="onDragstartBar($event.bar, $event.e)"
    @drag-bar="onDragBar($event.bar, $event.e)"
    @contextmenu-bar="onContextmenuBar($event.bar, $event.e, $event.datetime)"
  >
    <g-gantt-row label="" :bars="row1BarList"/>
    <g-gantt-row label="Vendre" :bars="row2BarList"/>
    <g-gantt-row label="Vendre" :bars="row3BarList"/>
    <g-gantt-row
      label="My row 1"
      :bars="myBarList"
    />
  </g-gantt-chart>
  <button @click=" addNewBar()">  ajouter</button>
</template>

<script>
export default {
  props: ['id_projet'],
  data() {
    return {
      showModal: false,
      row1BarList: [
        {
          myBeginDate: "2022-07-13 13:00",
          myEndDate: "2023-12-13 19:00",
          ganttBarConfig: {
            id: "unique-id-1",
            label: "Lorem ipsum dolor"
          }
        }
      ],
      row2BarList: [
        {
          myBeginDate: "2023-07-13 00:00",
          myEndDate: "2023-10-14 02:00",
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
          myBeginDate: "2022-07-13 00:00",
          myEndDate: "2024-10-14 02:00",
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
  mounted(){
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
    onMousedownBar(bar, e, datetime) {
      console.log('Mousedown event on bar:', bar, e, datetime);
    },
    onMouseupBar(bar, e, datetime) {
      console.log('Double-click event on bar:', bar, e, datetime);
    },
    onMouseenterBar(bar, e, datetime) {
      console.log('Mouse on seen bar:', bar, e, datetime);
    },
    onMouseleaveBar(bar, e, datetime) {
      console.log('Mouse leave on bar:', bar, e, datetime);
    },
    onDragstartBar(bar, e, datetime) {
      console.log('Dragstart on bar:', bar, e, datetime);
    },
    onDragBar(bar, e, datetime) {
      console.log('DragBar on bar:', bar, e, datetime);
    },
    onContextmenuBar(bar, e, datetime) {
      console.log('ContextmenuBar on bar:', bar, e, datetime);
    },
}
}
</script>
