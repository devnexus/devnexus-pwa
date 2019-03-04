import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, Avatar } from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';
import AeroGearService from '../AeroGearService';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  }
});

class FeedbackSignIn extends React.Component {

  constructor(props) {
    super(props);
    
    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    this.state = {
      anchorEl: null,
      open: false,
      user: null
    }

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.displayAccountHelp = this.displayAccountHelp.bind(this);
  }

  displayAccountHelp() {
    const { accountDialog } = this.props;
    accountDialog.current.handleOpen();
  }

  signIn() {
    AeroGearService.login();
  }

  signOut() {
    AeroGearService.logout()
  }


  componentDidMount() {
    AeroGearService.auth.loadUserProfile().then(
      (user) => { this.setState({ user: user }) }
    ).catch(err => console.log(err));
  }

  componentWillUnmount() {
  }

  render() {
    const { user } = this.state;
    const { classes } = this.props;

    return <div>
      {user ? 
        <div>
        {user.photoURL?
          <Avatar alt={user.displayName} src={user.photoURL} onClick={this.displayAccountHelp}/>
          :
          <Avatar className={classes.purpleAvatar} onClick={this.displayAccountHelp}>{user.displayName?user.displayName.toString().charAt(0).toUpperCase():"DN"}</Avatar>
        }
        </div>
      
      :
        <Link
          component="button"
          variant="body2"
          onClick={() => {
              this.signIn();
          }}
        >
          Sign In
        </Link>
      }
    </div>

  }

}


FeedbackSignIn.propTypes = {
  accountDialog: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedbackSignIn);
