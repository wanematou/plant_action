<template>
    <main>
        <div class="container">
            <div class="Pname">
                <h4 v-for=" (item, id) in projectnames">
                    <button @click="modifyProjectname(id)" class="button">{{ item.projectname }}</button>
                </h4>
            </div>
            <div class="card" style="width: 800px;" v-if="projectnames.length < 1 || projectNameForm">
                <div class="card-body">
                    <form id="projectgeneralinformation" @submit.prevent="sendProjectNameForm">
                        <div class="mb-3 row">
                            <label for="projectName" class="col-sm-2 col-form-label">Nom du projet</label>
                            <div class="col-sm-7 d-flex">
                                <input type="text" name="projectName" class="form-control" id="projectName"
                                    aria-describedby="projectNameHelp" v-model="projectname">
                            </div>
                            <div class="col-sm-2 d-flex">
                                <button type="submit" v-if="ajoutT" class="btn btn-dark"
                                    :disabled="projectnames.length >= 1">Entrer</button>
                                <button type="button" class="btn btn-dark" @click="sendFormupdate()"
                                    v-if="modificationT">Modifier</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div><br>
            <div class="objectifP">
                <h5>Objectif principal:</h5>
                <div class="card" v-if="mainobjectives.length < 1 || mainObjectiveForm" style="width: 800px;">
                    <div class="card-body ">
                        <form id="mainobjectiveform" @submit.prevent="sendMainObjective">
                            <h6 class="objectivechoice">Veuillez entrer votre objectif principal</h6>
                            <div class="mb-3 row">
                                <label for="objective" class="col-sm-2 col-form-label">Objectif principal</label>
                                <div class="col-sm-7">
                                    <textarea type="text" rows="2" v-model="mainobjective" name="objective"
                                        id="mainobjective" class="form-control"
                                        aria-describedby="projectNameHelp"></textarea>
                                </div>
                                <div class="col-sm-2 align">
                                    <button type="submit" v-if="ajout1" class="btn btn-dark">Entrer</button>
                                    <button type="button" @click="sendUpdateMainObjective()" v-if="modification1"
                                        class="btn btn-dark">Modifier</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div><br>
                <p v-for="(item, id) in mainobjectives" :key="id">
                    <button @click="modifyMainObjective(id)" class="button">
                        <div class="item">{{ item.objectives }}</div>
                    </button>
                </p>
            </div><br>
            <div>
                <div>
                    <h5>Objectifs intermédiaires ou jalons ou d’étapes :</h5><br>
                    <div class="card" style="width: 800px;">
                        <div class="card-body">
                            <form action="" id="specificobjectiveform" @submit.prevent="sendSpecificObjective">
                                <h6 class="objectivechoice">Veuillez entrer vos objectifs intermédiaires</h6><br>
                                <div class="mb-3 row">
                                    <label for="specificobjective" class="col-sm-2 col-form-label">Objectifs
                                        spécifiques</label>
                                    <div class="col-sm-7">
                                        <textarea type="text" rows="2" v-model="specificobjective"
                                            name="specificobjective" class="form-control" id="specificobjective"
                                            aria-describedby="projectNameHelp"></textarea>
                                    </div>

                                    <div class="col-sm-2 align">
                                        <button type="submit" v-if="ajout2" class="btn btn-dark">Entrer</button>
                                        <button type="button" @click="sendSpecificUpdatemObjective()"
                                            v-if="modification2" class="btn btn-dark">Modifier</button>
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
                                    modifier
                                </el-button>
                                <el-button size="small" type="danger"
                                    @click="deleteSpecificObjective(scope.$id, scope.row)">
                                    supprimer
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table class="table">
                </div>
            </div><br><br><br>

            <h5>Equilibres Qualité, Coût et Délai</h5> <br> <br>
            <div class="card" style="width: 800px;">
                <div class="card-body">
                    <h6>Veuillez selectionner et entrer vos équilibres qualité, coût et délai</h6><br>
                    <div class="checkbox">
                        <div>
                            <label for="quality">Qualité</label>
                            <input type="radio" class="radio" name="quality" value="qualite" v-model="qcdchoice">
                        </div>

                        <div>
                            <label for="quality">Coût</label>
                            <input type="radio" class="radio" name="quality" v-model="qcdchoice" value="cout">
                        </div>

                        <div>
                            <label for="quality">Délai</label>
                            <input type="radio" class="radio" name="quality" v-model="qcdchoice" value="delai">
                        </div>
                    </div> <br>
                    <form v-if="!qcdchoice || qcdchoice == 'qualite'" id="quality"
                        @submit.prevent="createQualityObjective()">
                        <div class="mb-3 row">
                            <label for="objective" class="col-sm-2 col-form-label">Objectifs Qualités</label>
                            <div class="col-sm-7">
                                <textarea type="text" name="quality" class="form-control" rows="3"
                                    v-model="quality"></textarea>
                            </div>

                            <div class="col-sm-2">
                                <button v-if="ajoutQ" type="submit" class="btn btn-dark entrer">Entrer</button>
                                <button v-if="modificationQ" type="button" @click="updateQualityObjective()"
                                    class="btn btn-primary">Modifier</button>
                            </div>
                        </div>
                    </form>
                    <form v-if="qcdchoice == 'cout'" id="cost" @submit.prevent="createCostObjective()">
                        <div class="mb-3 row">
                            <label for="objective" class="col-sm-2 col-form-label">Objectifs coût</label>
                            <div class="col-sm-7">
                                <textarea type="text" name="cost" class="form-control" id="objective" rows="3"
                                    v-model="cost"></textarea>
                            </div>
                            <div class="col-sm-2">
                                <button type="submit" class="btn btn-dark entrer" v-if="ajoutC">Entrer</button>
                                <button type="button" @click="updateCostObjective()" class="btn btn-dark"
                                    v-if="modificationC">Modifier</button>
                            </div>
                        </div>
                    </form>
                    <form v-if="qcdchoice == 'delai'" id="delay" @submit.prevent="createDelayObjective()">
                        <div class="mb-3 row">
                            <label for="objective" class="col-sm-2 col-form-label">Objectifs délais </label>
                            <div class="col-sm-7">
                                <textarea type="text" name="delay" class="form-control" id="objective" rows="3"
                                    v-model="delay"></textarea>
                            </div>
                            <div class="col-sm-2">
                                <button type="submit" class="btn btn-dark entrer" v-if="ajoutD">Entrer</button>
                                <button type="button" @click="updatedelayObjective()" class="btn btn-dark"
                                    v-if="modificationD">Modifier</button>
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
                                Modifier
                            </el-button>
                            <el-button size="small" type="danger" @click="deleteQualityObjective(scope.$id, scope.row)">
                                Suprimer
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
                                Modifier
                            </el-button>
                            <el-button size="small" type="danger" @click="deleteCostObjective(scope.$id, scope.row)">
                                Suprimer
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
                                Modifier
                            </el-button>
                            <el-button size="small" type="danger" @click=" deletedelayObjective(scope.$id, scope.row)">
                                Suprimer
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
                                <textarea type="text" v-model="task" rows="3" name="task" class="form-control" id="task"
                                    aria-describedby="projectNameHelp"></textarea>
                            </div>
                            <div class="col-sm-2">
                                <button type="submit" class="btn btn-dark entrer" v-if="ajout">Entrer</button>
                                <button type="button" @click="updateTaskList()" class="btn btn-dark"
                                    v-if="modification">Modifier</button>
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
                            Modifier
                        </el-button>
                        <el-button size="small" type="danger" @click=" deleteTaskList(scope.$id, scope.row)">
                            Suprimer
                        </el-button>
                    </template>
                </el-table-column>
            </el-table class="table"><br><br><br>
            <h5>Réseau d’acteur</h5><br><br>
            <div class="card" style="width: 800px;">
                <div class="card-body">
                    <form id="human" @submit.prevent="fetchhumanresource()">
                        <div class="mb-3">
                            <div>
                                <label for="name" class="form-label">Nom</label>
                                <input type="text" v-model="last_name" name="last_name" id="#" class="form-control">
                                <label for="first_name" class="form-label">Prenom</label>
                                <input type="text" v-model="first_name" id="#" name="first_name" class="form-control">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" v-model="email" name="email" id="#" class="form-control">
                                <label for="phone_number" class="form-label">Telephone</label>
                                <input type="tel" id="#" v-model="tel" class="form-control" name="tel">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-dark" v-if="ajoutH">Entrer</button>
                        <button type="button" @click="updatehumanresource()" class="btn btn-dark"
                            v-if="modificationH">Modifier</button>
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
                            Modifier
                        </el-button>
                        <el-button size="small" type="danger" @click="deletehumanresource(scope.$id, scope.row)">
                            Suprimer
                        </el-button>
                    </template>
                </el-table-column>
            </el-table><br><br>
            <h6>Mesure de suivi</h6><br>
            <div class=" pluslistss">
                <p v-for="item in pluslists">{{ item.sigle }}={{ item.signification }},</p>
            </div>
            <div class=" pluslists">
                <p v-for="item in pluslistss">
                    <div class="dropdown">
                        <button id="pluslist" class="dropbtn">{{ item.sigle }}={{ item.signification }},</button>
                        <div class="dropdown-content">
                            <button @click="deletePlusList(item.id)">Supprimer</button>
                        </div>
                </div>
                </p>
                <ModalComponent :onSubmit="fetchPlusList"
                                :id_projet="id_projet"
                                 />
            </div><br>
            <div class="tablecontainer">
                <table class="ms">
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th v-for="( actor, actorIndex) in  humanresources" :key="actorIndex">{{ actor.firstname }}
                                {{actor.lastname }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(task, taskIndex) in tasks" :key="taskIndex">
                            <td>{{ task.tasklists }}</td>
                            <td v-for="(actor, actorIndex) in humanresources" :key="actorIndex">
                                <select :class="{ 'select-disabled': selectedTasks[actor.id + '-' + task.id] }"
                                    v-model="selectedTasks[actor.id + '-' + task.id]"
                                    @change=" fetchRAChoice(actor.id, task.id)" id="select1">
                                    <option v-for="(option, optionIndex) in pluslistsss" :key="optionIndex">{{
                                        option.sigle }}</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><br><br>
            <h5>Tableau d’action</h5>
            <div>
            <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog">
                <div class="modal-dialog modaldialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title text-primary">Notification</h5>
                    </div>
                    <div class="modal-body">                
                        Message envogé avec succès
                </div>
                </div>
                </div>
            </div>
            <div v-if="showModal" class="modal-backdrop fade show"></div>
            </div>
            <div>

            <div v-if="showModals" class="modal fade show d-block" tabindex="-1" role="dialog">
                <div class="modal-dialog modaldialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title text-primary">Notification</h5>
                    </div>
                    <div class="modal-body">                
                        Erreur, message non envoyé.
                </div>
                </div>
                </div>
            </div>
            <div v-if="showModals" class="modal-backdrop fade show"></div>
            </div>

            <div class="qqocq">
                <p>Roadmap du cycle ou feuille de route:</p>
                <b>Q.Q.O.Q.C.P.C(Qui, Quoi, Où, Quand, Comment, Pourquoi, Combien).</b>
            </div><br>
            <div class="tablecontainer">
                <table class=" tableta">
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
                                <span v-if="selectActor[task.id]" class="sbutton">{{ selectActor[task.id] }}</span>
                                <div  v-if="!select[task.id]||modify[task.id]">
                                    <multiselect v-model="value[task.id]" tag-placeholder="" @select="readTaskListt(task.id)"
                                    placeholder="Ajouter un acteur"  label="name"
                                    track-by="code" :options="options" :multiple="true">
                                    </multiselect>
                                </div>
                            </td>
                            <td id="ou">
                               <span v-if="selectOuS[task.id]" type="button" class="sbutton">{{selectOuS[task.id]}}</span>
                                <input v-if="!select[task.id]||modify[task.id]" id="input" class="input" v-model="selectOu[task.id]"></input>                              
                            </td>
                            <td id="quand">
                                Du <input type="date" class="inputdate" required v-model="selectquandD[task.id]"
                                    @change=" "><br>
                                Au <input type="date" class="inputdate" required v-model="selectquandF[task.id]"
                                    @change="">
                            </td>
                            <td>
                                <span @click="" v-if="selectcommentt[task.id]" class="sbutton">{{selectcommentt[task.id]}}</span>
                                <input  v-if="!select[task.id]||modify[task.id]" id="input"  class="input" v-model="selectcomment[task.id]"></input>
                                
                            </td>
                            <td>
                                <span v-if="selectpourquoii[task.id]" class="sbutton">{{selectpourquoii[task.id]}}</span>
                                <input v-if="!select[task.id]||modify[task.id]" id="input" class="input" v-model="selectpourquoi[task.id]"></input>
                                
                            </td>
                            <td>
                                <span v-if="selectcombienn[task.id]" class="sbutton">{{selectcombienn[task.id]}}</span>
                                <input v-if="!select[task.id]||modify[task.id]" id="input" class="input" @change="" v-model="selectcombien[task.id]"></input>
                            </td>
                            <td>
                                <div class="btnbtn">
                                    <button v-if="!select[task.id]" @click="fetchTA(task.id)" type="button" class="btn btn-outline-primary btn-sm mb-2">Enregistrer</button>
                                    <button v-if="enregistrer[task.id]" @click=" updateTA(task.id)" type="button" class="btn btn-outline-primary btn-sm mb-2">Enregistrer modif</button>
                                    <button v-if="selectE[task.id]||modif[task.id]" @click="modifyTa(task.id)" type="button" class="btn btn-outline-primary btn-sm mb-2">Modifier</button>
                                </div>
                            </td>
                            <td >
                                <div class="btnbtn">
                                    <button @click="sendMail(task.id)" type="button" class="btn btn-outline-info btn-sm mb-2">Notifier</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><br>
        </div><br><br>
        <h5 class="priorité">Tableau de priorité</h5>
        <div >
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
                    <tr v-for="(task, taskId) in tasks" :key="taskId">
                        <td>{{ taskId + 1 }}</td>
                        <td>
                            {{ task.tasklists }}
                        </td>
                        <td>
                            <select class="select2" id="" @change="fetchTP(task.id)" v-model="selecturgent[task.id]">
                                <option v-for="option in options1" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </td>
                        <td>
                            <select class="select2" id="" @change="fetchTP(task.id)" v-model="selectimportant[task.id]">
                                <option v-for="option in options2" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </td>
                        <td>
                            <p>{{ selectpriorite[task.id] }}</p>
                        </td>
                        <td>
                            <p>{{ selectstatut[task.id] }}</p>
                        </td>
                        <td>
                            <span>{{delai[task.id]}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>


        </div>
        <br><br>
        <h5>VII-Planning ou  chronogramme des tâches</h5>
        <div class="container">
            <GantComponent  :bar-list="barList"
                            :project-id="id_projet"
                            @trigger-readTA="readTA"
                            @trigger-addBar="addBar"/> <br>
            <ModalGant :tasklist="taskG" 
                       :project-id="id_projet"
                       :name="projetname"
                       :options="options"
                       @trigger-readTA="readTA"
                       :selectquandD="selectquandD"
                       :selectActor="selectActor"
                       :selectquandF="selectquandF"
                       :onSubmit="fetchTAForModal"
                       @trigger-addBar="addBar"/>  
                       
        </div>
    </main>
</template>
<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import ModalComponent from '@/components/modalComponent.vue'
import GantComponent from '@/components/gant.vue'
import ModalGant from '@/components/modalGannt.vue'
export default {
    components: { Multiselect, ModalComponent, GantComponent, ModalGant},
    props: ['id_projet'],
    data() {
        return {
            specificobjective: '',
            mainobjective: '',
            mainobjectives: [],
            specificobjectives: [],
            modification1: false,
            modification2: false,
            ajout1: true,
            ajout2: true,
            id: "",
            mainObjectiveForm: false,
            projectNameForm: false,
            projectnames: "",
            projectname: "",
            modificationT: false,
            ajoutT: true,
            search: '',
            tableData: [],
            qcdchoice: '',
            quality: '',
            qualities: '',
            id: '',
            modificationQ: false,
            ajoutQ: true,
            cost: '',
            costs: '',
            modificationC: false,
            ajoutC: true,
            delay: '',
            delays: '',
            modificationD: false,
            ajoutD: true,
            tableDataQ: [],
            tableDataC: [],
            tableDataD: [],
            task: "",
            tasks: "",
            taskG :{},
            id: "",
            humanresources: "",
            modification: false,
            ajout: true,
            search: '',
            tableDataT: [],
            modificationH: false,
            ajoutH: true,
            first_name: "",
            last_name: "",
            email: "",
            tel: "",
            tableDataH: [],
            id_p: "",
            pluslists: '',
            selectedTasks: {},
            selectquandD: {},
            selectquandF: {},
            delai:{},
            selectcomment: {},
            selectpourquoi: {},
            selectcombien: {},
            selecturgent: {},
            selectimportant: {},
            selectpriorite: {},
            selectstatut: {},
            selectActor: {},
            options1: [
                { label: 'urgent', value: 'urgent' },
                { label: 'Pas urgent', value: 'pas_urgent ' },
            ],
            options2: [
                { label: 'important', value: 'important' },
                { label: 'Pas important', value: 'pas_important ' },
            ],
            selectOu: {},
            selectOuS:{},
            value: [],
            options: [],
            selectV:{},
            selectS:{},
            idS:'',
            isMounted: false,
            selectquandDD:{},
            selectquandFF:{},
            selectcommentt:{},
            selectpourquoii:{},
            selectcombienn:{},
            modify:{},
            pluslistss:'',
            enregistrer:{},
            idp:'',
            pluslistsss:'',
            taskss:"",
            projetname:"",
            barList: [], 
            select:{},
            modif:{},
            selectE:{},
            showModal: false,
            showModals: false,
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
    mounted() {
        this.readMainObjective(),
        this.readSpecificObjective(),
        this.readProjectName(),
        this.readQualityObjective();
        this.readCostObjective();
        this.readDelayObjective();
        this.readTaskList();
        this.readhumanresource();
        this.readPlusList();
        this.readRAChoice();
        this.readTA();
        this.readTP();
        this.readPlussList();
        this.isMounted = true;
        this. readPlusssList();
        this.addBar();
    },
    methods: {    
        sendProjectNameForm() {
            var projectdata = new FormData(document.getElementById("projectgeneralinformation"));
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=create_projectname',
                data: projectdata,
            })
                .then((response) => {
                    this.id_p = response.data;
                    this.NavigateToObjective();
                    this.projectname = "";
                    this.readProjectName();
                }
                ).catch(function (error) {
                    console.log(error)
                });

        },
        transformDate(dateStr) {
        if (!dateStr) return '';
        let [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
        },
        NavigateToObjective() {
            this.$router.push({ name: 'objective', params: { id_projet: this.id_p } });
        },
        readProjectName() {
            var data = new FormData();
            data.append('id_projet', this.id_projet);
            data.append('id_p', this.id_p);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_projectname',
                data: data
            })
                .then((response) => {
                    this.projectnames = response.data;
                    response.data.forEach(item=>{
                        this.projetname= item.projectname;                    
                    })
                }).catch((error) => {
                    console.log(error)
                })
        },

        modifyProjectname(id) {
            this.projectname = this.projectnames[id].projectname,
                this.modificationT = true,
                this.ajoutT = false,
                this.projectNameForm = true
        },
        sendFormupdate() {
            var projectdata = new FormData(document.getElementById("projectgeneralinformation"));
            projectdata.append('id_projet', this.id_projet)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=update_projectname',
                data: projectdata,
            })
                .then((response) => {
                    this.readProjectName();
                    this.projectname = "";
                    this.modificationT = false;
                    this.ajoutT = true;
                    this.projectNameForm = false
                }
                ).catch(function (error) {
                    console.log(error)
                });

        },

        sendMainObjective() {
            var mainobjectivedata = new FormData(document.getElementById('mainobjectiveform'));
            mainobjectivedata.append("types", 'mainobjective');
            mainobjectivedata.append("id_projet", this.id_projet)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=create_mainobjective',
                data: mainobjectivedata
            })
                .then((response) => {
                    this.readMainObjective(),
                        this.mainobjective = "";
                }).catch((error) => {
                    console.log(error)
                });
        },
        readMainObjective() {
            var data = new FormData();
            data.append("id_projet", this.id_projet);
            data.append("types", 'mainobjective');
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_mainobjective',
                data: data
            })
                .then((response) => {
                    this.mainobjectives = response.data
                }).catch((error) => {
                    console.log(error)
                })
        },
        modifyMainObjective(id) {
            this.mainobjective = this.mainobjectives[id].objectives;
            this.id = this.mainobjectives[id].id;
            this.modification1 = true;
            this.ajout1 = false;
            this.mainObjectiveForm = true;
        },
        sendUpdateMainObjective() {
            var updatemainobjective = new FormData(document.getElementById('mainobjectiveform'));
            updatemainobjective.append("id", this.id)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=update_mainobjective',
                data: updatemainobjective
            }).then((response) => {
                this.mainobjective = "";
                this.readMainObjective();
                this.modification1 = false;
                this.ajout1 = true;
                this.mainObjectiveForm = false;
            }).catch((error) => {
                console.log(error)
            });
        },
        sendSpecificObjective() {
            var specificobjectivedata = new FormData(document.getElementById('specificobjectiveform'));
            specificobjectivedata.append("types", 'specificobjective');
            specificobjectivedata.append("id_projet", this.id_projet)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=create_specificobjective',
                data: specificobjectivedata
            })
                .then((response) => {
                    this.readSpecificObjective();
                    this.specificobjective = "";
                }).catch((error) => {
                    console.log(error)
                });
        },
        readSpecificObjective() {
            var data = new FormData();
            data.append("id_projet", this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_specificobjective',
                data: data
            })
                .then((response) => {
                    this.specificobjectives = JSON.stringify(response.data);
                    this.tableData = response.data;
                }).catch((error) => {
                    console.log(error)
                })
        },

        modifySpecificObjective(id, row) {
            this.specificobjective = row.objectives;
            this.id = row.id;
            this.modification2 = true;
            this.ajout2 = false;
        },
        sendSpecificUpdatemObjective() {
            var updatespecificobjective = new FormData();
            updatespecificobjective.append("id", this.id)
            updatespecificobjective.append("specificobjective", this.specificobjective)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=update_specificobjective',
                data: updatespecificobjective
            }).then((response) => {
                this.readSpecificObjective();
                this.specificobjective = "";
                this.modification2 = false;
                this.ajout2 = true;
            }).catch((error) => {
                console.log(error)
            });
        },
        deleteSpecificObjective(id, row) {
            var deleteform = new FormData();
            deleteform.append("id", row.id)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=delete_specificobjective',
                data: deleteform
            }).then((response) => {
                this.readSpecificObjective();
            }).catch((error) => {
                console.log(error)
            });

        },
        createQualityObjective() {
            var data = new FormData(document.getElementById('quality'));
            data.append("types", 'qualityobjective')
            data.append("id_projet", this.id_projet)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=create_qualityobjective',
                data: data
            })
                .then((response) => {
                    this.readQualityObjective();
                    this.quality = '';
                }).catch((error) => {
                    console.log(error)
                })
        },
        readQualityObjective() {
            var data = new FormData();
            data.append("id_projet", this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_qualityobjective',
                data: data
            })
                .then((response) => {
                    this.qualities = response.data;
                    this.tableDataQ = response.data
                }).catch((error) => {
                    console.log(error)
                })
        },
        modifyqualityobjective(id, row) {
            this.quality = row.objectives;
            this.id = row.id;
            this.modificationQ = true,
                this.ajoutQ = false,
                this.qcdchoice = 'qualite'
        },
        updateQualityObjective() {
            let data = new FormData();
            data.append("quality", this.quality);
            data.append("id", this.id)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=update_qualityobjective',
                data: data
            })
                .then((response) => {
                    this.readQualityObjective();
                    this.quality = "";
                    this.modificationQ = false,
                        this.ajoutQ = true
                }).catch((error) => {
                    console.log(error)
                })
        },
        deleteQualityObjective(id, row) {
            let data = new FormData();
            data.append("id", row.id)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=delete_qualityobjective',
                data: data
            })
                .then((response) => {
                    this.readQualityObjective();
                }).catch((error) => {
                    console.log(error)
                })
        },
        createCostObjective() {
            var data = new FormData(document.getElementById('cost'));
            data.append("types", 'costobjective');
            data.append("id_projet", this.id_projet)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=create_costobjective',
                data: data
            })
                .then((response) => {
                    this.readCostObjective();
                    this.cost = '';
                }).catch((error) => {
                    console.log(error)
                })
        },
        readCostObjective() {
            var data = new FormData();
            data.append("id_projet", this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_costobjective',
                data: data
            })
                .then((response) => {
                    this.costs = response.data;
                    this.tableDataC = response.data
                }).catch((error) => {
                    console.log(error)
                })
        },
        modifyCostobjective(id, row) {
            this.cost = row.objectives;
            this.qcdchoice = 'cout';
            this.id = row.id;
            this.modificationC = true,
                this.ajoutC = false
        },
        updateCostObjective() {
            let data = new FormData();
            data.append("cost", this.cost);
            data.append("id", this.id)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=update_costobjective',
                data: data
            })
                .then((response) => {
                    this.readCostObjective();
                    this.cost = '';
                    this.modificationC = false,
                        this.ajoutC = true
                }).catch((error) => {
                    console.log(error)
                })
        },
        deleteCostObjective(id, row) {
            let data = new FormData();
            data.append("id", row.id)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=delete_costobjective',
                data: data
            })
                .then((response) => {
                    this.readCostObjective();
                }).catch((error) => {
                    console.log(error)
                })
        },
        createDelayObjective() {
            var data = new FormData(document.getElementById('delay'));
            data.append("types", 'delayobjective');
            data.append("id_projet", this.id_projet)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=create_delayobjective',
                data: data
            })
                .then((response) => {
                    this.readDelayObjective();
                    this.delay = '';
                }).catch((error) => {
                    console.log(error)
                })
        },
        readDelayObjective() {
            var data = new FormData();
            data.append("id_projet", this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_delayobjective',
                data: data
            })
                .then((response) => {
                    this.delays = response.data;
                    this.tableDataD = response.data
                }).catch((error) => {
                    console.log(error)
                })
        },
        modifydelayobjective(id, row) {
            this.delay = row.objectives;
            this.qcdchoice = 'delai';
            this.id = row.id;
            this.modificationD = true,
                this.ajoutD = false
        },
        updatedelayObjective() {
            let data = new FormData();
            data.append("delay", this.delay);
            data.append("id", this.id)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=update_delayobjective',
                data: data
            })
                .then((response) => {
                    this.readDelayObjective();
                    this.delay = '';
                    this.modificationD = false,
                        this.ajoutD = true
                }).catch((error) => {
                    console.log(error)
                })
        },
        deletedelayObjective(id, row) {
            let data = new FormData();
            data.append("id", row.id)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=delete_delayobjective',
                data: data
            })
                .then((response) => {
                    this.readDelayObjective();
                }).catch((error) => {
                    console.log(error)
                })
        },
        fetchTaskList() {
            var data = new FormData(document.getElementById('task'));
            data.append("id_projet", this.id_projet)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=create-tasklist',
                data: data
            })
                .then((response) => {
                    this.readTaskList();
                    this.task = "";
                }).catch((error) => {
                    console.log(error)
                })

        },
        readTaskList() {
            var data = new FormData();
            data.append("id_projet", this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read-tasklist',
                data: data
            })
                .then((response) => {
                    this.tableDataT = response.data;
                    this.tasks = response.data;
                    this.taskG = response.data;
                }).catch((error) => {
                    console.log(error)
                })
        },
        modifyTaskList(id, row) {
            this.task = row.tasklists;
            this.id = row.id;
            this.modification = true;
            this.ajout = false
        },
        updateTaskList() {
            var data = new FormData();
            data.append("task", this.task);
            data.append("id", this.id)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=update_tasklist',
                data: data
            })
                .then((response) => {
                    this.readTaskList();
                    this.task = "";
                    this.modification = false;
                    this.ajout = true
                }).catch((error) => {
                    console.log(error)
                })

        },
        deleteTaskList(id, row) {
            var data = new FormData();
            data.append("id", row.id)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=delete_tasklist',
                data: data
            })
                .then((response) => {
                    this.readTaskList();
                    this.addBar();
                }).catch((error) => {
                    console.log(error)
                })

        },
        fetchhumanresource() {
            var data = new FormData(document.getElementById('human'));
            data.append("types", 'humanresource');
            data.append("id_projet", this.id_projet)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=create-humanresource',
                data: data
            })
                .then((response) => {
                    this.readhumanresource(),
                        this.first_name = "",
                        this.last_name = "",
                        this.email = "";
                        this.tel = ""
                }).catch((error) => {
                    console.log(error)
                })
        },
        readhumanresource() {
            var data = new FormData();
            data.append("id_projet", this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read-humanresource',
                data: data
            })
                .then((response) => {
                    this.tableDataH = response.data;
                    this.humanresources = response.data;
                    response.data.forEach(item => {
                        var name = item.firstname + ' ' + item.lastname;
                        var email = item.email;
                        this.options.push({ name: name, code: email });      
                    })
                }).catch((error) => {
                    console.log(error)
                })
        },
        modifyhumanresource(id, row) {
            this.first_name = row.firstname,
                this.last_name = row.lastname,
                this.email = row.email,
                this.tel = row.phonenumber,
                this.id = row.id,
                this.modificationH = true,
                this.ajoutH = false

        },
        updatehumanresource() {
            var data = new FormData(document.getElementById('human'));
            data.append("id", this.id)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=update_humanresource',
                data: data
            })
                .then((response) => {
                    this.readhumanresource();
                    this.first_name = "",
                        this.last_name = "",
                        this.email = "",
                        this.tel = "",
                        this.modificationH = false;
                    this.ajoutH = true
                }).catch((error) => {
                    console.log(error)
                })
        },
        deletehumanresource(id, row) {
            var data = new FormData();
            data.append("email", row.email)
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=delete_humanresource',
                data: data
            })
                .then((response) => {
                    this.readhumanresource();
                }).catch((error) => {
                    console.log(error)
                })
        },
        readPlusList() {
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read-plus',
            })
                .then((response) => {
                    this.pluslists = response.data;
                }).catch((error) => {
                    console.log(error)
                })
        },
        readPlussList() {
            var data = new FormData();
            data.append('id_projet', this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read-pluss',
                data: data
            })
                .then((response) => {
                    this.pluslistss = response.data;        
                }).catch((error) => {
                    console.log(error)
                })
        },
        readPlusssList() {
            var data = new FormData();
            data.append('id_projet', this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read-plusss',
                data: data
            })
                .then((response) => {
                    this.pluslistsss = response.data;        
                }).catch((error) => {
                    console.log(error)
                })
        },
        fetchRAChoice(actorId, taskId) {
            var data = new FormData();
            data.append('id_projet', this.id_projet);
            data.append('id_a', actorId);
            data.append('id_t', taskId);
            data.append('choice', this.selectedTasks[actorId + '-' + taskId])
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=create_saveplus',
                data: data
            }).then((response) => {
                this.readRAChoice();
            }).catch((error) => {
                console.log(error)
            })

        },
        readRAChoice() {
            var data = new FormData();
            data.append('id_p', this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_saveplus',
                data: data
            }).then((response) => {
                response.data.forEach(item => {
                    var actorId = item.id_actor;
                    var taskId = item.id_task;
                    var choice = item.choice;
                    this.selectedTasks[actorId + '-' + taskId] = choice;
                });

            }).catch((error) => {
                console.log(error)
            })

        },
        readTaskListt(taskId) {
            var data = new FormData();
            data.append("id_projet", this.id_projet);
            data.append("taskId", taskId);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read-tasklistt',
                data: data
            })
               .then((response) => {
                  response.data.forEach(item=>{
                    this.taskss=item.tasklists
                  })
                }).catch((error) => {
                    console.log(error)
                })
        },
        async fetchTA(taskId) {    
            var data = new FormData();
            data.append('id_projet', this.id_projet);
            data.append('id_t', taskId);
           if(this.value.length==0){
                data.append('qui', '');
            } else{
                data.append('qui', this.value[taskId].map(item => item.name));
            }

            if(this.value.length==0){
                data.append('email', '');;
            } else{
                data.append('email', this.value[taskId].map(item => item.code));
            }
            data.append('project',this.projetname);
            data.append('task', this.taskss);
            data.append('ou', this.selectOu[taskId]);
            data.append('quandD', this.selectquandD[taskId]);
            data.append('quandF', this.selectquandF[taskId]);
            data.append('comment', this.selectcomment[taskId]);
            data.append('pourquoi', this.selectpourquoi[taskId]);               
            data.append('combien', this.selectcombien[taskId]);
               
            await axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=create_tableauaction',
                data: data
            }).then((response) => {
                this. readTA();
                this.addBar();
                this.modif[taskId]=true;
                console.log(this.modif[taskId]);
            }).catch((error) => {
                console.log(error)
            })
                this.idS=taskId;
        },
        
        readTA() {
            var data = new FormData();
            data.append('id_p', this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_tableauaction',
                data: data
            }).then((response) => {
                // this.readhumanresource();
                response.data.forEach(item => {
                    var taskId = item.id_task;   
                    this.idp= item.id;
                    if (item.qui == 'null' || item.qui == 'undefined') {
                        this.selectActor[taskId] = '';
                    } else {
                        this.selectActor[taskId] = item.qui;
                        this.select[taskId]=item.qui;
                        this.selectE[taskId]=item.qui;
                    };
                    if (item.ou == 'null' || item.ou == 'undefined') {
                        this.selectOu[taskId] = '';
                    } else {
                        this.selectOuS[taskId] = item.ou;
                        // this.select[taskId]=item.ou;
                        // this.selectE[taskId]=item.ou;
                    };
                    this.selectquandD[taskId] = item.quandD;
                    this.selectquandDD[taskId] = item.quandD;
                    this.select[taskId]=item.quandD;
                    this.selectE[taskId]=item.quandD;

                    this.selectquandF[taskId] = item.quandF;
                    this.selectquandFF[taskId] = item.quandF;
                    this.delai[taskId]=this.transformDate(item.quandF);
                    this.select[taskId]=item.quandF;
                    this.selectE[taskId]=item.quandF;
                    if (item.comment == 'null' || item.comment == 'undefined') {
                        this.selectcomment[taskId] = '';
                    } else {
                        this.selectcomment[taskId] = item.comment;
                        this.selectcommentt[taskId]= item.comment;
                        // this.select[taskId]=item.comment;
                        // this.selectE[taskId]=item.comment;
                    };
                    if (item.pourquoi == 'null' || item.pourquoi == 'undefined') {
                        this.selectpourquoi[taskId] = '';
                    } else {
                        this.selectpourquoi[taskId] = item.pourquoi;
                        this.selectpourquoii[taskId]= item.pourquoi;
                        // this.select[taskId]=item.pourquoi;
                        // this.selectE[taskId]=item.pourquoi;
                    };
                    if (item.combien == 'null' || item.combien == 'undefined') {
                        this.selectcombien[taskId] = '';
                    } else {
                        this.selectcombien[taskId] = item.combien;
                        this.selectcombienn[taskId] = item.combien;
                        // this.select[taskId]=item.combien;
                        // this.selectE[taskId]=item.combien;
                    };
                })
               
            }).catch((error) => {
                console.log(error)
            })

        },
        modifyTa(taskId){
            console.log(this.selectActor[taskId]);
            this.modify[taskId]=true;
            if(this.selectActor[taskId].length==0){
                this.value[taskId]=''
            }else{
                var names=this.selectActor[taskId].split(',');
                this.value[taskId]= names.map(name =>{
                return this.options.find(option=>option.name === name.trim())
            })
            };
            this.selectOu[taskId] =this.selectOuS[taskId];
            this.selectcomment[taskId] =this.selectcommentt[taskId];
            this.selectpourquoi[taskId] =this.selectpourquoii[taskId];
            this.selectcombien[taskId]=this.selectcombienn[taskId];
            this.enregistrer[taskId]=true;
            this.selectActor[taskId]=false;
            this.selectOuS[taskId]=false;
            this.selectcombienn[taskId]=false;
            this.selectpourquoii[taskId]=false;
            this.selectcommentt[taskId]=false;
            this.modif[taskId]=false;
            this.selectE[taskId]=false;
           
        },
        updateTA(taskId){
            var data = new FormData();
            data.append('id', taskId);
            console.log(this.value[taskId]);
            if(this.value[taskId].length==0){
                data.append('qui', '');               
            }else{
                data.append('qui', this.value[taskId].map(item => item.name));               
            }  
            if(this.value[taskId].length==0){
                data.append('email','');
            }  else{
                data.append('email', this.value[taskId].map(item => item.code));
            }       
            data.append('ou', this.selectOu[taskId]);
            data.append('quandD', this.selectquandD[taskId]);
            data.append('quandF', this.selectquandF[taskId]);
            data.append('comment', this.selectcomment[taskId]);
            data.append('pourquoi', this.selectpourquoi[taskId]);
            data.append('combien', this.selectcombien[taskId]);           
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=update_tableauaction',
                data: data
            }).then((response) => {
                this. readTA();
                this.addBar();
                this.modify[taskId]=false;
                this.enregistrer[taskId]=false;
                this.modif[taskId]=true;
            }).catch((error) => {
                console.log(error)
            })
                this.idS=taskId;
        },
        fetchTP(taskId) {
            var data = new FormData();
            data.append('id_projet', this.id_projet);
            data.append('task_id', taskId);
            data.append('urgent', this.selecturgent[taskId]);
            data.append('important', this.selectimportant[taskId]);
            data.append('priorite', this.selectpriorite[taskId]);
            console.log( data);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=create_priorite',
                data: data
            }).then((response) => {
                console.log(response.data);
                this.readTP();
            }).catch((error) => {
                console.log(error)
            })

        },
        readTP() {
            var data = new FormData();
            data.append('id_p', this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_priorite',
                data: data
            }).then((response) => {
                response.data.forEach(item => {
                    var taskId = item.task_id;
                    this.selecturgent[taskId] = item.urgent;
                    this.selectimportant[taskId] = item.important;
                    if (item.urgent == "urgent" & item.important == "important") {
                        this.selectpriorite[taskId] = 'X';
                    } else {
                        this.selectpriorite[taskId] = '';
                    };
                    if (item.urgent == "urgent" & item.important == "important") {
                        this.selectstatut[taskId] = 'P1';
                    } else {
                        this.selectstatut[taskId] = 'P2';
                    };


                })
            }).catch((error) => {
                console.log(error)
            })

        },
        async fetchPlusList(formData){
                await axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=create_plus',
                    data: formData
                })
                .then((response)=>{
                    this.readPlussList();
                    this.readPlusssList();
                }).catch((error)=>{
                    console.log(error)
                })

            },
        async fetchTAForModal(data) {                        
            await axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=create_tableauaction',
                data: data
            }).then((response) => {
                this. readTA();
                this.addBar();
            }).catch((error) => {
                console.log(error)
            })
                
        },
            
            deletePlusList(itemId){
                var data= new FormData();
                data.append("id", itemId);
                data.append("id_projet", this.id_projet)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/projectinfo.php?action=delete_plus',
                    data: data
                })
                .then((response)=>{
                    this.readPlussList();
                    this.readPlusssList();
                }).catch((error)=>{
                    console.log(error)
                })

            },
            sendMail(taskId){
                var data= new FormData();
                data.append("taskId", taskId);
                data.append("id_projet", this.id_projet)
                axios({
                    method:'POST',
                    url:'http://localhost/planaction/phpmailer.php?action=send_mail',
                    data: data
                })
                .then((response)=>{
                  console.log(response.data.message)
                  if(response.data.message=='Message has been sent'){
                   this.showModal= true;
                   setTimeout(() => {
                        this.showModal = false;
                    }, 2000); 
                  }
                  else{
                    this.showModals= true;
                    setTimeout(() => {
                            this.showModals = false;
                        }, 2000);
                  }
                }).catch((error)=>{
                    console.log(error)
                })
 
            },
    
    async addBar() {
      var data = new FormData();
      data.append('id_p', this.id_projet);
      try {
        const response = await axios.post('http://localhost/planaction/projectinfo.php?action=read_apexresource', data);
        const transformedData = {};
        response.data.forEach(item => {
          var id = item.id_task;
          var name = item.qui;
          var task = item.tasklists;
          var dateD = item.quandD + ' 07:00';
          var dateF = item.quandF + ' 05:00';
          if (!transformedData[task]) {
            transformedData[task] = [];
          }
          transformedData[task].push({
            id: id,
            task: task,
            dateD: dateD,
            dateF: dateF
          });
        });
        this.barList = Object.keys(transformedData).map(task => ({
          label: task,
          bars: transformedData[task].map(task => ({
            myBeginDate: task.dateD,
            myEndDate: task.dateF,
            ganttBarConfig: {
              id: task.id,
              hasHandles: true,
              label: task.task,
              style: {
                background: "#e09b69",
                borderRadius: "20px",
                color: "black"
              }
            }
          }))
        }));

      } catch (error) {
        console.log(error);
      }
    }

    }
}


</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
.container {
    margin-top: 120px;
    margin-left: 40px;
}
.modal-title{
    margin-left: 50px;
}
.modal{
    width:250px!important;
    margin-left: 550px;
    margin-top: 200px;
}
.card {
    margin-left: 150px;
}

.align {
    margin-top: 30px;
}

.objectifP {
    margin-left: 20px;
}

.Pname {
    text-align: center;
}

.button {
    border-style: none;
    background-color: white;
}


.checkbox {
    display: flex;
    gap: 15px;
}

.entrer {
    margin-top: 30px;
}

.radio {
    margin-left: 5px;
}

.table {
    z-index: 1 !;
}


th,
td,tr {
    border: 1px solid #a3a1a1;
    text-align: left;
    z-index: 2;
}

.select-disabled {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

}

.tablecontainer {
    width: 1085px;
    margin-left: 20px;
    overflow-x: auto;
}
.tableta{
    table-layout: auto;
    width: 1085px;
}

.table3{
    width: 1085px;
    margin-left: 70px;
}

table {
    z-index: 1;
}

#select1 {
    border: none;
    opacity: 0.8;
    width: 60px;
    margin-left: 20px;
    color: rgb(97, 94, 94);
}

tbody tr td:first-child,
thead tr th:first-child {
    position: sticky;
    left: 0;
    background-color: white;
    z-index: 2 !important;

}

.select2 {
    border: none;
    opacity: 0.8;
    width: auto;
    outline: none;
}

.inputdate {
    border: none;
    outline: none;
}

.input {
    margin: 5px;
    outline: none;
    border: 1px solid #d6d0d0;
    border-radius: 5%;
    height: 40px;
    width: 95px!important;
    overflow-y: scroll!important;
    text-wrap: balance;
}
.input:hover {
    margin: 5px;
    outline: none;
    border: 1px solid rgb(154, 194, 204);
    border-radius: 5%;
    height: 40px;
    overflow-y: scroll!important;
    text-wrap: balance;
}
.inputdate {
    border: none;
    outline: none;
    color: rgb(97, 94, 94);
}
#quand{
    color: rgb(97, 94, 94);
}
.sbutton{
    border-style: none;
    background-color: white;
}
.btnAddActor{
    margin-left: 150px;
    margin-top: 10px;
    height: 30px;
    border: none;
}
.btnbtn{
    padding:15px;
    border: none!important;
}
.btnbtnn{
    margin-top: 35px;
}
.multiselect{
    width: 200px!important;
    border:none;
}
.priorité{
    margin-left: 40px;
}
#pluslist{
    border:none;
    background-color: white;
}
.pluslists{
    display:flex;
}
.pluslistss{
    display:flex;
    gap: 10px;
}
.dropdown {
    position: relative;
    display: inline-block;
}

.dropbtn {
    background-color: #fafcfd;
    padding: 10px;
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
    z-index: 10;
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