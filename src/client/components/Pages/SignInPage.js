import React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {APIActions} from '../actions'

const styles = {
    main: {
        backgroundImage: `url(${'src/client/public/images/signinbg1.jpg'})`,
        backgroundSize: 'cover',
        height: '600px',
        paddingTop: '40px',
    },
    signInContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '700px',
        height: '450px',
        textAlign: 'center',
        border: '2px solid white',
    },
    title: {
        fontFamily: 'Calibri',
        paddingTop: '30px',
    },
    label: {
        fontFamily: 'Calibri',
        paddingTop: '10px',
    },
    input: {
        width: '400px',
        backgroundColor: 'White',
        marginTop: '20px',
    },
    button: {
        height: '50px',
        width: '250px',
        fontFamily: 'Calibri',
        marginTop: '50px',
    },
    warn: {
        color: 'Red',
        fontFamily: 'Calibri',
    }
};

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'PaleVioletRed',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'White',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'PaleVioletRed',
            },
        },
    },
})(TextField);

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""}
    }

    handleClick = () => {
        if (this.state.username !== "" && this.state.password !== "") {
            this.props.signInRequest({username: this.state.username, password: this.state.password});
        }
    };


    setUsername = (event) => {
        this.setState({username: event.target.value});
    };

    setPassword = (event) => {
        this.setState({password: event.target.value});
    };

    componentDidUpdate = () => {
        if (this.props.loggedIn) {
            this.props.history.push('/');
        }
    };

    render() {
        const {classes} = this.props;
        const warn = this.props.validSignIn ? <label></label> : [<br key="1"/>,
            <label key="2" className={classes.warn}>Incorrect username or password</label>];
        return (
            <div className={classes.main}>
                <div className={classes.signInContainer}>
                    <h1 className={classes.title}>Sign In</h1>
                    <label className={classes.label}>Not a member? <a href='/sign-up'>Sign Up here</a></label>
                    <br/>
                    <CssTextField label="Username" className={classes.input} autoComplete="username" variant="outlined"
                                  onBlur={this.setUsername}/>
                    <br/>
                    <CssTextField label="Password" className={classes.input} type="password"
                                  autoComplete="current-password" variant="outlined" onBlur={this.setPassword}/>
                    {warn}
                    <br/>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClick}>SIGN
                        IN</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        validSignIn: state['session'].get('validSignIn'),
        loggedIn: state['session'].get('loggedIn')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signInRequest: (user) => {
            dispatch(APIActions.signInRequest(user));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignInPage));