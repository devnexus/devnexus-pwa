import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar, IconButton, TextField, Radio,RadioGroup, Typography, Button } from '@material-ui/core';
import {Star,CloseIcon, StarBorder} from '@material-ui/icons';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FirebaseService from "../FirebaseService"

const styles = theme => ({
    root: {
      width: 500,
    },
    snackbar: {
      backgroundColor: "#313131"      
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
            score: 0,
            running: false
        }

        this.buttonRef = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.feedback = this.feedback.bind(this);
        this.focusComment = this.focusComment.bind(this);
    }

    focusComment() {
        this.comment.focus();
      }

    feedback(event ) {
        const { title } = this.props;
        this.setState({running:true}, () => {
                                        FirebaseService.submitFeedback(title, this.state.comment, this.state.score)
                                        .then(()=> {
                                          this.setState({running:false})
                                          this.setState({showSnackbar:true})
                                        })
                                        .catch(()=> {
                                          this.setState({running:false})
                                        });
                                      });

    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.props.onRef(this)
        this.unregisterAuthObserver = FirebaseService.auth.onAuthStateChanged(
            
            (user) => {this.setState({user: user})}
        );
    }
    
    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.props.onRef(undefined)
        this.unregisterAuthObserver();
    }

    handleChange(field, value) {
        this.setState({ [field]: value});
      }

    render() {
        const { classes } = this.props;
       const { user } = this.state;

       return ( user ? ( <div className="row">
                            <div className="col-sm-10 col-sm-offset-1 " >
                                <Typography className="feedback-header" >
                                Feedback
                                </Typography>
                                <form className={classes.container} noValidate autoComplete="off">

                                    <TextField  
                                        id="comment"
                                        value={this.state.comment} 
                                        rows="4" 
                                        inputRef={(input) => { this.comment = input; }} 
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
                                        <Button ref={this.buttonRef} disabled={(this.state.score > 0 && !this.state.running)?false:true} id="randomFeedback" variant="contained" color="primary" className={classes.button} onClick={(event) => {this.feedback(event)}}>
                                            Submit
                                        </Button>
                                </form>
                            </div>
                            <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.showSnackbar}
          ContentProps= {
            {
              className: classes.snackbar
            }
          }
          id="snackbar"
          autoHideDuration={60000}
          onClose={()=>{this.setState({showSnackbar: false})}}
          message={<span className={classes.snackbar}>Feedback submitted</span>}
        />
                        </div>) 
                    : 
                        <div/>);
       
    }
}

export default withStyles(styles)(FeedbackPanel);
