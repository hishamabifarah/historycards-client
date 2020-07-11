// React
import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types';

// Redux 
import { connect } from 'react-redux';
import { getTimelines, getLatestActivity } from '../redux/actions/dataActions';

// Components
import LatestTimelines from '../components/timeline/LatestTimelines';
import RecentActivity from '../components/timeline/RecentActivity';
import SkeletonHomeTimelines from '../components/timeline/SkeletonHomeTimelines';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

// if (process.env.NODE_ENV === 'development') {
//     const whyDidYouRender = require('@welldone-software/why-did-you-render');
//     whyDidYouRender(React, {
//       trackAllPureComponents: true,
//     });
//   }

const styles = {
    title: {
        textAlign: 'center'
    },
    circular: {
        textAlign: 'center',
        marginTop: '20px'
    },
    tryAgainButton: {
        width: '47%',
        left: '50%',
        marginTop: '10px'
    }
}

class home extends Component {

    constructor(props) {
        super(props);

        this.handleLoadMore = () => {
            if (this.props) {
                let page = parseInt(this.props.data.page);
                page = page + 1
                this.props.getTimelines(page);
            }
        }

        this.getTimelines = () => {
            if (this.props) {
                let page = parseInt(this.props.data.page);
                if (page === 0) {
                    this.props.getTimelines(1);
                } else {
                    return;
                }
            }
        }
    }

    componentDidMount() {
        this.getTimelines();
        this.props.getLatestActivity();
    }

    render() {

        const { timelines, loading, hasMore, errors } = this.props.data;
        const { classes } = this.props;

        let loadMoreButton = !loading && hasMore && !errors ? (
            <Button
                variant="contained"
                color="primary"
                disabled={loading}
                hidden={loading}
                onClick={this.handleLoadMore}
                fullWidth
                className={classes.button}>
                Load More
            </Button>
        ) : (
                null
            )

        return (
            <Fragment>
                <Grid container spacing={2}>
                    <Grid item sm={8} xs={12}>
                        {timelines.map(timeline => {
                            return (
                                <LatestTimelines key={timeline.timelineId} timeline={timeline} />
                            );
                        })}

                        {loadMoreButton}

                        {errors &&
                            <Fragment>
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {errors}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        hidden={loading}
                                        onClick={this.handleLoadMore}
                                        className={classes.tryAgainButton}>
                                        Try Again
                                    </Button>
                                </Alert>
                            </Fragment>
                        }
                        {loading && !errors &&

                            <SkeletonHomeTimelines/>
                        }
                    </Grid>
                        <Grid item sm={4} xs={12}>
                            <div className={classes.title}>
                                <p>Recent activities</p>
                            </div>
                            <RecentActivity />
                        </Grid>
                </Grid>
            </Fragment>
        );
    }
}

home.propTypes = {
    getTimelines: PropTypes.func.isRequired,
    getLatestActivity: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    totalRecords: PropTypes.number,
    status: PropTypes.number,
    page: PropTypes.number,
    pageCount: PropTypes.number,
    errors: PropTypes.string
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getTimelines, getLatestActivity })(withStyles(styles)(home));