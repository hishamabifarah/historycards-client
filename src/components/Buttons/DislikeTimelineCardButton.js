import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import MyButton from '../../util/MyButton';
import { connect } from 'react-redux';
import { dislikeTimelineCard } from '../../redux/actions/dataActions';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    ...theme.spreadableStyles,
    isNotLoggedIn: {
        color: 'grey'
    }
});

class DislikeTimelineCardButton extends Component {

    dislikedTimelineCard = () => {

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
                        return false
                    } else {
                        return true;
                    }
                } else {
                    if (userRatings[0].liked) {
                        return false;
                    } else {
                        return true;
                    }
                }
        }
    }

    dislikeTimelineCard = () => {
        this.props.dislikeTimelineCard(this.props.timelineId, this.props.cardId);
    }

    render() {
        const { authenticated } = this.props.user;
        const { classes } = this.props;

        const dislikeCardButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="Dislike">
                    <ThumbDownIcon className={classes.isNotLoggedIn} />
                </MyButton>
            </Link>
        ) : (
                this.dislikedTimelineCard() ? (
                    <MyButton tip="Disliked">
                        <ThumbDownIcon color="primary" />
                    </MyButton>
                ) : (
                        <MyButton tip="Dislike" onClick={this.dislikeTimelineCard}>
                            <ThumbDownIcon className={classes.isNotLoggedIn} />
                        </MyButton>
                    )
            )

        return dislikeCardButton;
    }
}

DislikeTimelineCardButton.propTypes = {
    user: PropTypes.object.isRequired,
    dislikeTimelineCard: PropTypes.func.isRequired,
    cardId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
})

const mapActionsToProps = {
    dislikeTimelineCard
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(DislikeTimelineCardButton));