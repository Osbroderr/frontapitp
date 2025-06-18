<template>
  <div class="container mt-4">
    <h2>Liste des Utilisateurs</h2>
    <div class="row mb-3">
      <div class="col-md-6">
        <input v-model="search" class="form-control" placeholder="Rechercher par nom ou email" />
      </div>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <router-link :to="`/users/${user._id}`" class="btn btn-sm btn-primary">Détails</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

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
      return this.users.filter(u =>
        u.name.toLowerCase().includes(this.search.toLowerCase()) ||
        u.email.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await axios.get('/api/v1/users');
        this.users = res.data;
      } catch (err) {
        alert('Erreur de chargement des utilisateurs');
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>
