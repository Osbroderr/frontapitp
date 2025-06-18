
import { defineStore } from 'pinia'
import api from '../api'

export const useComposantStore = defineStore('composants', {
  state: () => ({
    composants: [],
  }),
  actions: {
    async fetchAll() {
      const res = await api.get('/components')
      this.composants = res.data
    },
    async deleteComposant(id) {
      await api.delete(`/components/${id}`)
      this.fetchAll()
    }
  }
})
