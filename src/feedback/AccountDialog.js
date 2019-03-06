import React from 'react';
import {IconButton, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Link } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


class AccountDialog extends React.Component {
  state = {
    open:false
  }

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this); 
  }

  handleClose = () => {
    this.setState ({open:false})
  };

  handleOpen = () => {
    this.setState ({open:true})
  };

  render() {

    return (
      <Dialog onClose={this.handleClose} open={this.state.open} >
        <DialogTitle id="simple-dialog-title">
          Sign In for Stuff
          <IconButton aria-label="Close"  onClick={this.handleClose}  style={{
                                                                                position: 'absolute',
                                                                                right: theme.spacing.unit,
                                                                                top: theme.spacing.unit,
                                                                                color: theme.palette.grey[500],
                                                                              }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
              To enter to win door prizes at the end of the conference you need to submit feedback on sessions using this app.  To submit feedback, use the sign in link on the schedule page.
            </DialogContentText>
            <DialogActions>
              <Link button="true" href={"https://devnexus.com/privacy-policy"}>
                View Privacy Policy
              </Link>
            </DialogActions>
          </DialogContent>
      </Dialog>
    );
  }
}

export default AccountDialog;