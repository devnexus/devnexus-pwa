import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import {  createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { Divider, Toolbar, Typography, Chip} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ScheduleService from './ScheduleService';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ScheduleDetail from './ScheduleDetail'


const styles = () => ({});
const theme = createMuiTheme();

const Dates = [new Date(2019, 2, 6), new Date(2019, 2, 7),new Date(2019, 2, 8)]

export class Schedule extends React.Component {
  constructor(props) {
    super(props);
    
    //Updated in component did mount
    this.state = {
      date: Dates[1],
      dateIndex: 1,
    };

    this.doUpdate();
    this.updateDimensions();
    
    this.handleUpdate = this.handleUpdate.bind(this);
    this.doUpdate = this.doUpdate.bind(this);
    this.setDate = this.setDate.bind(this);
    this.scheduleTable = this.scheduleTable.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.displayDetails = this.displayDetails.bind(this);
    this.getColor = this.getColor.bind(this);
    window.location.hash = "";
  }

  displayDetails(dateIndex, roomName, roomIndex) {
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
      date: Dates[1],
      dateIndex: 1,
    })
  }

  componentWillUnmount() {
    ScheduleService.removeListener(this.handleUpdate)
    window.removeEventListener('resize', this.updateDimensions)
  }


 componentDidUpdate() {
  this.updateDimensions();
  document.getElementById('listBody').scrollTop = 0;
 }

 getColor(trackName) {
   const colors = {
    "2GM": {
      "color": "#0d86e2",
      "room": "115"
    },
    "Agile": {
      "color": "#0d86e2",
      "room": "105"
    },
    "Architecture": {
      "room": "Ballroom A",
      "color": "#a84617"
    },
    "Cloud Infrastructure (Microservices and Serverless)": {
      "room": "Ballroom B",
      "color": "#6328E7"
    },
    "Cloud Infra": {
      "room": "Ballroom B",
      "color": "#6328E7"
    },
    "Cloud Technology": {
      "room": "Ballroom D",
      "color": "#8b2246"
    },
    "Core Java": {
      "room": "104",
      "color": "#8bbc0f"
    },
    "Frameworks": {
      "room": "Ballroom F",
      "color": "#5b903f"
    },
    "Java Platform": {
      "room": "Exhibition Hall D",
      "color": "#f6921e"
    },
    "JavaScript": {
      "room": "Ballroom E",
      "color": "#127e9c"
    },
    "Practices and other tech": {
      "room": "103",
      "color": "#4331e2"
    },
    "Security": {
      "room": "Ballroom C",
      "color": "#2a2d7c"
    },
    "Tools and Techniques": {
      "room": "106",
      "color": "#FA7713"
    },
    "Web": {
      "room": "102",
      "color": "#015351"
    },
  
    "Unobtanium": {
      "room": "114",
      "color": "#1668ba"
    },            
    "After Party": {
      "room" :"Joystick Game Bar",
      "color":"#f1a71e"
    }

  };
   return colors[trackName]?colors[trackName].color:"#ed1e24";
 }

  doUpdate() {
    ScheduleService.scheduleUpdate();
  }

  handleUpdate() {
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
                      scheduleItems.map((item) => {
                        var scheduleItem = ScheduleService.findScheduleItem(...item.detailsArgs);
                        return <ListItem className="scheduleEventListItem" key={scheduleItems.indexOf(item)} button style={{"backgroundColor":"white"}} onClick={()=>{this.displayDetails(...item.detailsArgs)}} >
                          
                          <ListItemText
                              primary={item.title}
                              secondary={
                                <React.Fragment>
                                  <MuiThemeProvider theme={
                                    { ...theme,
                                      palette: {
                                        ...theme.palette,
                                        primary: {
                                          main: this.getColor(item.track)
                                        }
                                      }
                                    }
                                  }>
                                  
                                    <Chip label={((item.track === "Cloud Infrastructure (Microservices and Serverless)"?"Cloud Infrastructure":item.track) + " | " + item.room)} variant="outlined"  color="primary"/>
                                  </MuiThemeProvider>
                                  <div style={{display: 'inline-flex', paddingLeft:'1em'}}>
                                  {scheduleItem.persons?scheduleItem.persons.map((speaker, i) => {
                                    return (<div key={scheduleItem.id + "2" + i + "3"} style={{paddingRight:'1em'}}>
                                              {speaker.full_public_name}
                                            </div>);
                                  }):<div key={scheduleItem.id + "1" + "1"}/> }
                                  </div>
                                  
                              </React.Fragment>
                              }
                          />
                        </ListItem>
                      })
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
                <Tab label="Mar 7" value={1}  onClick={this.setDate.bind(this, 1)} style={{"color":"black"}}/>
                <Tab label="Mar 8" value={2} onClick={this.setDate.bind(this, 2)} style={{"color":"black"}}/>                
              </Tabs>
            </Toolbar>
            <Divider/>
            {this.scheduleTable()}
            <ScheduleDetail onRef= {(dialog)=>{this.dialog = dialog; }}/>
            </div>;
  }

}


export default withStyles(styles) (Schedule);
