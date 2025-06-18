<template>
  <form @submit.prevent="handleLogin" class="card p-4 shadow-sm">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input v-model="email" type="email" class="form-control" id="email" required />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Mot de passe</label>
      <input v-model="password" type="password" class="form-control" id="password" required />
    </div>
    <button :disabled="loading" type="submit" class="btn btn-primary w-100">
      {{ loading ? 'Connexion...' : 'Se connecter' }}
    </button>
    <p v-if="error" class="text-danger mt-2">{{ error }}</p>
  </form>
</template>

<script>
import axios from '../services/api';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: ''
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = '';
      try {
        const res = await axios.post('/auth/login', {
          email: this.email,
          password: this.password
        });
        const token = res.data.token;
        localStorage.setItem('token', token);
        this.$router.push('/');
      } catch (err) {
        this.error = 'Email ou mot de passe invalide.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
