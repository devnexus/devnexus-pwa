import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ScheduleService from './ScheduleService';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ScheduleDetail from './ScheduleDetail'

const styles = theme => ({});
const Dates = [new Date(2019, 2, 6), new Date(2019, 2, 7),new Date(2019, 2, 8)]

export class Schedule extends React.Component {
  constructor(props) {
    super(props);
    
    this.corrected = false;

    this.state = {
      date: Dates[0],
      dateIndex: 0,
    };
    
    
    this.handleUpdate = this.handleUpdate.bind(this);
    this.doUpdate = this.doUpdate.bind(this);
    this.allRooms = this.allRooms.bind(this);
    this.setDate = this.setDate.bind(this);
    this.scheduleTable = this.scheduleTable.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.displayDetails = this.displayDetails.bind(this);
    window.location.hash = "";
  }

  displayDetails(dateIndex, roomName, roomIndex) {
    console.log(dateIndex + "," + roomName + "," +  roomIndex);

    var scheduleItem = ScheduleService.findScheduleItem(dateIndex, roomName, roomIndex);

    this.dialog.handleClickOpen(scheduleItem);
  }

  updateDimensions() {
    const appbar = document.getElementById("appbar");
    const toolbar = document.getElementById("toolbar");
    const listBody = document.getElementById("listBody");
    
    if (!toolbar || !listBody) {
      return;
    }

    const viewHeight = window.innerHeight - toolbar.clientHeight - appbar.clientHeight ;
    listBody.style['max-height'] = viewHeight + "px";
    listBody.style['overflow'] = 'auto';
    
  }

  componentDidMount() {
    ScheduleService.addListener(this.handleUpdate)
    window.addEventListener('resize', this.updateDimensions)
    this.setState({
      date: Dates[0],
      dateIndex: 0,
    })
  }

  componentWillUnmount() {
    ScheduleService.removeListener(this.handleUpdate)
    window.removeEventListener('resize', this.updateDimensions)
  }

 
  componentWillMount() {
    this.doUpdate();
    this.updateDimensions();
  }

 componentDidUpdate() {
  this.updateDimensions();
  document.getElementById('listBody').scrollTop = 0;
 }


  doUpdate() {
    ScheduleService.scheduleUpdate();
  }

  allRooms() {
    console.log(ScheduleService.allRooms());
  }

  handleUpdate(data) {
    this.correct = false;
    this.forceUpdate();
  }


  setDate(dateIndex) {
    this.setState({
        date: Dates[dateIndex],
        dateIndex: dateIndex,
      }
    );
  }


  scheduleTable() {
    var schedule =  ScheduleService.getScheduleForDateGroupedByTime(this.state.dateIndex);
    var time;
    var rows = [];
    {
      for (time in schedule) {
        if (schedule.hasOwnProperty(time)) {
            var scheduleItems = schedule[time];
            rows.push(
              <div className="scheduleRow" key={time}>
                  <Typography className="scheduleEventTime" style={{"fontSize":"24px"}}>{time}</Typography>
                  <List className="scheduleEventsColumn" style={{"paddingTop":"0"}}>
                    {
                      scheduleItems.map((item) => (
                        <ListItem className="scheduleEventListItem" key={scheduleItems.indexOf(item)} button style={{"backgroundColor":"white"}} onClick={()=>{this.displayDetails(...item.detailsArgs)}} >
                          <ListItemText
                              primary={item.title}
                              secondary={item.track?(item.track + " | " + item.room):"Joystick Gamebar"}
                          />
                        </ListItem>
                      ))
                    }
                  </List>
              </div>);
        }
      }
    }
    return (
    <div id="listBody">
      {rows}
      <Divider/>
      <div className="scheduleRow"></div>
      <div className="scheduleRow"></div>
    </div>);
  }

  render()  {
    const flex = {
      flex:"1"
    }
    return <div>
            <Toolbar id="toolbar">
              <Tabs style={flex} value={this.state.dateIndex}>
                <Tab label="Mar 6" onClick={this.setDate.bind(this, 0)} style={{"color":"black"}}/>
                <Tab label="Mar 7" onClick={this.setDate.bind(this, 1)} style={{"color":"black"}}/>
                <Tab label="Mar 8" onClick={this.setDate.bind(this, 2)} style={{"color":"black"}}/>                
              </Tabs>
            </Toolbar>
            <Divider/>
            {this.scheduleTable()}
            <ScheduleDetail onRef= {(dialog)=>{this.dialog = dialog; }}/>
            </div>;
  }

}


export default withStyles(styles) (Schedule);