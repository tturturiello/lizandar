import { defineStore } from 'pinia'

export const useEventsStore = defineStore('events', {
  state: () => {
    return { 
        events: new Map(),
    }
  },
  actions: {        
    find(query) {
      const str = query.toLowerCase()
      return [...this.events.values()]
        .flatMap(e => e)
        .filter(e => e.title.toLowerCase().includes(str) || e.description.toLowerCase().includes(str));
    },
    addEvent(event) {
      this.events.get(event.date).push(event)
    },
    setEvents(events) {
      this.events = events
    }, 
  }
})