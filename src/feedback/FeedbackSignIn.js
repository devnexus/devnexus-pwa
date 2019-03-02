import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link, Avatar } from '@material-ui/core';
import FirebaseService from "../FirebaseService"
import firebase from "firebase";
import deepPurple from '@material-ui/core/colors/deepPurple';

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

  state = {
    anchorEl: null,
    open: false
  };

  googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  constructor(props) {
    super(props);

    this.state = {
      user: FirebaseService.auth.currentUser
    }

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.displayAccountHelp = this.displayAccountHelp.bind(this);
  }

  displayAccountHelp() {
    const { accountDialog } = this.props;
    console.log(accountDialog.current)
    accountDialog.current.handleOpen();
  }

  signIn() {
    FirebaseService.auth.signInWithRedirect(this.googleAuthProvider);
  }

  signOut() {
    FirebaseService.auth.signOut();
  }


  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = FirebaseService.auth.onAuthStateChanged(
      (user) => { this.setState({ user: user }) }
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
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

export default withStyles(styles)(FeedbackSignIn);
