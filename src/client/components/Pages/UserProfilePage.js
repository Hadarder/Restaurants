import React from 'react';
import {Component} from "react";
import {connect} from "react-redux";
import {APIActions, StoreActions} from "../actions";
import {withStyles} from '@material-ui/styles';
import TextField from "@material-ui/core/TextField/index";
import Button from '@material-ui/core/Button';
import cities from 'cities.json';
import Select from 'react-select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Rating from '@material-ui/lab/Rating';


const styles = {
    main: {
        backgroundImage: `url(${'src/client/public/images/restbg.jpg'})`,
        backgroundSize: 'cover',
        textAlign: 'center',
        padding: '20px 20px 20px 20px',
        backgroundRepeat: 'repeat-y'

    },
    profileContainer: {
        padding: '30px 60px 0 60px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '900px',
        height: '500px',
        border: '2px solid white',
    },
    imageContainer: {
        width: '260px',
        float: 'right',
        paddingTop: '30px',
    },
    picture: {
        width: '260px',
        maxHeight: '500px',
    },
    detailsContainer: {
        width: '400px',
        float: 'left'
    },
    title: {
        fontFamily: 'Calibri',
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
        height: '40px',
        width: '150px',
        fontFamily: 'Calibri',
        marginTop: '30px',
    },
    warn: {
        color: 'Red',
        fontFamily: 'Calibri',
    },
    edit: {
        // height: '40px',
        // width: '100px',
        fontFamily: 'Calibri',
        '&:hover': {
            color: 'white'
        },
        margin: '20px 0 0 20px',
        float: 'right'
    },
    usernameTitle: {
        display: 'inline',
        fontSize: '1.2em',
        fontFamily: 'Calibri',

    },
    date: {
        display: 'inline',
        marginLeft: '20px',
        color: 'grey',
        fontFamily: 'Calibri',
    },
    pictureReview: {
        height: '50px',
        width: '50px',
        marginLeft: '20px',
        marginTop: '20px'

    },
    reviewsContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '40px',
        width: '850px',
        border: '2px solid white',
        fontFamily: 'Calibri',
    },
    tableHeader: {
        fontFamily: 'Calibri',
        color: 'black'
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
            '& disabled': {
                borderColor: 'Wh    ite',
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

class UserProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {usernameParam: this.props.match.params.username}
    }

    getUserDetails = () => {
        this.props.userDetailsRequest(this.state.usernameParam);
    };

    componentWillMount = () => {
        this.getUserDetails();
    };

    handleUsernameChange = (event) => {
        this.props.updateProfileRequest(this.state.usernameParam, event.target.value, this.props.location);

    };

    handleLocationChange = (value) => {
        this.props.updateProfileDetails(this.props.username, value.value);
    };

    handleClick = () => {
        if (this.props.username !== "") {
            const city = ILcities.find(city => city.name === this.props.location);
            const location = {
                city: city.name,
                lat: city.lat,
                lon: city.lng
            };

            this.props.updateUserRequest(this.state.usernameParam, this.props.username, location);
            this.props.history.push('/profile/' + this.props.username);
        }
    };

    handleEdit = (reviewID) => {
        this.props.history.push('/editReview/' + reviewID);
    };

    handleDelete = (reviewID, restaurant) => {
        this.props.deleteReviewRequest(reviewID, restaurant, this.props.reviews);
    };

    render() {
        const {classes} = this.props;
        const warn = this.props.usernameExists ? [<label key="1" className={classes.warn}>Username is already
            taken</label>, <br key="2"/>] : <label></label>;

        return (
            <div className={classes.main}>
                <div className={classes.profileContainer}>
                    <div className={classes.detailsContainer}>
                        <h1 className={classes.title}>User Profile</h1>
                        <CssTextField label="Username" className={classes.input} value={this.props.username}
                                      InputProps={{readOnly: !this.props.editable}}
                                      autoComplete="off" variant="outlined"
                                      onChange={this.handleUsernameChange}/>
                        <br/>
                        {warn}
                        <CssTextField label="Full Name" className={classes.input} value={this.props.fullName}
                                      autoComplete="off" variant="outlined" InputProps={{readOnly: true}}
                                      onChange={this.handleUsernameChange}/>
                        <Select inputId="react-select-single" className={classes.selection}
                                InputProps={{readOnly: !this.props.editable}} TextFieldProps={{
                            label: 'Location',
                            InputLabelProps: {htmlFor: 'react-select-single', shrink: true,},
                        }}
                                placeholder="Location" options={locations}
                                value={{value: this.props.location, label: this.props.location}}
                                onChange={this.handleLocationChange} isDisabled={!this.props.editable}
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
                        {this.props.editable ? <Button variant="contained" color="secondary" className={classes.button}
                                                       onClick={this.handleClick}>Save Changes</Button> : null}

                    </div>
                    <div className={classes.imageContainer}>
                        <img src={this.props.picture} className={classes.picture}/>
                    </div>

                </div>

                <div className={classes.reviewsContainer}>
                    <h1 className={classes.title}>Reviews</h1>
                    <List>
                        {this.props.reviews.map((rev, index) => {
                            return (<div key={index}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText className={classes.card} disableTypography
                                                  primary={
                                                      <div className={classes.usernameTitle}>
                                                          {rev.restaurant}
                                                          <div className={classes.date}>
                                                              {new Date(rev.date).toLocaleString()}
                                                          </div>
                                                      </div>
                                                  }
                                                  secondary={
                                                      <React.Fragment>
                                                          <div>
                                                              <div>
                                                                  <Table size="small">
                                                                      <TableHead>
                                                                          <TableRow>
                                                                              <TableCell className={classes.tableHeader}
                                                                                         align="center">Bathroom
                                                                                  Quality</TableCell>
                                                                              <TableCell className={classes.tableHeader}
                                                                                         align="center">Staff
                                                                                  Kindness</TableCell>
                                                                              <TableCell className={classes.tableHeader}
                                                                                         align="center">Cleanliness</TableCell>
                                                                              <TableCell className={classes.tableHeader}
                                                                                         align="center">Drive-thru
                                                                                  quality</TableCell>
                                                                              <TableCell className={classes.tableHeader}
                                                                                         align="center">Delivery
                                                                                  Speed</TableCell>
                                                                              <TableCell className={classes.tableHeader}
                                                                                         align="center">Food
                                                                                  Quality</TableCell>
                                                                          </TableRow>
                                                                      </TableHead>
                                                                      <TableBody>
                                                                          <TableRow>
                                                                              <TableCell align="right">
                                                                                  <Rating size='small'
                                                                                          name="simple-controlled"
                                                                                          value={rev.bathroom}
                                                                                          precision={0.1}
                                                                                          readOnly/>
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                  <Rating size='small'
                                                                                          name="simple-controlled"
                                                                                          value={rev.staff}
                                                                                          precision={0.1}
                                                                                          readOnly/>
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                  <Rating size='small'
                                                                                          name="simple-controlled"
                                                                                          value={rev.clean}
                                                                                          precision={0.1}
                                                                                          readOnly/>
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                  <Rating size='small'
                                                                                          name="simple-controlled"
                                                                                          value={rev.drive}
                                                                                          precision={0.1}
                                                                                          readOnly/>
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                  <Rating size='small'
                                                                                          name="simple-controlled"
                                                                                          value={rev.delivery}
                                                                                          precision={0.1}
                                                                                          readOnly/>
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                  <Rating size='small'
                                                                                          name="simple-controlled"
                                                                                          value={rev.food}
                                                                                          precision={0.1}
                                                                                          readOnly/>
                                                                              </TableCell>
                                                                          </TableRow>
                                                                      </TableBody>
                                                                  </Table>
                                                              </div>
                                                          </div>
                                                          {rev.pictures.map((pic, index) => {
                                                              return (<img src={pic} key={index}
                                                                           className={classes.pictureReview}/>)
                                                          })}

                                                          {this.props.editable ? [<Button key="1" variant="contained"
                                                                                          color="secondary"
                                                                                          className={classes.edit}
                                                                                          size="small"
                                                                                          onClick={() => this.handleEdit(rev._id)}>Edit</Button>,
                                                              <Button key="2" variant="contained" color="secondary"
                                                                      className={classes.edit} size="small"
                                                                      onClick={() => this.handleDelete(rev._id, rev.restaurant)}>Delete</Button>] : null}
                                                      </React.Fragment>
                                                  }/>
                                </ListItem>
                                <Divider variant="inset" component="li"/>
                            </div>)
                        })}
                    </List>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state['profile'].get('username'),
        fullName: state['profile'].get('fullName'),
        picture: state['profile'].get('picture'),
        location: state['profile'].get('location'),
        editable: state['profile'].get('editable'),
        reviews: state['profile'].get('reviews'),
        usernameExists: state['session'].get('usernameExists')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userDetailsRequest: (username) => {
            dispatch(APIActions.userDetailsRequest(username));
        },
        updateProfileDetails: (username, location) => {
            dispatch(StoreActions.updateProfileDetails(username, location));
        },
        updateProfileRequest: (oldUsername, newUsername, location) => {
            dispatch(APIActions.updateProfileRequest(oldUsername, newUsername, location));
        },
        updateUserRequest: (oldUsername, newUsername, location) => {
            dispatch(APIActions.updateUserRequest(oldUsername, newUsername, location));
        },
        deleteReviewRequest: (id, restaurant, reviews) => {
            dispatch(APIActions.deleteReviewRequest(id, restaurant, reviews));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserProfilePage));