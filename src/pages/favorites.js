// React
import React, { Component } from 'react'
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getUserFavoriteTimelines } from '../redux/actions/dataActions';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import FavoriteTimelines from '../components/timeline/FavoriteTimelines';
import SkeletonTimeline from '../components/timeline/SkeletonTimeline';

const styles = {
    title: {
        textAlign: 'center'
    },
    circular: {
        marginTop: '20px',
        textAlign: 'center'
    }
}

class favorites extends Component {

    componentDidMount() {
        const handle = this.props.match.params.handle;
        if (handle && handle !== 'undefined') {
            this.props.getUserFavoriteTimelines(handle);
        } else {
            // something other than return
            return;
        }
    }

    render() {

        const { favorites } = this.props.data;
        const { UI: { loading } } = this.props;

        let recentTimelinesMarkup = favorites && favorites.length > 0 ? (
            favorites.map(timeline => <FavoriteTimelines key={timeline.timelineId} timeline={timeline} />)
        ) : (
                <Alert severity="info">No Favorites yet!</Alert>
            )

        return (
            <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                    {!loading &&
                        recentTimelinesMarkup
                    }
                    {loading &&
                        <SkeletonTimeline />
                    }
                </Grid>
            </Grid>
        );
    }
}

favorites.propTypes = {
    getUserFavoriteTimelines: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    data: state.data,
    UI: state.UI
});

export default connect(mapStateToProps, { getUserFavoriteTimelines })(withStyles(styles)(favorites));