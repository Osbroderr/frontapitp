
import { defineStore } from 'pinia'
import api from '../api'

export const useConfigurationStore = defineStore('configurations', {
  state: () => ({
    configurations: [],
  }),
  actions: {
    async fetchAll() {
      const res = await api.get('/configurations')
      this.configurations = res.data
    }
  }
})
