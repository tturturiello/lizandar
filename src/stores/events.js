import { defineStore } from 'pinia'

function hashColoring(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 1; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}


export const useEventsStore = defineStore('events', {
  state: () => {
    return { 
        events: new Map(),
        calendars: [],
    }
  },
  actions: {        
    find(query) {
      const str = query.toLowerCase()
      return [...this.events.values()]
        .flatMap(e => e)
        .filter(e => e.title.toLowerCase().includes(str) || e.description.toLowerCase().includes(str));
    },
    addEvent(key, event) {
      if(!this.events.get(key)) {
        this.events.set(key, [])
        if([...this.calendars.filter(c => c.calendarName === event.calendar)].length <= 0)
          this.calendars.push({calendarName: event.calendar, color: hashColoring(event.calendar), enabled: true})
      } else {
        this.events.get(key).push(event)
      }
    },
    setEvents(events) {
      this.events = events
    }, 
    calendarColor(calendar) {
      return ([...this.calendars.filter(c => c.calendarName === calendar).map(c => c.color)][0])
    },
    //disableCalendar(calendarName) {
    //  if(!this.isCalendarEnabled(calendarName) || this.disableCalendar.length <= 0) {
    //    this.disabledCalendars.push(calendarName)
    //  }
    //},
    //enableCalendar(calendarName) {
    //  if(this.isCalendarEnabled(calendarName)) {
    //    this.disabledCalendars = [...this.disabledCalendars.filter(c => c !== calendarName)]
    //  }
    //},
    isCalendarEnabled(calendarName) {
      // return (this.disabledCalendars.indexOf(calendarName) <= -1)
      return ([...this.calendars.filter(c => c.calendarName === calendarName)][0]).enabled
    },
    toggleCalendar(calendarName) {
      let calendar = [...this.calendars.filter(c => c.calendarName === calendarName)][0]
      calendar.enabled = !calendar.enabled
    }
  }
})