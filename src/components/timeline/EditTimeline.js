// React
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { editTimelineDetails, uploadTimelineImage } from '../../redux/actions/dataActions';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import MyButton from '../../util/MyButton';

// Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
    ...theme.spreadableStyles,
    button: {
        float: 'right'
    },
});


class EditTimeline extends Component {

    state = {
        open: false,
        title: '',
        description: '',
        image: '',
        errors: '',
        errorsImage: '',
        uploadingImage : '',
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.mapTimelineDetailsToState(this.props.timeline);
    }

    handleClose = () => {
        this.setState({ open: false, errors: '' , errorsImage: '', uploadingImage: '' });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async () => {
        const timelineDetails = {
            title: this.state.title,
            description: this.state.description
        }

        await (this.props.editTimelineDetails(this.props.timeline.timelineId, timelineDetails)).then(response => {
            if (response && response.type === 'EDIT_TIMELINE') {
                this.setState({
                    errors: ''
                })
                this.handleClose();
            } else {
                this.setState({
                    errors: 'error'
                })
            }
        })
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageEditTimelineInput');
        fileInput.click();
    }

    handleImageChange = async (event) => {
        this.setState({uploadingImage : 'Uploading Image...' , errorsImage : ''})
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        await (this.props.uploadTimelineImage(formData, this.props.timeline.timelineId)).then(response => {
            if (response && response.type === 'UPLOAD_IMAGE_TIMELINE') {
                this.setState({
                    errorsImage: '',
                    uploadingImage : '',
                })
                this.handleClose();
            } else {
                this.setState({
                    errorsImage: 'error uploading image'
                })
            }
        })
    }

    // once component renders(mounts) get details and put them as values for inputs
    componentDidMount() {

        const { timeline } = this.props;
        this.mapTimelineDetailsToState(timeline);
    }

    mapTimelineDetailsToState = (timeline) => {
        this.setState({
            title: timeline.title ? timeline.title : '',
            description: timeline.description ? timeline.description : '',
            image: timeline.imageUrl ? timeline.imageUrl : ''
        });
    }

    render() {
        const { classes } = this.props;
        const { errors , errorsImage , uploadingImage } = this.state;
        return (
            <Fragment>

                <MyButton tip="Edit timeline" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary" />
                </MyButton>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">

                    <DialogTitle>Edit Timeline</DialogTitle>

                    {errors &&
                        <div>
                            <Alert severity="error">
                                <AlertTitle>Error updating timeline, please try again</AlertTitle>
                            </Alert>
                        </div>
                    }
                    {uploadingImage && !errorsImage &&
                        <Alert severity="info">Uploading Image</Alert>
                    }

                    {errorsImage &&
                        <div>
                            <Alert severity="error">
                                <AlertTitle>Error updating Image, please try again</AlertTitle>
                            </Alert>
                        </div>
                    }
                    <DialogContent>
                        <form>
                            <TextField
                                name="title"
                                type="text"
                                label="Title"
                                placeholder="Timeline titile"
                                variant="outlined"
                                margin="normal"
                                autoFocus
                                className={classes.TextField}
                                value={this.state.title}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="description"
                                type="text"
                                label="Description"
                                multiline
                                variant="outlined"
                                margin="normal"
                                rows="6"
                                placeholder="Timeline description"
                                className={classes.TextField}
                                value={this.state.description}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <input type="file" id="imageEditTimelineInput" onChange={this.handleImageChange} hidden="hidden" />
                        </form>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleEditPicture} color="primary">
                            Edit Image
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditTimeline.propTypes = {
    editTimelineDetails: PropTypes.func.isRequired,
    uploadTimelineImage: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    timeline: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(
    mapStateToProps,
    { editTimelineDetails, uploadTimelineImage }
)(withStyles(styles)(EditTimeline));