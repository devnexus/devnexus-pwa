import Room from './Room'

class ScheduleService {

    constructor() {
        this._type = "ScheduleService"
        this.listeners = [];
        this.data = {};

        this.dateIndexCache = [];

        this.mapping = {
            "2GM": "2GM",
            "Agile":"Agile",
            "Architecture":"Architecture",
            "Cloud Infra":"Cloud Infra",
            "Cloud Tech ":"Cloud Tech ",
            "Core Java":"Core Java",
            "Frameworks":"Frameworks",
            "Java Platform":"Java Platform",
            "JavaScript":"JavaScript",
            "Practices":"Practices",
            "Security":"Security",
            "Tools - Techniques":"Tools - Techniques",
            "Web":"Web",
            "Foyer":"Foyer",
            "Unobtanium":"Unobtanium"
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