import Room from './Room'

class ScheduleService {

    constructor() {
        this._type = "ScheduleService"
        this.listeners = [];
        this.data = {};

        this.dateIndexCache = [];

        this.mapping = {
            "Agile": "A311",
            "Architecture": "A403",
            "Core Cloud": "A305",
            "Core Java": "A412",
            "Frameworks": "A302",
            "JavaScript": "A411",
            "JVM Languages": "A402",
            "Microservices": "A312",
            "Mobile": "A405",
            "Nighthacking": "Nighthacking Stage",
            "Patterns & Design": "A315",
            "Performance": "A301",
            "Room 15": "A316",
            "Security": "A313",
            "Serverless and Cloud": "A404",
            "Sidney Marcus": "Sidney Marcus",
            "Web": "A314"
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
                    daySchedule[scheduleItem.start].push({title:scheduleItem.title, track:scheduleItem.track, room:this.mapping[scheduleItem.room], detailsArgs: [dateIndex, room.roomName, index]});
                });
            }
        });

        const ordered = {};
        Object.keys(daySchedule).sort().forEach(function(key) {
          ordered[key] = daySchedule[key];
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

    fetchDays() {
        if (data.days) {
            return this.data.days;
        } else {
            return {};
        }
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
        .catch((err) => {
            console.log(err);
            this.data = {};
            this.dataUpdated();
        });
    }


}

export default new ScheduleService();