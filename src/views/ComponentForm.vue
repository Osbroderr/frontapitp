<template>
  <div class="container mt-4">
    <h2>Ajouter un Composant</h2>
    <form @submit.prevent="submitComponent">
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
        <textarea v-model="form.specs" class="form-control" placeholder='{"core": "8", "frequency": "3.6GHz"}' required></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Marque</label>
        <input v-model="form.brand" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Image URL</label>
        <input v-model="form.image" class="form-control" required />
      </div>

      <button class="btn btn-success" type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'ComponentForm',
  data() {
    return {
      form: {
        category: '',
        title: '',
        description: '',
        model: '',
        specs: '',
        brand: '',
        image: ''
      },
      categories: []
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const res = await api.get('/categories');
        if (res.data.length === 0) {
          await this.seedCategories();
          const reRes = await api.get('/categories');
          this.categories = reRes.data;
        } else {
          this.categories = res.data;
        }
      } catch (err) {
        alert('Erreur lors du chargement des catégories : ' + err);
      }
    },
    async seedCategories() {
      const defaultCategories = [
        'CPU',
        'GPU',
        'RAM',
        'Storage',
        'Motherboard',
        'Case',
        'PowerSupply',
        'Cooling'
      ];

      for (const name of defaultCategories) {
        try {
          await api.post('/categories', {
            name,
            description: `Catégorie pour ${name}`
          });
        } catch (e) {
          
        }
      }
    },
    async submitComponent() {
      try {
        const payload = {
          category: this.form.category,
          title: this.form.title,
          description: this.form.description,
          model: this.form.model,
          specifications: JSON.parse(this.form.specs),
          brand: this.form.brand,
          imageUrl: this.form.image
        };

        await api.post('/components', payload);
        this.$router.push('/components');
      } catch (err) {
        alert("Erreur lors de l'ajout du composant : " + err.message);
      }
    }
  },
  mounted() {
    this.fetchCategories();
  }
};
</script>

<style scoped>
textarea {
  min-height: 100px;
}
</style>
