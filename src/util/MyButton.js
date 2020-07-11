import React from 'react'

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
    <Tooltip title={tip} className = {tipClassName} placement="top">
        <IconButton onClick = {onClick} className = {btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)

// <Tooltip title="edit details" placement="top">
// <IconButton onClick={this.handleOpen} className={classes.button}>
//     <EditIcon color="primary" />
// </IconButton>
// </Tooltip>