import React from 'react';
import {withStyles} from '@material-ui/styles';
import Results from './Results'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import {APIActions, StoreActions} from "./actions";
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Star from '@material-ui/icons/Star';
import NearMe from '@material-ui/icons/NearMe';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import {grey} from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import cities from 'cities.json';
import Select from "react-select";

const GreyRadio = withStyles({
    root: {
        color: grey[400],
        '&$checked': {
            color: 'gray',
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);

const styles = {
    container: {},
    sideBarBG: {
        float: 'left',
        width: '300px',
        height: '1500px',
        backgroundImage: `url(${'src/client/public/images/bg7.png'})`,
        opacity: 0.7,
        position: 'absolute',
        backgroundRepeat: 'repeat-y',
    },
    sideBar: {
        float: 'left',
        textAlign: 'center',
        fontFamily: 'Calibri',

    },
    textField: {
        backgroundColor: 'White',
        margin: '30px 0 0 35px',
    },
    select: {
        margin: '30px 0 0 35px',
    },
    title: {
        position: 'relative',
        margin: '20px 0 0 0',
        fontFamily: 'Calibri'
    },
    results: {
        float: 'right',
        fontFamily: 'Calibri',
        width: '967px'

    },
    button: {
        '&:hover': {
            color: 'Black',
            backgroundColor: 'White',
        },
        fontFamily: 'Calibri',
        backgroundColor: '#f50057',
        color: "white",
        margin: '20px auto 20px auto',
    },
    rating: {
        margin: '20px 50px 0 50px',
    },
    group: {
        display: 'inline',
        fontFamily: 'Calibri',

    },
    slider:{
        color: 'gray',
    },
    sliderContainer: {
        width: '300px',
        height: '1px',
        color: '#f50057',
        margin: '0 0 0 100px',
    },
    sort: {
        display: 'inline',
        fontFamily: 'Calibri',

    },
    form: {
        fontFamily: 'Calibri',
        float: 'left',
        marginLeft: '100px'
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

const CssFormControlLabel = withStyles({
    root: {
        '& .MuiTypography-root': {
            fontSize: '15px',
            fontFamily: 'Calibri',
        }
    }
})(FormControlLabel);

class restaurantResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: this.props.query, location: "", type: this.props.type, score: 0 ,sort:"score", value:0};
    }

    setName = (value) => {
        this.setState({name: value.value});
    };

    setLocation = (event) => {
        this.setState({location: event.target.value});
    };

    setType = (event) => {
        this.setState({type: event.target.value});
    };

    handleClick = () =>{
        this.props.searchRestaurantsRequest(this.state.name, this.state.location, this.state.type, this.state.score);
    };

    componentWillMount= () => {
        if (this.props.loggedIn){
            this.props.userDetailsRequest(this.props.username);
        }
    };

    componentDidMount = () => {
        this.props.getRestaurantsRequest();
    };

    handleChange = (event, newValue) =>
    {
        this.setState({value: newValue}, ()=> {
            let city = cities.find(city => city.name === this.props.location);
            this.props.updateRestaurantsGrade(city.lat,city.lng,this.state.value/100,this.props.restaurants);
        });
    };

    setSort = (event) => {
        this.setState({sort: event.target.value});
    };

    sortByScore = (a,b) => {
        return b.description1 - a.description1;
    };

    sortByGrade = (a,b) => {
        return b.grade - a.grade;
    };

    render() {
        const {classes} = this.props;
        let sortFunc = this.state.sort === "score" ? this.sortByScore : this.sortByGrade;
        let results = this.props.restaurants.sort(sortFunc);

        return (
            <div className={classes.container}>
                <div className={classes.sideBarBG}>
                </div>
                <div className={classes.sideBar}>
                    <Select defaultValue={{value: this.state.name, label: this.state.name}}  inputId="react-select-single" className={classes.select}
                            TextFieldProps={{label: 'Country', InputLabelProps: {
                                    htmlFor: 'react-select-single',
                                    shrink: true,
                                },
                            }} placeholder="Name" options={this.props.restaurantsNames} onChange={this.setName}
                            theme={theme => ({
                                ...theme,
                                borderRadius: 10,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'MistyRose',
                                    primary: 'PaleVioletRed',
                                    primary50: 'MistyRose',
                                },
                            })}
                    />
                    <CssTextField label="location" className={classes.textField} margin="dense"
                                  variant="outlined" multiline rowsMax="4" onChange={this.setLocation}/>
                    <br/>
                    <CssTextField label="type" className={classes.textField} margin="dense" value={this.state.type}
                                  variant="outlined" multiline rowsMax="4" onChange={this.setType}/>
                    <br/>
                    <Box component="fieldset" mb={3} borderColor="transparent" className={classes.rating}>
                        <Rating
                            precision={0.1}
                            name="simple-controlled"
                            value={this.state.score}
                            onChange={(event, newValue) => {
                                this.setState({score: newValue});
                            }}
                        />
                    </Box>
                    <br/>
                    <Button variant='outlined' key='profile' className={classes.button}
                            onClick={this.handleClick}> Search </Button>
                    <br/>
                </div>
                <br/><br/>
                <div className={classes.sort}>

                    <FormControl className={classes.form}>
                        <RadioGroup className={classes.group} value={this.state.sort} onChange={this.setSort}>
                            <CssFormControlLabel value="score" control={<GreyRadio/>}
                                              label="Sort by score"/>
                            <CssFormControlLabel value="scale" control={<GreyRadio/>}
                                              label="Closer-Better scale" disabled={!this.props.loggedIn}/>
                        </RadioGroup>
                    </FormControl>

                    <Grid className={classes.sliderContainer} container spacing={2}>
                        <Grid item>
                            <Star/>
                        </Grid>
                        <Grid item xs>
                            <Slider className={classes.slider} value={this.state.value} onChange={this.handleChange}
                                    aria-labelledby="continuous-slider" disabled={this.state.sort ==="score"}/>
                        </Grid>
                        <Grid item>
                            <NearMe/>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.results}>
                    <Results dataList={results} restaurant={1}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        restaurants: state['search'].get('restaurants'),
        loggedIn: state['session'].get('loggedIn'),
        location: state['profile'].get('location'),
        username: state['session'].get('username'),
        restaurantsNames: state['search'].get('restaurantsNames'),

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchRestaurantsRequest: (name, location, type, score) => {
            dispatch(APIActions.searchRestaurantsRequest(name, location, type, score));
        },
        userDetailsRequest: (username) => {
            dispatch(APIActions.userDetailsRequest(username));
        },
        updateRestaurantsGrade : (lat,lon,value,restaurants) => {
            dispatch(StoreActions.updateRestaurantsGrade(lat,lon,value,restaurants));
        },
        getRestaurantsRequest: () => {
            dispatch(APIActions.getRestaurantsRequest());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(restaurantResults));