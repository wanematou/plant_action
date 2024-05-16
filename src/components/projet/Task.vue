<template>
    <main>
        <div class="container">
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
        <el-table :data="filterTableData" style="width: 100%">
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
            </el-table><br><br><br>
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
        </div> <br><br>
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
        </el-table><br><br><br>
        </div>
    </main>
</template>
<script>
import axios from 'axios';

    export default{
        data(){
            return{
                task:"",
                tasks:"",
                id:"",
                modification:false,
                ajout:true,
                search: '',
                tableData: [],
                modificationH:false,
                ajoutH:true,
                first_name:"",
                last_name:"",
                email:"",
                tel:"",
                tableDataH:[]
            }
        },
        computed: {
            filterTableData() {
            return this.tableData.filter(
                (data) =>
                !this.search || data.tasklists.toLowerCase().includes(this.search.toLowerCase())
            );
            },
            filterTableDataH() {
            return this.tableDataH.filter(
                (data) =>
                !this.search || data.tasklists.toLowerCase().includes(this.search.toLowerCase())
            );
            }
        },
        mounted(){
            this.readTaskList(),
            this.readhumanresource()
        },
        methods:{
            fetchTaskList(){
                var data= document.getElementById('task');
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
                axios.post('http://localhost/planaction/projectinfo.php?action=read-tasklist')
                .then((response)=>{
                    this.tableData=response.data;
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
                data.append("types",'humanresource')
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
                axios.post('http://localhost/planaction/projectinfo.php?action=read-humanresource')
                .then((response)=>{
                    this.tableDataH=response.data;
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
    .entrer{
        margin-top: 30px;
    }

</style>