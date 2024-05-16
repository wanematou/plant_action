<template>
    <main>
        <div class="container">
                <div class="Pname">                   
                        <h4 v-for=" (item,id) in projectnames">
                            <button @click="modifyProjectname(id)" class="button">{{ item.projectname }}</button>
                        </h4>   
                </div> 
                <div class="card" style="width: 800px;" v-if="projectnames.length<1||projectNameForm">
                    <div class="card-body">
                        <form id="projectgeneralinformation" @submit.prevent="sendProjectNameForm">
                        <div class="mb-3 row">
                            <label for="projectName" class="col-sm-2 col-form-label">Nom du projet</label>
                            <div class="col-sm-7 d-flex">
                            <input type="text" name="projectName" class="form-control" id="projectName" aria-describedby="projectNameHelp" v-model="projectname">
                            </div>
                            <div class="col-sm-2 d-flex">
                            <button type="submit" v-if="ajoutT" class="btn btn-dark" :disabled="projectnames.length >=1">Entrer</button>
                            <button type="button" class="btn btn-dark" @click="sendFormupdate()" v-if="modificationT">Modifier</button>
                            </div>
                        </div>                    
                        </form>
                    </div>
                </div><br>
                <div class="objectifP">
                    <h5>Objectif principal:</h5>
                    <div class="card" v-if="mainobjectives.length<1 || mainObjectiveForm"  style="width: 800px;" >
                    <div class="card-body " >
                        <form  id="mainobjectiveform" @submit.prevent="sendMainObjective">
                        <h6 class="objectivechoice">Veuillez  entrer votre objectif principal</h6>
                        <div class="mb-3 row" >
                            <label for="objective" class="col-sm-2 col-form-label">Objectif principal</label>
                            <div class="col-sm-7">
                            <textarea type="text"  rows="2" v-model="mainobjective" name="objective" id="mainobjective" class="form-control" aria-describedby="projectNameHelp"></textarea>
                            </div>
                            <div class="col-sm-2 align">
                                <button type="submit"  v-if="ajout1"class="btn btn-dark" >Entrer</button>
                                <button type="button" @click="sendUpdateMainObjective()" v-if="modification1"class="btn btn-dark">Modifier</button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div><br>
                    <p v-for="(item, id) in mainobjectives" :key="id" >
                    <button @click="modifyMainObjective(id)" class="button"><div class="item">{{ item.objectives }}</div></button>
                    </p>
                </div><br>       
                <div>
                    <div>
                         <h5>Objectifs intermédiaires ou jalons ou d’étapes :</h5><br>
                        <div class="card" style="width: 800px;">
                        <div class="card-body">
                            <form action=""  id="specificobjectiveform" @submit.prevent="sendSpecificObjective">
                            <h6 class="objectivechoice">Veuillez  entrer vos objectifs intermédiaires</h6><br>
                            <div class="mb-3 row">
                                    <label for="specificobjective" class="col-sm-2 col-form-label">Objectifs spécifiques</label>
                                    <div class="col-sm-7">
                                    <textarea type="text" rows="2" v-model="specificobjective" name="specificobjective" class="form-control" id="specificobjective" aria-describedby="projectNameHelp"></textarea>
                                    </div>
                                
                                <div class="col-sm-2 align">
                                    <button type="submit" v-if="ajout2" class="btn btn-dark">Entrer</button> 
                                    <button type="button" @click="sendSpecificUpdatemObjective()" v-if="modification2" class="btn btn-dark">Modifier</button>         
                                </div>
                            </div>
                            </form>
                        </div>
                        </div>  
                    </div><br> 
                    <div>
                        <h6>Tableau d'objectifs intermédiaires :</h6>
                        <el-table :data="filterTableData" style="width: 100%" class="table">
                        <el-table-column label="#" prop="id" />
                        <el-table-column label="Objectifs intermédiaires" prop="objectives" />
                        <el-table-column align="right">
                        <template #header>
                            <el-input v-model="search" size="small" placeholder="Type to search" />
                        </template>
                        <template #default="scope">
                            <el-button size="small" @click="modifySpecificObjective(scope.$id, scope.row)">
                            Edit
                            </el-button>
                            <el-button
                            size="small"
                            type="danger"
                            @click="deleteSpecificObjective(scope.$id, scope.row)"
                            >
                            Delete
                            </el-button>
                        </template>
                        </el-table-column>
                        </el-table class="table">
                    </div>
                </div><br><br><br>

                <h5>Equilibres Qualité, Coût et Délai</h5>  <br> <br>
                <div class="card" style="width: 800px;">
                    <div class="card-body" >
                        <h6>Veuillez selectionner et entrer vos équilibres qualité, coût et délai</h6><br>
                            <div class="checkbox">
                                <div>
                                    <label for="quality">Qualité</label>
                                    <input type="radio" class="radio" name="quality" value="qualite" v-model="qcdchoice" >
                                </div>

                                <div>
                                    <label for="quality">Coût</label>
                                    <input type="radio" class="radio" name="quality" v-model="qcdchoice" value="cout" >
                                </div>

                                <div>
                                    <label for="quality">Délai</label>
                                    <input type="radio" class="radio" name="quality" v-model="qcdchoice" value="delai">
                                </div>
                            </div> <br>
                            <form v-if="!qcdchoice|| qcdchoice=='qualite'" id="quality" @submit.prevent="createQualityObjective()">
                                <div class="mb-3 row">
                                    <label for="objective" class="col-sm-2 col-form-label">Objectifs Qualités</label>
                                    <div class="col-sm-7">
                                    <textarea type="text" name="quality" class="form-control" rows="3" v-model="quality"></textarea>
                                    </div>
                                                        
                                    <div class="col-sm-2">
                                        <button v-if="ajoutQ" type="submit" class="btn btn-dark entrer" >Entrer</button>
                                        <button v-if="modificationQ" type="button" @click="updateQualityObjective()" class="btn btn-primary">Modifier</button>
                                    </div>
                                </div>
                            </form>
                            <form v-if="qcdchoice=='cout'" id="cost" @submit.prevent="createCostObjective()">
                                <div class="mb-3 row">
                                    <label for="objective" class="col-sm-2 col-form-label">Objectifs coût</label>
                                    <div class="col-sm-7">
                                    <textarea type="text" name="cost" class="form-control" id="objective" rows="3" v-model="cost" ></textarea>
                                    </div>              
                                    <div class="col-sm-2">
                                        <button type="submit" class="btn btn-dark entrer" v-if="ajoutC">Entrer</button>
                                        <button type="button" @click="updateCostObjective()" class="btn btn-dark" v-if="modificationC">Modifier</button>
                                    </div>
                                </div>
                            </form>
                            <form  v-if="qcdchoice=='delai'" id="delay" @submit.prevent="createDelayObjective()">
                                <div class="mb-3 row">
                                    <label for="objective" class="col-sm-2 col-form-label">Objectifs délais </label>
                                    <div class="col-sm-7">
                                    <textarea type="text" name="delay" class="form-control" id="objective" rows="3" v-model="delay"></textarea>
                                    </div>  
                                    <div class="col-sm-2">
                                        <button type="submit" class="btn btn-dark entrer" v-if="ajoutD">Entrer</button>
                                        <button type="button" @click="updatedelayObjective()" class="btn btn-dark" v-if="modificationD">Modifier</button>
                                    </div>
                                </div>
                            </form>
                    </div>               
                </div><br><br>
                <div>
                    <h6>Tableau d'équilibre qualité :</h6>
                    <el-table :data="filterTableDataQ" style="width: 100%" class="table">
                    <el-table-column label="#" prop="id" />
                    <el-table-column label="Equilibre qualité" prop="objectives" />
                    <el-table-column align="right">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="modifyqualityobjective(scope.$id, scope.row)">
                        Edit
                        </el-button>
                        <el-button
                        size="small"
                        type="danger"
                        @click="deleteQualityObjective(scope.$id, scope.row)"
                        >
                        Delete
                        </el-button>
                    </template>
                    </el-table-column>
                    </el-table class="table">
                </div> <br><br><br>
                <div>
                <h6>Tableau d'équilibre coût :</h6>
                <el-table :data="filterTableDataC" style="width: 100%" class="table">
                <el-table-column label="#" prop="id" />
                <el-table-column label="Equilibre coût" prop="objectives" />
                <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                </template> 
                <template #default="scope">
                    <el-button size="small" @click="modifyCostobjective(scope.$id, scope.row)">
                    Edit
                    </el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click="deleteCostObjective(scope.$id, scope.row)"
                    >
                    Delete
                    </el-button>
                </template>
                </el-table-column>
                </el-table class="table">
            </div><br><br><br>
            <div>
                <h6>Tableau d'équilibre délais :</h6>
                <el-table :data="filterTableDataD" style="width: 100%" class="table">
                <el-table-column label="#" prop="id" />
                <el-table-column label="Equilibre délais" prop="objectives" />
                <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="modifydelayobjective(scope.$id, scope.row)">
                    Edit
                    </el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click=" deletedelayObjective(scope.$id, scope.row)"
                    >
                    Delete
                    </el-button>
                </template>
                </el-table-column>
                </el-table class="table">
            </div><br> <br>
            <h5>Liste des actions</h5> <br> <br>
            <div class="card" style="width: 800px;">
            <div class="card-body">
                <form id="task" @submit.prevent="fetchTaskList()">
                <div class="mb-3 row">
                    <label for="task" class="col-sm-2 col-form-label">Ajouter les tâches</label>
                    <div class="col-sm-7">
                    <textarea type="text" v-model="task" rows="3" name="task" class="form-control" id="task" aria-describedby="projectNameHelp"></textarea>
                    </div>
                    <div class="col-sm-2">
                        <button type="submit" class="btn btn-dark entrer" v-if="ajout" >Entrer</button>
                    <button type="button" @click="updateTaskList()"class="btn btn-dark"  v-if="modification">Modifier</button>
                    </div>
                </div>
                </form>          
            </div>
            </div><br>
            <h6>Tableau des actions</h6><br>
            <el-table :data="filterTableDataT" style="width: 100%" class="table">
            <el-table-column label="Date" prop="id" />
            <el-table-column label="Name" prop="tasklists" />
            <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
                <el-button size="small" @click="modifyTaskList(scope.$id, scope.row)">
                Edit
                </el-button>
                <el-button
                size="small"
                type="danger"
                @click=" deleteTaskList(scope.$id, scope.row)"
                >
                Delete
                </el-button>
            </template>
            </el-table-column>
            </el-table class="table"><br><br><br>
            <h5>Réseau d’acteur</h5><br><br>
            <div class="card" style="width: 800px;">
            <div class="card-body">
            <form  id="human" @submit.prevent="fetchhumanresource()">
                <div class="mb-3">
                <div>
                    <label for="name" class="form-label">Nom</label>
                    <input type="text" v-model="last_name" name="last_name" id="#" class="form-control">
                    <label for="first_name" class="form-label">Prenom</label>
                    <input type="text" v-model="first_name" id="#"  name="first_name" class="form-control">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" v-model="email" name="email" id="#" class="form-control">
                    <label for="phone_number" class="form-label">Telephone</label>
                    <input type="tel" id="#" v-model="tel" class="form-control" name="tel" >
                </div>
                </div>
                <button type="submit" class="btn btn-dark" v-if="ajoutH">Entrer</button>
                <button type="button" @click="updatehumanresource()"class="btn btn-dark" v-if="modificationH">Modifier</button>
            </form>
            </div>
        </div> <br><br><br><br>
        <h6>Tableau de ressource humaine</h6><br>
        <el-table :data="filterTableDataH" style="width: 100%">
            <el-table-column label="#" prop="id" />
            <el-table-column label="Nom" prop="lastname" />
            <el-table-column label="Prenom" prop="firstname" />
            <el-table-column label="Email" prop="email" />
            <el-table-column label="Telephone" prop="phonenumber" />
            <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
                <el-button size="small" @click="modifyhumanresource(scope.$id, scope.row)">
                Edit
                </el-button>
                <el-button
                size="small"
                type="danger"
                @click="deletehumanresource(scope.$id, scope.row)"
                >
                Delete
                </el-button>
            </template>
            </el-table-column>
        </el-table><br>
        </div>    
    </main>
</template>
<script>
    import axios from 'axios';
    import { ref, computed } from 'vue';
    export default{
        props: ['id_projet'],
        data(){
            return{
                specificobjective:'',
                mainobjective:'',
                mainobjectives:[],
                specificobjectives:[],
                modification1: false,
                modification2: false,
                ajout1:true,
                ajout2:true,
                id:"",
                mainObjectiveForm:false,
                projectNameForm:false,
                projectnames:"",
                projectname:"",
                modificationT: false,
                ajoutT:true,
                search: '',
                tableData: [],
                qcdchoice:'',
                quality:'',
                qualities:'',
                id:'',
                modificationQ:false,
                ajoutQ: true,
                cost:'',
                costs:'',
                modificationC:false,
                ajoutC: true,
                delay:'',
                delays:'',
                modificationD:false,
                ajoutD: true,
                tableDataQ: [],
                tableDataC: [],
                tableDataD: [],
                task:"",
                tasks:"",
                id:"",
                humanresources:"",
                modification:false,
                ajout:true,
                search: '',
                tableDataT: [],
                modificationH:false,
                ajoutH:true,
                first_name:"",
                last_name:"",
                email:"",
                tel:"",
                tableDataH:[],
                id_p:""
            }
        },
        computed: {
            filterTableData() {
            return this.tableData.filter(
                (data) =>
                !this.search || data.objectives.toLowerCase().includes(this.search.toLowerCase())
            );
            },
            filterTableDataQ() {
            return this.tableDataQ.filter(
                (data) =>
                !this.search || data.objectives.toLowerCase().includes(this.search.toLowerCase())
            );
            
            },
            filterTableDataC() {
            return this.tableDataC.filter(
                (data) =>
                !this.search || data.objectives.toLowerCase().includes(this.search.toLowerCase())
            );
            },
            filterTableDataD() {
            return this.tableDataD.filter(
                (data) =>
                !this.search || data.objectives.toLowerCase().includes(this.search.toLowerCase())
            );
            },
            filterTableDataT() {
            return this.tableDataT.filter(
                (data) =>
                !this.search || data.tasklists.toLowerCase().includes(this.search.toLowerCase())
            );
            },
            filterTableDataH() {
            return this.tableDataH.filter(
                (data) =>
                !this.search || data.humanresources.toLowerCase().includes(this.search.toLowerCase())
            );
            }
        },
        mounted(){
            this.readMainObjective(),
            this.readSpecificObjective(),
            this.readProjectName(),
            this.readQualityObjective();
            this.readCostObjective();
            this.readDelayObjective();
            this.readTaskList();
            this.readhumanresource()
        },
        methods:{
            sendProjectNameForm(){
                var projectdata= new FormData(document.getElementById("projectgeneralinformation"));
                axios({
                    method: 'POST',
                    url: 'http://localhost/planaction/projectinfo.php?action=create_projectname',
                    data: projectdata,
                })
                .then((response)=>{
                    this.id_p= response.data;
                    this.NavigateToObjective();
                    this.projectname="";  
                    this.readProjectName();       
               }
               ).catch(function(error){
                console.log(error)
               });
               
            },
            NavigateToObjective() {
                this.$router.push({ name: 'objective', params: { id_projet: this.id_p} });
            },
            readProjectName(){
                var data= new FormData();
                console.log(this.id_projet);
                data.append('id_projet', this.id_projet);
                data.append('id_p', this.id_p);
                axios({
                    method:'POST',
                    url: 'http://localhost/planaction/projectinfo.php?action=read_projectname',
                    data:data
                })
                .then((response)=>{
                    this.projectnames = response.data;
                    console.log(this.id_projet)
                }).catch((error)=>{
                    console.log(error)
                })
            },
            
            modifyProjectname(id) {
                this.projectname= this.projectnames[id].projectname,
                this.modificationT=true,
                this.ajoutT=false,
                this.projectNameForm=true
            },
            sendFormupdate(){
                var projectdata= new FormData(document.getElementById("projectgeneralinformation"));
                projectdata.append('id_projet', this.id_projet)
                console.log(projectdata);
                axios({
                    method: 'POST',
                    url: 'http://localhost/planaction/projectinfo.php?action=update_projectname',
                    data: projectdata,
                })
                .then((response)=>{
                    this.readProjectName();
                    this.projectname="";
                    this.modificationT= false;
                    this.ajoutT=true;
                    this.projectNameForm=false
                }
               ).catch(function(error){
                console.log(error)
               });
               
            },
           
            sendMainObjective(){
                var mainobjectivedata= new FormData(document.getElementById('mainobjectiveform'));
                mainobjectivedata.append("types",'mainobjective');
                mainobjectivedata.append("id_projet",this.id_projet)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=create_mainobjective',
                    data:mainobjectivedata
                })
                .then((response)=>{
                    this.readMainObjective(),
                    this.mainobjective="";
                }).catch((error)=>{
                    console.log(error)
                });
            },
              readMainObjective(){
                var data= new FormData();
                data.append("id_projet", this.id_projet);
                data.append("types", 'mainobjective');
                console.log(this.id_projet)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=read_mainobjective',
                    data: data
                })
                .then((response)=>{
                    this.mainobjectives= response.data
                    console.log(response.data)
                }).catch((error)=>{
                    console.log(error)
                })
            },
              modifyMainObjective(id){
                this.mainobjective=this.mainobjectives[id].objectives;
                this.id=this.mainobjectives[id].id;
                this.modification1=true;
                this.ajout1=false;
                this.mainObjectiveForm=true;
            },
              sendUpdateMainObjective(){
                var updatemainobjective= new FormData(document.getElementById('mainobjectiveform'));
                updatemainobjective.append("id", this.id)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=update_mainobjective',
                    data:updatemainobjective
                }).then((response)=>{
                    this.mainobjective="";
                    this.readMainObjective();
                    this.modification1= false;
                    this.ajout1=true;
                    this.mainObjectiveForm=false;
                }).catch((error)=>{
                    console.log(error)
                });
            },
            sendSpecificObjective(){
                var specificobjectivedata= new FormData(document.getElementById('specificobjectiveform'));
                specificobjectivedata.append("types", 'specificobjective');
                specificobjectivedata.append("id_projet", this.id_projet)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=create_specificobjective',
                    data:specificobjectivedata
                })
                .then((response)=>{
                    this.readSpecificObjective();
                    this.specificobjective="";
                }).catch((error)=>{
                    console.log(error)
                });
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
                    console.log(response.data);
                    this.specificobjectives= response.data;
                    this.tableData=response.data
                }).catch((error)=>{
                    console.log(error)
                })
            },
           
            modifySpecificObjective(id, row){
                this.specificobjective= row.objectives;
                this.id= row.id;
                this.modification2=true;
                this.ajout2=false;
            },
            sendSpecificUpdatemObjective(){
                console.log(this.specificobjective);
                var updatespecificobjective= new FormData();
                updatespecificobjective.append("id", this.id)
                updatespecificobjective.append("specificobjective", this.specificobjective)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=update_specificobjective',
                    data:updatespecificobjective
                }).then((response)=>{
                    this.readSpecificObjective();
                    this.specificobjective="";
                    this.modification2=false;
                    this.ajout2=true;
                }).catch((error)=>{
                    console.log(error)
                });
            },
            deleteSpecificObjective(id,row){
                var deleteform= new FormData();
                deleteform.append("id", row.id)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=delete_specificobjective',
                    data:deleteform
                }).then((response)=>{
                    this.readSpecificObjective();
                }).catch((error)=>{
                    console.log(error)
                });
                
            },
            createQualityObjective(){
                var data= new FormData(document.getElementById('quality'));
                data.append("types", 'qualityobjective')
                data.append("id_projet", this.id_projet)
                axios({
                    method: 'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=create_qualityobjective',
                    data:data
                })
                .then((response)=>{
                    this.readQualityObjective();
                    this.quality='';
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
                    console.log(response.data);
                    this.qualities=response.data;
                    this.tableDataQ=response.data
                }).catch((error)=>{
                    console.log(error)
                })
            },
            modifyqualityobjective(id,row){
                this.quality= row.objectives;
                this.id= row.id;
                this.modificationQ=true,
                this.ajoutQ= false,
                this.qcdchoice='qualite'
            },
            updateQualityObjective(){
                let data= new FormData();
                data.append("quality", this.quality);
                data.append("id", this.id)
                axios({
                    method: 'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=update_qualityobjective',
                    data: data
                })
                .then((response)=>{
                    this.readQualityObjective();
                    this.quality="";
                    this.modificationQ=false,
                    this.ajoutQ= true
                }).catch((error)=>{
                    console.log(error)
                })
            },
            deleteQualityObjective(id, row){
                let data= new FormData();
                data.append("id", row.id)
                axios({
                    method: 'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=delete_qualityobjective',
                    data: data
                })
                .then((response)=>{
                    this.readQualityObjective();
                }).catch((error)=>{
                    console.log(error)
                })
            },
            createCostObjective(){
                var data= new FormData(document.getElementById('cost'));
                data.append("types", 'costobjective');
                data.append("id_projet", this.id_projet)
                axios({
                    method: 'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=create_costobjective',
                    data:data
                })
                .then((response)=>{
                    this.readCostObjective();
                    this.cost='';
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
                    console.log(response.data)
                    this.costs=response.data;
                    this.tableDataC=response.data
                }).catch((error)=>{
                    console.log(error)
                })
            },
            modifyCostobjective( id, row){
                this.cost=row.objectives;
                this.qcdchoice='cout';
                this.id=row.id;
                this.modificationC=true,
                this.ajoutC=false
            },
            updateCostObjective(){
                let data= new FormData();
                data.append("cost", this.cost);
                data.append("id", this.id)
                axios({
                    method: 'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=update_costobjective',
                    data: data
                })
                .then((response)=>{
                    this.readCostObjective();
                    this.cost='';
                    this.modificationC=false,
                    this.ajoutC=true
                }).catch((error)=>{
                    console.log(error)
                })
            },
            deleteCostObjective(id, row){
                let data= new FormData();
                data.append("id", row.id)
                axios({
                    method: 'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=delete_costobjective',
                    data: data
                })
                .then((response)=>{
                    this.readCostObjective();
                }).catch((error)=>{
                    console.log(error)
                })
            },
            createDelayObjective(){
                var data= new FormData(document.getElementById('delay'));
                data.append("types", 'delayobjective');
                data.append("id_projet", this.id_projet)
                axios({
                    method: 'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=create_delayobjective',
                    data:data
                })
                .then((response)=>{
                    this.readDelayObjective();
                    this.delay='';
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
                    console.log(response.data)
                    this.delays=response.data;
                    this.tableDataD=response.data
                }).catch((error)=>{
                    console.log(error)
                })
            },
            modifydelayobjective(id, row){
                this.delay=row.objectives;
                this.qcdchoice='delai';
                this.id=row.id;
                this.modificationD=true,
                this.ajoutD= false
            },
            updatedelayObjective(){
                let data= new FormData();
                data.append("delay", this.delay);
                data.append("id", this.id)
                axios({
                    method: 'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=update_delayobjective',
                    data: data
                })
                .then((response)=>{
                    this.readDelayObjective();
                    this.delay='';
                    this.modificationD=false,
                    this.ajoutD= true
                }).catch((error)=>{
                    console.log(error)
                })
            },
            deletedelayObjective(id, row){
                let data= new FormData();
                data.append("id", row.id)
                axios({
                    method: 'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=delete_delayobjective',
                    data: data
                })
                .then((response)=>{
                    this.readDelayObjective();
                }).catch((error)=>{
                    console.log(error)
                })
            },
            fetchTaskList(){
                var data= new FormData(document.getElementById('task'));
                data.append("id_projet", this.id_projet)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=create-tasklist',
                    data: data
                })
                .then((response)=>{
                    this.readTaskList();
                    this.task="";
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
                    this.tableDataT=response.data;
                }).catch((error)=>{
                    console.log(error)
                })
            },
            modifyTaskList(id, row){
                this.task= row.tasklists;
                this.id=row.id;
                this.modification=true;
                this.ajout=false
            },
            updateTaskList(){
                var data= new FormData();
                data.append("task", this.task);
                data.append("id", this.id)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=update_tasklist',
                    data: data
                })
                .then((response)=>{
                    this.readTaskList();
                    this.task="";
                    this.modification=false;
                    this.ajout=true
                }).catch((error)=>{
                    console.log(error)
                })

            },
            deleteTaskList(id, row){
                var data= new FormData();
                data.append("id", row.id)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=delete_tasklist',
                    data: data
                })
                .then((response)=>{
                    this.readTaskList();
                }).catch((error)=>{
                    console.log(error)
                })

            },
            fetchhumanresource(){
                var data= new FormData(document.getElementById('human'));
                data.append("types",'humanresource');
                data.append("id_projet", this.id_projet)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=create-humanresource',
                    data:data
                })
                .then((response)=>{
                    this.readhumanresource(),
                    this.first_name="",
                    this.last_name="",
                    this.email="";
                    this.tel=""
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
                    this.tableDataH=response.data;
                    this.humanresources=response.data;
                }).catch((error)=>{
                    console.log(error)
                })
            },
            modifyhumanresource(id, row){
                console.log(row),
                console.log(row.lastname),
                this.first_name=row.firstname,
                this.last_name=row.lastname,
                this.email=row.email,
                this.tel=row.phonenumber,
                this.id= row.id,
                this.modificationH=true,
                this.ajoutH=false
               
            },
            updatehumanresource(){
                var data= new FormData( document.getElementById('human'));
                data.append("id", this.id)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=update_humanresource',
                    data: data
                })
                .then((response)=>{
                    this.readhumanresource();
                    this.first_name="",
                    this.last_name="",
                    this.email="",
                    this.tel="",
                    this.modificationH=false;
                    this.ajoutH=true
                }).catch((error)=>{
                    console.log(error)
                })

            },
            deletehumanresource(id, row){
                var data= new FormData();
                data.append("id", row.id)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=delete_humanresource',
                    data: data
                })
                .then((response)=>{
                    this.readhumanresource();
                }).catch((error)=>{
                    console.log(error)
                })
            },
        }
    }

    
</script>
<style scoped>
  
    .container{
      margin-top: 120px;
      margin-left: 40px;
    }
    .card{
        margin-left: 150px;
    }
    .align{
        margin-top: 30px;
    }
    .objectifP{
        margin-left: 20px;
    }
    .Pname{
        text-align: center;
    }
    .button{
        border-style: none;
        background-color: white;
    }
    .checkbox{
        display: flex;
        gap: 15px;
    }
    .entrer{
        margin-top: 30px;
    }
    .radio{
        margin-left: 5px;
    }
    .table {
        z-index: 1!important;
    }
    

    

</style>