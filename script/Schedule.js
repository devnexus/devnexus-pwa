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

const styles = theme => ({});
const Dates = [new Date(2018, 1, 21), new Date(2018, 1, 22),new Date(2018, 1, 23)]

export class Schedule extends React.Component {
  constructor(props) {
    super(props);
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
  }

  doUpdate() {
    ScheduleService.scheduleUpdate();
  }

  allRooms() {
    console.log(ScheduleService.allRooms());
  }

  handleUpdate(data) {
    console.log(data);
    this.forceUpdate();
  }

  componentDidMount() {
    ScheduleService.addListener(this.handleUpdate)
  }

  componentWillUnmount() {
    ScheduleService.removeListener(this.handleUpdate)
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
            rows.push(<TableRow key={rows.length}><TableCell numeric={true}     style={{ borderRight: '0.1em solid rgba(0, 0, 0, 0.12)', padding: '30px 30px 30px 0',width:"15em", "verticalAlign": "top" }}>
              <Typography style={{"fontSize":"24px"}}>{time}</Typography>
            </TableCell><TableCell style={{padding:"0", margin:"0"}}>
              <List>
                {
                  scheduleItems.map((item) => (
                    <ListItem key={scheduleItems.indexOf(item)} divider={true}>
                      <ListItemText
                          primary={item.title}
                          secondary={item.track}
                      />
                    </ListItem>
                  ))
                }
              </List>
            </TableCell></TableRow >);
        }
      }
    }
    return (<div><Table>
    <TableBody>
        {rows}
    </TableBody>
    </Table></div>);
  }

  render()  {
    const { classes } = this.props;
    const flex = {
      flex:"1"
    }
    return <div>
                  <Toolbar >
                    <Tabs style={flex} value={this.state.agenda?0:(this.state.dateIndex+1)}>
                      <Tab label="Agenda" onClick={this.setAgenda} style={{"color":"black"}}/>
                      <Tab label="Feb 21" onClick={this.setDate.bind(this, 0)} style={{"color":"black"}}/>
                      <Tab label="Feb 22" onClick={this.setDate.bind(this, 1)} style={{"color":"black"}}/>
                      <Tab label="Feb 23" onClick={this.setDate.bind(this, 2)} style={{"color":"black"}}/>                
                    </Tabs>
                  <Button variant="raised" onClick={this.doUpdate}>Update Schedule</Button> 
                <Button variant="raised" onClick={this.allRooms}>List Rooms</Button> 
                  </Toolbar>
                  <Divider/>
                  {this.scheduleTable()}
            </div>;
  }

}


export default withStyles(styles) (Schedule);