import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FirebaseService from "../FirebaseService"
import firebase from "firebase";


const styles = theme => ({
    root: {
      width: 500,
    },
    button: {
        margin: theme.spacing.unit,
      },    
    typography: {
      padding: theme.spacing.unit * 2,
    },
  });

  
 class FeedbackPanel extends React.Component {

    googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    constructor(props) {
        super(props);
        
        this.state = {
            user: FirebaseService.auth.currentUser
        }

        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);

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
            (user) => this.setState({user: user})
        );
    }
    
    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
       const { classes } = this.props;
       const { user } = this.state;
       return <Paper className={classes.root}>
                {user ?
                    (<div><Typography className={classes.typography}>{user.displayName}</Typography>
                    <Button id="signOutButton" variant="contained" color="primary" className={classes.button} onClick={() => {this.signOut()}}>
                                Sign-Out
                            </Button>
                    </div>)
                        : 
                    (<div>
                        <div>
                            <Typography className={classes.typography}>
                                This year at DevNexus to register to win a door prize you have to give us your feedback on sessions.  
                            </Typography>                            
                        </div>
                        <div>
                            <Typography className={classes.typography}>    
                                To verify that you have rated a session we need you to sign into our site.  
                            </Typography>                                                        
                        </div>
                        <div>
                            <Typography className={classes.typography}>    
                                If you do not wish to be registered feel free to continue enjoying the conference.
                            </Typography>
                        </div>
                        <div>
                            <Button id="signInButton" variant="contained" color="primary" className={classes.button} onClick={() => {this.signIn()}}>
                                Sign-In
                            </Button>
                        </div>
                      </div>)
                }
              </Paper>;
    }
}

export default withStyles(styles)(FeedbackPanel);
