<template>
    <main>
        <div class="container">
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
                <el-table :data="filterTableData" style="width: 100%">
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
                </el-table>
            </div> <br><br><br>
            <div>
                <h6>Tableau d'équilibre coût :</h6>
                <el-table :data="filterTableDataC" style="width: 100%">
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
                </el-table>
            </div><br><br><br>
            <div>
                <h6>Tableau d'équilibre délais :</h6>
                <el-table :data="filterTableDataD" style="width: 100%">
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
                </el-table>
            </div>

        </div>
    </main>
</template>
<script>
import axios from 'axios';

    export default{
        data(){
            return{
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
                search: '',
                tableData: [],
                tableDataC: [],
                tableDataD: []
            }
        },
        computed: {
            filterTableData() {
            return this.tableData.filter(
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
            
            }
        },
        mounted(){
            this.readQualityObjective();
            this.readCostObjective();
            this.readDelayObjective();
        },
        methods:{
            createQualityObjective(){
                var data= new FormData(document.getElementById('quality'));
                data.append("types", 'qualityobjective')
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
                axios.post('http://localhost/planaction/projectinfo.php?action=read_qualityobjective')
                .then((response)=>{
                    console.log(response.data);
                    this.qualities=response.data;
                    this.tableData=response.data
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
                data.append("types", 'costobjective')
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
                axios.post('http://localhost/planaction/projectinfo.php?action=read_costobjective')
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
                data.append("types", 'delayobjective')
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
                axios.post('http://localhost/planaction/projectinfo.php?action=read_delayobjective')
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
            
        }
    }
</script>
<style scoped>
    .checkbox{
        display: flex;
        gap: 15px;
    }

    button{
        border-style: none;
        margin-left: 10px;
    }
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
    .radio{
        margin-left: 5px;
    }




</style>