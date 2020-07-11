import React, { Component } from 'react'

// good practise to user PropTypes build it method in react for type checking , minimizes potential errors
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { signUpUser } from '../redux/actions/userActions';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Components
import Copyright from '../components/Copyright/Copyright';

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

class signup extends Component {
    // handle state using the controlled component method
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    handleSubmit = (event) => {
        //override default submit behavior
        event.preventDefault();

        // set userData 
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }

        this.props.signUpUser(newUserData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

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
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            className={classes.TextField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            autoFocus
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

                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="on"
                            label="Confirm Password"
                            variant="outlined"
                            margin="normal"
                            className={classes.TextField}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            fullWidth>
                        </TextField>

                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            className={classes.TextField}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
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
                            fullWidth
                            disabled={loading}
                            className={classes.button}>
                            Signup
                            </Button>
                        <br />

                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}

                        <br />
                        {/* <small>
                            Already have an account? login <Link to="/login">here</Link>
                        </small> */}
                        <small>
                            {/* don't have an account? sign up <Link variant="body2" to="/signup">here</Link> */}
                            Already have an account? <Link variant="body2" to="/login">Sign In</Link>
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

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    signUpUser
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(signup));