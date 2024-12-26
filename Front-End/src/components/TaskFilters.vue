<template>
  <v-card class="mb-4">
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field v-model="taskStore.filters.search" label="Search tasks" prepend-icon="mdi-magnify" clearable />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select v-model="taskStore.filters.priority" :items="['high', 'medium', 'low']" label="Priority"
            clearable />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select v-model="taskStore.filters.status" :items="['pending', 'in-progress', 'completed']" label="Status"
            clearable />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useTask } from '@/stores/Task'
const taskStore = useTask()
</script>
