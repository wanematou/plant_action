<template>
        <Dashboardnave/>
        <div class="container">
        <div class="card">
            <router-link to="projectRouter/:id_projet/title" class="text-decoration-none" >
            <div class="card-body ">
                <p class="text-dark">Créer un nouveau</p>
                <div class="plus text-dark">
                    <i class="bi bi-plus-lg"></i>
                </div>
            </div>
            </router-link>
        </div>
        <div class="card" v-for="(item,id) in projectnames":key="1">
            <router-link :to="{ name: 'objective', params: { id_projet: item.id }}" class="text-decoration-none" >
            <div class="card-body">
               <p class="projectname"> {{item.projectname}}</p>
            </div>
            </router-link>
        </div> 
        </div>
</template>
<script>
    import Dashboardnave from '../dashnavebar.vue'
    import axios from 'axios'
    export default{
        components:{Dashboardnave},
        data(){
            return{
                projectnames:"",
            }
        },
        mounted(){
            this. readProjectName()
        },
        methods:{
            readProjectName(){
                    axios.post('http://localhost/planaction/projectinfo.php?action=read_projectnames')
                    .then((response)=>{
                        this.projectnames = response.data;
                        console.log(this.projectnames)
                    }).catch((error)=>{
                        console.log(error)
                    })
                }
        }
    }

</script>
<style scoped>
.plus{
    margin-left: 50px;
}
.card{
    height: 350px;
    width: 250px;      
}
.card-body{
    margin-top: 100px;
    margin-left: 20px;
    height: 240px!important;
}
.container{
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 colonnes de largeur égale */
    gap: 20px; 
    margin-top: 150px;
    margin-left: 50px;

}
.projectname{
    text-align: center;
    font-size: 13px;
}

</style>