<!-- ModalComponent.vue -->
<template>
    <div>
      <!-- Bouton pour ouvrir le modal -->
      <button type="button" class="btn btn-outline-info btn-sm mb-2" @click="showModal = true">
        Nouvelle tâche
      </button> {{name}} {{projectId}} 
      
      <!-- Modal -->
      <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> Ajouter un chronogramme</h5>
              <button type="button" class="close" @click="showModal = false" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">                
                <div class="tablecontainer">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Quoi</th>
                                        <th>Qui</th>
                                        <th>Quand</th>
                                        <th>Action</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(task, taskId) in tasklist">
                                        <td>{{ task.tasklists }}</td>
                                        <td>
                                          <span>{{selectActor[task.id]}}</span>
                                          <multiselect v-model="value[task.id]" tag-placeholder=""
                                          placeholder="Ajouter un acteur"  label="name"
                                          track-by="code" :options="options" :multiple="true">
                                          </multiselect>
                                        </td>
                                        <td id="quand">
                                            Du <input type="date" class="inputdate"  required v-model="selectquandDD[task.id]"
                                                @change=" "><br>
                                            Au <input type="date" class="inputdate" required v-model="selectquandF[task.id]"
                                                @change="">
                                                    
                                        </td>
                                        <td>
                                            <div class="btnbtn">
                                                <button  type="button" class="btn btn-outline-success btn-sm mb-2">Enregistrer</button>
                                            </div>
                                        </td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                    </div><br>
           </div>
          </div>
        </div>
      </div>
      <!-- Backdrop -->
      <div v-if="showModal" class="modal-backdrop fade show"></div>
    </div>
   
  </template>
  
  <script>
  import Multiselect from 'vue-multiselect';
  export default {
    components: { Multiselect},
    props: {  
        tasklist:{
            type: Array,
            required:true
        },
        options:{
            type: Array,
            required:true
        },
        name:String,  
        projectId:String,
        selectquandDD:{
          type: Object,
          required:true
        },
        selectActor:{
          type: Object,
          required:true
        },
        
    },
    data() {
      return {
        showModal: false,
        formData: {
          measureName: '',
          measureDateD: '',
          measureDateF:'',
        },
        selectquandD: {},
        selectquandF: {},
        value:{}
        
      };
    },
    mounted(){
      this.$emit('trigger-readTA');
      console.log(this.selectquandDD)
    },
    methods: {
     submitForm() {
        console.log(this.tasklist)
        }
    }
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    z-index: 1040;
  }
  .modal {
    z-index: 1050;
  }
  .close{
    margin-left:250px ;
    margin-top:10px;
    border: none;
  }
  #btn{
    margin-top: 15px;
    margin-left:380px ;
  }
  .select2 {
    opacity: 0.3;
    width: 99%;
    outline: none;
    }
    .tablecontainer{
        width: auto;
        margin-left: 20px;
        overflow-x: auto;
    }
    tbody tr td:first-child,
    thead tr th:first-child {
        position: sticky;
        left: 0;
        background-color: white;
        z-index: 2 !important;
    }
    th,
    td,tr {
        border: 1px solid #a3a1a1;
        text-align: left;
        z-index: 2;
    }
    .inputdate {
        border: none;
        outline: none;
    }
  </style>
  