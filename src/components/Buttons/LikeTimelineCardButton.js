// React
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { likeTimelineCard } from '../../redux/actions/dataActions';

// MUI Icons
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';

// Components
import MyButton from '../../util/MyButton';

const styles = theme => ({
    ...theme.spreadableStyles,
    isNotLoggedIn: {
        color: 'grey'
    }
});

class LikeTimelineCardButton extends Component {

    state = {
        openSnackbar: false
    }

    likedTimelineCard = () => {

        if (this.props.data.ratings && this.props.data.ratings.length > 0) {
            let userRatings = this.props.data.ratings.filter(like =>
                like.userHandle === this.props.user.credentials.handle &&
                like.cardId === this.props.cardId);

            if (userRatings.length === 0) {
                return;
            }
            else
                if (userRatings.length === 1) {
                    if (userRatings[0].liked) {
                        return true
                    } else {
                        return false;
                    }
                } else {
                    if (userRatings.length === 2) {
                        if (userRatings[0].liked) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
        }
    }

    likeTimelineCard = () => {
        this.props.likeTimelineCard(this.props.timelineId, this.props.cardId);
    }

    render() {
        const { authenticated } = this.props.user;
        const { classes } = this.props;

        const likeCardButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="Like">
                    <ThumbUpIcon className={classes.isNotLoggedIn} />
                </MyButton>
            </Link>
        ) : (
                this.likedTimelineCard() ? (
                    <MyButton tip="Liked">
                        <ThumbUpIcon color="primary" />
                    </MyButton>
                ) : (
                        <MyButton tip="Like" onClick={this.likeTimelineCard}>
                            <ThumbUpIcon className={classes.isNotLoggedIn} />
                        </MyButton>
                    )
            )
        return likeCardButton;
    }
}

LikeTimelineCardButton.propTypes = {
    user: PropTypes.object.isRequired,
    likeTimelineCard: PropTypes.func.isRequired,
    cardId: PropTypes.string.isRequired,
    timelineId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
})

const mapActionsToProps = {
    likeTimelineCard
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(LikeTimelineCardButton));