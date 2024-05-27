<template>
        <Dashboardnave/>
        <div class="container">
        <div class="card">
            <router-link to="projectRouter/:id_projet/title" class="text-decoration-none">
            <div class="card-body ">
                <p class="text-dark">Créer un nouveau</p>
                <div class="plus text-dark">
                    <i class="bi bi-plus-lg"></i>
                </div>
            </div>
            </router-link>
        </div>
        <div class="card" v-for="(item,id) in projectnames":key="1">
            <div class="card-body">
               <p class="projectname"> {{item.projectname}}</p>
               <div class="dropdown">
                    <button class="dropbtn">⋮</button>
                    <div class="dropdown-content">
                        <router-link :to="{ name: 'objective', params: { id_projet: item.id }}" class="text-decoration-none" id="router">Modifier</router-link> 
                        <button onclick="option2()">Supprimer</button>
                        <button onclick="option3()">Telecharger</button>
                    </div>
                </div>
            </div>
      
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
.dropdown {
    position: relative;
    display: inline-block;
    left: 175px;
    bottom: 150px;
}

.dropbtn {
    background-color: #fafcfd;
    color: rgb(3, 0, 0);
    padding: 10px;
    font-size: 25px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2)!important;
    z-index: 1;
}

.dropdown-content button {
    background-color: white;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    border: none;
    text-align: left;
    width: 100%;
}
.dropdown-content #router{
    background-color: white;
    color: rgb(7, 7, 7);
    padding: 12px 16px;
    font-weight: normal!important;
    text-decoration: none;
    display: block;
    border: none;
    text-align: left;
    width: 100%;
}

.dropdown-content button:hover {
    background-color: #f1f1f1;
}
.dropdown-content #router:hover {
    background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropbtn {
    background-color: #f8f8f8;
}


</style>