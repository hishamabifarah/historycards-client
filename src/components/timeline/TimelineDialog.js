import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';

//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';
import { clearErrors , getTimeline } from '../../redux/actions/dataActions';

// Components
// import Cards from './../cards/Cards';
// import Comments from './Comments';
// import CommentForm from './CommentForm';
import LikeButton from '../LikeButton';
// dayjs
import dayjs from 'dayjs';

const styles = theme => ({
    ...theme.spreadableStyles,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },

    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv:{
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
});

class TimelineDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    };

    componentDidMount() {
        if (this.props.openDialog) {
          this.handleOpen();
        }
      }
      handleOpen = () => {
        let oldPath = window.location.pathname;
    
        const { userHandle, timelineId } = this.props;
        const newPath = `/users/${userHandle}/timeline/${timelineId}`;
    
        if (oldPath === newPath) oldPath = `/users/${userHandle}`;
        window.history.pushState(null, null, newPath);
    
        this.setState({ open: true, oldPath, newPath });
        this.props.getTimeline(this.props.timelineId);
      };
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    };

    render() {
        const {
            classes,
            timeline: { body, createdAt, timelineId, likeCount, commentCount, userHandle, userImage },
            UI: { loading }
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={100} thickness={2} />
            </div>
        ) : (
                <Grid container spacing={4}>
                    <Grid item sm={5}>
                        <img src={userImage} alt="Profile" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography
                            component={Link}
                            color="primary"
                            variant="h5"
                            to={`users/${userHandle}`}>
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body1">
                            {body}
                        </Typography>
                        <LikeButton timelineId={timelineId}/>
                        <span>{likeCount} Likes</span>
                        <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    </Grid>
                    {/* comments is a prop */}
                    <hr className = {classes.visibleSeperator}/>
                    {/* <CommentForm timelineId={timelineId}/>
                    <Comments comments={comments}/>  */}
                    {/* <Cards cards={cards}/> */}
                </Grid>
            )

        return (

            <Fragment>
                <MyButton onClick={this.handleOpen} tip="expand timeline" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </MyButton>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <MyButton tip="close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>

                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>

                </Dialog>
            </Fragment>
        )
    }
}

TimelineDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getTimeline: PropTypes.func.isRequired,
    timelineId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    timeline: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    timeline: state.data.timeline,
    UI: state.UI
});

const mapActionsToProps = {
    getTimeline,
    clearErrors
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(TimelineDialog));