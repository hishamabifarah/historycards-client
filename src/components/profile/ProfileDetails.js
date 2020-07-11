// React
import React, { Component } from 'react'
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { uploadUserImage , editUserDetails } from '../../redux/actions/userActions';

// axios
import axios from 'axios';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
  } from '@material-ui/core';


const styles = theme => ({
    ...theme.spreadableStyles,
    root:{

    }
});

class ProfileDetails extends Component {

    state = {
        bio: '',
        location: '',
        website: '',
        facebook: '',
        twitter :''
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
            facebook: this.state.facebook,
            twitter: this.state.twitter
        }

        // if(!this.state.bio && !this.state.facebook && !this.state.twitter && !this.state.location && !this.state.website){
        //   console.log(userDetails);
        //   this.props.editUserDetails({
        //     bio: '...',
        //     twitter: '...',
        //     facebook: '...',
        //     location: '...',
        //     website: '...',
        //   });
        //   return;
        // }
        

        this.props.editUserDetails(userDetails);
    }

    // once component renders(mounts) get details and put them as values for inputs
    componentDidMount() {
        const { credentials } = this.props.user;
        if (Object.keys(credentials).length === 0) {
            axios.get('/user')
                .then(res => {
                    this.mapUserDetailsToState(res.data.credentials); 
                })
                .catch(err => console.log(err));
        } else {
            this.mapUserDetailsToState(credentials);
        }  
    }
    
        // helper function to bind user details to inputs
        mapUserDetailsToState = (credentials) => {
            this.setState({
                bio: credentials.bio ? credentials.bio : '',
                website: credentials.website ? credentials.website : '',
                location: credentials.location ? credentials.location : '',
                facebook: credentials.facebook  ? credentials.facebook : '',
                twitter: credentials.twitter  ? credentials.twitter : ''
            });
            // console.log('state' , this.state);
        }
    render() {
        const {
            classes
        } = this.props;

        const {
          authenticated
        } = this.props.user

        return (
            <Card
              className={classes.root}
            >
              <form
                autoComplete="off"
                noValidate
              >
                <CardHeader
                  subheader="The information can be edited"
                  title="Profile"
                />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                    <TextField
                        variant="outlined"
                        margin="dense"
                        name="location"
                        type="text"
                        label="Location"
                        placeholder="Where you live"
                        className={classes.TextField}
                        value={authenticated ? this.state.location : ''}
                        onChange={this.handleChange}
                        disabled={!authenticated}
                        fullWidth
                    />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Website"
                        margin="dense"
                        name="website"
                        onChange={this.handleChange}
                        value={ authenticated ? this.state.website : ''}
                        variant="outlined"
                        placeholder="Your personal wesbite"
                        disabled={!authenticated}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Facebook"
                        margin="dense"
                        name="facebook"
                        onChange={this.handleChange}
                        value={ authenticated ? this.state.facebook : ''}
                        variant="outlined"
                        placeholder="Facebook account"
                        disabled={!authenticated}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Twitter"
                        margin="dense"
                        name="twitter"
                        placeholder="Twitter account"
                        onChange={this.handleChange}
                        value={ authenticated ? this.state.twitter : ''}
                        variant="outlined"
                        disabled={!authenticated}
                      />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Bio"
                        margin="dense"
                        name="bio"
                        placeholder="Personal bio"
                        multiline
                        rows={4}
                        disabled={!authenticated}
                        onChange={this.handleChange}
                        value={ authenticated ? this.state.bio : ''}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>

                  {authenticated && 
                  <Button
                    color="primary"
                    variant="contained"
                    // disabled = {!this.state.bio && !this.state.facebook && !this.state.twitter && !this.state.location && !this.state.website }
                    onClick = {this.handleSubmit}
                  >
                    Save details
                  </Button>
                  }
                </CardActions>
              </form>
            </Card>
          );
        };
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    uploadUserImage,
    editUserDetails
}

ProfileDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    uploadUserImage: PropTypes.func.isRequired,
    editUserDetails: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(ProfileDetails));