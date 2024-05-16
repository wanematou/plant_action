import {defineStore} from 'pinia'
import axios from 'axios'
export const useProjectStore = defineStore('infoproject',{
    state:()=>{
        return{
            projectnames :"",
        }
    },
action:{ 
    readProjectName(){
        axios.post('http://localhost/planaction/projectinfo.php?action=read_projectname')
        .then((response)=>{
            console.log(response.data)
            this.projectnames = response.data
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
}
})