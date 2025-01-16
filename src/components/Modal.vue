<template>
  <v-dialog v-model="ModalStore.dialog" persistent max-width="600px">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" color="primary" class="w-100">
        Add Task
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">{{ ModalStore.editMode ? 'Edit Task' : 'Add Task' }}</span>
      </v-card-title>

      <v-card-text>
        <v-form v-model="ModalStore.isValid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="ModalStore.data.title" label="Title*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="ModalStore.data.text" label="Description*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="ModalStore.data.creator" label="Creator*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="ModalStore.data.date" label="Date*" type="date" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="ModalStore.data.datetofinish" label="Due Date*" type="date"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select v-model="ModalStore.data.category" :items="taskStore.categories" label="Category*"
                  required></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" @click="ModalStore.closeDialog">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" @click="ModalStore.saveTask">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useModal } from '@/stores/modal'
import { useTask } from '@/stores/Task'

const props = defineProps({
  editMode: Boolean,
  taskToEdit: Object
})

const ModalStore = useModal()
const taskStore = useTask()

// Let the store handle the logic
ModalStore.initializeEditMode(props.taskToEdit)
</script>
