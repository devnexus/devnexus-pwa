import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Schedule from './Schedule'
import FeedbackSignIn from './feedback/FeedbackBell'

const styles = {
  grow: {
    flexGrow: 1,
  }
};

const scheduleStyle = {
  ['z-index']:-10
}

class AppShell extends React.Component {

  constructor(props) {
    super(props);
    const { classes } = props;
    this.classes = classes;
    this.state = {
      open: false
    };
  }


  render()  {
    
    return <div>
       <AppBar position="static" color="default" id="appbar">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={this.classes.grow}>
            DevNexus 2019 Schedule
          </Typography>
          <FeedbackSignIn />
        </Toolbar>
      </AppBar>
      <Schedule style={scheduleStyle}/>
    </div>
  }

}

export default withStyles(styles)(AppShell);
