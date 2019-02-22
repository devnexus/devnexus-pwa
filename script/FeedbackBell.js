import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Notifications from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}
const styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2,
    },
    arrowPopper: arrowGenerator(theme.palette.grey[700]),
    arrow: {
      position: 'absolute',
      fontSize: 6,
      width: '3em',
      height: '3em',
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      },
    },
    
    padding: {
      padding: `0 ${theme.spacing.unit * 2}px`,
    },
    htmlPopper: arrowGenerator('#dadde9'),
    htmlTooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        '& b': {
        fontWeight: theme.typography.fontWeightMedium,
        },
  },
  });

 class FeedbackBell extends React.Component {

    constructor(props) {
        super(props);
    }
      state = {
        open: false,
        arrowRef: null,
      };
      handleArrowRef = node => {
        this.setState({
          arrowRef: node,
        });
      };
      handleTooltipClose = () => {
        this.setState({ open: false });
      };
    
      handleTooltipOpen = () => {
        this.setState({ open: true });
      };

    render() {
       const { classes } = this.props;
       return <ClickAwayListener onClickAway={this.handleTooltipClose}>
                    <div>
                        <Tooltip
                            classes={{
                                popper: classes.htmlPopper,
                                tooltip: classes.htmlTooltip,
                            }}
                            PopperProps={{
                                disablePortal: true,
                                popperOptions: {
                                    modifiers: {
                                        arrow: {
                                        enabled: Boolean(this.state.arrowRef),
                                        element: this.state.arrowRef,
                                        },
                                    },
                                },
                            }}
                            onClose={this.handleTooltipClose}
                            open={this.state.open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title={
                                <React.Fragment>
                                <Typography color="inherit">Tooltip with HTML</Typography>
                                <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                {"It's very engaging. Right?"}
                                <span className={classes.arrow} ref={this.handleArrowRef} />
                                </React.Fragment>
                            }
                            placement="bottom-end"
                        >
                            <IconButton aria-label="Sign in to win" className={classes.margin} onClick={this.handleTooltipOpen}>
                                <Badge badgeContent={1} color="primary">
                                    <Notifications />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </div>
                </ClickAwayListener>;
    }

}

export default withStyles(styles)(FeedbackBell);
