<template>
  <div class="container mt-4">
    <h2>Liste des Configurations</h2>
    <div class="mb-3">
      <input v-model="searchUser" class="form-control" placeholder="Rechercher par utilisateur (ID ou nom)" />
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Utilisateur</th>
          <th>Date</th>
          <th>Coût Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="config in filteredConfigs" :key="config._id">
          <td>{{ config.user?.name || config.user || 'Inconnu' }}</td>
          <td>{{ formatDate(config.createdAt) }}</td>
          <td>{{ totalCost(config) }} €</td>
          <td>
            <router-link :to="`/configs/${config._id}`" class="btn btn-sm btn-info">Détails</router-link>
            <router-link :to="`/configs/edit/${config._id}`" class="btn btn-sm btn-warning ms-2">Modifier</router-link>
            <button @click="deleteConfig(config._id)" class="btn btn-sm btn-danger ms-2">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '../services/api';

export default {
  name: 'ConfigList',
  data() {
    return {
      configs: [],
      searchUser: ''
    };
  },
  computed: {
    filteredConfigs() {
      return this.configs.filter(config =>
        config.user?.name?.toLowerCase().includes(this.searchUser.toLowerCase()) ||
        config.user?.toLowerCase?.().includes(this.searchUser.toLowerCase())
      );
    }
  },
  methods: {
    async fetchConfigs() {
      try {
        const res = await axios.get('/configs'); // endpoint fictif
        this.configs = res.data;
      } catch (err) {
        console.error('Erreur récupération configs:', err);
      }
    },
    totalCost(config) {
      return config.components?.reduce((sum, c) => sum + (c.price || 0), 0).toFixed(2) || 0;
    },
    async deleteConfig(id) {
      if (confirm('Supprimer cette configuration ?')) {
        await axios.delete(`/configs/${id}`);
        this.configs = this.configs.filter(c => c._id !== id);
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('fr-FR');
    }
  },
  mounted() {
    this.fetchConfigs();
  }
};
</script>
