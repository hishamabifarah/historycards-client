import React, { Component } from 'react'
import PropTypes from 'prop-types';

// Redux 
import { connect } from 'react-redux';

// Components
import Profile from '../components/profile/Profile';
import ProfileDetails from '../components/profile/ProfileDetails';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

const styles = {
    title: {
        textAlign: 'center'
    },
    circular: {
        textAlign: 'center'
    }
}
class profile extends Component {

    render() {
        const { classes
          
          // ,
          //   user: {
          //       credentials: {
          //           handle
          //       }
          //   } 
          } = this.props;

            // console.log('props in profile ' ,this.props)

            return (
                <div className={classes.root}>
                  <Grid
                    container
                     spacing={2}
                  >
                    <Grid
                      item
                      lg={4}
                      md={6}
                      xl={4}
                      xs={12}
                    >
                      {/* <AccountProfile /> */}
                      <Profile/>
                    </Grid>
                    <Grid
                      item
                      lg={8}
                      md={6}
                      xl={8}
                      xs={12}
                    >
                      <ProfileDetails />
                 
                    </Grid>
                  </Grid>
                </div>
              );
    }
}

profile.propTypes = {
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data,
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(profile));