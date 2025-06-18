
import { defineStore } from 'pinia'
import api from '../api'

export const usePartenaireStore = defineStore('partenaires', {
  state: () => ({
    partenaires: [],
  }),
  actions: {
    async fetchAll() {
      const res = await api.get('/partners')
      this.partenaires = res.data
    }
  }
})
