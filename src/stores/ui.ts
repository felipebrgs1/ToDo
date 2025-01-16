import { defineStore } from "pinia";

export const useUI = defineStore("UI", {
	state: () => ({
		selectedCategory: "",
		sortBy: "date",
	}),

	actions: {
		setSelectedCategory(category: string) {
			this.selectedCategory = category;
		},

		setSortBy(value: string) {
			this.sortBy = value;
		},
	},
});
