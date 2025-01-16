<template>
  <v-container>
    <h1 class="text-center text-black">To Do List</h1>

    <v-row class="mb-4">
      <v-col cols="6">
        <v-select v-model="uiStore.selectedCategory" :items="taskStore.categories" label="Filter by Category" clearable
          @update:model-value="taskStore.filterTasks($event)" />
      </v-col>
      <v-col cols="6">
        <v-select v-model="uiStore.sortBy" :items="[
          { title: 'Due Date', value: 'date' },
          { title: 'Title', value: 'title' }
        ]" label="Sort by" @update:model-value="taskStore.setSortBy($event)" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <template v-for="task in taskStore.getTasks" :key="task.id">
          <Card :data="task" class="my-3" @edit="editTask" />
        </template>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-btn color="red" class="w-100" @click="deleteSelected">
          Delete Selected
        </v-btn>
      </v-col>
      <v-col cols="6">
        <Modal :edit-mode="!!taskToEdit" :task-to-edit="taskToEdit" @close="closeModal" />
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTask } from '@/stores/Task'
import { useModal } from '@/stores/modal'
import { useUI } from '@/stores/ui'
import Modal from '@/components/Modal.vue'
import type Item from '@/model/Item'

const taskStore = useTask()
const modalStore = useModal()
const uiStore = useUI()
const taskToEdit = ref<Item | null>(null)
const snackbar = taskStore.snackbar

const editTask = (task: Item) => {
  taskToEdit.value = task
  modalStore.dialog = true
}

const closeModal = () => {
  taskToEdit.value = null
  modalStore.dialog = false
}

const deleteSelected = () => {
  taskStore.deleteSelected()
  taskStore.showNotification('Selected tasks deleted', 'success')
}

onMounted(() => {
  taskStore.initialize()
})
</script>
