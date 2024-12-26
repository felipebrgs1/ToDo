<template>
  <v-card class="text-center pa-6">
    <v-icon size="64" color="grey">mdi-clipboard-text-outline</v-icon>
    <h3 class="text-h6 mt-4">No tasks found</h3>
    <p class="text-body-2 text-grey">{{ message }}</p>
    <v-btn color="primary" class="mt-4" @click="$emit('add')">
      Add your first task
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: 'Start by adding a new task'
  }
})
defineEmits(['add'])
</script>
