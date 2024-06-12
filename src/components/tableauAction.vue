<template>
    <div class="tablecontainer">
                <table>
                    <thead>
                        <tr>
                            <th>Quoi</th>
                            <th>Qui</th>
                            <th>Où</th>
                            <th>Quand</th>
                            <th>Comment</th>
                            <th>Pourquoi</th>
                            <th>Combien</th>
                            <th>Action</th>
                            <th>Notifications</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(task, taskId) in tasks">
                            <td>{{ task.tasklists }}</td>
                            <td >
                                <span>{{ selectActor[task.id] }}</span>
                                <div>
                                    <multiselect v-model="value[task.id]" tag-placeholder="" 
                                    placeholder="Ajouter un acteur"  label="name"
                                    track-by="code" :options="options" :multiple="true">
                                    </multiselect>
                                </div>
                            </td>
                            <td id="ou">
                               <span>{{selectOuS[task.id]}}</span>
                                <input v-model="selectOu[task.id]"></input>                              
                            </td>
                            <td id="quand">
                                Du <input type="date"  required v-model="selectquandD[task.id]"
                                    @change=" "><br>
                                Au <input type="date"  required v-model="selectquandF[task.id]"
                                    @change="">
                            </td>
                            <td>
                                <span>{{selectcommentt[task.id]}}</span>
                                <input v-model="selectcomment[task.id]"></input>
                                
                            </td>
                            <td>
                                <span >{{selectpourquoii[task.id]}}</span>
                                <input v-model="selectpourquoi[task.id]"></input>
                                
                            </td>
                            <td>
                                <span >{{selectcombienn[task.id]}}</span>
                                <inpu v-model="selectcombien[task.id]"></inpu>
                            </td>
                            <td>
                                <div class="btnbtn">
                                    <button  type="button" class="btn btn-outline-success btn-sm mb-2">Enregistrer</button>
                                    <button  type="button" class="btn btn-outline-success btn-sm mb-2">Enregistrer la modification</button>
                                    <button  type="button" class="btn btn-outline-primary btn-sm mb-2">Modifier</button>
                                </div>
                            </td>
                            <td >
                                <div class="btnbtnn">
                                    <button @click="sendMail(task.id)" type="button" class="btn btn-outline-info btn-sm mb-2">Notifier</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div><br>
        
</template>