<template>
   <div class="container">
        <div class="card">
            <div class="card-body">
                <div class="nom_projet">
                    <h1 v-for="item in projectnames">
                    {{ item.projectname }}
                </h1>
                </div><br><br>
                <div class="objectif_principale">
                    <h5>I-Objectif principal</h5>
                    <p v-for="item in mainobjectives">
                        {{ item.objectives }}
                    </p>
                </div><br>
                <div class="objectif_intermediaires">
                    <h5>II-Les objectifs intermédiaires ou jalons ou d’étapes</h5>
                    <p v-for="item in specificobjectives">
                        {{ item.objectives }}
                    </p>
                </div><br>
                <div class="equilibre_QCD">
                    <h5>III-Equilibre QCD</h5>
                    <h6>Qualité</h6>
                    <p v-for="item in qualities">
                        {{ item.objectives }}
                    </p>
                    <h6>Coût</h6>
                    <p v-for="item in costs">
                        {{ item.objectives }}
                    </p>
                    <h6>délais</h6>
                    <p v-for="item in delays">
                        {{ item.objectives }}
                    </p>
                </div><br>
                <div class="objectif_intermediaires">
                    <h5>IV-Listes des actions</h5>
                    <h6>Liste des actions (classé par priorité) :</h6>
                    <p v-for="item in tasklist">
                        {{ item.tasklists }}
                    </p>
                </div>
                <div class="mesure_suivi">
                    <h5>V-Réseau d’acteur</h5>
                    <div class=" pluslists">
                        <p v-for="item in  pluslists" >
                        {{ item.sigle }}={{ item.signification }},
                        </p>
                    </div>
                </div>
                <div class="reseau_acteur">
                <table>
                <thead>
                    <tr>
                    <th>Actions</th>
                    <th v-for="( actor, actorIndex) in  humanresources" :key="actorIndex">{{ actor.firstname }} {{ actor.lastname }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(task, taskIndex) in tasklist" :key="taskIndex">
                        <td>{{ task.tasklists }}</td>
                        <td v-for="(actor, actorIndex) in humanresources" :key="actorIndex">
                            <select :class="{'select-disabled': selectedTasks[actor.id + '-' + task.id] }"
                                 v-model="selectedTasks[actor.id + '-' + task.id]"
                                 @change=" fetchRAChoice(actor.id,task.id)" id="select1">
                                <option v-for="(option, optionIndex) in pluslists" :key="optionIndex">{{ option.sigle}}</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
                </table>
                </div><br>
                <h5>VI-Tableau d’action</h5>
                <div class="qqocq">
                    <p>Roadmap du cycle ou feuille de route:</p>
                    <b>Q.Q.O.Q.C.P.C(Qui, Quoi, Où, Quand, Comment, Pourquoi, Combien).</b>
                </div><br>
                <div class="tableau_action">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Quoi</th>
                                <th>Qui</th>
                                <th>Où</th>
                                <th>Quand</th>
                                <th>Comment</th>
                                <th>Pourquoi</th>
                                <th>Combien</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(task, taskId) in tasklist">
                                <td>{{ task.tasklists }}</td>
                                <td>
                                    <select :class="{'select-disabled': selectActor[taskId]}" class="select2" 
                                        name="tableau_action" v-model="selectActor[task.id+'-'+'qui']" @change="fetchTASelect(task.id,'qui')">
                                       <option v-for="(item, humanId) in  humanresources":key="humanId">
                                            {{ item.firstname }} {{item.lastname}}
                                       </option>
                                    </select>
                                </td>
                                <td id="ou">
                                    <textarea id="area"  rows="2" class="textarea ou" @change=" fetchTA('ou', task.id); autoResize()" v-model="action[task.id+'-'+'ou']"></textarea>
                                </td>
                                <td id="quand">
                                        Du<input type="date" class="inputdate" required v-model="action[task.id+'-'+'quandD']"  @change=" fetchTA('quandD', task.id)">au
                                        <input type="date" class="inputdate"required v-model="action[task.id+'-'+'quandF']"  @change=" fetchTA('quandF', task.id)">                                  
                                </td>
                                <td>
                                    <textarea id="area" rows="2" class="textarea comment"  @change=" fetchTA('comment', task.id)" v-model="action[task.id+'-'+'comment']"></textarea>
                                </td>
                                <td>
                                    <textarea id="area" rows="2" class="textarea pourquoi"  @change=" fetchTA('pourquoi', task.id)" v-model="action[task.id+'-'+'pourquoi']"></textarea>
                                </td>
                                <td>
                                    <textarea id="area" rows="2" class="textarea combien" @change=" fetchTA('combien', task.id)" v-model="action[task.id+'-'+'combien']"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><br>
                <h5>VI-Tableau de priorité</h5>
                <div class="tableau_priorité">
                <table class="table3">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Actions</th>
                            <th>Urgent</th>
                            <th>Important</th>
                            <th>Priorité</th>
                            <th>Statut</th>
                            <th>Délai</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="(task, taskId) in tasklist":key="taskId">
                            <td>{{taskId+1}}</td>
                            <td >
                                {{ task.tasklists }}
                            </td>
                            <td>
                                <select class="select2" id="" @change= "fetchTP('urgent',task.id)" v-model="selectoption ['urgent'+'-'+task.id]">
                                    <option v-for="option in options" :value="option.value">
                                        {{ option.label }}
                                    </option>
                                </select>
                            </td>
                            <td> 
                                <select class="select2" id="" @change= "fetchTP('important',task.id)" v-model="selectoption ['important'+'-'+task.id]">
                                    <option v-for="option in options2" :value="option.value2">
                                        {{ option }}
                                    </option>
                                </select>
                            </td>
                            <td>
                                
                            </td>
                            <td>
                                
                            </td>
                            <td class="fr">
                              <input type="date" class="inputdate"  @change= "fetchTP('delai',task.id)" v-model="selectoption ['delai'+'-'+task.id]">  
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div><br><br>
                <h5>VII-Planning ou le chronogramme des tâches</h5><br>
                <div>
                    <div id="chart">
                        <apexchart type="rangeBar" height="350" :options="chartOptions" :series="series"></apexchart>
                    </div>
                </div>
            </div>

            
        </div>
   </div>
</template>

<script>
import axios from 'axios';
   export default{
    props:['id_projet'],
    data(){
        return{
            projectnames:'',
            mainobjectives:'',
            specificobjectives:'',
            qualities:'',
            costs:'',
            delays:'',
            tasklist:'',
            pluslists:'',
            humanresources:'',
            selectedTasks:{},
            selectActor:{},
            actorId:'',
            taskId:'',
            action:{},
            selectoption:{},
            actor:{},
            quandD:'',
            quandF:'',
            quoi:'',


            
          series: [
            {
              data: [
                {
                  x: 'Code',
                  y: [
                    new Date('2019-03-02').getTime(),
                    new Date('2019-03-04').getTime()
                  ]
                },
                {
                  x: 'Test',
                  y: [
                    new Date('2019-03-04').getTime(),
                    new Date('2019-03-08').getTime()
                  ]
                },
                {
                  x: 'Validation',
                  y: [
                    new Date('2019-03-08').getTime(),
                    new Date('2019-03-12').getTime()
                  ]
                },
                {
                  x: 'Deployment',
                  y: [
                    new Date('2019-03-12').getTime(),
                    new Date('2019-03-18').getTime()
                  ]
                }
              ]
            }
          ],
          chartOptions: {
            chart: {
              height: 350,
              type: 'rangeBar'
            },
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            xaxis: {
              type: 'datetime'
            }
          },


            options: [
                { label: 'urgent', value: 'X' },
                { label: 'Pas urgent', value: ' ' },
            ],
            options2: [
                { label: 'important', value2: 'X' },
                { label: 'Pas important', value2: ' ' },
            ],
        }
    },
    mounted(){
        this.readProjectName();
        this. readMainObjective();
        this.readSpecificObjective();
        this.readQualityObjective();
        this.readCostObjective();
        this.readDelayObjective();
        this.readTaskList();
        this.readPlusList();
        this.initSelectedTasks();
        this.readhumanresource();
        this.readRAChoice();
        this.readTASelect();
        this. readTA();
        this. readTP();
        this. readApex();
       
    },
    methods:{
        readProjectName(){
                var data= new FormData();
                data.append('id_projet', this.id_projet);
                axios({
                    method:'POST',
                    url: 'http://localhost/planaction/projectinfo.php?action=read_projectname',
                    data:data
                })
                .then((response)=>{
                    this.projectnames = response.data;
                }).catch((error)=>{
                    console.log(error)
                })
            },
            
            readMainObjective(){
                var data= new FormData();
                data.append("id_projet", this.id_projet);
                data.append("types", 'mainobjective');
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read_mainobjective',
                    data: data
                })
                .then((response)=>{
                    this.mainobjectives= response.data
                }).catch((error)=>{
                    console.log(error)
                })
            },
            readSpecificObjective(){
                var data= new FormData();
                data.append("id_projet", this.id_projet);
                 axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read_specificobjective',
                    data: data
                })
                .then((response)=>{
                    this.specificobjectives= response.data;
                }).catch((error)=>{
                    console.log(error)
                })
            },
            readQualityObjective(){
                var data= new FormData();
                data.append("id_projet", this.id_projet);
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read_qualityobjective',
                    data: data
                })
                .then((response)=>{
                    this.qualities=response.data;
                }).catch((error)=>{
                    console.log(error)
                })
            },
            readCostObjective(){
                var data= new FormData();
                data.append("id_projet", this.id_projet);
                 axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read_costobjective',
                    data: data
                })
                .then((response)=>{
                    this.costs=response.data;
                }).catch((error)=>{
                    console.log(error)
                })
            },
            readDelayObjective(){
                var data= new FormData();
                data.append("id_projet", this.id_projet);
                 axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read_delayobjective',
                    data: data
                })
                .then((response)=>{
                    this.delays=response.data;
                }).catch((error)=>{
                    console.log(error)
                })
            },
            readTaskList(){
                var data= new FormData();
                data.append("id_projet", this.id_projet);
                 axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read-tasklist',
                    data: data
                })
                .then((response)=>{
                    this.tasklist=response.data;
                }).catch((error)=>{
                    console.log(error)
                })
            },
            readPlusList(){
                var data= new FormData();
                data.append('id_projet', this.id_projet);
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read-plus',
                    data: data
                })
                .then((response)=>{
                    this.pluslists=response.data;
                }).catch((error)=>{
                    console.log(error)
                })
            },
            readhumanresource(){
                  var data= new FormData();
                data.append("id_projet", this.id_projet);
                 axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read-humanresource',
                    data: data
                })
                .then((response)=>{
                    this.humanresources=response.data;
                }).catch((error)=>{
                    console.log(error)
                })
            },
            initSelectedTasks() {
                // Initialiser selectedTasks avec des tableaux vides pour chaque combinaison d'acteur et de tâche
                this.selectedTasks = Array.from({ length: this.humanresources.length }, () =>
                    Array.from({ length: this.tasklist.length }, () => '')
                );
            },
            fetchRAChoice(actorId , taskId){
                var data= new FormData();
                data.append('id_projet', this.id_projet);
                data.append('id_a', actorId);
                data.append('id_t',taskId);
                data.append('choice',this.selectedTasks[actorId+'-'+taskId])
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=create_saveplus',
                    data:data
                }).then((response)=>{
                    this. readRAChoice();
                }).catch((error)=>{
                    console.log(error)
                })

            },
            readRAChoice(){
                var data= new FormData();
                 data.append('id_p', this.id_projet);
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read_saveplus',
                    data:data
                }).then((response)=>{  
                    response.data.forEach(item => {
                        var actorId= item.id_actor;
                        var taskId= item.id_task;
                        var choice= item.choice;
                        // console.log(taskId);console.log(actorId);console.log(choice);
                        this.selectedTasks[actorId+'-'+taskId]=choice;
                    });
                    
                }).catch((error)=>{
                    console.log(error)
                })

            },
            fetchTASelect(taskId, id){
                var data= new FormData();
                data.append('id_projet', this.id_projet);
                data.append('id_t',taskId);
                data.append('value',this.selectActor[taskId+'-'+'qui'])
                data.append('qqoqcpc', id)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=create_tableauaction',
                    data:data
                }).then((response)=>{
                    this.readTASelect();
                }).catch((error)=>{
                    console.log(error)
                })

            },
            readTASelect(){
                var data= new FormData();
                 data.append('id_p', this.id_projet);
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read_tableauaction',
                    data:data
                }).then((response)=>{  
                    response.data.forEach(item=>{
                        var taskId= item.id_task;
                        var value= item.value;
                        var id= item.qqoqcpc;
                        this.selectActor[taskId+'-'+id]=value;
                    })
                    
                }).catch((error)=>{
                    console.log(error)
                })

            },
            fetchTA(id, taskId){
                var data= new FormData();
                data.append('id_projet', this.id_projet);
                data.append('id_t',taskId);
                data.append('value',this.action[taskId+'-'+id])
                data.append('qqoqcpc',id);
                
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=create_tableauaction',
                    data:data
                }).then((response)=>{
                    this. readTA();
                }).catch((error)=>{
                    console.log(error)
                })

            },
            readTA(){
                var data= new FormData();
                 data.append('id_p', this.id_projet);
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read_tableauaction',
                    data:data
                }).then((response)=>{
                    console.log(response.data);  
                    response.data.forEach(item=>{
                        var taskId= item.id_task;
                        var value= item.value;
                        var id= item.qqoqcpc;
                        this.action[taskId+'-'+id]=value;
                        
                    })
                    
                }).catch((error)=>{
                    console.log(error)
                })

            },
            autoResize(id, taskId) {
            // Récupérer l'élément textarea
            const textarea = document.getElementById('area')
            // Ajuster la hauteur
            textarea.style.height = 'auto';
            textarea.style.height = (textarea.scrollHeight) + 'px';
            },
            fetchTP(id, taskId){
                console.log(this.selectoption [id+'-'+taskId]);
                var data= new FormData();
                data.append('id_projet', this.id_projet);
                data.append('task_id',taskId);
                data.append('value',this.selectoption [id+'-'+taskId]);
                data.append('action',id);
                data.append('delai',id);
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=create_priorite',
                    data:data
                }).then((response)=>{
                    console.log(response.data);
                    this. readTP();
                }).catch((error)=>{
                    console.log(error)
                })

            },
            readTP(){
                var data= new FormData();
                 data.append('id_p', this.id_projet);
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read_priorite',
                    data:data
                }).then((response)=>{  
                        response.data.forEach(item=>{
                            var value= item.value;
                            var id= item.action;
                            var taskId= item.task_id;
                            this.selectoption [id+'-'+taskId]=value;
                        })
                }).catch((error)=>{
                    console.log(error)
                })

            },
            readApex(){
                var data= new FormData();
                 data.append('id_p', this.id_projet);
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read_apexresource',
                    data:data
                }).then((response)=>{  
                        console.log(response.data)
                }).catch((error)=>{
                    console.log(error)
                })
            },
            }   
   }
</script>
<style scoped>
    .card{
        width: 1110px!important;
        margin-left: 60px;
    }
    .card-body h1{
        text-align: center;
    }
    .container{
        margin-top: 100px;
    }
    h6{
        margin-left:25px;
    }
    p, b{
        margin-left:50px;
    }
    .pluslists{
        display: flex;
    }
    th, td {
            border: 1px solid #2c2b2b;
            text-align: left;
        }
    table{
        width: 800px!important;
    }
    .table3{
        width: 990px!important;
    }
    .textarea{
        border: none;
        width: 130px;
        outline:none;
        height: auto;
    }
    #select1{
        border: none;
        opacity: 0.8;
        width: 60px;
        margin-left: 20px;
    }
    .select2{
        border: none;
        opacity: 0.8;
        width: auto;
        outline:none;
    }
    .reseau_acteur, .tableau_action, .tableau_priorité{
        margin-left: 50px!important;
    }
    .select-disabled {
    -webkit-appearance: none;
    -moz-appearance: none;
     appearance: none; 
       
    }
    .textarea {
    resize: none; /* Empêche le redimensionnement du textarea par l'utilisateur */
    overflow: hidden; /* Cache la barre de défilement */
    height: auto;
    }
    .inputdate{
        border: none;
        outline:none;
    }
    
   
</style>
