<template>
    <div class="container">
        <div class="card">
            <div class="card-body" id="card">
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
                    <h5>II-Les objectifs intermédiaires ou jalons ou d'étapes</h5>
                    <div class="mb-2" v-for="item in specificobjectives">
                        <span>
                            {{ item.objectives }}
                        </span>
                    </div>
                </div>
                <br>

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
                <div class="mesure_suivi"></div>
                <h5>V-Réseau d’acteur</h5>
                <div class="reseau_acteur" v-if="humanresources.length > 0">
                    <div v-for="(actorGroup, groupIndex) in actorGroups" :key="groupIndex">
                        <table>
                            <thead>
                                <tr>
                                    <th>Actions</th>
                                    <th v-for="(actor, actorIndex) in actorGroup" :key="actorIndex">{{ actor.firstname
                                        }} {{ actor.lastname }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(task, taskIndex) in tasklist" :key="taskIndex">
                                    <td>{{ task.tasklists }}</td>
                                    <td v-for="(actor, actorIndex) in actorGroup" :key="actorIndex">
                                        {{ selectedTasks[actor.id + '-' + task.id] }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br>
                    </div>
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
                                    {{ selectActor[task.id] }}
                                </td>
                                <td id="ou">
                                    {{ selectOu[task.id] }}
                                </td>
                                <td id="quand">
                                    {{ selectquandD[task.id] }} - <br>{{ selectquandF[task.id] }}
                                </td>
                                <td>
                                    {{ selectcomment[task.id] }}
                                </td>
                                <td>
                                    {{ selectpourquoi[task.id] }}
                                </td>
                                <td>
                                    {{ selectcombien[task.id] }}
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
                                    {{ selecturgent[task.id] }}
                                </td>
                                <td>
                                    {{ selectimportant[task.id] }}
                                </td>
                                <td>
                                    <p>{{ selectpriorite[task.id] }}</p>
                                </td>
                                <td>
                                    <p>{{ selectstatut[task.id] }}</p>
                                </td>
                                <td class="fr">
                                    {{ this.selectquandF[task.id] }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><br><br>
                <h5>VII-Planning ou le chronogramme des tâches</h5><br>
                <div>
                    <div id="chart">
                        <Gantdownload :bar-list="barList"
                            :project-id="id_projet"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { jsPDF } from "jspdf";
import Gantdownload from '@/components/gantdowload.vue';
import html2canvas from "html2canvas";
export default {
    props: ['id_projet'],
    components: { Gantdownload },
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
            barList: [],
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
        this.addBar();

    },
    computed: {
        actorGroups() {
            const groups = [];
            for (let i = 0; i < this.humanresources.length; i += 10) {
                groups.push(this.humanresources.slice(i, i + 10));
            }
            return groups;
        }
    },
    methods: {
        transformDate(dateStr) {
            if (!dateStr) return '';
            let [year, month, day] = dateStr.split('-');
            return `${day}-${month}-${year}`;
        },
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
                    this.selectquandD[taskId] = this.transformDate(item.quandD);
                    this.selectquandF[taskId] = this.transformDate(item.quandF);
                    console.log(this.selectquandF[taskId]);
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
                hasHandles: false,
                immobile:true,
                label: task.task,
                style: {
                    background: "#e09b69",
                    borderRadius: "20px",
                    color: "black"
                }
                }
            }))
            }));
            console.log( this.barList);
        } catch (error) {
            console.log(error);
        }
        },
        downloadPDF() {
            window.html2canvas = html2canvas
            const doc = new jsPDF({
                    orientation: 'p',
                    unit: 'px',
                    format: 'a4',
                    floatPrecision: 16,
                    hotfixes: ["px_scaling"],
                });

            try {
            const page = document.querySelector('#card')
            doc.setFontSize(12)
            doc.html(page, {
                margin:[60,0,100,20],
                callback: function (doc) {
                doc.save(`carte.pdf`)
                },
                x: 10,
                y: 10
            })
            } catch (err) {
               console.error(err)
            }
            /*
            const cardContent = document.getElementById('card');
            html2canvas(cardContent).then(canvas => {
                const doc = new jsPDF({
                    orientation: 'p',
                    unit: 'px',
                    format: 'a4',
                    floatPrecision: 16,
                    hotfixes: ["px_scaling"],
                });
                let x = 0, y = 0, w = cardContent.clientWidth, h = cardContent.clientHeight;
                var width = doc.internal.pageSize.getWidth();
                var height = doc.internal.pageSize.getHeight();
                console.log({height});
                console.log({width});
                while (y <= h) {
                    if (y > 0) {
                        doc.addPage('a4', 'p');
                    }
                    doc.addImage(canvas, 'PNG', 0, -y, 4);
                    y += 1024;
                }
                doc.save('carte.pdf');
            }).catch((error) => {
                console.error('Erreur lors de la capture de la carte avec html2canvas:', error);
            });
            */
        }
    }
}
</script>
<style scoped>
#card {
    width: 800px;
}
.card{
    margin-left: 180px;
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
    width: 680px !important;
}

.table {
    width: 680px !important;
}

.table3 {
    width: 680px !important;
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

.tableau_priorité {
    width: 800px !important;
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



#card h1 {
    font-size: 30px !important;
}

#card h5 {
    font-size: 19px !important;
}

#card h6 {
    font-size: 16px !important;
}

#card * {
    font-size: 13px !important;
}
</style>
