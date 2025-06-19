<template>
  <div class="container mt-4">
    <h2>Partenaires Marchands</h2>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <input v-model="search" class="form-control me-3" placeholder="Rechercher par nom..." style="max-width: 300px;" />
      <router-link to="/merchants/new" class="btn btn-primary">Ajouter un Partenaire</router-link>
    </div>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Nom</th>
          <th>URL</th>
          <th>Taux de Commission</th>
          <th>Conditions</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="merchant in filteredMerchants" :key="merchant._id">
          <td>{{ merchant.name }}</td>
          <td><a :href="merchant.url" target="_blank">{{ merchant.url }}</a></td>
          <td>{{ merchant.commissionRate }}%</td>
          <td>{{ merchant.conditions || '-' }}</td>
          <td>
            <router-link :to="`/merchants/edit/${merchant._id}`" class="btn btn-sm btn-warning">Modifier</router-link>
            <button class="btn btn-sm btn-danger ms-2" @click="deleteMerchant(merchant._id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'MerchantList',
  data() {
    return {
      merchants: [],
      search: ''
    };
  },
  computed: {
    filteredMerchants() {
      return this.merchants.filter(merchant =>
        merchant.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    async fetchMerchants() {
      try {
        const res = await api.get('/merchants');
        this.merchants = res.data;
      } catch (err) {
        console.error('Erreur récupération partenaires :', err);
      }
    },
    async deleteMerchant(id) {
      if (confirm('Voulez-vous vraiment supprimer ce partenaire ?')) {
        await api.delete(`/merchants/${id}`);
        this.merchants = this.merchants.filter(m => m._id !== id);
      }
    }
  },
  mounted() {
    this.fetchMerchants();
  }
};
</script>
