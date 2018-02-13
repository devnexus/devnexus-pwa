import Room from './Room'

class ScheduleService {

    constructor() {
        this._type = "ScheduleService"
        this.listeners = [];
        this.data = {};
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

    /**
     * 
     * @param {String} date in yyyy-mm-dd format
     * @returns {Array} of rooms
     */
    fetchRooms(date) {
        if (!day) {
            return allRooms();
        } else {
            return roomsOnDate(day);
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