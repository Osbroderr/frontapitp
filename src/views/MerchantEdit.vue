<template>
  <div class="container mt-4">
    <h2>Modifier le Partenaire</h2>
    <form @submit.prevent="updateMerchant">
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
        <input v-model.number="form.commissionRate" type="number" class="form-control" step="0.1" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Conditions</label>
        <textarea v-model="form.conditions" class="form-control"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Enregistrer les modifications</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';;

export default {
  name: 'MerchantEdit',
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
  async mounted() {
    try {
      const res = await api.get(`/merchants/${this.$route.params.id}`);
      this.form = res.data;
    } catch (err) {
      console.error('Erreur chargement partenaire :', err);
    }
  },
  methods: {
    async updateMerchant() {
      try {
        await api.put(`/merchants/${this.$route.params.id}`, this.form);
        this.$router.push('/merchants');
      } catch (err) {
        alert('Erreur mise à jour du partenaire');
      }
    }
  }
};
</script>
