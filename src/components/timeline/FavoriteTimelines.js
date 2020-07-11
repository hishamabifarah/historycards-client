// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Components
// import LikeTimelinesButton from './../LikeTimelinesButton';
import FavoriteTimelineButton from './../Buttons/FavoriteTimelineButton';
// import DeleteTimeline from '../../components/timeline/DeleteTimeline';
// import EditTimeline from '../../components/timeline/EditTimeline';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// import Hidden from '@material-ui/core/Hidden';
// import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider';

// import IconButton from '@material-ui/core/IconButton';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

// MUI Icons
// import ChatIcon from '@material-ui/icons/Chat';
// import MyButton from '../../util/MyButton'
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// import VisibilityIcon from '@material-ui/icons/Visibility';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = {
    card: {
        // maxWidth: 345,
        marginBottom: 15
    },
    media: {
        height: 120,
        paddingTop: '30%',
    },
    avatar: {
    },
    buttonsRoot: {
        display: 'flex',
        alignItems: 'center'
    },
    buttonsLeft: {

    },
    buttonsRight: {
        marginLeft: 'auto'
    },
    icon: {
        fontSize: '1.1rem',
        verticalAlign: 'bottom',
        marginLeft: '4px'
    },
    textFooter: {
        fontSize: 14,
        color: '#3f51b5',
        opacity: 1
    },
    spanAlign: {
        marginTop: '-2px'
    },
    rating: {
        display: 'flex',
        marginLeft: '-5px'
    }
}
class FavoriteTimelines extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null
        };

        this.handleDeleteTimeline = () => {
            this.setState({ anchorEl: null });
        };

       this.handleEditTimeline = () => {
            this.setState({ anchorEl: null });
        };

        this.handleClick = event => {
            this.setState({ anchorEl: event.target });
        };
    }

    render() {
        // const ITEM_HEIGHT = 48;
//        const anchorEl = this.state.anchorEl;
        // const open = Boolean(anchorEl);

        dayjs.extend(relativeTime);
        //extract timeline properties, timelines are inside props too like classes
        const {
            classes,
            timeline: {
                title, description, createdAt, imageUrl, userImage , timelineId
                // , commentCount, ,viewsCount,ratingAverage,likeCount
                // ,userHandle
            }
            // ,
            // user: {
            //     authenticated,
            //     credentials: {
            //         handle
            //     }
            // } 
        } = this.props;

        // // Delete Button Markup
        // const deleteButton = authenticated && userHandle === handle ? (
        //     <DeleteTimeline timelineId={timelineId} />
        // ) : null

        // // Edit Button Markup
        // const editButton = authenticated && userHandle === handle ? (
        //     <EditTimeline timeline={this.props.timeline} />
        // ) : null

        // // Delete/Edit card action menu markup
        // const userMenu = authenticated && userHandle === handle ? (
        //     <Fragment>
        //         <IconButton
        //             aria-label="more"
        //             aria-controls="long-menu"
        //             aria-haspopup="true"
        //             onClick={this.handleClick}>
        //             <MoreVertIcon />
        //         </IconButton>
        //         <Menu
        //             id="long-menu"
        //             anchorEl={anchorEl}
        //             keepMounted
        //             open={open}
        //             onClose={this.handleClose}
        //             PaperProps={{
        //                 style: {
        //                     maxHeight: ITEM_HEIGHT * 4.5,
        //                     width: '20ch',
        //                 },
        //             }}
        //         >
        //             <MenuItem key={1} onClick={this.handleEditTimeline}>{editButton} Edit</MenuItem>
        //             <MenuItem key={2} onClick={this.handleDeleteTimeline}>{deleteButton} Delete</MenuItem>
        //         </Menu>
        //     </Fragment>
        // ) : null

        // Timeline image markup
        const timelineImage = imageUrl ? (
            <CardMedia
                className={classes.media}
                image={imageUrl}
                title="Timeline Image"
            />
        ) : null

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar alt="User Image" src={userImage} />
                    }
                    // action={
                    //     userMenu
                    // }
                    title={
                        title
                    }
                    subheader={dayjs(createdAt).fromNow()}
                />

                {timelineImage}

                <CardContent>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>

                <Divider className={styles.divider} light />

                <div className={classes.buttonsRoot}>
                    {/* <div className={classes.buttonsLeft}>
                        <CardActions disableSpacing>
                            <LikeTimelinesButton timelineId={timelineId} />
                            <span className={classes.spanAlign}>{likeCount} <Hidden mdDown>Likes </Hidden></span>
                            <MyButton tip="cards">
                                <ChatIcon color="primary" />
                            </MyButton>
                            <span className={classes.spanAlign}>{commentCount} <Hidden mdDown>Cards </Hidden></span>
                            <MyButton tip="views">
                                <VisibilityIcon color="primary" />
                            </MyButton>
                            <span className={classes.spanAlign}>{viewsCount} <Hidden mdDown>Views </Hidden></span>
                        </CardActions>
                    </div> */}
                    <div className={classes.buttonsRight}>
                        <CardActions disableSpacing>
                            <FavoriteTimelineButton
                                timelineId={timelineId}
                                tip="add to favorites"
                                className={classes.bookmark}>
                            </FavoriteTimelineButton>
                            <Link
                                to={`/timelines/${timelineId}`}
                                className={classes.textFooter}>
                                View Cards
                                    <ArrowRightIcon className={classes.icon} />
                            </Link>
                        </CardActions>
                    </div>
                </div>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    data: state.data
})

FavoriteTimelines.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    timeline: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps
)(withStyles(styles)(FavoriteTimelines));