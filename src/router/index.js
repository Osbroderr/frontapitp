import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ComposantsView from '../views/ComposantsView.vue'
import ComposantEditView from '../views/ComposantEditView.vue'
import ComposantAddView from '../views/ComposantAddView.vue'
import UtilisateursView from '../views/UtilisateursView.vue'
import UtilisateurDetailView from '../views/UtilisateurDetailView.vue'
import ConfigurationsView from '../views/ConfigurationsView.vue'
import ConfigurationDetailView from '../views/ConfigurationDetailView.vue'
import MarchandsView from '../views/MarchandsView.vue'
import MarchandAddView from '../views/MarchandAddView.vue'
import MarchandEditView from '../views/MarchandEditView.vue'

const routes = [
  { path: '/', name: 'login', component: LoginView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  { path: '/composants', name: 'composants', component: ComposantsView },
  { path: '/composants/ajouter', name: 'ajouter-composant', component: ComposantAddView },
  { path: '/composants/modifier/:id', name: 'modifier-composant', component: ComposantEditView },
  { path: '/utilisateurs', name: 'utilisateurs', component: UtilisateursView },
  { path: '/utilisateurs/:id', name: 'utilisateur-detail', component: UtilisateurDetailView },
  { path: '/configurations', name: 'configurations', component: ConfigurationsView },
  { path: '/configurations/:id', name: 'configuration-detail', component: ConfigurationDetailView },
  { path: '/marchands', name: 'marchands', component: MarchandsView },
  { path: '/marchands/ajouter', name: 'ajouter-marchand', component: MarchandAddView },
  { path: '/marchands/modifier/:id', name: 'modifier-marchand', component: MarchandEditView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'login' && !token) next({ name: 'login' })
  else next()
})
