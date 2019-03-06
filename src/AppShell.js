import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Schedule from './Schedule'
import FeedbackSignIn from './feedback/FeedbackSignIn'
import AccountDialog from './feedback/AccountDialog'

const styles = {
  grow: {
    flexGrow: 1,
  }
};

const scheduleStyle = {
  ['z-index']:-10
}

var throttle = function(type, name, obj) {
  obj = obj || window;
  var running = false;
  var func = function() {
    if (running) { return; }
    running = true;
    requestAnimationFrame(function() {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
};

/* init - you can init any event */
throttle("resize", "optimizedResize");


class AppShell extends React.Component {

  constructor(props) {
    super(props);
    const { classes } = props;
    this.classes = classes;
    this.state = {
      open: false
    };
    this.accountDialog =  React.createRef();

  }

  componentDidMount(){
    let visited = localStorage["alreadyVisited"];
    if(visited) {
      this.accountDialog.current.handleClose();
    } else {
         localStorage["alreadyVisited"] = true;
         this.accountDialog.current.handleOpen();
    }
  }

  render()  {
    
    return <div>
       <AppBar position="static" color="default" id="appbar">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={this.classes.grow}>
            DevNexus 2019 Schedule
          </Typography>
          <FeedbackSignIn accountDialog={this.accountDialog}/>
        </Toolbar>
      </AppBar>
      <Schedule style={scheduleStyle}/>
      <AccountDialog ref={this.accountDialog}/>
    </div>
  }

}

AppShell.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppShell);
