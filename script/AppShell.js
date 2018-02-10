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

class AppShell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }

  handleDrawerToggle(e) {
      this.setState({open: !this.state.open});
  }

  render()  {
    const { classes } = this.props;

    return <div>
       <AppBar position="static" color="default">
        <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={(e)=> this.handleDrawerToggle(e)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            DevNexus 2018 Schedule
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={this.state.open} onClose={this.handleDrawerToggle}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleDrawerToggle}
            onKeyDown={this.handleDrawerToggle}
          >
            <div>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Starred" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Send mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>

          </div>
        </Drawer>
    </div>
  }

}

export default withStyles(styles)(AppShell);
