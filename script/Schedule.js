import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import React from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import { withStyles } from 'material-ui/styles';
import ScheduleService from './ScheduleService';
import Tabs, { Tab } from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import ScheduleDetail from './ScheduleDetail'

const styles = theme => ({});
const Dates = [new Date(2018, 1, 21), new Date(2018, 1, 22),new Date(2018, 1, 23)]

export class Schedule extends React.Component {
  constructor(props) {
    super(props);
    
    this.corrected = false;

    this.state = {
      date: Dates[0],
      dateIndex: 0,
      agenda: false
    };
    
    
    this.handleUpdate = this.handleUpdate.bind(this);
    this.doUpdate = this.doUpdate.bind(this);
    this.allRooms = this.allRooms.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setAgenda = this.setAgenda.bind(this);
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
        agenda: false
      }
    );
  }

  setAgenda() {
    this.setState({
        date: Dates[0],
        dateIndex:0,
        agenda: true
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
    const { classes } = this.props;
    const flex = {
      flex:"1"
    }
    return <div>
            <Toolbar id="toolbar">
              <Tabs style={flex} value={this.state.agenda?0:(this.state.dateIndex+1)}>
                <Tab label="Feb 21" onClick={this.setDate.bind(this, 0)} style={{"color":"black"}}/>
                <Tab label="Feb 22" onClick={this.setDate.bind(this, 1)} style={{"color":"black"}}/>
                <Tab label="Feb 23" onClick={this.setDate.bind(this, 2)} style={{"color":"black"}}/>                
              </Tabs>
            </Toolbar>
            <Divider/>
            {this.scheduleTable()}
            <ScheduleDetail onRef= {(dialog)=>{this.dialog = dialog; }}/>
            </div>;
  }

}


export default withStyles(styles) (Schedule);