<template>
  <div class="container mt-4">
    <h2>Liste des Composants</h2>
    <div class="row mb-3">
      <div class="col-md-4">
        <input v-model="filters.category" class="form-control" placeholder="Filtrer par catégorie" />
      </div>
      <div class="col-md-4">
        <input v-model="filters.brand" class="form-control" placeholder="Filtrer par marque" />
      </div>
      <div class="col-md-4 text-end">
        <router-link to="/components/new" class="btn btn-primary">Ajouter un composant</router-link>
      </div>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Catégorie</th>
          <th>Modèle</th>
          <th>Marque</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="component in filteredComponents" :key="component._id">
          <td>{{ component.category }}</td>
          <td>{{ component.model }}</td>
          <td>{{ component.brand }}</td>
          <td>{{ component.description }}</td>
          <td>
            <router-link :to="`/components/edit/${component._id}`" class="btn btn-sm btn-warning">Modifier</router-link>
            <button class="btn btn-sm btn-danger ms-2" @click="deleteComponent(component._id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../services/api';;

export default {
  name: 'ComponentList',
  data() {
    return {
      components: [],
      filters: {
        category: '',
        brand: ''
      }
    };
  },
  computed: {
    filteredComponents() {
      return this.components.filter(c =>
        c.category.toLowerCase().includes(this.filters.category.toLowerCase()) &&
        c.brand.toLowerCase().includes(this.filters.brand.toLowerCase())
      );
    }
  },
  methods: {
    async fetchComponents() {
      try {
        const response = await api.get('/components');
        this.components = response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des composants:', error);
      }
    },
    async deleteComponent(id) {
      if (confirm('Confirmer la suppression de ce composant ?')) {
        try {
          await api.delete(`/components/${id}`);
          this.components = this.components.filter(c => c._id !== id);
        } catch (error) {
          alert('Erreur lors de la suppression');
        }
      }
    }
  },
  mounted() {
    this.fetchComponents();
  }
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
