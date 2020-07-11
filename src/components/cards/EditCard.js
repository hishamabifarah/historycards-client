// React
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import InputMask from "react-input-mask";

// Redux
import { connect } from 'react-redux';
import { editCardDetails , uploadCardImage } from '../../redux/actions/dataActions';

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

// util
import MyButton from '../../util/MyButton';

// Icons
import EditIcon from '@material-ui/icons/Edit';

// dayjs
import dayjs from 'dayjs';

const styles = theme => ({
    ...theme.spreadableStyles,
    button: {
        float: 'right'
    },
    dateInput:{
        padding: '4px',
        margin: '6px auto 6px 12px;'
    }
});

class EditCard extends Component {
    state = {
        open: false,
        title: '',
        description: '',
        source: '',
        cardDate: '',
        errors: '',
        uploadingImage: '',
        updatingData: '',
        errorsImage: '',
        submitted: false
    };

    updateDate = (date) => {
        let fieldValue = date.target.value;
        
        let test = dayjs(fieldValue).isValid();
        if(test){
            // let formatDate = dayjs(fieldValue).toISOString();
            this.setState({ cardDate: fieldValue })
            // console.log('check date' , test);
            // console.log('check format' , fieldValue);
        }
      }

    formatDate = (date) => {
        let dateFormat = new Date(date);
        let year = dateFormat.getFullYear();
        let month = dateFormat.getMonth() + 1;
        let dt = dateFormat.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return (month + '/' + dt + '/' + year);
    }

    handleOpen = () => {
        this.setState({ open: true });

        const { title, description, date, source } = this.props
        let dateFormatted = this.formatDate(date);
        this.mapCardlineDetailsToState(title, description, dateFormatted, source);
    }

    handleClose = () => {
        this.setState({ 
            open: false, 
            errors: '', 
            errorsImage: '', 
            uploadingImage: '', 
            selectedDate: '' ,
            updatingData:'',
            submitted:false 
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageEditCardInput');
        fileInput.click();
    }

    handleImageChange = async (event) => {
        this.setState({ uploadingImage: 'Uploading Image...', errorsImage: '' })
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        await (this.props.uploadCardImage(formData, this.props.timelineId, this.props.cardId)).then(response => {
            if (response && response.type === 'UPLOAD_IMAGE_CARD') {
                this.setState({
                    errorsImage: '',
                    uploadingImage: '',
                })
                this.handleClose();
            } else {
                this.setState({
                    errorsImage: 'error uploading image'
                })
            }
        })
    }

    handleSubmit = async () => {
        this.setState({updatingData: 'Updating data, please wait' , submitted: true });
        const cardDetails = {
            title: this.state.title,
            body: this.state.description,
            source: this.state.source,
            cardDate: this.state.cardDate
            // cardDate: '1985-03-23T22:23:30.753Z'
        }
        await (this.props.editCardDetails(this.props.timelineId, this.props.cardId, cardDetails)).then(response => {
            if (response && response.type === 'EDIT_CARD') {
                this.setState({
                    errors: '',
                    updatingData:'',
                })
                this.handleClose();
            } else {
                this.setState({
                    errors: 'error',
                    updatingData:''
                })
            }
        })
    }

    componentDidMount() {
        // const { title, description, date, source } = this.props;
        // this.mapCardlineDetailsToState(title, description, date, source);
    }

    mapCardlineDetailsToState = (title, description, dateFormatted, source) => {
        this.setState({
            title: title ? title : '',
            description: description ? description : '',
            source: source ? source : '',
            cardDate: dateFormatted ? dateFormatted : ''
        });
    }

    render() {
        const { classes } = this.props;
        const { errors, errorsImage, uploadingImage, updatingData, submitted } = this.state;
       // console.log('state: ' , JSON.stringify(this.state, undefined , 2));

        return (
            <Fragment>

                <MyButton tip="Edit Card" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary" />
                </MyButton>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">

                    <DialogTitle>Edit Card</DialogTitle>

                    {errors &&
                        <div>
                            <Alert severity="error">
                                <AlertTitle>Error updating card, please try again</AlertTitle>
                            </Alert>
                        </div>
                    }

                    {uploadingImage && !errorsImage &&
                        <Alert severity="info">Uploading Image</Alert>
                    }

                    {updatingData && !errorsImage &&
                        <Alert severity="info">{updatingData}</Alert>
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
                                placeholder="Card Title"
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
                                placeholder="Card event description"
                                className={classes.TextField}
                                rows="3"
                                multiline
                                variant="outlined"
                                margin="normal"
                                value={this.state.description}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="source"
                                type="text"
                                label="Source"
                                variant="outlined"
                                margin="normal"
                                placeholder="Card event source"
                                className={classes.TextField}
                                value={this.state.source}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            Date:
                            <InputMask 
                                name="cardDate"
                                className={classes.dateInput}
                                label="Date"
                                autoFocus
                                mask="99/99/9999" 
                                defaultValue={this.state.cardDate}
                                placeholder="MM/dd/yyyy"
                                onChange={value => this.updateDate(value)} />
                        </form>
                        <input type="file" id="imageEditCardInput" onChange={this.handleImageChange} hidden="hidden" />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleEditPicture} color="primary" disabled={submitted}>
                            Edit Image
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary" disabled={submitted}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditCard.propTypes = {
    editCardDetails: PropTypes.func.isRequired,
    uploadCardImage: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    timelineId: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired
}

export default connect(
    null,
    { editCardDetails , uploadCardImage  }
)(withStyles(styles)(EditCard));