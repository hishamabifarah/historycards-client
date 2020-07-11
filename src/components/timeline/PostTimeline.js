// React
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { postTimeline, clearErrors } from '../../redux/actions/dataActions';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import MyButton from '../../util/MyButton';

const styles = theme => ({
    ...theme.spreadableStyles,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: '10'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '87%',
        top: '2%'
    },
    topBarIconColor:{
        color: '#fff'
      }
});

class PostTimeline extends Component {
    state = {
        open: false,
        description: '',
        title: '',
        imageUrl : '',
        errors: {},
        error: ''
    };

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        //this.props.uploadUserImage(formData);
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageTimelineInput');
        fileInput.click();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors,
                error: nextProps.UI.errors
            });
        }
        // if no errors and loading has stopped we close the dialog
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ 
                title: '', 
                description: '', 
                open: false, 
                errors: {},
                error: ''
            });
        }
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} , error: ''});
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        
        this.props.postTimeline({ 
            description: this.state.description,
            title: this.state.title,
            imageUrl : this.state.imageUrl
        });
    }

    render() {
        const { errors, error } = this.state;
        const {
            classes,
            UI: { loading }
        } = this.props;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Add New History Timeline">
                    <AddIcon className={classes.topBarIconColor}/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">

                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>

                    <DialogTitle>Add a new Timeline</DialogTitle>

                    {error &&
                        <div>
                            <Alert severity="error">
                                <AlertTitle>Error updating timeline, please try again</AlertTitle>
                            </Alert>
                        </div>
                    }

                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="title"
                                type="text"
                                label="Title"
                                multiline
                                variant="outlined"
                                margin="normal"
                                rows="1"
                                autoFocus
                                placeholder="Timeline title"
                                error={errors.title ? true : false}
                                helperText={errors.title}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="description"
                                type="text"
                                label="Description"
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows="3"
                                placeholder="Timeline description"
                                error={errors.description ? true : false}
                                helperText={errors.description}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />

                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton}
                                disabled={loading}>
                                Submit
                                    {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

PostTimeline.propTypes = {
    postTimeline: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI
});
export default connect(
    mapStateToProps,
    { postTimeline, clearErrors }
)(withStyles(styles)(PostTimeline));