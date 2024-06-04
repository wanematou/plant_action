<template>
     <div class="selectV">
        <multiselect v-model="value" tag-placeholder="" @update="getSelectedNames()" placeholder="Ajouter un acteur"
            label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag">
        </multiselect>
        <p>{{ getSelectedNames().join(', ') }}</p>
        
    </div> 

    
</template>

<script>
import Multiselect from 'vue-multiselect'

 export default {
     components: {
         Multiselect
     },
     data() {
         return {
             value: [
                
             ],
             options: [
                 { name: 'Vue.js', code: 'vu' },
                 { name: 'Javascript', code: 'js' },
                 { name: 'Open Source', code: 'os' }
             ]
         }
     },
     mounted(){
        this. getS()
     },
     methods: {
         addTag(newTag) {
             const tag = {
                 name: newTag,
                 code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
             }
             this.options.push(tag)
             this.value.push(tag)
         },
         getSelectedNames(){
            return this.value? this.value.map(actor => actor.name) : []; 
         },
         getS(){
            console.log(this.getSelectedNames().join(', '))
         }
        
     }
 }
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
 .selectV{
        margin-top: 200px;
    }
</style>