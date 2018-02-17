import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

export class ScheduleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      item: {}
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  

  handleClickOpen(item) {
    this.setState({ open: true, item:item });
  };

  handleClose() {
    this.setState({ open: false,item:{} });
  };

  componentDidMount() {
    this.props.onRef(this)
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
          <div id="speaker" className="bg-light-gray details container"
              style={{marginTop: "2em", textAlign: "left", paddingBottom: 0}}>
              <div className="row" key={this.state.item.id}>
                <div className="col-sm-10 col-sm-offset-1">
                  <div className="speaker-member row "
                    style={{padding:"25px",
                    background: "linear-gradient(-90deg, #6c7070, #6c7070) repeat-y", backgroundSize: "10px 10px",
                    backgroundColor: "#282828"}}>
                    {this.state.item.title}
                      <div>
                        Track:
                        { this.state.item.track }
                      </div>
                  </div>
              </div>
              </div>
              <div className="row" key={this.state.item.id + "1"}>
                <div className="col-sm-10 col-sm-offset-1 ">
                  <div className="presentation-header" key={this.state.item.id + "2"}>
                    Abstract
                  </div>
                  <div className="biographyBody" key={this.state.item.id + "3"}>
                    {this.state.item.abstract}
                  </div>
                </div>
              </div>
              {this.state.item.persons?this.state.item.persons.map((speaker, i) => {
                return (<div key={this.state.item.id + "2" + i + "3"}>
                          <div key={this.state.item.id + "1" + i + "1"}>{speaker.full_public_name}</div>
                          <div key={this.state.item.id + "1" + i + "2"}>{speaker.abstract}</div>
                </div>);
              }):<div key={this.state.item.id + "1" + "1"}/> }
                {/* {% for speaker in page.persons %}
                  {% include speaker_bio.html speaker=speaker %}
                {% endfor %} */}

            </div>  
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}



ScheduleDetail.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ScheduleDetail);