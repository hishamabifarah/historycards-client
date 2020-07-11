// React
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

// Redux 
import { connect } from 'react-redux';
import { getTimeline } from '../redux/actions/dataActions';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';

// Components
import Timeline from '../components/timeline/Timeline';
import SkeletonTimeline from '../components/timeline/SkeletonTimeline';

import axios from 'axios';

const styles = {
    title: {
        textAlign: 'center'
    },
    circular: {
        textAlign: 'center',
        marginTop: '15px'
    },
    tryAgainButton: {
        marginTop: '10px'
    }
}

class timeline extends Component {

    componentDidMount() {

        this.loadData();
        
        const timelineId = this.props.match.params.timelineId;
        axios.post(`/timeline/${timelineId}/updateCount`)
            .then(()=>{
                // console.log('updated views count');
            })
            .catch((err)=>{
                // console.log('err views count ' , err);
            })
    }

    loadData = () => {
        const timelineId = this.props.match.params.timelineId;
        this.props.getTimeline(timelineId);
    }

    render() {
        const {
            classes,
            UI: { loading }
        } = this.props;

        const
            { errorsMainTimeline, hasMoreCards, pageCards }
                = this.props.data;


        let renderTimeline = loading && !hasMoreCards && pageCards === 1 && !errorsMainTimeline ? (
            null
        ) : errorsMainTimeline ? (
            <Fragment>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorsMainTimeline}
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        hidden={loading}
                        onClick={this.loadData}
                        className={classes.tryAgainButton}>
                        Try Again
                </Button>
                </Alert>
            </Fragment>
        ) : !loading ? (
            <Timeline />
        ) : null


        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {
                        loading &&
                        <SkeletonTimeline />
                    }

                    {
                        !loading &&
                        renderTimeline
                    }
                </Grid>
            </Grid>
        )
    }
}

timeline.propTypes = {
    getTimeline: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data,
    UI: state.UI
})

export default connect(mapStateToProps, { getTimeline })(withStyles(styles)(timeline));