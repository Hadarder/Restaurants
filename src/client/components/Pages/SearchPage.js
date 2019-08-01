import React from 'react';
import {Component} from "react";
import {connect} from "react-redux";
import {APIActions} from "../actions";
import {withStyles} from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RestaurantIcon from '@material-ui/icons/Fastfood';
import PersonIcon from '@material-ui/icons/Person';
import StarIcon from '@material-ui/icons/Star';
import Results from '../Results'
import UsersResults from '../UsersResults'
import RestaurantsResults from '../RestaurantsResults'

const qs = require('query-string');


const styles = {
    root: {
        flexGrow: 1,
        textAlign: 'center'
    },
    results: {
        margin: '20px 145px 0 140px',
    }
};

const CssTab = withStyles({
    root: {
        fontFamily: 'Calibri',

    }
})(Tab);

class SearchPage extends Component {
    constructor(props) {
        super(props);
        const type = qs.parse(props.location.search, {ignoreQueryPrefix: true}).type;
        this.state = {
            value: this.props.match.params.tab ? Number(this.props.match.params.tab) : 0,
            query: this.props.match.params.query ? this.props.match.params.query : "",
            type: type ? type : ""
        }
    }

    componentWillMount = () => {
        this.props.searchRestaurantsRequest(this.state.query, "", this.state.type, 0);
        if (this.state.type === "") {
            this.props.searchUsersRequest(this.state.query, "", "");
        }
    };

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };

    render() {
        const {classes} = this.props;

        let display;
        switch (this.state.value) {
            case 1:
                display = <RestaurantsResults query={this.state.query} type={this.state.type}/>;
                break;
            case 2:
                display = <UsersResults query={this.state.query}/>;
                break;
            default:
                display = (
                    <div className={classes.results}>
                        <Results dataList={this.props.restaurants} restaurant={1} key='restaurants'/>
                        <Results dataList={this.props.users} key='users'/>
                    </div>
                );
        }
        return (
            <div>
                <Paper square className={classes.root}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="secondary">
                        <CssTab icon={<StarIcon/>} label="All"/>
                        <CssTab icon={<RestaurantIcon/>} label="Restaurants"/>
                        <CssTab icon={<PersonIcon/>} label="Users"/>
                    </Tabs>
                </Paper>
                {display}
            </div>);
    }
}

class Restaurants extends React.Component {
    render() {
        return <h1>Restaurants</h1>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state['search'].get('users'),
        restaurants: state['search'].get('restaurants'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchUsersRequest: (username, fullName, location) => {
            dispatch(APIActions.searchUsersRequest(username, fullName, location));
        },
        searchRestaurantsRequest: (name, location, type, score) => {
            dispatch(APIActions.searchRestaurantsRequest(name, location, type, score));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchPage));