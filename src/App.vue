<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <router-link class="navbar-brand" to="/">Admin Panel</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/components">Composants</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/users">Utilisateurs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/configs">Configurations</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/merchants">Marchands</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li v-if="isAuthenticated" class="nav-item">
            <button class="btn btn-sm btn-outline-light" @click="logout">Déconnexion</button>
          </li>
        </ul>
      </div>
    </nav>

    <main class="py-4">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f8f9fa;
}

main {
  padding: 20px;
}
</style>
