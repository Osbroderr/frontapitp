<template>
  <div class="container mt-4">
    <h2>Ajouter un Composant</h2>
    <form @submit.prevent="submitComponent">
      <div class="mb-3">
        <label class="form-label">Catégorie</label>
        <input v-model="form.category" class="form-control" required />
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
import api from '../services/api';;

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
      }
    };
  },
  methods: {
    async submitComponent() {
      try {
        const payload = {
          ...this.form,
          specs: JSON.parse(this.form.specs)
        };
        await api.post('/components', payload);
        this.$router.push('/components');
      } catch (err) {
        alert("Erreur lors de l'ajout du composant : " + err);
      }
    }
  }
};
</script>

<style scoped>
textarea {
  min-height: 100px;
}
</style>
