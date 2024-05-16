<!-- <template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Acteurs</th>
          <th v-for="(task, index) in tasks" :key="index">{{ task }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(actor, actorIndex) in actors" :key="actorIndex">
          <td>{{ actor }}</td>
          <td v-for="(task, taskIndex) in tasks" :key="taskIndex">
            <select v-model="selectedTasks[actorIndex][taskIndex]">
              <option v-for="(option, optionIndex) in taskOptions" :key="optionIndex">{{ option }}</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actors: ['Actor 1', 'Actor 2', 'Actor 3'],
      tasks: ['Task 1', 'Task 2', 'Task 3'],
      taskOptions: ['Option 1', 'Option 2', 'Option 3'],
      selectedTasks: []
    };
  },
  mounted() {
    this.selectedTasks = Array.from({ length: this.actors.length }, () =>
      Array.from({ length: this.tasks.length }, () => '')
    );
  }
};
</script> -->
<template>
  <div class="container">
      <div class="card">
          <div class="card-body">
              <!-- Autres parties de votre modèle ici -->

              <div class="reseau_acteur">
                  <table>
                      <thead>
                          <tr>
                              <th>Actions</th>
                              <th v-for="(actor, actorIndex) in humanresources" :key="actorIndex">{{ actor.firstname }} {{ actor.lastname }}</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="(task, taskIndex) in tasklist" :key="taskIndex">
                              <td>{{ task.tasklists }}</td>
                              <td v-for="(actor, actorIndex) in humanresources" :key="actorIndex">
                                  <select v-model="selectedTasks[actorIndex][taskIndex]">
                                      <option v-for="(option, optionIndex) in pluslists" :key="optionIndex">{{ option.sigle }}</option>
                                  </select>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

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
          selectedTasks: []
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
      this.readhumanresource();
  },
  methods: {
      // Méthodes de chargement des données depuis votre backend

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
              // Initialiser selectedTasks après le chargement des données des ressources humaines
              this.initSelectedTasks();
          }).catch((error) => {
              console.log(error)
          })
      },
      initSelectedTasks() {
          // Initialiser selectedTasks avec des tableaux vides pour chaque combinaison d'acteur et de tâche
          this.selectedTasks = Array.from({ length: this.humanresources.length }, () =>
              Array.from({ length: this.tasklist.length }, () => '')
          );
      }
  }
}
</script>

<style scoped>
  /* Vos styles CSS ici */
</style>
