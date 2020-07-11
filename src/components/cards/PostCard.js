// React
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import InputMask from "react-input-mask";

// Redux
import { connect } from 'react-redux';
import { postCard, clearErrors } from '../../redux/actions/dataActions';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import MyButton from '../../util/MyButton';

// dayjs
import dayjs from 'dayjs';

const styles = theme => ({
    ...theme.spreadableStyles,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: '10px'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '88%',
        top: '2%'
    },
    topBarIconColor: {
        color: '#000',
        marginTop: '-4px'
    },
    dateInput: {
        padding: '4px',
        margin: '6px auto 6px 12px;'
    }
});

class PostCard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            body: '',
            title: '',
            source: '',
            selectedDate : null,
            submitted: false,
            errors: ''
        };
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    updateDate = (date) => {
        let fieldValue = date.target.value;
        
        let test = dayjs(fieldValue).isValid();
        if(test){
            let formatDate = dayjs(fieldValue).format();
            this.setState({ selectedDate: formatDate })
        }
      }

    handleClose = () => {
        this.setState({
            open: false,
            errors: '',
            title: '',
            body: '',
            source: '',
            selectedDate : '',
            submitted: false
        });
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmit = async (event) => {
        event.preventDefault();
  
        const { body, title, source, selectedDate } = this.state;

        if (body && title && source && !selectedDate) {
            this.setState({
                errors: 'Error adding new card, Invalid Date',
                submitted : false
            })
            return;
        }
        this.setState({ submitted: true });
        if (body && title && source && selectedDate) {
           
            await (this.props.postCard({
                body: this.state.body,
                title: this.state.title,
                source: this.state.source,
                cardDate: this.state.selectedDate
            }, this.props.timelineId)).then(response => {
                if (response && response.type === 'POST_CARD') {
                    this.setState({
                        errors: '',
                        submitted: false
                    })
                    this.handleClose();
                } else {
                    this.setState({
                        errors: 'Error adding new card, please try again',
                        submitted: false
                    })
                }
            })
        }
        // console.log(this.state);
    }

    render() {
        const { errors, title, source, body, submitted } = this.state;
        const {
            classes,
        } = this.props;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Add New Card Timeline">
                    <AddIcon className={classes.topBarIconColor} />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <MyButton tip="close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Add New Card Timeline</DialogTitle>

                    {errors &&
                        <div>
                            <Alert severity="error">
                                <AlertTitle>{errors}</AlertTitle>
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
                                placeholder="Card title"
                                error={submitted && !title ? true : false}
                                helperText={submitted && !title ? "Must not be empty" : ""}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="body"
                                type="text"
                                label="Body"
                                multiline
                                variant="outlined"
                                margin="normal"
                                rows="3"
                                placeholder="Card description"
                                error={submitted && !body ? true : false}
                                helperText={submitted && !body ? "Must not be empty" : ""}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />

                            <TextField
                                name="source"
                                type="text"
                                label="Source"
                                multiline
                                variant="outlined"
                                margin="normal"
                                rows="1"
                                placeholder="Card source"
                                error={submitted && !source ? true : false}
                                helperText={submitted && !source ? "Must not be empty" : ""}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            Date:
                            <InputMask 
                                name="selectedDate"
                                className={classes.dateInput}
                                label="Date"
                                type="text"
                                mask="99/99/9999" 
                                placeholder="MM/dd/yyyy"
                                onChange={value => this.updateDate(value)} />

                            {/* <Button type="submit" 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.submitButton}
                                    disabled={submitted}>
                                        Submit
                            </Button> */}
                            <Button onClick={this.handleSubmit} className={classes.submitButton} color="primary">
                            Submit
                        </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

PostCard.propTypes = {
    postCard: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    timelineId: PropTypes.string
};

const mapStateToProps = state => ({
    UI: state.UI
});
export default connect(
    mapStateToProps,
    { postCard, clearErrors }
)(withStyles(styles)(PostCard));