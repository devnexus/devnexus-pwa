import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Radio,RadioGroup, Typography, Button } from '@material-ui/core';
import {Star, StarBorder} from '@material-ui/icons';
import firebase from "firebase";
import FirebaseService from "../FirebaseService"

const styles = theme => ({
    root: {
      width: 500,
    },
    button: {
        margin: theme.spacing.unit,
        float:'right'
      },  
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },  
      group: {
        margin: `${theme.spacing.unit}px 0`,
        flexDirection: 'row',
      },
      radio: {
        float: 'left',
      },
      
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "100%"
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
            user: FirebaseService.auth.currentUser,
            comment: null,
            score: 3
        }

        this.handleChange = this.handleChange.bind(this);
        this.feedback = this.feedback.bind(this);
    }

    feedback() {
        const { title } = this.props;
                           
        var index = Math.floor(Math.random() * 5) + 1;
        FirebaseService.submitFeedback(title, this.state.comment, this.state.score);

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

    handleChange(field, value) {
        this.setState({ [field]: value});
      }

    render() {
        const { classes } = this.props;
       const { user } = this.state;
console.log(this.state)
       return ( user ? ( <div className="row">
                            <div className="col-sm-10 col-sm-offset-1 " >
                                <Typography className="feedback-header" >
                                Feedback
                                </Typography>
                                <form className={classes.container} noValidate autoComplete="off">

                                    <TextField  
                                        value={this.state.comment} 
                                        rows="4" 
                                        className={classes.textField}
                                        maxRows="4" 
                                        onChange={(event)=>(this.handleChange('comment', event.target.value))}
                                        multiline={true} 
                                        helperText="Comment"
                                        placeholder="Tell us what you think.  (optional)"
                                        />
                                        <div style={{flexGrow:1}}>
                                            <RadioGroup
                                                aria-label="Score"
                                                name="score"
                                                className={classes.group}
                                                value={this.state.score}
                                                onChange={(event)=>(this.handleChange('score', event.target.value))}
                                            >
                                                <Radio className={classes.radio} checkedIcon={this.state.score >=1?<Star color="primary"/>:<StarBorder/>} icon={this.state.score >=1?<Star  color="primary"/>:<StarBorder/>} value={1}/>
                                                <Radio className={classes.radio} checkedIcon={this.state.score >=1?<Star color="primary"/>:<StarBorder/>} icon={this.state.score >=2?<Star  color="primary"/>:<StarBorder/>} value={2}/>
                                                <Radio className={classes.radio} checkedIcon={this.state.score >=1?<Star color="primary"/>:<StarBorder/>} icon={this.state.score >=3?<Star  color="primary"/>:<StarBorder/>} value={3}/>
                                                <Radio className={classes.radio} checkedIcon={this.state.score >=1?<Star color="primary"/>:<StarBorder/>} icon={this.state.score >=4?<Star  color="primary"/>:<StarBorder/>} value={4}/>
                                                <Radio className={classes.radio} checkedIcon={this.state.score >=1?<Star color="primary"/>:<StarBorder/>} icon={this.state.score >=5?<Star  color="primary"/>:<StarBorder/>} value={5}/>
                                            </RadioGroup>
                                        </div>
                                        <Button id="randomFeedback" variant="contained" color="primary" className={classes.button} onClick={() => {this.feedback()}}>
                                            Submit
                                        </Button>
                                </form>
                            </div>
                        </div>) 
                    : 
                        <div/>);
       
       /*<Paper className={classes.root}>
                {user ?
                    (<div><Typography className={classes.typography}>{user.displayName}</Typography>
                    <Button id="randomFeedback" variant="contained" color="primary" className={classes.button} onClick={() => {this.randomFeedback()}}>
                            randomFeedback
                            </Button>
                    </div>)
                        : null}
              </Paper>;*/
    }
}

export default withStyles(styles)(FeedbackPanel);
