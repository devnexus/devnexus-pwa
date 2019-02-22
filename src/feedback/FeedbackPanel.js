import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
      width: 500,
    },
    typography: {
      padding: theme.spacing.unit * 2,
    },
  });

 class FeedbackPanel extends React.Component {

    constructor(props) {
        super(props);
    }
      
    render() {
       const { classes } = this.props;
       return <Paper>
                <Typography className={classes.typography}>The content of the Feedback Panel.</Typography>
              </Paper>;
    }
}

export default withStyles(styles)(FeedbackPanel);
