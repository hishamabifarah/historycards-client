// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { getLatestActivity } from '../../redux/actions/dataActions';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import SkeletonActivities from './SkeletonActivities';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = {
    card: {
        boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
        borderRadius: '12px',
        marginBottom: '8px',
        width: '95%',
        padding: '8px'
    },
    TypH6: {
        fontSize: '0.9rem'
    },
    button: {
        width: '30%'
    },
    alignCardTimelineTitle: {
        display: 'block',
        fontSize: '0.9rem'
    }
}

class RecentActivity extends Component {

    handleRetry = () => {
        this.props.getLatestActivity();
    }

    render() {

        const activities = this.props.activities;

        const { classes, errorActivities } = this.props;

        dayjs.extend(relativeTime);

        let ActivitiesMarkup =
            activities && activities.length > 0 ? (
                activities.map(n => {
                    const verb = n.type === 'timeline' ? ' created timeline: ' :
                        ` added card '${n.title}' to timeline: `;
                    const userAvatar =
                        <Avatar className={classes.avatar} alt="user image" src={n.userImage} />

                    const type = n.type === 'timeline' ? (

                        <Typography component={'span'} color="textSecondary" >

                            <Typography
                                variant="h6"
                                className={classes.TypH6}
                                color="primary">
                                {n.userHandle}
                            </Typography>

                            {verb}

                            <Typography
                                variant="h6"
                                component={Link}
                                className={classes.TypH6}
                                to={`/timelines/${n.timelineId}`}
                                color="primary">
                                {n.title}
                            </Typography>
                        </Typography>

                    ) : (
                            <Typography component={'span'} color="textSecondary" >
                                <Typography
                                    variant="h6"
                                    className={classes.TypH6}
                                    color="secondary">
                                    {n.userHandle}
                                </Typography>

                                {verb}

                                <Typography
                                    variant="h6"
                                    component={Link}
                                    to={`/timelines/${n.timelineId}`}
                                    className={classes.alignCardTimelineTitle}
                                    color="secondary">
                                    {n.timelineTitle}

                                </Typography>
                            </Typography>
                        )

                    return (
                        <Card key={n.createdAt} className={classes.card}>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    {userAvatar}
                                </div>
                                <div style={{ marginLeft: '15px' }} >
                                    {type}
                                </div>
                            </div>
                        </Card>

                    );
                })
            ) : activities && activities.length === 0 && errorActivities ? (
                <div style={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        // disabled={loading}
                        // hidden={loading}
                        onClick={this.handleRetry}
                        fullWidth
                        className={classes.button}>
                        Reload
                    </Button>
                </div>
            ) : (
                        <SkeletonActivities />
                    )
        return (

            ActivitiesMarkup

        )
    }
}

const mapStateToProps = state => ({
    activities: state.data.activities,
    errorActivities: state.data.errorActivities
})

RecentActivity.propTypes = {
    classes: PropTypes.object.isRequired,
    getLatestActivity: PropTypes.func.isRequired,
    activities: PropTypes.array.isRequired,
    errorActivities: PropTypes.string
}

export default connect(
    mapStateToProps,
    { getLatestActivity }
)(withStyles(styles)(RecentActivity));