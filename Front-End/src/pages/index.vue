<template>
  <v-container>
    <h1 class="text-center text-black">To Do List</h1>

    <TaskFilters />

    <v-row>
      <v-col cols="12">
        <template v-if="taskStore.filteredTasks.length">
          <TransitionGroup name="list">
            <Card v-for="task in taskStore.filteredTasks" :key="task.id" :data="task" class="my-3" @edit="editTask" />
          </TransitionGroup>
        </template>
        <EmptyState v-else @add="() => taskToEdit = null" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-btn color="red" class="w-100" @click="taskStore.deleteSelected">
          Delete Selected
        </v-btn>
      </v-col>
      <v-col cols="6">
        <Modal :edit-mode="!!taskToEdit" :task-to-edit="taskToEdit" @close="taskToEdit = null" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTask } from '@/stores/Task'
import Modal from '@/components/Modal.vue'
import type Item from '@/model/Item'

const taskStore = useTask()
const taskToEdit = ref<Item | null>(null)

const editTask = (task: Item) => {
  taskToEdit.value = task
}

onMounted(() => {
  taskStore.loadFromLocalStorage()
})
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
