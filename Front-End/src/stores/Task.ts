import { defineStore } from 'pinia'
import type Item from '@/model/Item'

export const useTask = defineStore('Task', {
  state: () => ({
    tasks: [] as Item[],
    selected: [] as number[],
    newTask: {} as Item,
    lastId: 0,
    filters: {
      search: '',
      priority: null as 'high' | 'medium' | 'low' | null,
      status: null as 'pending' | 'in-progress' | 'completed' | null,
    },
  }),
  actions: {
    addTask(task: Item) {
      this.lastId++
      task.id = this.lastId
      this.tasks.push({...task})
      this.saveToLocalStorage()
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
      this.saveToLocalStorage()
    },
    addSelected(id: number) {
      if (this.selected.includes(id)) {
        this.selected = this.selected.filter(item => item !== id)
      } else {
        this.selected.push(id)
      }
    },
    deleteSelected() {
      this.tasks = this.tasks.filter((t) => !this.selected.includes(t.id))
      this.selected = []
      this.saveToLocalStorage()
    },
    updateTask(task: Item) {
      const index = this.tasks.findIndex(t => t.id === task.id)
      if (index !== -1) {
        this.tasks[index] = {...task}
        this.saveToLocalStorage()
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      localStorage.setItem('lastId', this.lastId.toString())
    },
    loadFromLocalStorage() {
      const savedTasks = localStorage.getItem('tasks')
      const savedLastId = localStorage.getItem('lastId')

      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks)
      }
      if (savedLastId) {
        this.lastId = Number.parseInt(savedLastId)
      }
    },
    clearCache() {
      localStorage.removeItem('tasks')
      this.tasks = []
    }
  },
  getters: {
    getTasks(): Item[] {
      return this.tasks.sort((a, b) => new Date(a.datetofinish).getTime() - new Date(b.datetofinish).getTime())
    },
    filteredTasks(): Item[] {
      let filtered = [...this.tasks]

      // Search filter
      if (this.filters.search) {
        const search = this.filters.search.toLowerCase()
        filtered = filtered.filter(task =>
          task.title.toLowerCase().includes(search) ||
          task.text.toLowerCase().includes(search)
        )
      }

      // Priority filter
      if (this.filters.priority) {
        filtered = filtered.filter(task => task.priority === this.filters.priority)
      }

      // Status filter
      if (this.filters.status) {
        filtered = filtered.filter(task => task.status === this.filters.status)
      }

      // Sort by due date
      return filtered.sort((a, b) =>
        new Date(a.datetofinish).getTime() - new Date(b.datetofinish).getTime()
      )
    },
  },
})
