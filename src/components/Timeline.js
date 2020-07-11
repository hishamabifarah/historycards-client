// React
import React, { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import Rating from '@material-ui/lab/Rating';
// import Divider from '@material-ui/core/Divider';

// // MUI Icons
// import ChatIcon from '@material-ui/icons/Chat';
// import MyButton from '../util/MyButton'

// import DeleteScream from '../components/DeleteScream';
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// import ScreamDialog from './ScreamDialog';
// import LikeButton from './LikeButton';

import Hidden from '@material-ui/core/Hidden';
// import withWidth from '@material-ui/core/withWidth';


const styles = theme => ({
  ...theme.spreadableStyles,
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 10,
    padding: 16,
    opacity: 0.8
  },

  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
  },
  rating: {
    verticalAlign: 'text-top',
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginBottom: 0,
    marginRight: '1.5'
  },
  media: {
    minWidth: '25%',
    maxWidth: '25%',
    flexShrink: 0,
    // backgroundColor: palette.grey[200],
    borderRadius: 12,
    boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
  },
  divider: {
    marginTop: '40px'
  },
});

class Timeline extends Component {

  render() {

    dayjs.extend(relativeTime);

    //extract screams properties, screams are inside props too like classes
    const {
      classes,
      timeline: {
        title, description, imageUrl
       // , likeCount, timelineId, commentCount, createdAt, userHandle
      },
      // user: {
      //   authenticated,
      //   credentials: {
      //     handle
      //   }
      // } 
    } = this.props;

    // const deleteButton = authenticated && userHandle === handle ? (
    //   <DeleteScream timelineId={timelineId} />
    // ) : null

    return (
      <Fragment>
      {/* <Box display={{ xs: 'none', lg: 'block', xl: 'block', sm: 'block' }}>
      <p>test screens</p>
      </Box> */}
      <Card className={classes.card} elevation={0}>

      <Hidden only={['xs']}>
          <CardMedia className={classes.media }
            image={imageUrl}
            title="Timeline Image"/>
            </Hidden>
          <CardContent className={classes.content}>

            {/* mb : margin bottom */}
              <Typography
                variant="h5"
                color="primary">
                {title}
              </Typography>

              {/* <Rating className={classes.rating} name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly /> */}

            {/* {deleteButton} */}

            <Typography variant="body1">{description}</Typography>

            <hr className={styles.visibleSeperator} />

          </CardContent>
      </Card>
      
      </Fragment>
    )
  }
}

Timeline.propTypes = {
  user: PropTypes.object.isRequired,
  timeline: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Timeline));