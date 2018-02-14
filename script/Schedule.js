import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import React from 'react';
import Button from 'material-ui/Button';
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
      agenda: false
    };
    
    this.handleUpdate = this.handleUpdate.bind(this);
    this.doUpdate = this.doUpdate.bind(this);
    this.allRooms = this.allRooms.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setAgenda = this.setAgenda.bind(this);
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

  setDate(dateIndex) {
    this.setState({
        date: Dates[dateIndex],
        agenda: false
      }
    );
  }

  setAgenda() {
    this.setState({
        date: Dates[0],
        agenda: true
      }
    );
  }

  render()  {
    const { classes } = this.props;
    const flex = {
      flex:"1"
    }
    return <div>
                  <Toolbar >
                    <Tabs style={flex}>
                      <Tab label="Agenda" onClick={this.setAgenda}/>
                      <Tab label="Feb 21" onClick={this.setDate.bind(this, 0)}/>
                      <Tab label="Feb 22" onClick={this.setDate.bind(this, 1)}/>
                      <Tab label="Feb 23" onClick={this.setDate.bind(this, 2)}/>                
                    </Tabs>
                  <Button variant="raised" onClick={this.doUpdate}>Update Schedule</Button> 
                <Button variant="raised" onClick={this.allRooms}>List Rooms</Button> 
                  </Toolbar>
                  <Divider/>
                  <Table>
                    <TableBody>
                      <TableRow >
                        <TableCell numeric="true"     style={{ borderRight: '0.1em solid rgba(0, 0, 0, 0.12)', padding: '0.5em' }}>
                          9:00
                        </TableCell>
                        <TableCell style={{padding:"0", margin:"0"}}>
                          <List>
                          <ListItem>
                          <ListItemText
                                primary="Single-line item"
                                secondary="Secondary text"
                              />
                            </ListItem>
                            <Divider />
                            <ListItem>                            
                            <ListItemText
                                primary="Single-line item"
                                secondary="Secondary text"
                              />
                            </ListItem>
                            <Divider />
                            <ListItem>
                            <ListItemText
                                primary="Single-line item"
                                secondary="Secondary text"
                              />
                            </ListItem>
                          </List>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
            </div>;
  }

}


export default withStyles(styles) (Schedule);