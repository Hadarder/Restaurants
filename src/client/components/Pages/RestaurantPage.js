import React, {Component} from 'react';
import {connect} from "react-redux";
import {APIActions} from "../actions";
import {withStyles} from '@material-ui/styles';
import TextField from "@material-ui/core/TextField/index";
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import {grey} from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';


const styles = {
    main: {
        backgroundImage: `url(${'src/client/public/images/restbg1.jpg'})`,
        backgroundSize: 'cover',
        textAlign: 'center',
        padding: '20px 20px 20px 20px'

    },
    profileContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '800px',
        height: '350px',
        border: '2px solid white',
    },
    imageContainer: {
        width: '300px',
        float: 'right',
        textAlign: 'right',
        margin: '50px 50px 0 0'

    },
    picture: {
        width: '270px',
        maxHeight: '2700px',
    },
    detailsContainer: {
        width: '250px',
        float: 'left',
        textAlign: 'left',
        margin: '0 0 0 60px'

    },
    title: {
        fontFamily: 'Calibri',
        paddingTop: '30px',
    },
    details: {
        fontFamily: 'Calibri',
        fontSize: '18px',
        marginTop: '40px'
    },
    button: {
        height: '40px',
        width: '150px',
        fontFamily: 'Calibri',
        marginTop: '30px',
        margin: 'auto',
        '&:hover': {
            color: 'white'
        },
    },
    edit: {
        height: '40px',
        width: '100px',
        fontFamily: 'Calibri',
        '&:hover': {
            color: 'white'
        },
        marginTop: '20px',
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
        width: '1000px',
        border: '2px solid white',
        fontFamily: 'Calibri',
    },
    tableHeader: {
        fontFamily: 'Calibri',
        color: 'black'
    },
    sort: {
        display: 'inline',
    },
    form: {
        float: 'left',
        marginLeft: '20px',
    },
    group: {
        display: 'inline',

    },
    drop: {
        fontSize: '15px',
        fontFamily: 'Calibri',
    }
};

const GreyRadio = withStyles({
    root: {
        color: grey[400],
        '&$checked': {
            color: '#f50057',
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);


const CssFormControlLabel = withStyles({
    root: {
        '& .MuiTypography-root': {
            fontSize: '15px',
            fontFamily: 'Calibri',
        }
    }
})(FormControlLabel);


class RestaurantPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.match.params.name,
            sort: "date",
            sortDate: "new",
            sortCriteria: "bathroom",
            filter: "all",
            filterCriteria: "bathroom",
            filterThreshold: 0
        }
    }

    componentWillMount = () => {
        this.props.restaurantDetailsRequest(this.state.name);
    };

    setSort = (event) => {
        this.setState({sort: event.target.value});
    };

    setFilter = (event) => {
        this.setState({filter: event.target.value});
    };

    setSortCriteria = (event) => {
        this.setState({sortCriteria: event.target.value})
    };

    setFilterCriteria = (event) => {
        this.setState({filterCriteria: event.target.value})
    };

    setSortDate = (event) => {
        this.setState({sortDate: event.target.value})
    };

    sortByDateDesc = (a, b) => {
        return b.date - a.date;
    };

    sortByDateAsc = (a, b) => {
        return a.date - b.date;
    };

    sortByCriteria = (criteria) => (a, b) => {
        return b[[criteria]] - a[[criteria]];
    };

    filterPassedWeek = (review) => review.date >= Date.now() - 604800000;
    filterPassedMonth = (review) => review.date >= Date.now() - 2629746000;
    filterPassedYear = (review) => review.date >= Date.now() - 31556952000;
    filterByCriteria = (criteria, threshold) => (review) => review[[criteria]] >= threshold;

    render() {
        const {classes} = this.props;

        let filteredResults = this.props.reviews;
        switch (this.state.filter) {
            case "all":
                break;
            case "week":
                filteredResults = filteredResults.filter(this.filterPassedWeek);
                break;
            case "month":
                filteredResults = filteredResults.filter(this.filterPassedMonth);
                break;
            case "year":
                filteredResults = filteredResults.filter(this.filterPassedYear);
                break;
            case "criteria":
                filteredResults = filteredResults.filter(this.filterByCriteria(this.state.filterCriteria, this.state.filterThreshold));
        }


        let sortFunc = this.state.sort === "criteria" ? this.sortByCriteria(this.state.sortCriteria) : (this.state.sortDate === "new" ? this.sortByDateDesc : this.sortByDateAsc)
        let reviews = filteredResults.sort(sortFunc);

        return (
            <div className={classes.main}>

                <div className={classes.profileContainer}>
                    <div className={classes.detailsContainer}>
                        <h1 className={classes.title}>{this.props.name}</h1>
                        <label className={classes.details}>{this.props.location}</label>
                        <br/><br/>
                        <label className={classes.details}>{this.props.type}</label>
                        <br/><br/>
                        <Rating name="simple-controlled" value={this.props.score} readOnly precision={0.1}/>
                        {this.props.loggedIn ? <Button variant="contained" color="secondary" className={classes.button}
                                                       href={"/addReview/" + this.props.name}>Add a
                            review</Button> : null}
                    </div>

                    <div className={classes.imageContainer}>
                        <img src={this.props.picture} className={classes.picture}/>
                    </div>

                </div>

                <div className={classes.reviewsContainer}>
                    <h1 className={classes.title}>Reviews</h1>


                    <div className={classes.sort}>
                        <FormControl className={classes.form} size="small">
                            <RadioGroup className={classes.group} value={this.state.filter} onChange={this.setFilter}>
                                <CssFormControlLabel value="all" control={<GreyRadio/>} label="Show All"/>
                                <CssFormControlLabel value="week" control={<GreyRadio/>} label="Passed Week"/>
                                <CssFormControlLabel value="month" control={<GreyRadio/>} label="Passed Month"/>
                                <CssFormControlLabel value="year" control={<GreyRadio/>} label="Passed Year"/>
                                <CssFormControlLabel value="criteria" control={<GreyRadio/>}
                                                     label="Criteria"/>
                                <Select native value={this.state.filterCriteria} className={classes.drop}
                                        disabled={this.state.filter !== "criteria"}
                                        onChange={this.setFilterCriteria}>
                                    <option value="bathroom">Bathroom Quality</option>
                                    <option value="staff">Staff Kindness</option>
                                    <option value="clean">Cleanliness</option>
                                    <option value="drive">Drive-thru quality</option>
                                    <option value="delivery">Delivery Speed</option>
                                    <option value="food">Food Quality</option>
                                </Select>
                                <Rating name="simple-controlled" value={this.state.filterThreshold}
                                        onChange={(event, newValue) => {
                                            this.setState({filterThreshold: newValue});
                                        }} size="small" style={{float: 'right', margin: '25px 0 0 15px'}}
                                        readOnly={this.state.filter !== "criteria"}
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>


                    <div className={classes.sort}>
                        <FormControl className={classes.form}>
                            <RadioGroup className={classes.group} value={this.state.sort} onChange={this.setSort}>
                                <CssFormControlLabel value="date" control={<GreyRadio/>} label="Sort by date"/>
                                <Select native value={this.state.sortDate} className={classes.drop}
                                        disabled={this.state.sort !== "date"} onChange={this.setSortDate}>
                                    <option value="new">From newest</option>
                                    <option value="old">From oldest</option>
                                </Select>
                                <CssFormControlLabel value="criteria" control={<GreyRadio/>} label="Sort by criteria"
                                                     style={{marginLeft: '20px'}}/>
                                <Select native value={this.state.sortCriteria} className={classes.drop}
                                        disabled={this.state.sort !== "criteria"}
                                        onChange={this.setSortCriteria}>
                                    <option value="bathroom">Bathroom Quality</option>
                                    <option value="staff">Staff Kindness</option>
                                    <option value="clean">Cleanliness</option>
                                    <option value="drive">Drive-thru quality</option>
                                    <option value="delivery">Delivery Speed</option>
                                    <option value="food">Food Quality</option>
                                </Select>
                            </RadioGroup>
                        </FormControl>
                    </div>


                    <br/><br/><br/><br/><br/><br/><br/>
                    <List>
                        {reviews.map((rev, index) => {
                            return (<div key={index}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText className={classes.card} disableTypography
                                                  primary={
                                                      <div className={classes.usernameTitle}>
                                                          {rev.username}
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
                                                                                         align="center">Drive-Thru
                                                                                  Quality</TableCell>
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
        name: state['restaurant'].get('name'),
        type: state['restaurant'].get('type'),
        picture: state['restaurant'].get('picture'),
        location: state['restaurant'].get('location'),
        score: state['restaurant'].get('score'),
        reviews: state['restaurant'].get('reviews'),
        loggedIn: state['session'].get('loggedIn')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        restaurantDetailsRequest: (name) => {
            dispatch(APIActions.restaurantDetailsRequest(name));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RestaurantPage));