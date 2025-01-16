import { defineStore } from "pinia";
import type Item from "@/model/Item";
import { useModal } from "./modal";

export const useTask = defineStore("Task", {
	state: () => ({
		tasks: [] as Item[],
		selected: [] as number[],
		newTask: {
			id: 0,
			title: "",
			text: "",
			creator: "",
			date: "",
			datetofinish: "",
			category: "",
		} as Item,
		lastId: 0,
		categories: ["Work", "Personal", "Shopping", "Other"] as string[],
		filter: {
			category: "",
			sortBy: "date",
		},
		snackbar: {
			show: false,
			text: "",
			color: "",
		},
	}),
	actions: {
		addTask(task: Item) {
			this.lastId++;
			task.id = this.lastId;
			this.tasks.push({ ...task });
			this.saveToLocalStorage();
		},
		removeTask(id: number) {
			this.tasks = this.tasks.filter((t) => t.id !== id);
			this.saveToLocalStorage();
		},
		addSelected(id: number) {
			if (this.selected.includes(id)) {
				this.selected = this.selected.filter((item) => item !== id);
			} else {
				this.selected.push(id);
			}
		},
		deleteSelected() {
			this.tasks = this.tasks.filter((t) => !this.selected.includes(t.id));
			this.selected = [];
			this.saveToLocalStorage();
		},
		updateTask(task: Item) {
			const index = this.tasks.findIndex((t) => t.id === task.id);
			if (index !== -1) {
				this.tasks[index] = { ...task };
				this.saveToLocalStorage();
			}
		},
		saveToLocalStorage() {
			try {
				localStorage.setItem("tasks", JSON.stringify(this.tasks));
				localStorage.setItem("lastId", this.lastId.toString());
			} catch (error) {
				console.error("Error saving to localStorage:", error);
			}
		},
		loadFromLocalStorage() {
			try {
				const tasksJson = localStorage.getItem("tasks");
				const lastId = localStorage.getItem("lastId");

				if (tasksJson) {
					this.tasks = JSON.parse(tasksJson);
				}

				if (lastId) {
					this.lastId = Number.parseInt(lastId, 10);
				}
			} catch (error) {
				console.error("Error loading from localStorage:", error);
				this.tasks = [];
				this.lastId = 0;
			}
		},
		clearCache() {
			localStorage.removeItem("tasks");
			this.tasks = [];
		},
		filterTasks(category: string) {
			this.filter.category = category;
		},
		setSortBy(sortType: string) {
			this.filter.sortBy = sortType;
		},
		showNotification(message: string, color = "success") {
			this.snackbar.text = message;
			this.snackbar.color = color;
			this.snackbar.show = true;
		},
		editTask(task: Item) {
			const modalStore = useModal();
			modalStore.setEditTask(task);
			this.showNotification(`Editing task: ${task.title}`);
		},
		deleteSelectedWithNotification() {
			this.deleteSelected();
			this.showNotification("Selected tasks deleted", "success");
		},
		initialize() {
			this.loadFromLocalStorage();
		},
	},
	getters: {
		getTasks(): Item[] {
			let filteredTasks = [...this.tasks];

			if (this.filter.category) {
				filteredTasks = filteredTasks.filter(
					(task) => task.category === this.filter.category,
				);
			}

			return filteredTasks.sort((a, b) => {
				if (this.filter.sortBy === "date") {
					return (
						new Date(a.datetofinish).getTime() -
						new Date(b.datetofinish).getTime()
					);
				}
				return a.title.localeCompare(b.title);
			});
		},
	},
});
