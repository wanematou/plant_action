<template>
  <div>
    <!-- Barre latérale -->
    <nav id="sidebar">
      <div class="sidebar-header">
        <h5 class="text-white">Présentation du projet</h5> <!-- "Presentation du projet" corrigé en "Présentation du projet" -->
      </div>
      <ul class="list-unstyled components">
        <li>
          <router-link to="/projectname" class="text-decoration-none text-white">Nom du projet</router-link>
        </li>
        <li>
          <router-link to="/objective" class="text-decoration-none text-white">Objectifs</router-link>
        </li>
        <li>
          <router-link to="/QCDobjective" class="text-decoration-none text-white">Objectifs QCD</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  // Votre script Vue.js
};
</script>

<style scoped>
/* Styles personnalisés pour la barre latérale */
#sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px; /* Largeur réduite */
  background-color: rgb(31, 134, 236); /* Ajout de point-virgule et correction de la couleur */
}

.sidebar-header {
  padding: 1rem;
  text-align: center;
}

.sidebar-header h5 { /* Changement de h3 à h5 */
  margin-bottom: 0;
}

.components {
  padding: 0;
  margin: 0;
}

.components li {
  padding: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.components li:last-child {
  border-bottom: none;
}

.components li a {
  display: block;
}

</style>
