import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Notifications from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import FeedbackPanel from './FeedbackPanel_old'
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { get } from 'lodash';

const styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2,
    }
  });

 class FeedbackSignIn extends React.Component {

    state = {
        anchorEl: null,
        open: false
      };

    constructor(props) {
        super(props);
        this.showFeedbackPanel = this.showFeedbackPanel.bind(this);
        this.clickAway = this.clickAway.bind(this);
    }
      
    showFeedbackPanel(target, open) {
        this.setState(() => ({
          anchorEl: target,
          open: open
        }));
      };

    clickAway(event) {
        console.log(event)

        if (get(event, "srcElement.id") !== "" || get(event, "srcElement.parentElement.id") !== "") {
            return;
        }

        this.setState(() => ({
            anchorEl: null,
            open: false
          }));
    }  

    render() {
       const { classes } = this.props;
       const { anchorEl, open } = this.state;

       return <div>
                <ClickAwayListener onClickAway={this.clickAway}>
                    <IconButton aria-label="Notifications" className={classes.margin} onClick={({currentTarget}) => this.showFeedbackPanel(currentTarget, !this.state.open)}>
                        <Badge badgeContent={1} color="primary">
                            <Notifications />
                        </Badge>
                    </IconButton>
                    <Popper open={open} anchorEl={anchorEl} placement='bottom-end'>
                            <FeedbackPanel></FeedbackPanel>
                    </Popper>                    
                </ClickAwayListener>
            </div>
        
    }

}

export default withStyles(styles)(FeedbackSignIn);
