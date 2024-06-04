<template>
    <div class="container">
        <div class="card" id="card">
            <div class="card-body">
                <div class="nom_projet">
                    <h1 v-for="item in projectnames">
                        {{ item.projectname }}
                    </h1>
                    <button @click="downloadPDF()">Telecharger</button>
                </div><br><br>
                <div class="objectif_principale">
                    <h5>I-Objectif principal</h5>
                    <p v-for="item in mainobjectives">
                        {{ item.objectives }}
                    </p>
                </div><br>
                <div class="objectif_intermediaires">
                    <h5>II-Les objectifs intermédiaires ou jalons ou d’étapes</h5>
                    <p v-for="item in specificobjectives">
                        {{ item.objectives }}
                    </p>
                </div><br>
                <div class="equilibre_QCD">
                    <h5>III-Equilibre QCD</h5>
                    <h6>Qualité</h6>
                    <p v-for="item in qualities">
                        {{ item.objectives }}
                    </p>
                    <h6>Coût</h6>
                    <p v-for="item in costs">
                        {{ item.objectives }}
                    </p>
                    <h6>délais</h6>
                    <p v-for="item in delays">
                        {{ item.objectives }}
                    </p>
                </div><br>
                <div class="objectif_intermediaires">
                    <h5>IV-Listes des actions</h5>
                    <h6>Liste des actions (classé par priorité) :</h6>
                    <p v-for="item in tasklist">
                        {{ item.tasklists }}
                    </p>
                </div>
                <div class="mesure_suivi">
                    <h5>V-Réseau d’acteur</h5>
                    <div class=" pluslists">
                        <p v-for="item in  pluslists">
                            {{ item.sigle }}={{ item.signification }},
                        </p>
                    </div>
                </div>
                <div class="reseau_acteur">
                    <table>
                        <thead>
                            <tr>
                                <th>Actions</th>
                                <th v-for="( actor, actorIndex) in  humanresources" :key="actorIndex">{{ actor.firstname
                                    }} {{ actor.lastname }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(task, taskIndex) in tasklist" :key="taskIndex">
                                <td>{{ task.tasklists }}</td>
                                <td v-for="(actor, actorIndex) in humanresources" :key="actorIndex">
                                    {{ selectedTasks[actor.id + '-' + task.id] }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><br>
                <h5>VI-Tableau d’action</h5>
                <div class="qqocq">
                    <p>Roadmap du cycle ou feuille de route:</p>
                    <b>Q.Q.O.Q.C.P.C(Qui, Quoi, Où, Quand, Comment, Pourquoi, Combien).</b>
                </div><br>
                <div class="tableau_action">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Quoi</th>
                                <th>Qui</th>
                                <th>Où</th>
                                <th>Quand</th>
                                <th>Comment</th>
                                <th>Pourquoi</th>
                                <th>Combien</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(task, taskId) in tasklist">
                                <td>{{ task.tasklists }}</td>
                                <td>
                                    <select :class="{ 'select-disabled': selectActor[taskId] }" class="select2"
                                        name="tableau_action" v-model="selectActor[task.id]" @change="fetchTA(task.id)">
                                        <option v-for="(item, humanId) in  humanresources" :key="humanId">
                                            {{ item.firstname }} {{ item.lastname }}
                                        </option>
                                    </select>
                                </td>
                                <td id="ou">
                                    <textarea id="area" rows="2" class="textarea ou"
                                        @change=" fetchTA(task.id); autoResize()"
                                        v-model="selectOu[task.id]"></textarea>
                                </td>
                                <td id="quand">
                                    Du <input type="date" class="inputdate" required v-model="selectquandD[task.id]"
                                        @change=" fetchTA(task.id)"><br>
                                    Au <input type="date" class="inputdate" required v-model="selectquandF[task.id]"
                                        @change=" fetchTA(task.id)">
                                </td>
                                <td>
                                    <textarea id="area" rows="2" class="textarea comment" @change=" fetchTA(task.id)"
                                        v-model="selectcomment[task.id]"></textarea>
                                </td>
                                <td>
                                    <textarea id="area" rows="2" class="textarea pourquoi" @change=" fetchTA(task.id)"
                                        v-model="selectpourquoi[task.id]"></textarea>
                                </td>
                                <td>
                                    <textarea id="area" rows="2" class="textarea combien" @change=" fetchTA(task.id)"
                                        v-model="selectcombien[task.id]"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><br>
                <h5>VI-Tableau de priorité</h5>
                <div class="tableau_priorité">
                    <table class="table">
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
                            <tr v-for="(task, taskId) in tasklist" :key="taskId">
                                <td>{{ taskId + 1 }}</td>
                                <td>
                                    {{ task.tasklists }}
                                </td>
                                <td>
                                    <select class="select2" id="" @change="fetchTP(task.id)"
                                        v-model="selecturgent[task.id]">
                                        <option v-for="option in options" :value="option.value">
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <select class="select2" id="" @change="fetchTP(task.id)"
                                        v-model="selectimportant[task.id]">
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
                                <td class="fr">
                                    <input type="date" class="inputdate" @change="fetchTP(task.id)"
                                        v-model="selectdelai[task.id]">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><br><br>
                <h5>VII-Planning ou le chronogramme des tâches</h5><br>
                <div>
                    <div id="chart">
                        <apexchart type="rangeBar" height="350" :options="chartOptions" :series="series"></apexchart>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { jsPDF } from "jspdf";
export default {
    props: ['id_projet'],
    data() {
        return {
            projectnames: '',
            mainobjectives: '',
            specificobjectives: '',
            qualities: '',
            costs: '',
            delays: '',
            tasklist: '',
            pluslists: '',
            humanresources: '',
            selectedTasks: {},
            selectActor: {},
            selectOu: {},
            actorId: '',
            taskId: '',
            action: {},
            selectoption: {},
            actor: {},
            selectquandD: {},
            selectquandF: {},
            selectcomment: {},
            selectpourquoi: {},
            selectcombien: {},
            selecturgent: {},
            selectimportant: {},
            selectdelai: {},
            selectpriorite: {},
            selectstatut: {},
            series: [],
            chartOptions: {
                chart: {
                    height: 450,
                    type: 'rangeBar'
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '80%'
                    }
                },
                xaxis: {
                    type: 'datetime'
                },
                stroke: {
                    width: 1
                },
                fill: {
                    type: 'solid',
                    opacity: 0.6
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left'
                }
            },
            options: [
                { label: 'urgent', value: 'urgent' },
                { label: 'Pas urgent', value: 'pas_urgent ' },
            ],
            options2: [
                { label: 'important', value: 'important' },
                { label: 'Pas important', value: 'pas_important ' },
            ],
            cardTitle: 'Titre de la carte',
            cardContent: ''
        }
    },
    mounted() {
        this.readProjectName();
        this.readMainObjective();
        this.readSpecificObjective();
        this.readQualityObjective();
        this.readCostObjective();
        this.readDelayObjective();
        this.readTaskList();
        this.readPlusList();
        this.initSelectedTasks();
        this.readhumanresource();
        this.readRAChoice();
        this.readTA();
        this.readTP();
        this.readApex();

    },
    methods: {
        readProjectName() {
            var data = new FormData();
            data.append('id_projet', this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_projectname',
                data: data
            })
                .then((response) => {
                    this.projectnames = response.data;
                }).catch((error) => {
                    console.log(error)
                })
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
        readSpecificObjective() {
            var data = new FormData();
            data.append("id_projet", this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_specificobjective',
                data: data
            })
                .then((response) => {
                    this.specificobjectives = response.data;
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
                    this.tasklist = response.data;
                }).catch((error) => {
                    console.log(error)
                })
        },
        readPlusList() {
            var data = new FormData();
            data.append('id_projet', this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read-plus',
                data: data
            })
                .then((response) => {
                    this.pluslists = response.data;
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
                    this.humanresources = response.data;
                }).catch((error) => {
                    console.log(error)
                })
        },
        initSelectedTasks() {
            // Initialiser selectedTasks avec des tableaux vides pour chaque combinaison d'acteur et de tâche
            this.selectedTasks = Array.from({ length: this.humanresources.length }, () =>
                Array.from({ length: this.tasklist.length }, () => '')
            );
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
                    // console.log(taskId);console.log(actorId);console.log(choice);
                    this.selectedTasks[actorId + '-' + taskId] = choice;
                });

            }).catch((error) => {
                console.log(error)
            })

        },

        fetchTA(taskId) {
            var data = new FormData();
            data.append('id_projet', this.id_projet);
            data.append('id_t', taskId);
            data.append('qui', this.selectActor[taskId]),
                data.append('ou', this.selectOu[taskId]),
                data.append('quandD', this.selectquandD[taskId]),
                data.append('quandF', this.selectquandF[taskId]),
                data.append('comment', this.selectcomment[taskId]),
                data.append('pourquoi', this.selectpourquoi[taskId]),
                data.append('combien', this.selectcombien[taskId]),
                axios({
                    method: 'POST',
                    url: 'http://localhost/planaction/projectinfo.php?action=create_tableauaction',
                    data: data
                }).then((response) => {
                    this.readTA();
                    this.readApex();
                }).catch((error) => {
                    console.log(error)
                })

        },
        readTA() {
            var data = new FormData();
            data.append('id_p', this.id_projet);
            axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_tableauaction',
                data: data
            }).then((response) => {
                response.data.forEach(item => {
                    var taskId = item.id_task;
                    this.selectActor[taskId] = item.qui;
                    if (item.ou == 'null' || item.ou == 'undefined') {
                        this.selectOu[taskId] = '';
                    } else {
                        this.selectOu[taskId] = item.ou;
                    };
                    this.selectquandD[taskId] = item.quandD;
                    this.selectquandF[taskId] = item.quandF;
                    if (item.comment == 'null' || item.comment == 'undefined') {
                        this.selectcomment[taskId] = '';
                    } else {
                        this.selectcomment[taskId] = item.comment;
                    };
                    if (item.pourquoi == 'null' || item.pourquoi == 'undefined') {
                        this.selectpourquoi[taskId] = '';
                    } else {
                        this.selectpourquoi[taskId] = item.pourquoi;
                    };
                    if (item.combien == 'null' || item.combien == 'undefined') {
                        this.selectcombien[taskId] = '';
                    } else {
                        this.selectcombien[taskId] = item.combien;
                    };


                })

            }).catch((error) => {
                console.log(error)
            })

        },
        autoResize(id, taskId) {
            const textarea = document.getElementById('area')
            textarea.style.height = 'auto';
            textarea.style.height = (textarea.scrollHeight) + 'px';
        },
        fetchTP(taskId) {
            var data = new FormData();
            data.append('id_projet', this.id_projet);
            data.append('task_id', taskId);
            data.append('urgent', this.selecturgent[taskId]);
            data.append('important', this.selectimportant[taskId]);
            data.append('priorite', this.selectpriorite[taskId]);
            // data.append('statut',this.selectstatut[taskId]);
            data.append('delai', this.selectdelai[taskId]);
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
                    this.selectdelai[taskId] = item.delai;
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
        async readApex() {
            var data = new FormData();
            data.append('id_p', this.id_projet);
            await axios({
                method: 'POST',
                url: 'http://localhost/planaction/projectinfo.php?action=read_apexresource',
                data: data
            }).then((response) => {
                console.log(response.data);
                const transformedData = {};
                response.data.forEach(item => {
                    var name = item.qui;
                    var task = item.tasklists;
                    var dateD = new Date(item.quandD).getTime();
                    var dateF = new Date(item.quandF).getTime();
                    transformedData[task] = {
                        name: name,
                        dateD: dateD,
                        dateF: dateF
                    };
                });
                this.series = Object.keys(transformedData).map(task => ({
                    name: transformedData[task].name,
                    data: [{
                        x: task,
                        y: [transformedData[task].dateD, transformedData[task].dateF]
                    }]
                }));
                console.log(this.series);


            }).catch((error) => {
                console.log(error)
            })
        },
        downloadPDF() {
            const doc = new jsPDF();
            this.cardContent = document.getElementById('card')
            const cardContent = this.cardContent;
            doc.html(cardContent, {
                callback: function (doc) {
                    // Téléchargez le PDF une fois que le contenu a été ajouté
                    doc.save('carte.pdf');
                }
            });
        }
    }
}
</script>
<style scoped>
.card {
    width: 1110px !important;
    margin-left: 60px;
}

.card-body h1 {
    text-align: center;
}

.container {
    margin-top: 100px;
}

h6 {
    margin-left: 25px;
}

p,
b {
    margin-left: 50px;
}

.pluslists {
    display: flex;
}

th,
td {
    border: 1px solid #2c2b2b;
    text-align: left;
}

tbody td {
    width: 100px !;
}

table {
    width: 990px !important;
}

.table {
    width: 990px !important;
}

.table3 {
    width: 990px !important;
}

.textarea {
    border: none;
    width: 130px;
    outline: none;
    height: auto;
}

#select1 {
    border: none;
    opacity: 0.8;
    width: 60px;
    margin-left: 20px;
}

.select2 {
    border: none;
    opacity: 0.8;
    width: auto;
    outline: none;
}

.reseau_acteur,
.tableau_action,
.tableau_priorité {
    margin-left: 50px !important;
}
.tableau_priorité{
    width: 800px!important;
}

.select-disabled {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

}

.textarea {
    resize: none;
    /* Empêche le redimensionnement du textarea par l'utilisateur */
    overflow: hidden;
    /* Cache la barre de défilement */
    height: auto;
}

.inputdate {
    border: none;
    outline: none;
}
</style>
