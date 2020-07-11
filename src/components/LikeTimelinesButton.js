import React, { Component } from 'react'
import MyButton from '../util/MyButton';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { connect } from 'react-redux';
import { likeTimeline , unlikeTimeline} from '../redux/actions/dataActions';

class LikeTimelinesButton extends Component {

   // check if user already liked the timeline
    // if user has likes & user likes has the timeline liked return true

    likedTimeline = () => {
        if(this.props.user.likes && 
            this.props.user.likes.find(
                (like) => like.timelineId === this.props.timelineId
            )    
        )
        return true;
        else return false;
    }

    likeTimeline = () => {
        this.props.likeTimeline(this.props.timelineId);
    }
    unlikeTimeline = () => {
        this.props.unlikeTimeline(this.props.timelineId);
    }

    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
            <MyButton tip="Like">
                <FavoriteBorder color="primary" />
            </MyButton>
            </Link>
        ) : (
            this.likedTimeline() ? (
                <MyButton tip="Undo Like" onClick={this.unlikeTimeline}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeTimeline}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
                )
            )
            return likeButton;
    }
}

LikeTimelinesButton.propTypes = {
    user: PropTypes.object.isRequired,
    likeTimeline: PropTypes.func.isRequired,
    unlikeTimeline: PropTypes.func.isRequired,
    timelineId : PropTypes.string.isRequired
}

const mapStateToProps = (state) =>({
    user: state.user
})

const mapActionsToProps = {
    likeTimeline,
    unlikeTimeline
}

export default connect(mapStateToProps , mapActionsToProps)(LikeTimelinesButton);