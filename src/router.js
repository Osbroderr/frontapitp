// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

// Views
import LoginView from './views/LoginView.vue';
import ComponentList from './views/ComponentList.vue';
import ComponentForm from './views/ComponentForm.vue';
import ComponentEdit from './views/ComponentEdit.vue';
import UserList from './views/UserList.vue';
import UserDetail from './views/UserDetail.vue';
import ConfigList from './views/ConfigList.vue';
import ConfigDetail from './views/ConfigDetail.vue';
import ConfigEdit from './views/ConfigEdit.vue';
import MerchantList from './views/MerchantList.vue';
import MerchantForm from './views/MerchantForm.vue';
import MerchantEdit from './views/MerchantEdit.vue';

const routes = [
  { path: '/', redirect: '/components' },
  { path: '/login', component: LoginView },
  { path: '/components', component: ComponentList },
  { path: '/components/new', component: ComponentForm },
  { path: '/components/edit/:id', component: ComponentEdit },
  { path: '/users', component: UserList },
  { path: '/users/:id', component: UserDetail },
  { path: '/configs', component: ConfigList },
  { path: '/configs/:id', component: ConfigDetail },
  { path: '/configs/edit/:id', component: ConfigEdit },
  { path: '/merchants', component: MerchantList },
  { path: '/merchants/new', component: MerchantForm },
  { path: '/merchants/edit/:id', component: MerchantEdit }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protéger les routes sauf /login
router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('token');

  if (authRequired && !token) {
    return next('/login');
  }

  next();
});

export default router;
