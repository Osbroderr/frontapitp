
<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
        <th v-if="hasActions">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item._id">
        <td v-for="field in fields" :key="field">{{ item[field] }}</td>
        <td v-if="hasActions">
          <button @click="$emit('edit', item)">Modifier</button>
          <button @click="$emit('delete', item)">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps(['headers', 'fields', 'items', 'hasActions'])
defineEmits(['edit', 'delete'])
</script>
