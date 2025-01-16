<template>
  <v-card :loading="isLoading" class="mx-auto bg-white" variant="elevated" hover>
    <v-row no-gutters>
      <v-col cols="10" @click="handleEdit" @touchstart="handleEdit" class="cursor-pointer">
        <v-card-title class="d-flex align-center">
          {{ data.title }}
        </v-card-title>
        <v-card-text>
          {{ data.text }}
        </v-card-text>
        <v-card-actions class="text-p justify-end">
          <v-chip size="small" class="mr-2">By: {{ data.creator }}</v-chip>
          <v-chip size="small" class="mr-2">Created: {{ formattedDate(data.date) }}</v-chip>
          <v-chip size="small" :color="isOverdue ? 'error' : 'success'">
            Due: {{ formattedDate(data.datetofinish) }}
          </v-chip>
        </v-card-actions>
      </v-col>
      <v-col cols="2" class="d-flex justify-end align-center">
        <v-checkbox color="red" :model-value="taskStore.selected.includes(data.id)"
          @update:model-value="taskStore.addSelected(data.id)" class="checkbox-touch" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import type Item from '@/model/Item'
import { useTask } from '@/stores/Task'

const props = defineProps({
  data: {
    type: Object as () => Item,
    required: true,
  },
})

const taskStore = useTask()
const isLoading = ref(true)

const formattedDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const isOverdue = computed(() => {
  return new Date(props.data.datetofinish) < new Date(props.data.date)
})

const handleEdit = (event: Event) => {
  event.preventDefault()
  taskStore.editTask(props.data)
}

onMounted(() => {
  isLoading.value = false
})
</script>

<style lang="css" scoped>
.text-p {
  font-size: 0.6rem;
}
</style>
