<template>
  <v-dialog v-model="dialog" persistent width="500">
    <template v-slot:activator="{ props }">
      <v-btn v-if="!editMode" v-bind="props" color="primary" class="w-100">
        Add Task
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        {{ editMode ? 'Edit Task' : 'Add Task' }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isValid">
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="taskData.title" label="Title" :rules="[v => !!v || 'Title is required']" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="taskData.text" label="Text" :rules="[v => !!v || 'Description is required']" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="taskData.creator" label="Creator" :rules="[v => !!v || 'Creator is required']" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="taskData.date" label="Date" type="date"
                :rules="[v => !!v || 'Date is required']" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="taskData.datetofinish" label="Due Date" type="date"
                :rules="[v => !!v || 'Due date is required']" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="saveTask" :disabled="!isValid">
          {{ editMode ? 'Save' : 'Add' }}
        </v-btn>
        <v-btn color="red" @click="closeModal">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { useTask } from '@/stores/Task'
import type Item from '@/model/Item'

const props = defineProps({
  editMode: Boolean,
  taskToEdit: Object as () => Item | null
})

const emit = defineEmits(['close'])
const taskStore = useTask()
const dialog = ref(false)
const form = ref(null)
const isValid = ref(false)

const taskData = ref<Item>({
  id: 0,
  title: '',
  text: '',
  creator: '',
  date: '',
  datetofinish: ''
})

watch(() => props.taskToEdit, (newVal) => {
  if (newVal) {
    taskData.value = { ...newVal }
    dialog.value = true
  }
}, { immediate: true })

const saveTask = async () => {
  if (!isValid.value) return

  if (props.editMode && props.taskToEdit) {
    taskStore.updateTask(taskData.value)
  } else {
    taskStore.addTask(taskData.value)
  }
  closeModal()
}

const closeModal = () => {
  dialog.value = false
  taskData.value = {
    id: 0,
    title: '',
    text: '',
    creator: '',
    date: '',
    datetofinish: ''
  }
  emit('close')
}

addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
})
</script>
