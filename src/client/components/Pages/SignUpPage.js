import React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {APIActions} from '../actions'
import {DropzoneArea} from 'material-ui-dropzone'
import cities from 'cities.json';
import Select from 'react-select';
import {defaultPicture} from '../../public/defaultPictureBase64';

const styles = {
    main: {
        backgroundImage: `url(${'src/client/public/images/background.jpg'})`,
        backgroundSize: 'cover',
        height: '950px',
        paddingTop: '40px',
    },
    signInContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '700px',
        height: '870px',
        textAlign: 'center',
        border: '2px solid white'
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
        margin: '20px auto 0 auto',
        fontFamily: 'Arial',
        '& input': {
            fontFamily: 'Arial',
        },
    },
    selection: {
        width: '400px',
        margin: '20px auto 0 auto',
        fontFamily: 'Arial',
        '& input': {
            fontFamily: 'Arial',
        },
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
    },
    drop: {
        width: '300px',
        margin: '40px auto 0 auto',
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

const ILcities = cities.filter(city => {
    return city.country.match('IL')
});

const locations = ILcities.map(city =>
    ({
        value: city.name,
        label: city.name
    }));

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", fullName: "", location: "", picture: ""}
    }

    handleClick = () => {
        if (this.state.username !== "" && this.state.password !== "" && !this.props.usernameExists && this.state.location !== "") {
            const city = ILcities.find(city => city.name === this.state.location);
            const location = {
                city: city.name,
                lat: city.lat,
                lon: city.lng
            };

            let picture = this.state.picture;
            if (this.state.picture === "") {
                picture = defaultPicture;
            }

            this.props.signUpRequest({
                username: this.state.username,
                password: this.state.password,
                picture: picture,
                fullName: this.state.fullName,
                location: location
            });
        }
    };

    updateUsername = (event) => {
        this.setState({username: event.target.value}, () => {
            this.props.userExistsRequest(this.state.username);
        });
    };

    setPassword = (event) => {
        this.setState({password: event.target.value});
    };

    setFullName = (event) => {
        this.setState({fullName: event.target.value});
    };

    setLocation = (value) => {
        this.setState({location: value.value});
    };

    handleFiles = (files) => {
        if (files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
                this.setState({picture: reader.result});
            };
        }
        else this.setState({picture: ""});
    };

    componentDidUpdate = () => {
        if (this.props.loggedIn) {
            this.props.history.push('/');
        }
    };

    render() {

        const {classes} = this.props;
        const warn = this.props.usernameExists ? [<label key="1" className={classes.warn}>Username is already
            taken</label>,
            <br key="2"/>] : <label></label>
        return (
            <div className={classes.main}>
                <div className={classes.signInContainer}>
                    <h1 className={classes.title}>Sign Up</h1>
                    <label className={classes.label}><a href='/sign-in'>Already have an account?</a></label>
                    <br/>
                    <CssTextField label="Username" className={classes.input} autoComplete="username" variant="outlined"
                                  onChange={this.updateUsername}/>
                    <br/>
                    {warn}
                    <CssTextField label="Password" className={classes.input} type="password"
                                  autoComplete="current-password" variant="outlined" onBlur={this.setPassword}/>
                    <br/>
                    <CssTextField label="Full Name" className={classes.input} autoComplete="fullname"
                                  variant="outlined" onBlur={this.setFullName}/>
                    <br/>
                    <Select inputId="react-select-single" className={classes.selection} TextFieldProps={{
                        label: 'Location',
                        InputLabelProps: {htmlFor: 'react-select-single', shrink: true,},
                    }}
                            placeholder="Location" options={locations}
                            onChange={this.setLocation}
                            theme={theme => ({
                                ...theme,
                                borderRadius: 10,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'MistyRose',
                                    primary: 'PaleVioletRed',
                                    primary50: 'MistyRose'
                                },
                            })}/>
                    <br/>
                    <DropzoneArea dropzoneClass={classes.drop}
                                  dropzoneText='Drag and drop a picture here or click to upload' filesLimit={1}
                                  acceptedFiles={['image/*']} onChange={this.handleFiles}/>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClick}>
                        SIGN UP</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state['session'].get('loggedIn'),
        usernameExists: state['session'].get('usernameExists')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUpRequest: (user) => {
            dispatch(APIActions.signUpRequest(user));
        },
        userExistsRequest: (username) => {
            dispatch(APIActions.userExistsRequest(username))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUpPage));
