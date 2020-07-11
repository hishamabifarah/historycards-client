// React
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getTimeline } from '../../redux/actions/dataActions';

// Components
import LikeTimelineCardButton from './../Buttons/LikeTimelineCardButton';
import DislikeTimelineCardButton from './../Buttons/DislikeTimelineCardButton';
import DeleteCard from './../cards/DeleteCard';
import EditCard from './../cards/EditCard';
import PostCard from './../cards/PostCard';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

// MUI Icons
import EventIcon from '@material-ui/icons/Event';
import LinkIcon from '@material-ui/icons/Link';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
const styles = ({
    root: {
        maxWidth: 1231,
        marginBottom: 20,
        marginTop: 10
    },

    image: {
        height: 30,
        paddingTop: '40%',
    },
    card: {
        marginTop: 20
    },
    buttonsRoot: {
        display: 'flex',
        alignItems: 'center'
    },
    buttonsRight: {
        marginLeft: 'auto',
        display: 'flex'
    },
    buttonsRightMobile: {
        marginRight: 'auto',
        display: 'flex'
    },
    buttonsLeftMobile: {
        display: 'flex'
    },
    cardSourceDate: {
        marginTop: '7px',
        marginRight: '10px',
    },
    button: {
        marginTop: '15px'
    },

    cardImageContainer: {
        // maxWidth: '400px',
        // overflow: 'hidden'
    },
    cardTitle: {
        fontWeight: 'bold'
    },
    // feed css
    feedTitle: {
        marginLeft: '15px',
        marginBottom: '15px'
    },
    activityFeed: {
        paddingLeft: '15px',
        paddingTop: '15px'
    },

    feedItem: {
        position: 'relative',
        // paddingBottom: '20px',
        paddingLeft: '30px',
        borderLeft: '2px solid #e4e8eb',

        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: '-7px',
            width: '10px',
            height: '10px',
            borderRadius: '6px',
            background: '#fff',
            border: '1px solid #f37167',
        },
        "&:last-child": {
            //  borderColor: 'transparent'
        }
    },
    feedItemTitle: {
        marginBottom: '12px',
        fontWeight: 'bold'
    },
    feedDate: {
        position: 'relative',
        top: '-5px',
        color: '#8c96a3',
        textTransform: 'uppercase',
        fontSize: '13px',
    },
    feedText: {
        position: 'relative',
        top: '-3px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
});

class Timeline extends PureComponent {
    constructor() {
        super()
        this.state = {
            openSnackbar: false,
            errorLikeCard: ''
        }
    }

    componentDidMount() {
        if (this.props) {
            let page = parseInt(this.props.paginate.pageCards);
            if (page === 1) {
                window.scrollTo(0, 0);
            }
        }
    }

    handleClose = () => {
        this.setState({
            openSnackbar: false,
            errorLikeCard: ''
        })
    }
    handleLoadMore = () => {
        if (this.props) {
            let page = parseInt(this.props.paginate.pageCards);
            page = page + 1
            this.props.getTimeline(this.props.timeline.timelineId, page);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.paginate.errorLikeCards) {
            this.setState({ openSnackbar: true, errorLikeCard: 'Rating limit (2) exceeded' });
        } else {
            this.setState({ errorLikeCard: '' });
        }
    }

    render() {
        dayjs.extend(relativeTime);

        // const openModal = this.props.data.errorLikeCards ? true : false
        const { classes,
            timeline: { title, description, imageUrl, timelineId }
        } = this.props;

        const { errorsPaginateTimeline } = this.props.paginate;
        const { errorLikeCard, openSnackbar } = this.state;

        let cardsArr;

        const timelineImage = imageUrl ? (
            <CardMedia
                className={classes.image}
                image={imageUrl}
                title="Timeline Image"
            />
        ) : null

        const likeError = errorLikeCard ? (
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity="error">
                    {errorLikeCard}
                </Alert>
            </Snackbar>
        ) : null

        let authenticated = this.props.user.authenticated;

        if (this.props.timeline.cards) {
            if (window.screen.availWidth > 1300) {
                let a = this.props.timeline.cards;
                let cardImage = '';
                let cardUserHandle = this.props.user.credentials.handle;
                let hasMoreCards;
                let loading;
                if (this.props.timeline) {
                    hasMoreCards = this.props.paginate.hasMoreCards;
                    loading = this.props.UI.loading;
                }
                let deleteCardButton;
                let editCardButton;
                let loadMoreButton;

                if (a && a.length > 0) {

                    cardsArr = <div>
                        <Typography className={classes.feedTitle} variant="h5">
                            Timeline
                            {authenticated &&
                                <PostCard timelineId={timelineId} />
                            }
                        </Typography>

                        {
                            a.map((card) => {
                                // card Image 
                                if (card.imageUrl) {
                                    cardImage =
                                        <CardMedia
                                            className={classes.media}
                                            image={card.imageUrl}
                                            title="Card Image"
                                        />
                                } else {
                                    cardImage = null;
                                }
                                // create delete and edit buttons
                                if (authenticated && cardUserHandle === card.userHandle) {
                                    deleteCardButton = <DeleteCard timelineId={card.timelineId} cardId={card.cardId} />
                                    editCardButton = <EditCard
                                        timelineId={card.timelineId}
                                        source={card.source}
                                        date={card.cardDate}
                                        title={card.title}
                                        description={card.body}
                                        cardId={card.cardId}
                                    />

                                } else {
                                    editCardButton = null;
                                    deleteCardButton = null;
                                }

                                if (hasMoreCards && !loading && !errorsPaginateTimeline) {
                                    loadMoreButton =
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            hidden={loading}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.handleLoadMore()
                                            }}
                                            fullWidth
                                            className={classes.button}>
                                            Load More
                                            </Button>
                                } else
                                    if (hasMoreCards && !loading && errorsPaginateTimeline) {
                                        loadMoreButton =
                                            <Fragment>
                                                <Alert severity="error">
                                                    <AlertTitle>Error</AlertTitle>
                                                    {errorsPaginateTimeline}
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={loading}
                                                        hidden={loading}

                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            this.handleLoadMore()
                                                        }}
                                                        fullWidth
                                                        className={classes.button}>
                                                        Retry
                                                    </Button>
                                                </Alert>
                                            </Fragment>
                                    }

                                return (
                                    <Fragment key={card.createdAt}>
                                        <div key={card.createdAt} className={classes.root}>
                                            {/* MUI CARD */}
                                            <Card key={card.cardId} className={classes.card}>
                                                <CardHeader
                                                    avatar={<Avatar alt="User Image" src={card.userImage} />}
                                                    title={<span className={classes.cardTitle}>{card.title}</span>}
                                                    action={<Fragment>{deleteCardButton} {editCardButton} </Fragment>}
                                                    subheader={dayjs(card.createdAt).fromNow()}
                                                />
                                                <div className={classes.cardImageContainer}>
                                                    {cardImage}
                                                </div>
                                                <CardContent>
                                                    <Typography variant="body1" color="textSecondary" component="p">
                                                        {card.body}
                                                    </Typography>
                                                </CardContent>
                                                <div className={classes.buttonsRoot}>
                                                    <div className={classes.buttonsLeft}>
                                                        <CardActions disableSpacing>
                                                            <span className={classes.cardSourceDate}>
                                                                <LinkIcon color="primary" />
                                                            </span>
                                                            <span> {card.source} </span>
                                                        </CardActions>
                                                        <CardActions disableSpacing>
                                                            <span className={classes.cardSourceDate}>
                                                                <EventIcon color="primary" />
                                                            </span>
                                                            <span>
                                                                {dayjs(card.cardDate).format('MMMM DD, YYYY')}
                                                            </span>
                                                        </CardActions>
                                                    </div>
                                                    <div className={classes.buttonsRight}>
                                                        <CardActions disableSpacing>
                                                            <span>{card.likeCount}</span>
                                                            <LikeTimelineCardButton
                                                                cardId={card.cardId}
                                                                timelineId={card.timelineId}
                                                                className={classes.bookmark}>
                                                            </LikeTimelineCardButton>
                                                        </CardActions>
                                                        <CardActions disableSpacing>
                                                            <span>{card.dislikeCount}</span>
                                                            <DislikeTimelineCardButton
                                                                cardId={card.cardId}
                                                                timelineId={card.timelineId}
                                                                className={classes.bookmark}>
                                                            </DislikeTimelineCardButton>

                                                            {likeError}

                                                        </CardActions>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    </Fragment>
                                )
                            })
                        }
                        <div>
                            {loadMoreButton}
                        </div>
                    </div>

                }
            } else {
                // MOBILE VIEW
                let cards = this.props.timeline.cards;
                let cardImage = '';
                let cardUserHandle = this.props.user.credentials.handle;
                let authenticated = this.props.user.authenticated;
                let deleteCardButton;
                let editCardButton;
                let loadMoreButton;
                let hasMoreCards;
                let loading;
                let timelineId = this.props.timeline.timelineId;
                if (this.props.timeline) {
                    hasMoreCards = this.props.paginate.hasMoreCards;
                    loading = this.props.UI.loading;
                    //  console.log('hasMoreCards : ' + hasMoreCards + ' errors: ' + errorsCards + ' loading: ' + loading);
                }
                if (cards && cards.length > 0) {
                    cardsArr = <div>
                        <Typography className={classes.feedTitle} variant="h5">
                            Timeline
                            {authenticated &&
                                <PostCard timelineId={timelineId} />
                            }
                        </Typography>
                        {
                            cards.map((card) => {
                                // card Image 
                                if (card.imageUrl) {
                                    cardImage =
                                        <CardMedia
                                            className={classes.media}
                                            image={card.imageUrl}
                                            title="Card Image"
                                        />
                                } else {
                                    cardImage = null;
                                }

                                if (authenticated && cardUserHandle === card.userHandle) {
                                    deleteCardButton = <DeleteCard timelineId={card.timelineId} cardId={card.cardId} />
                                    editCardButton = <EditCard
                                        timelineId={card.timelineId}
                                        source={card.source}
                                        date={card.cardDate}
                                        title={card.title}
                                        description={card.body}
                                        cardId={card.cardId}
                                    />

                                } else {
                                    editCardButton = null;
                                    deleteCardButton = null;
                                }

                                if (hasMoreCards && !loading && !errorsPaginateTimeline) {
                                    loadMoreButton =
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            hidden={loading}

                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.handleLoadMore()
                                            }}
                                            fullWidth
                                            className={classes.button}>
                                            Load More
                                            </Button>
                                } else
                                    if (hasMoreCards && !loading && errorsPaginateTimeline) {
                                        loadMoreButton =
                                            <Fragment>
                                                <Alert severity="error">
                                                    <AlertTitle>Error</AlertTitle>
                                                    {errorsPaginateTimeline}
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={loading}
                                                        hidden={loading}

                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            this.handleLoadMore()
                                                        }}
                                                        fullWidth
                                                        className={classes.button}>
                                                        Retry
                                        </Button>
                                                </Alert>
                                            </Fragment>
                                    }
                                return (
                                    <Card className={classes.card} key={card.createdAt}>
                                        <CardHeader
                                            avatar={<Avatar alt="User Image" src={card.userImage} />}
                                            title={card.title}
                                            subheader={dayjs(card.createdAt).fromNow()}
                                        />
                                        {cardImage}
                                        <div className={classes.activityFeed} key={card.cardId}>
                                            <div className={classes.feedItem}>
                                                <div className={classes.feedDate}>
                                                    {dayjs(card.cardDate).format('MMMM DD, YYYY')}
                                                </div>
                                                <div className={classes.feedItemTitle}>{card.title}</div>
                                                <div className={classes.feedText}>{card.body}
                                                    <div className={classes.buttonsRoot}>
                                                        <div className={classes.buttonsRightMobile}>
                                                            <CardActions disableSpacing>
                                                                <span>{card.likeCount}</span>
                                                                <LikeTimelineCardButton
                                                                    cardId={card.cardId}
                                                                    timelineId={card.timelineId}
                                                                    className={classes.bookmark}>
                                                                </LikeTimelineCardButton>
                                                            </CardActions>
                                                            <CardActions disableSpacing>
                                                                <span>{card.dislikeCount}</span>
                                                                <DislikeTimelineCardButton
                                                                    cardId={card.cardId}
                                                                    timelineId={card.timelineId}
                                                                    className={classes.bookmark}>
                                                                </DislikeTimelineCardButton>
                                                                {likeError}
                                                            </CardActions>
                                                        </div>
                                                        <div className={classes.buttonsLeftMobile}>
                                                            <CardActions disableSpacing>
                                                                {editCardButton}
                                                                {deleteCardButton}
                                                            </CardActions>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })
                        }
                        <div>
                            {loadMoreButton}
                        </div>
                    </div>
                }
            }
        } else {
            cardsArr = <div>
                <Typography className={classes.feedTitle} variant="h5">
                    Timeline
                    {authenticated &&
                        <PostCard timelineId={timelineId} />
                    }
                </Typography>
            </div>
        }

        // console.log('Timeline Component props: ', this.props);

        return (
            <div>
                <Fragment>

                    <Card className={classes.root}>
                        <CardActionArea>
                            {timelineImage}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Grid container spacing={1}>
                        <Grid item sm={8} xs={12}>

                            {cardsArr}

                        </Grid>
                    </Grid>
                </Fragment>
            </div>
        )
    }
}

Timeline.propTypes = {
    getTimeline: PropTypes.func.isRequired,
    timeline: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    totalRecordsCards: PropTypes.number,
    status: PropTypes.number,
    pageCards: PropTypes.number,
    pageCountCards: PropTypes.number,
    hasMoreCards: PropTypes.bool
};

const mapStateToProps = state => ({
    timeline: state.data.timeline,
    paginate: state.data,
    UI: state.UI,
    user: state.user,
    // data: state.data
});

const mapActionsToProps = {
    getTimeline
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Timeline));