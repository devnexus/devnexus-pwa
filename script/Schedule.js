import React from 'react';
import Button from 'material-ui/Button';
import ScheduleService from './ScheduleService';

export class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.doUpdate = this.doUpdate.bind(this);
    this.allRooms = this.allRooms.bind(this);
  }

  doUpdate() {
    ScheduleService.scheduleUpdate();
  }

  allRooms() {
    console.log(ScheduleService.allRooms());
  }

  handleUpdate(data) {
    console.log(data);
  }

  componentDidMount() {
    ScheduleService.addListener(this.handleUpdate)
  }

  componentWillUnmount() {
    ScheduleService.removeListener(this.handleUpdate)
  }

  render()  {
    return <div>
              <Button variant="raised" onClick={this.doUpdate}>Update Schedule</Button> 
              <Button variant="raised" onClick={this.allRooms}>List Rooms</Button> 
            </div>;
  }

}

export default Schedule;