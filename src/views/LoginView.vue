<template>
  <div class="container mt-5" style="max-width: 400px;">
    <h2>Connexion Admin</h2>
    <LoginForm @submit="login" />
    <p class="text-danger mt-3" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import api from '../services/api';
import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm
  },
  data() {
    return {
      error: ''
    };
  },
  methods: {
    async login({ email, password }) {
      try {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        this.$router.push('/');
      } catch (err) {
        this.error = 'Email ou mot de passe incorrect.';
      }
    }
  }
};
</script>
