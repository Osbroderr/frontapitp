<template>
  <div class="container mt-4">
    <h2>Détails de l'utilisateur</h2>
    <div v-if="user">
      <p><strong>Nom:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>

      <h4>Configurations sauvegardées</h4>
      <ul v-if="user.configs && user.configs.length">
        <li v-for="config in user.configs" :key="config._id">
          {{ config.name }} — {{ new Date(config.createdAt).toLocaleDateString() }}
        </li>
      </ul>
      <p v-else>Aucune configuration enregistrée.</p>
    </div>
    <div v-else>
      Chargement...
    </div>
  </div>
</template>

<script>
import api from '../services/api';;

export default {
  name: 'UserDetail',
  data() {
    return {
      user: null
    };
  },
  async mounted() {
    try {
      const res = await api.get(`/users/${this.$route.params.id}`);
      this.user = res.data;
    } catch (error) {
      console.error("Erreur chargement utilisateur :", error);
    }
  }
};
</script>

<style scoped>
h4 {
  margin-top: 2rem;
}
</style>
