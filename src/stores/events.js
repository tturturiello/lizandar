import { defineStore } from 'pinia'

export const useEventsStore = defineStore('events', {
  state: () => {
    return { 
        events: new Map(),
        cnt: 0,
    }
  },
  actions: {        
    findByTitle(title) {
        // return this.events.values().map(eventsList => eventsList.filter(e => e.title == title))
    },
    setEvents(events) {
      this.events = events
    }
  }
})