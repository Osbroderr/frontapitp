<template>
  <div class="container mt-4" v-if="config">
    <h2>Détail de la Configuration</h2>
    <p><strong>Nom :</strong> {{ config.name }}</p>
    <p><strong>Utilisateur :</strong> {{ config.user.name || config.user }}</p>
    <p><strong>Date :</strong> {{ new Date(config.createdAt).toLocaleString() }}</p>

    <h4>Composants sélectionnés :</h4>
    <ul>
      <li v-for="(component, type) in config.components" :key="type">
        <strong>{{ type.toUpperCase() }} :</strong> {{ component.title }} ({{ component.model }})
      </li>
    </ul>

    <p><strong>Coût total :</strong> {{ config.totalPrice }} €</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ConfigDetail',
  data() {
    return {
      config: null
    };
  },
  async mounted() {
    try {
      const res = await axios.get(`/api/v1/configs/${this.$route.params.id}`);
      this.config = res.data;
    } catch (error) {
      console.error("Erreur chargement configuration :", error);
    }
  }
};
</script>
