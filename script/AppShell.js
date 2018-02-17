import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import Schedule from './Schedule'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const scheduleStyle = {
  ['z-index']:-10
}

class AppShell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }


  render()  {
    const { classes } = this.props;

    return <div>
       <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            DevNexus 2018 Schedule
          </Typography>
        </Toolbar>
      </AppBar>
      <Schedule style={scheduleStyle}/>
    </div>
  }

}

export default withStyles(styles)(AppShell);
