<template>
  <div class="container mt-5" style="max-width: 400px;">
    <h2>Connexion Admin</h2>
    <LoginForm @submit="login" />
    <p class="text-danger mt-3" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm
  }
};
</script>
