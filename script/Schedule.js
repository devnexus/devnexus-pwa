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
  }

  doUpdate() {
    ScheduleService.scheduleUpdate();
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
    return <Button variant="raised" onClick={this.doUpdate}>Default</Button>;
  }

}

export default Schedule;