// React
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { logOutUser, uploadUserImage } from '../../redux/actions/userActions';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import MUILink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Icons
// npm install --save @material-ui/icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

import dayjs from 'dayjs';
import MyButton from '../../util/MyButton';

// import Tooltip from '@material-ui/core/Tooltip';
// import IconButton from '@material-ui/core/IconButton';

//TODO handle error if image uploaded is not an image (handled in backend)
// maybe open window will have image extensions only?
// create a db trigger to delete older user images when they upload a new one


const styles = theme => ({
    ...theme.spreadableStyles
});

class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        // send to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        // create action uploadImage instead of axios call because we are centralizing everything with redux 
        // and we need to trigger the user loading action
        this.props.uploadUserImage(formData);
    }

    handleEditPicture = () => {

        // input of type file is hidden and onclick of icon near image 
        // we open the choose image dialog with .click()
        // instead of having the default file input shown on the screen which is not nice UI 
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logOutUser();
    }

    // loading property is different than UI Loading, it's for when loading user profile on screen

    render() {
        const {
            classes,
            user: {
                credentials: { handle, createdAt, bio, imageUrl, website, location, facebook, twitter },
                loading,
                authenticated
            }
        } = this.props;

        // if not loading check if authenticated if true print authenticated if not print not authenticated
        // if loading print loading
        // let twoternary = !loading ? (authenticated ? (<p>authenticated </p>) :  (<p> not authenticated </p>) ) : (<p>loading...</p>);

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image" />
                        <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden" />

                        {/* <Tooltip title="Edit profile picture" placement="top">
                            <IconButton onClick={this.handleEditPicture} className="button">
                                <EditIcon color="primary" />
                            </IconButton>
                        </Tooltip> */}

                        <MyButton tip="Edit profile picture" onClick={this.handleEditPicture} btnClassName="button">
                            <EditIcon color="primary" />
                        </MyButton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MUILink
                            component={Link}
                            to={`/users/${handle}`}
                            color="primary"
                            variant="h5">
                            @{handle}
                        </MUILink>
                        <hr />

                        {/* if bio show it as typography */}
                        {bio && bio !== '...' && <Typography variant="body2">{bio}</Typography>}
                        <hr />

                        {facebook && facebook !== '...' &&
                            <Fragment>
                                <FacebookIcon color="primary" />
                                <span> {facebook}</span>
                            </Fragment>

                        }  <hr />

                        {twitter && twitter !== '...' &&
                            <Fragment>
                                <TwitterIcon color="primary" />
                                <span> {twitter}</span>
                            </Fragment>

                        }  <hr />

                        {/* Fragment in react because we can't have this:

                    {location && (
                        <LocationOn color="primary"/>
                        <span>{location}</span>
                    )}
                    throws an error : JSX expressions must have one parent element. */}

                        {location && location !== '...' && (
                            <Fragment>
                                <LocationOn color="primary" />
                                <span>{location}</span>
                            </Fragment>
                        )}
                        <hr />
                        {website && website !== '...'  && website !== 'http://...' && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '} {website}
                                </a>
                            </Fragment>
                        )}
                        <hr />
                        <CalendarToday color="primary" />
                        {' '} <span>Joined {dayjs(createdAt).format('MMM YYYY')} </span>
                    </div>
                </div>
            </Paper>
        ) : (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img src="/images/no-img.png" alt="profile" className="profile-image" />
                        </div>
                        <hr />
                        <div className="profile-details">
                            <MUILink
                                component={Link}
                                to={'/account'}
                                color="primary"
                                variant="h5">
                                @username
                        </MUILink>
                            <hr />
                            <Typography variant="body2">Bio</Typography>
                            <hr />
                            <Fragment>
                                <FacebookIcon color="primary" />
                                <span> Facebook account</span>
                            </Fragment>
                            <hr />
                            <Fragment>
                                <TwitterIcon color="primary" />
                                <span> Twitter account</span>
                            </Fragment>
                            <hr />
                            <Fragment>
                                <LocationOn color="primary" />
                                <span> Location</span>
                            </Fragment>
                            <hr />
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '} Website
                                </a>
                            </Fragment>
                            <hr />
                            <CalendarToday color="primary" />
                            {' '} <span> Join Date </span>
                        </div>

                    </div>
                </Paper>
            )) : null;

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    logOutUser,
    uploadUserImage
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadUserImage: PropTypes.func.isRequired,
    logOutUser: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Profile));