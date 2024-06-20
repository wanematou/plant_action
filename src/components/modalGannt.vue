<!-- ModalComponent.vue -->
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
                                          <span v-if="selectActor[task.id]">{{selectActor[task.id]}}</span>
                                          <multiselect v-if="!selectActor[task.id]||this.update[task.id]" v-model="value[task.id]" tag-placeholder=""
                                          placeholder="Ajouter un acteur"  label="name"
                                          track-by="code" :options="options" :multiple="true" @select="readTaskListt(task.id)">
                                          </multiselect>
                                        </td>
                                        <td id="quand">
                                            Du <input type="date" class="inputdate"  required v-model="selectquandD[task.id]"><br>
                                            Au <input type="date" class="inputdate" required v-model="selectquandF[task.id]">
                                                    
                                        </td>
                                        <td>
                                            <div class="btnbtn">
                                                <button v-if="!selectActor[task.id]" @click="submitForm(task.id)" class="btn btn-outline-primary btn-sm mb-2">Enregistrer</button>
                                                <button v-if="selectActor[task.id]||modifier[task.id]" @click="modifyTa(task.id)" class="btn btn-outline-primary btn-sm mb-2">Modifier</button>
                                                <button v-if="update[task.id]" @click="updateTA(task.id)" class="btn btn-outline-primary btn-sm mb-2">Enregistrer modif</button>
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
  import axios from 'axios';
  export default {
    components: { Multiselect},
    props: {  
        tasklist:{
            type: Object,
            required:true
        },
        options:{
            type: Array,
            required:true
        },
        name:String,  
        projectId:String,
        selectquandD:{
          type: Object,
          required:true
        },
        selectActor:{
          type: Object,
          required:true
        },
        selectquandF:{
          type:Object,
          required:true
        },
        onSubmit:{
          type:Function,
          required:true
        }
    },
    data() {
      return {
        showModal: false,
        modifier:{},
        update:{},
        value:{},
        taskss:''
        
      };
    },
    mounted(){
      this.$emit('trigger-readTA');
    },
    methods: {

      readTaskListt(taskId) {
            var data = new FormData();
            data.append("id_projet", this.projectId);
            data.append("taskId", taskId);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read-tasklistt',
                data: data
            })
               .then((response) => {
                  response.data.forEach(item=>{
                    this.taskss=item.tasklists
                  })
                }).catch((error) => {
                    console.log(error)
                })
        },

      async submitForm(taskId) {
        var data= new FormData();
        data.append('id_t', taskId);
        data.append('id_projet', this.projectId);
        if(this.value.length==0){
            data.append('qui', '');
        } else{
            data.append('qui', this.value[taskId].map(item => item.name));
        }
        if(this.value.length==0){
            data.append('email', '');;
        } else{
            data.append('email', this.value[taskId].map(item => item.code));
        }
        data.append('project', this.name);
        data.append('quandD', this.selectquandD[taskId]);
        data.append('quandF', this.selectquandF[taskId]); 
        data.append('task', this.taskss);  
        console.log(taskId);     
        await this.onSubmit(data);
        try {
            this.showModal = false;
            this.$emit('trigger-readTA');
            this.$emit('trigger-addBar');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        },
        modifyTa(taskId){
            if(this.selectActor[taskId].length==0){
                this.value[taskId]=''
            }else{
                var names=this.selectActor[taskId].split(',');
                this.value[taskId]= names.map(name =>{
                return this.options.find(option=>option.name === name.trim())
            })
            };  this.update[taskId]=true;    
        },
        updateTA(taskId){
            var data = new FormData();
            console.log(taskId);
            console.log(this.selectquandD[taskId])
            data.append('id', taskId);
            if(this.value[taskId].length==0){
                data.append('qui', '');               
            }else{
                data.append('qui', this.value[taskId].map(item => item.name));               
            }  
            if(this.value[taskId].length==0){
                data.append('email','');
            }  else{
                data.append('email', this.value[taskId].map(item => item.code));
            } 
            data.append('quandD', this.selectquandD[taskId]);
            data.append('quandF', this.selectquandF[taskId]);                 
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=update_tableauactionm',
                data: data
            }).then((response) => {
              this.showModal = false;
              this.$emit('trigger-readTA');
              this.$emit('trigger-addBar');
              this.update[taskId]=false; 
            }).catch((error) => {
                console.log(error)
            })
        },
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
  