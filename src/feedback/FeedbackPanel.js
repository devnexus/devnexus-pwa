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

        this.randomFeedback = this.randomFeedback.bind(this);
    }

    randomFeedback() {
        const { title } = this.props;
                           
        var index = Math.floor(Math.random() * 5) + 1;
        FirebaseService.submitFeedback(title, "Test feedback", index);

    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = FirebaseService.auth.onAuthStateChanged(
            
            (user) => {console.log(user);this.setState({user: user})}
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
                    <Button id="randomFeedback" variant="contained" color="primary" className={classes.button} onClick={() => {this.randomFeedback()}}>
                            randomFeedback
                            </Button>
                    </div>)
                        : null}
              </Paper>;
    }
}

export default withStyles(styles)(FeedbackPanel);
