<template>
    <main>       
        <div class="container">
        <h5>Ajouter une mesure de suivi</h5>
        <div class="card" style="width: 800px;">
            <div class="card-body">
                <form class="plus" @submit.prevent="fetchPlusList()" id="plus">
                    <label for="name" class="form-label">Signification</label>
                    <input type="text" v-model="signification" name="signification" id="#" class="form-control">
                    <label for="acronym" class="form-label">Sigle</label>
                    <input type="text" v-model="sigle" id="#"  name="sigle" class="form-control" oninput="this.value=this.value.toUpperCase()"><br>
                    <button type="submit"  v-if="ajout"  class="btn btn-dark">Entrer</button>
                    <button type="button" v-if="modification" @click="updatePlusList()" class="btn btn-dark">Modifier</button>
                </form>
            </div>               
        </div><br><br>
        <h6>liste des mesures de suivis</h6>
        <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="#" prop="id" />
        <el-table-column label="Sigle" prop="sigle" />
        <el-table-column label="Signification" prop="signification" />
        <el-table-column align="right">
        <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
            <el-button size="small" @click="modifyPlusList(scope.$id, scope.row)">
            Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="deletePlusList(scope.$id, scope.row)"
        >
          Delete
        </el-button>
        </template>
        </el-table-column>
        </el-table>
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
                sigle:"",
                items:"",
                signification:"",
                id:"",
                tasklists:"",
                modification:false,
                ajout:true,
                search: '',
                tableData: []
            }
        },
        computed: {
            filterTableData() {
            return this.tableData.filter(
                (data) =>
                !this.search || data.tasklists.toLowerCase().includes(this.search.toLowerCase())
            );
            },
        },
        mounted(){
            this.readPlusList()
        },
        methods:{
            fetchPlusList(){
                var data= new FormData(document.getElementById('plus'));
                data.append('id_projet', this.id_projet)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=create_plus',
                    data: data
                })
                .then((response)=>{
                    this.readPlusList();
                    this.signification="";
                    this.sigle="";
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
                    this.tasklists=response.data;
                    this.tableData=response.data;
                }).catch((error)=>{
                    console.log(error)
                })
            },
             modifyPlusList(id, row){
                this.sigle= row.sigle;
                this.signification= row.signification;
                this.id= row.id;
                this.modification=true;
                this.ajout=false;
                
            },
             updatePlusList(){
                var data= new FormData(document.getElementById('plus'));
                data.append("id", this.id)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=update_plus',
                    data: data
                })
                .then((response)=>{
                    console.log(response.data);
                    this.readPlusList();
                    this.sigle="";
                    this.signification="";
                    this.modification=false;
                    this.ajout=true
                }).catch((error)=>{
                    console.log(error)
                })

            },
            deletePlusList(id,row){
                var data= new FormData();
                data.append("id", row.id);
                data.append("id_projet", this.id_projet)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=delete_plus',
                    data: data
                })
                .then((response)=>{
                    this.readPlusList();
                }).catch((error)=>{
                    console.log(error)
                })

            },
        }
    }
</script>
<style scoped>
    .container{
        margin-left: 40px;
        margin-top: 100px;
    }
</style>    
    





