<template>
  <div class="container mt-4">
    <h2>Ajouter un Partenaire Marchand</h2>
    <form @submit.prevent="addMerchant">
      <div class="mb-3">
        <label class="form-label">Nom du site</label>
        <input v-model="form.name" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">URL</label>
        <input v-model="form.url" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Taux de commission (%)</label>
        <input v-model.number="form.commissionRate" class="form-control" type="number" step="0.1" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Conditions</label>
        <textarea v-model="form.conditions" class="form-control"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';;

export default {
  name: 'MerchantForm',
  data() {
    return {
      form: {
        name: '',
        url: '',
        commissionRate: 0,
        conditions: ''
      }
    };
  },
  methods: {
    async addMerchant() {
      try {
        await api.post('/merchants', this.form);
        this.$router.push('/merchants');
      } catch (err) {
        alert('Erreur lors de l’ajout');
      }
    }
  }
};
</script>
