import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { deleteTimeline } from '../../redux/actions/dataActions';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

// icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import MyButton from '../../util/MyButton';

const styles = {
    deleteButton:{
        // position: 'absolute',
        // left: '90%',
        // top: '10%'
    }
}
class DeleteTimeline extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteTimeline = () => {
        this.props.deleteTimeline(this.props.timelineId);
        this.setState({ open: false });
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton 
                    tip = "Delete Timeline"
                    onClick = {this.handleOpen}
                    btnClassName = {classes.deleteButton}>
                        <DeleteOutline color="secondary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose = {this.handleClose}
                    fullWidth
                    maxWidth ="sm">
                        <DialogTitle>
                            Sure to delete?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.deleteTimeline} color="secondary">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>

        )
    }
}

DeleteTimeline.propTypes = {
    deleteTimeline: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    timelineId : PropTypes.string.isRequired 
}

export default connect(null, { deleteTimeline })(withStyles(styles)(DeleteTimeline));