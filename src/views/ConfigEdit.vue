<template>
  <div class="container mt-4">
    <h2>Modifier la Configuration</h2>
    <form @submit.prevent="updateConfig">
      <div class="mb-3">
        <label class="form-label">Nom</label>
        <input v-model="form.name" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Composants (JSON)</label>
        <textarea v-model="form.components" class="form-control" rows="6" required></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Coût total (€)</label>
        <input v-model="form.totalPrice" class="form-control" type="number" required />
      </div>

      <button type="submit" class="btn btn-primary">Mettre à jour</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ConfigEdit',
  data() {
    return {
      form: {
        name: '',
        components: '',
        totalPrice: 0
      }
    };
  },
  async mounted() {
    try {
      const res = await axios.get(`/api/v1/configs/${this.$route.params.id}`);
      this.form = {
        name: res.data.name,
        components: JSON.stringify(res.data.components, null, 2),
        totalPrice: res.data.totalPrice
      };
    } catch (err) {
      console.error("Erreur chargement config :", err);
    }
  },
  methods: {
    async updateConfig() {
      try {
        const payload = {
          name: this.form.name,
          components: JSON.parse(this.form.components),
          totalPrice: this.form.totalPrice
        };
        await axios.put(`/api/v1/configs/${this.$route.params.id}`, payload);
        this.$router.push('/configs');
      } catch (err) {
        alert('Erreur mise à jour de la configuration');
      }
    }
  }
};
</script>
