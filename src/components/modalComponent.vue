<!-- ModalComponent.vue -->
<template>
    <div>
      <!-- Bouton pour ouvrir le modal -->
      <button type="button" class="btn btn-outline-success btn-sm mb-2" @click="showModal = true">
       +
      </button>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Ajouter une mesure de suivi</h5>
              <button type="button" class="close" @click="showModal = false" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitForm">
                <div class="form-group">
                  <label for="measureName">Nom de la mesure</label>
                  <input name="signification" type="text" class="form-control" id="measureName" v-model="formData.measureName" required>
                </div>
                <div class="form-group">
                  <label for="measureValue">Sigle de la mesure</label>
                  <input name="sigle" type="text" class="form-control" id="measureValue" v-model="formData.measureValue" required>
                </div>
                <button type="submit" class="btn btn-primary" id="btn">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Backdrop -->
      <div v-if="showModal" class="modal-backdrop fade show"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
    onSubmit: {
    type: Function,
    required: true
    },
    id_projet: {
        type: String, // ou le type approprié
        required: true
    },
    
    },
    data() {
      return {
        showModal: false,
        formData: {
          measureName: '',
          measureValue: ''
        }
      };
    },
    methods: {
    async submitForm() {
        var data= new FormData();
        data.append('signification',this.formData.measureName);
        data.append('sigle',this.formData.measureValue);
        data.append('id_projet',this.id_projet);
        await this.onSubmit(data);
        try {
            this.showModal = false;
            this.formData.measureName = '';
            this.formData.measureValue = '';
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        }
    }
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    z-index: 1040;
  }
  .modal {
    z-index: 1050;
  }
  .close{
    margin-left:180px ;
    margin-top:10px;
    border: none;
  }
  #btn{
    margin-top: 15px;
    margin-left:380px ;
  }
  </style>
  