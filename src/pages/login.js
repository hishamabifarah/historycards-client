import React, { Component } from 'react'

// good practise to user PropTypes build it method in react for type checking , minimizes potential errors
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

//Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

// Components
import Copyright from '../components/Copyright/Copyright';

// import AppIcon from '../images/icon.png';

const styles = theme => ({
    ...theme.spreadableStyles,

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
         alignItems: 'center',
        textAlign: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
      },

});

class login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            loading: false, // for spinner
            errors: {}
        }
    }

    // have to implement it to show errors on screen
    // if errors exist set errors state
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    handleSubmit = (event) => {
        //override default submit behavior
        event.preventDefault();

        // set userData 
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            autoFocus
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            className={classes.TextField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField>

                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            autoComplete="on"
                            className={classes.TextField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            fullWidth>
                        </TextField>

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            fullWidth
                            className={classes.button}>
                            Sign in
                            </Button>
                        <br />

                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}

                        <br />

                        <small>
                            Don't have an account?  <Link variant="body2" to="/signup">Sign Up</Link>
                        </small>
                    </form>
                </div>

                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    // state param is the global state
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

// export default (withStyles)(styles)(login);
//connect login component to app state
export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(login));