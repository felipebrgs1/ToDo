import { defineStore } from "pinia";
import type Item from "@/model/Item";
import { useTask } from "./Task";

export const useModal = defineStore("Modal", {
	state: () => ({
		data: {
			id: 0,
			title: "",
			text: "",
			creator: "",
			date: "",
			datetofinish: "",
			category: "",
		} as Item,
		show: false,
		dialog: false,
		isValid: false,
		editMode: false,
		taskToEdit: null as Item | null,
	}),

	actions: {
		toggleModal() {
			this.show = !this.show;
		},

		closeDialog() {
			this.dialog = false;
			this.resetData();
		},

		resetData() {
			this.data = {
				id: 0,
				title: "",
				text: "",
				creator: "",
				date: "",
				datetofinish: "",
				category: "",
			};
			this.editMode = false;
			this.taskToEdit = null;
		},

		setEditTask(task: Item) {
			this.editMode = true;
			this.taskToEdit = task;
			this.data = { ...task };
			this.dialog = true;
		},

		async saveTask() {
			if (
				!this.data.title ||
				!this.data.text ||
				!this.data.creator ||
				!this.data.date ||
				!this.data.datetofinish ||
				!this.data.category
			) {
				const taskStore = useTask();
				taskStore.showNotification("Please fill all required fields", "error");
				return;
			}

			const taskStore = useTask();

			if (this.editMode && this.taskToEdit) {
				taskStore.updateTask(this.data);
				taskStore.showNotification("Task updated successfully");
			} else {
				if (!this.data.date) {
					this.data.date = new Date().toISOString().split("T")[0];
				}
				taskStore.addTask(this.data);
				taskStore.showNotification("Task added successfully");
			}

			this.closeDialog();
		},

		handleEditTask(task: Item | null) {
			if (task) {
				this.setEditTask(task);
			}
		},

		initializeEditMode(task: Item | null) {
			if (task) {
				this.setEditTask(task);
			}
		},
	},
});
