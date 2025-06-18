
<template>
  <div>
    <h2>Liste des Composants</h2>
    <input v-model="search" placeholder="Rechercher..." />
    <ul>
      <li v-for="comp in filteredComposants" :key="comp._id">
        {{ comp.title }} - {{ comp.category }} - {{ comp.brand }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../api'

const composants = ref([])
const search = ref('')

const filteredComposants = computed(() => {
  return composants.value.filter(comp =>
    comp.title.toLowerCase().includes(search.value.toLowerCase())
  )
})

onMounted(async () => {
  try {
    const res = await api.get('/components')
    composants.value = res.data
  } catch (error) {
    console.error("Erreur chargement composants")
  }
})
</script>
