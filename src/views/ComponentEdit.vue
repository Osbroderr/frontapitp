<template>
  <div class="container mt-4">
    <h2>Modifier un Composant</h2>
    <form v-if="loaded" @submit.prevent="updateComponent">
      <div class="mb-3">
        <label class="form-label">Catégorie</label>
        <select v-model="form.category" class="form-select" required>
          <option disabled value="">-- Sélectionnez une catégorie --</option>
          <option v-for="cat in categories" :key="cat._id" :value="cat._id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Titre</label>
        <input v-model="form.title" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea v-model="form.description" class="form-control" required></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Modèle</label>
        <input v-model="form.model" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Spécifications (JSON)</label>
        <textarea v-model="form.specs" class="form-control" required></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Marque</label>
        <input v-model="form.brand" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Image URL</label>
        <input v-model="form.imageUrl" class="form-control" required />
      </div>

      <button class="btn btn-primary" type="submit">Enregistrer les modifications</button>
    </form>
    <div v-else>
      <p>Chargement des données...</p>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'ComponentEdit',
  data() {
    return {
      form: {
        category: '',
        title: '',
        description: '',
        model: '',
        specs: '',
        brand: '',
        imageUrl: ''
      },
      categories: [],
      loaded: false
    };
  },
  methods: {
    async fetchComponent() {
      const { id } = this.$route.params;
      try {
        const res = await api.get(`/components/${id}`);
        const component = res.data;
        this.form = {
          category: component.category._id || component.category,
          title: component.title,
          description: component.description,
          model: component.model,
          specs: JSON.stringify(component.specifications, null, 2),
          brand: component.brand,
          imageUrl: component.imageUrl
        };
        this.loaded = true;
      } catch (err) {
        alert("Erreur lors du chargement du composant : " + err.message);
      }
    },
    async fetchCategories() {
      try {
        const res = await api.get('/categories');
        this.categories = res.data;
      } catch (err) {
        alert("Erreur lors du chargement des catégories");
      }
    },
    async updateComponent() {
      try {
        const { id } = this.$route.params;
        const payload = {
          category: this.form.category,
          title: this.form.title,
          description: this.form.description,
          model: this.form.model,
          specifications: JSON.parse(this.form.specs),
          brand: this.form.brand,
          imageUrl: this.form.imageUrl
        };
        await api.put(`/components/${id}`, payload);
        this.$router.push('/components');
      } catch (err) {
        alert("Erreur lors de la mise à jour : " + err.message);
      }
    }
  },
  mounted() {
    this.fetchCategories();
    this.fetchComponent();
  }
};
</script>

<style scoped>
textarea {
  min-height: 100px;
}
</style>
