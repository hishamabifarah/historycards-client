import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { deleteCard } from '../../redux/actions/dataActions';

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
class DeleteCard extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteCard = () => {
        // console.log('deleteCard() timeline ' + this.props.timelineId + 'card id:' + this.props.cardId );
        this.props.deleteCard(this.props.timelineId, this.props.cardId);
        this.setState({ open: false });
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton 
                    tip = "Delete Card"
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
                            <Button onClick={this.deleteCard} color="secondary">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>

        )
    }
}

DeleteCard.propTypes = {
    deleteCard: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    timelineId : PropTypes.string.isRequired,
    cardId : PropTypes.string.isRequired
}

export default connect(null, { deleteCard })(withStyles(styles)(DeleteCard));