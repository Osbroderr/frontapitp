<template>
  <div class="container mt-4">
    <h2>Utilisateurs</h2>
    <div class="mb-3">
      <input
        v-model="search"
        type="text"
        class="form-control"
        placeholder="Rechercher par nom ou email"
      />
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Date d'inscription</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ formatDate(user.createdAt) }}</td>
          <td>
            <router-link :to="`/users/${user._id}`" class="btn btn-sm btn-info">Détails</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '../services/api';

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
      search: ''
    };
  },
  computed: {
    filteredUsers() {
      const s = this.search.toLowerCase();
      return this.users.filter(user =>
        user.name.toLowerCase().includes(s) || user.email.toLowerCase().includes(s)
      );
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await axios.get('/users');
        this.users = res.data;
      } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs', err);
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('fr-FR');
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>
