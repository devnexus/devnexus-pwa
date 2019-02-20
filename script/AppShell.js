import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
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
       <AppBar position="static" color="default" id="appbar">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            DevNexus 2019 Schedule
          </Typography>
        </Toolbar>
      </AppBar>
      <Schedule style={scheduleStyle}/>
    </div>
  }

}

export default withStyles(styles)(AppShell);
