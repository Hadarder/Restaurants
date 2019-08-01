import React from 'react';
import {withStyles} from '@material-ui/styles';
import Results from './Results'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {APIActions} from "./actions";

const styles = {
    container: {
    },
    sideBarBG: {
        float: 'left',
        width: '250px',
        height: '1500px',
        backgroundImage: `url(${'src/client/public/images/bg7.png'})`,
        opacity: 0.7,
        position: 'absolute',
        backgroundRepeat: 'repeat-y',
        overflow: 'auto'

    },
    sideBar: {
        float: 'left',
        textAlign: 'center',
        fontFamily: 'Calibri',

    },
    textField: {
        backgroundColor: 'White',
        margin: '40px 0 0 35px',
    },
    title: {
        margin: '20px 0 0 45px',
    },
    results: {
        float: 'right',
        marginTop: '20px',
        width: '978px'
    },
    button: {
        '&:hover': {
            color: 'Black',
            backgroundColor: 'White',
        },
        fontFamily: 'Calibri',
        backgroundColor: '#f50057',
        color: "white",
        margin: '40px auto 0 auto   ',
    }
};

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'PaleVioletRed',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: 'PaleVioletRed',
            },
        },
    },
})(TextField);

class UsersResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: this.props.query, fullName: "", location: ""};
    }

    setUsername = (event) => {
        this.setState({username: event.target.value});
    };

    setFullName = (event) => {
        this.setState({fullName: event.target.value});
    };

    setLocation = (event) => {
        this.setState({location: event.target.value});
    };

    handleClick = () => {
        this.props.searchUsersRequest(this.state.username, this.state.fullName, this.state.location);
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.sideBarBG}>
                </div>
                <div className={classes.sideBar}>
                    <CssTextField label="Username" className={classes.textField} margin="dense"
                        variant="outlined" multiline rowsMax="4" value={this.state.username} onChange={this.setUsername}/>
                    <br/>
                    <CssTextField label="Full Name" className={classes.textField} margin="dense"
                                  variant="outlined" multiline rowsMax="4" onChange={this.setFullName}/>
                    <br/>

                    <CssTextField label="Location" className={classes.textField} margin="dense"
                                  variant="outlined" multiline rowsMax="4" onChange={this.setLocation}/>
                    <br/>
                    <Button variant='outlined' key='profile' className={classes.button}
                            onClick={this.handleClick}> Search </Button>
                </div>
                <div className={classes.results}>
                    <Results dataList={this.props.users}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state['search'].get('users')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchUsersRequest: (username, fullName, location) => {
            dispatch(APIActions.searchUsersRequest(username, fullName, location));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UsersResults));