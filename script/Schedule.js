import React from 'react';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import { withStyles } from 'material-ui/styles';
import ScheduleService from './ScheduleService';
import Tabs, { Tab } from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar';

const styles = theme => ({});

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
    const { classes } = this.props;
    const flex = {
      flex:"1"
    }
    return <div>
                  <Toolbar >
                    <Tabs style={flex}>
                      <Tab label="Agenda"/>
                      <Tab label="Feb 21"/>
                      <Tab label="Feb 22"/>
                      <Tab label="Feb 23"/>                
                    </Tabs>
                  
                  <Button variant="raised" onClick={this.doUpdate}>Update Schedule</Button> 
                <Button variant="raised" onClick={this.allRooms}>List Rooms</Button> 
              
                  </Toolbar>
            </div>;
  }

}


export default withStyles(styles) (Schedule);