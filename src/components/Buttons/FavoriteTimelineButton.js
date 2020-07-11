import React, { Component } from 'react'
import MyButton from '../../util/MyButton';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import BookmarkIcon from '@material-ui/icons/Bookmark';

import { connect } from 'react-redux';
import { favoriteTimeline , unfavoriteTimeline} from '../../redux/actions/dataActions';

class FavoriteTimelineButton extends Component {

   // check if user already favorited the timeline
    // if user has favorites & user favorites has the timeline favorited return true

    favoritedTimeline = () => {
        if(this.props.user.favorites && 
            this.props.user.favorites.find(
                (favorite) => favorite.timelineId === this.props.timelineId
            )    
        )
        return true;
        else return false;
    }

    favoriteTimeline = () => {
        this.props.favoriteTimeline(this.props.timelineId);
    }
    unfavoriteTimeline = () => {
        this.props.unfavoriteTimeline(this.props.timelineId);
    }

    render() {
        const { authenticated } = this.props.user;
        const favoriteButton = !authenticated ? (
            <Link to="/login">
            <MyButton tip="Favorite">
                <BookmarkIcon color="primary" />
            </MyButton>
            </Link>
        ) : (
            this.favoritedTimeline() ? (
                <MyButton tip="Undo Favorite" onClick={this.unfavoriteTimeline}>
                    <BookmarkIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Favorite" onClick={this.favoriteTimeline}>
                    <BookmarkIcon color="secondary"/>
                </MyButton>
                )
            )
            return favoriteButton;
    }
}

FavoriteTimelineButton.propTypes = {
    user: PropTypes.object.isRequired,
    favoriteTimeline: PropTypes.func.isRequired,
    unfavoriteTimeline: PropTypes.func.isRequired,
    timelineId : PropTypes.string.isRequired
}

const mapStateToProps = (state) =>({
    user: state.user
})

const mapActionsToProps = {
    favoriteTimeline,
    unfavoriteTimeline
}

export default connect(mapStateToProps , mapActionsToProps)(FavoriteTimelineButton);