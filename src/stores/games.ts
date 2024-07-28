import { defineStore } from "pinia";

export const useGamesStore = defineStore('games', {
    state: () => ({
        steps: [
        ]
    }),
    getters: {
        getSteps() {
            return this.steps;
        },
    },
    actions: {
        addStep(step) {
            this.steps.push(step);
        },
        clearSteps() {
            this.steps = [];
        }
    },
//    persist: true,
})