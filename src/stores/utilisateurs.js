
import { defineStore } from 'pinia'
import api from '../api'

export const useUtilisateurStore = defineStore('utilisateurs', {
  state: () => ({
    utilisateurs: [],
  }),
  actions: {
    async fetchAll() {
      const res = await api.get('/users')
      this.utilisateurs = res.data
    }
  }
})
