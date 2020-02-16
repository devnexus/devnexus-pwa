import Room from './Room'

class ScheduleService {

    constructor() {
        this._type = "ScheduleService"
        this.listeners = [];
        this.data = {};
        this.getRoomForItem = this.getRoomForItem.bind(this)
        this.dateIndexCache = [];

        this.workshopMapping = {
            "Room 1":"302",
            "Room 2":"303",
            "Room 3":"304",
            "Room 4":"305",
            "Room 5":"311",
            "Room 6":"312",
            "Room 7":"313",
            "Room 8":"314",
            "Room 9":"315/316",
            "Room 10":"403",
            "Room 11":"404",
            "Room 12":"405",
            "Room 13":"",
            "Room 14":"",
            "Room 15":""
        }

        this.mapping = {
            "Keynote Room":"Sidney Marcus Auditorium",
            "Room 1":"312",
            "Room 2":"Sidney Marcus Auditorium",
            "Room 3":"302",
            "Room 4":"411",
            "Room 5":"305",
            "Room 6":"314",
            "Room 7":"315/316",
            "Room 8":"303",
            "Room 9":"311",
            "Room 10":"412",
            "Room 11":"405",
            "Room 12":"403",
            "Room 13":"404",
            "Room 14":"304",
            "Room 15":"313"
        };

    }

    getRoomForItem(scheduleItem) {

        if (scheduleItem.title === "Women in Tech Breakfast at DevNexus") {
            scheduleItem.track = "#CodeNCoffee";
            scheduleItem.room = "412";
            return "412";
        }

        if (scheduleItem.type === "workshop") {
            return this.workshopMapping[scheduleItem.room];
        }



        return (scheduleItem.title.includes("Break")?"Sponsor Lounge":scheduleItem.title.includes("Lunch")?"Exhibition Hall B":this.mapping[scheduleItem.room]);
    }
    
    findScheduleItem(dateIndex, roomName, roomIndex) {
        return this.data.days[dateIndex].rooms[roomName][roomIndex];
    }

    getScheduleForDateGroupedByTime(dateIndex) {
        if (this.dateIndexCache[dateIndex]) {
            return this.dateIndexCache[dateIndex];
        }

        if (!this.data.days  || !this.data.days[dateIndex]) {
            return {};
        }
        const roomSchedule = this.data.days[dateIndex].rooms;
        const daySchedule = {};
        const rooms = this.allRooms()
        rooms.forEach((room)=>{
            if (roomSchedule[room.roomName]) {
                roomSchedule[room.roomName].forEach((scheduleItem, index)=> {
                    if (!daySchedule[scheduleItem.start]) {
                        daySchedule[scheduleItem.start] = []
                    }                    
                    daySchedule[scheduleItem.start].push({title:scheduleItem.title, room:this.getRoomForItem(scheduleItem),track:scheduleItem.track,  detailsArgs: [dateIndex, room.roomName, index]});
                });
            }
        });

        const ordered = {};
        Object.keys(daySchedule).sort().forEach(function(key) {
          ordered[key] = daySchedule[key];
          ordered[key].sort((left, right) => {
              if ((left.room.startsWith("A4") && right.room.startsWith("A4")) ||
                   (left.room.startsWith("A3") && right.room.startsWith("A3")) ) {
                return left.room.localeCompare(right.room)
                   } else {
                    return right.room.localeCompare(left.room)
                   }
            })
        });



        this.dateIndexCache[dateIndex] = ordered;
        return this.dateIndexCache[dateIndex];
    }

    addListener(listener) {
        this.listeners.push(listener);
        listener(this.data);
    }

    removeListener(listener) {
        var index = this.listeners.indexOf(listener);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }

    dataUpdated() {
        this.listeners.forEach(listener=>listener(this.data));
    }

    allRooms() {
        var rooms = new Array();
        this.data.days.forEach((date)=>{
            var room;
            for (room in date.rooms) {
                if (date.rooms.hasOwnProperty(room)) {
                    rooms.push(new Room(room));
                }
            }
        });

        return rooms.filter((room, index, self) => 
            index === self.findIndex((t) => (
                t.roomName === room.roomName
              ))
        );
    }


    scheduleUpdate() {
        fetch('/full_schedule.json')
        .then((response) => {
            return response.json();
        }).then((data) => {
            this.data = data.schedule.conference;
            this.dataUpdated();
        })
        .catch(() => {
            this.data = {};
            this.dataUpdated();
        });
    }


}

export default new ScheduleService();