import React from 'react';
import {Dialog, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { ArrowBack } from '@material-ui/icons';
import FeedbackPanel from './feedback/FeedbackPanel';
import FirebaseService from "./FirebaseService"

export class ScheduleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      item: {}
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.jumpToSubmitFeedback = this.jumpToSubmitFeedback.bind(this);
  }
  
  jumpToSubmitFeedback() {
    if (this.feedback) {
      this.feedback.focusComment();
      document.getElementById('speaker').parentNode.scrollTop = 10000;
    }
  }

  handleClickOpen(item) {
    window.location.hash = "#open";
    this.setState({ open: true, item:item });
  }

  handleClose() {
    window.location.hash = "";
    this.setState({ open: false });
  }


  componentDidMount() {
    this.props.onRef(this)
  
    window.addEventListener("hashchange", () => { if(window.location.hash === "") {this.handleClose()} }, false);
    window.addEventListener("optimizedResize", this.jumpToSubmitFeedback );
    this.unregisterAuthObserver = FirebaseService.auth.onAuthStateChanged(       
      (user) => {this.setState({user: user})}
    );
  }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.props.onRef(undefined)
        this.unregisterAuthObserver();
        window.removeEventListener("optimizedResize", this.jumpToSubmitFeedback)
        this.setState({item:{}});
    }
  
  render() {
    const { fullScreen } = this.props;
    const { user } = this.state;

    return (
      <div >
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
        >
          
          <div id="speaker" className="bg-light-gray details container"
              style={{textAlign: "left", paddingBottom: 0}}>
              <div className="row" key={this.state.item.id}>
                <div className="col-sm-10 col-sm-offset-1">
                  <div className="speaker-member row "
                    style={{paddingLeft:"45px",paddingTop:"10px",paddingBottom:"20px",paddingRight:"10px",
                    background: "linear-gradient(-90deg, #6c7070, #6c7070) repeat-y", backgroundSize: "40px 10px",
                    backgroundColor: "#282828"}}>
                    <ArrowBack 
                      style={{
                        position:"absolute",
                        width: "26px",
                        height: "26px",
                        left: "8px",
                        color: "white",
                        top: "15px"
                      }}
                      onClick={this.handleClose} 
                    />
                    <Typography style={{color: "#fff",fontSize: "26px",fontWeight: "700"}}>
                      {this.state.item.title}
                    </Typography>
                      <div style={{backgroundColor:"#282828"}}>
                          <Typography style={{color: "#fff",fontWeight: "700", display:"inline"}}>
                            Track:&nbsp;
                          </Typography>
                          <Typography style={{color: "#fff", display:"inline"}}>
                            { this.state.item.track }
                          </Typography>
                      </div>
                  </div>
              </div>
              </div>
              <div className="row" key={this.state.item.id + "1"}>
                <div className="col-sm-10 col-sm-offset-1 ">
                  <div style={{display: 'inline-flex', width:'100%',backgroundColor:'#f6921e', color:'#fff'}}  className="presentation-header">
                    <Typography style={{flexGrow:'1'}}  className="presentation-header" >
                      Abstract
                    </Typography>
                    { user ? 
                    <Button onClick={()=>{this.jumpToSubmitFeedback()}} style={{color:'#fff'}} disableRipple={true}>
                        Submit Feedback
                      </Button>
                      : <div/>}
                  </div>
                  <Typography className="biography-body" >
                    {this.state.item.abstract}
                  </Typography>
                  
                </div>
              </div>
              {this.state.item.persons?this.state.item.persons.map((speaker, i) => {
                return (<div key={this.state.item.id + "2" + i + "3"}>
                          <Typography className="biography-header" >{speaker.full_public_name}</Typography>
                          <Typography className="biography-body" >{speaker.abstract}</Typography>
                </div>);
              }):<div key={this.state.item.id + "1" + "1"}/> }
              
              {<FeedbackPanel onRef={(feedback)=> {this.feedback = feedback;}} title={ this.state.item.title } />}
            </div>  
        </Dialog>
      </div>
    );
  }
}



// ScheduleDetail.propTypes = {
//   fullScreen: PropTypes.bool.isRequired,
//   onRef: PropTypes.bool.isRequired,
// };

export default withMobileDialog()(ScheduleDetail);
