import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import {  createMuiTheme,ThemeProvider } from '@material-ui/core/styles';


import { Divider, Toolbar, Typography, Chip} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ScheduleService from './ScheduleService';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ScheduleDetail from './ScheduleDetail'


const styles = () => ({});
const theme = createMuiTheme();

const Dates = [new Date(2020, 1, 19), new Date(2020, 1, 20),new Date(2020, 1, 21)]

export class Schedule extends React.Component {
  constructor(props) {
    super(props);
    
    //Updated in component did mount
    this.state = {
      date: Dates[0],
      dateIndex: 0,
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
      date: Dates[0],
      dateIndex: 0,
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
   console.log("getcolor called")
   const colors = {
    "Unobtanium": {
      "color": "#1668ba",
      "room": "313"
    },
    "2GM": {
      "color": "#0d86e2",
      "room": "115"
    },
    "Lunch": {
      "room": "Level 1",
      "color": "#a84617"
    },
    "Break": {
      "room": "Sponsor Lounge",
      "color": "#a84617"
    },
    "Registration & Breakfast": {
      "room": "Sponsor Lounge",
      "color": "#a84617"
    },
    "Happy Hour": {
      "room": "Sponsor Lounge",
      "color": "#a84617"
    },
    "Sponsor Lounge": {
      "room": "Sponsor Lounge",
      "color": "#a84617"
    },
    "Registration & Breakfast": {
      "room": "Sponsor Lounge",
      "color": "#a84617"
    },
    "Stage": {
      "room": "Level 3",
      "color": "#a84617"
    },"After Party": {
      "room": "After Party",
      "color": "#a84617"
    },"#CodeNCoffee": {
      "room": "412",
      "color": "#a84617"
    },"Keynotes": {
      "room": "Sidney Marcus Auditorium",
      "color": "#a84617"
    },"Workshops": {
      "room": "Sponsor Lounge",
      "color": "#6c7070"
    },"Agile": {
      "room": "312",
      "color": "#C30772"
    },

    "Architecture": {
      "room": "Sidney Marcus Auditorium",
      "color": "#a84617"
    },"Cloud Infrastructure": {
      "room": "302",
      "color": "#6328E7"
    },"Cloud Technology": {
      "room": "411",
      "color": "#8b2246"
    },"Core Java": {
      "room": "305",
      "color": "#00A566"
    },"Frameworks": {
      "room": "314",
      "color": "#bb671c"
    },"Java Platform": {
      "room": "315/316",
      "color": "#019875"
    },"Javascript": {
      "room": "303",
      "color": "#127e9c"
    },"JavaScript": {
      "room": "303",
      "color": "#127e9c"
    },
    "JVM Languages": {
      "room": "311",
      "color": "#007a4b"
    },"Open Java": {
      "room": "412",
      "color": "#2e8856"
    },"Practices and Other Tech": {
      "room": "405",
      "color": "#5b903f"
    },"Practices and other tech": {
      "room": "405",
      "color": "#5b903f"
    },"Security": {
      "room": "403",
      "color": "#cc9999"
    },"Tools and Techniques": {
      "room": "404",
      "color": "#2a2d7c"
    },"Tools and techniques": {
      "room": "404",
      "color": "#2a2d7c"
    }
    ,"Web and Front-end": {
      "room": "304",
      "color": "#d46a43"
    },
   
  };
   console.log("TrackName, found,", trackName, colors[trackName]);
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
                        var color = this.getColor(item.track);
                        var scheduleItem = ScheduleService.findScheduleItem(...item.detailsArgs);
                        return <ListItem className="scheduleEventListItem" key={scheduleItems.indexOf(item)} button style={{"backgroundColor":"white"}} onClick={()=>{this.displayDetails(...item.detailsArgs)}} >
                          
                          <ListItemText
                              primary={item.title}
                              secondary={
                                <React.Fragment>
                                  <ThemeProvider  theme={createMuiTheme(
                                    { palette: {
                                        primary: {
                                          main: color
                                        }
                                      }
                                    }
                                    )
                                  }>
                                  
                                    <Chip label={((item.track === "Cloud Infrastructure (Microservices and Serverless)"?"Cloud Infrastructure":item.track) + " | " + item.room)} variant="outlined"  color="primary"/>
                                  </ThemeProvider>
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
                <Tab label="Feb 19" value={0}  onClick={this.setDate.bind(this, 0)} style={{"color":"black"}}/>
                <Tab label="Feb 20" value={1} onClick={this.setDate.bind(this, 1)} style={{"color":"black"}}/>                
                <Tab label="Feb 21" value={2} onClick={this.setDate.bind(this, 2)} style={{"color":"black"}}/>                
              </Tabs>
            </Toolbar>
            <Divider/>
            {this.scheduleTable()}
            <ScheduleDetail onRef= {(dialog)=>{this.dialog = dialog; }}/>
            </div>;
  }

}


export default withStyles(styles) (Schedule);
