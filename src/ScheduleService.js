import Room from './Room'

class ScheduleService {

    constructor() {
        this._type = "ScheduleService"
        this.listeners = [];
        this.data = {};

        this.dateIndexCache = [];

        this.mapping = {
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
            "Room 13":"411",
            "Room 14":"412",
            "Room 15":"Sydney Marcus Auditorium"
        };

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
                    daySchedule[scheduleItem.start].push({title:scheduleItem.title, track:scheduleItem.track, room:(scheduleItem.title.includes("Break")?"Sponsor Lounge":scheduleItem.title.includes("Lunch")?"Exhibition Hall B":this.mapping[scheduleItem.room]), detailsArgs: [dateIndex, room.roomName, index]});
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