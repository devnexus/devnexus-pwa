import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar, TextField, Radio,RadioGroup, Typography, Button } from '@material-ui/core';
import {Star, StarBorder} from '@material-ui/icons';
import AeroGearService from "../AeroGearService"

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

    constructor(props) {
        super(props);
        
        this.state = {
            user: null,
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

    feedback(  ) {
        const { title } = this.props;
        AeroGearService.submitFeedback(title, this.state.comment, this.state.score);
    }

    
    componentDidMount() {
        this.props.onRef(this)
        AeroGearService.getProfile().then(user => {
          console.log(user);
          this.setState({user:user});
        }).catch(err => {console.log(err)})
        
    }
    
    componentWillUnmount() {
        this.props.onRef(undefined)
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
          autoHideDuration={2000}
          onClose={()=>{this.setState({showSnackbar: false})}}
          message={<span className={classes.snackbar}>Feedback submitted</span>}
        />
                        </div>) 
                    : 
                        <div/>);
       
    }
}


FeedbackPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  onRef: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
};


export default withStyles(styles)(FeedbackPanel);
