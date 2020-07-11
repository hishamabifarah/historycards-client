// React
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { uploadUserImage } from '../../redux/actions/userActions';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import MUILink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';


import dayjs from 'dayjs';
import MyButton from '../../util/MyButton';

const styles = theme => ({
    ...theme.spreadableStyles
});

class ProfileSidebar extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadUserImage(formData);
    }

    handleEditPicture = () => {

        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    render() {
        const {
            classes,
            user: {
                credentials: { handle, createdAt, bio, imageUrl },
                loading,
                authenticated
            }
        } = this.props;

        // console.log('sidebar props' , this.props);

        // if not loading and authenticated show profile
        // else if not authenticated show login sign up

        let profileMarkup = !loading ?
            (authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">

                            <img src={imageUrl} alt="profile" className="profile-image" />

                            <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden" />

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
                                variant="h6">
                                @{handle}
                            </MUILink>
                            <hr />

                            {bio && <Typography variant="body2">{bio}</Typography>}
                            <hr />
                            {' '} <Typography variant="body2">
                                <CalendarToday color="primary" /> Joined {dayjs(createdAt).format('MMM YYYY')}
                            </Typography>
                        </div>
                    </div>
                </Paper>

            ) : !authenticated ? (
                    <Paper className={classes.paper}>
                        <Typography variant="body2" align="center">
                            No Profile found, please login
                    </Typography>
                        <div className={classes.buttons}>
                            <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                            <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                        </div>
                    </Paper>

                ) : null) 
                
              //   : null
           : <div style={{ textAlign: 'center' }}>
                <CircularProgress size={30} className={classes.progress} />
            </div>

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    uploadUserImage
}

ProfileSidebar.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadUserImage: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(ProfileSidebar));