import { defineStore } from 'pinia'

export const useEventsStore = defineStore('events', {
  state: () => {
    return { 
        events: new Map(),
    }
  },
  actions: {        
    find(str) {
      return [...this.events.values()].flatMap(e => e).filter(e => e.title.includes(str) || e.description.includes(str));
    },
    addEvent(event) {
      this.events.get(event.date).push(event)
    },
    setEvents(events) {
      this.events = events
    }, 
  }
})