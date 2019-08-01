import React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {connect} from "react-redux";
import {APIActions} from "./actions";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {createBrowserHistory} from 'history';

const styles = {
    toolbar: {
        borderBottom: '1px solid lightgrey',
    },
    sign: {
        position: 'relative',
        float: 'right',
        margin: 5,
        '&:hover': {
            color: 'Black'
        },
        fontFamily: 'Calibri',
    },
    profile: {
        position: 'relative',
        float: 'right',
        margin: 5,
        '&:hover': {
            color: 'Black',
            backgroundColor: 'White',
        },
        fontFamily: 'Calibri',
        backgroundColor: '#f50057',
        color: "white",
    },
    title: {
        float: 'left',
        margin: 5,
        fontFamily: 'Snell Roundhand, cursive',
        // flexGrow: 1,
    },
    link: {
        color: 'Black',
        '&:hover': {
            color: 'Black'
        },
    },
    welcome: {
        fontFamily: 'Calibri',
        marginRight: '10px',
    },
    input: {
        width: '220px',
        height: '42px',
        backgroundColor: 'White',
        margin: '0 auto 10px auto',
        borderBottom: '1px solid lightgrey',
        '& input': {
            fontFamily: 'Calibri',
        }
    },
    search: {
        marginTop: '20px'
    }
};

const CssTextField = withStyles({
    root: {

        '& label.Mui-focused': {
            color: 'grey',
            fontFamily: 'Calibri',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
                fontFamily: 'Calibri',
            },
            '&:hover fieldset': {
                borderColor: 'white',
                fontFamily: 'Calibri',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
                fontFamily: 'Calibri',
            },
        },
    },
})(TextField);

export const history = createBrowserHistory();


class AppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false, input: ""};
    }

    handleClick = () => {
        this.props.signOutRequest();
    };

    componentWillMount = () => {
        this.props.isLoggedInRequest();
    };

    setInput = (event) => {
        this.setState({input: event.target.value})
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            window.location.href = '/search/0/' + this.state.input;
        }
    };

    render() {

        const {classes} = this.props;

        const loggedOutButtons = [
                <Button variant='outlined' key='signUp' className={classes.sign} href='/sign-up'> Sign Up </Button>,
                <Button variant='outlined' key='signIn' className={classes.sign} href='/sign-in'>Sign In</Button>
            ],
            loggedInButtons = [
                <label key='hello' className={classes.welcome}>Hello, {this.props.username}!</label>,
                <Button variant='outlined' key='profile' className={classes.profile}
                        href={'/profile/' + this.props.username}> Profile </Button>,
                <Button variant='outlined' key='signOut' className={classes.sign} onClick={this.handleClick} href='/'>Sign
                    Out</Button>
            ];

        const buttons = this.props.loggedIn ? loggedInButtons : loggedOutButtons;
        return (
            <div>
                <Toolbar className={classes.toolbar}>
                    <h1 className={classes.title}><a href='/' className={classes.link}> Restaurants </a></h1>
                    <div className={classes.input}>
                        <CssTextField label="Search" font={'Calibri'} autoComplete="username"
                                      variant="outlined" onChange={this.setInput}  onKeyDown={this.handleKeyDown} />
                        <a href={'/search/0/' + this.state.input} className={classes.link}><SearchIcon
                            className={classes.search}/></a>
                    </div>
                    {buttons}
                </Toolbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state['session'].get('loggedIn'),
        username: state['session'].get('username'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOutRequest: () => {
            dispatch(APIActions.signOutRequest());
        },
        isLoggedInRequest: () => {
            dispatch(APIActions.isLoggedInRequest())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppBar));