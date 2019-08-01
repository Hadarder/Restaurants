import React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/styles';
import {connect} from 'react-redux';
import {APIActions} from '../actions'
import {DropzoneArea} from 'material-ui-dropzone'
import Rating from '@material-ui/lab/Rating';

const styles = {
    main: {
        backgroundImage: `url(${'src/client/public/images/reviewbg4.jpg'})`,
        backgroundSize: 'cover',
        height: '800px',
        paddingTop: '40px'
    },
    container: {
        margin: '0 auto 0 auto',
        width: '900px',
        height: '750px',
        textAlign: 'center',
        border: '3px solid white',
    },
    title: {
        fontFamily: 'Calibri',
        paddingTop: '30px',
    },
    button: {
        height: '40px',
        width: '250px',
        fontFamily: 'Calibri',
        margin: '40px auto 0 auto'
    },
    drop: {
        width: '300px',
        marginTop: '30px'
    },
    params: {
        float: 'left',
        margin: '0 40px 0 60px',
        textAlign: 'left'

    },
    rest: {
        marginLeft: '60px'
    },
    rating: {
        float: 'right',
        marginLeft: '20px'
    }
};


class AddReviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.match.params.name,
            bathroom: null,
            staff: null,
            clean: null,
            drive: null,
            delivery: null,
            food: null,
            pictures: []
        }
    }

    handleClick = () => {
        if (this.state.bathroom && this.state.staff && this.state.clean && this.state.food) {
            const review = {
                username: this.props.username,
                restaurant: this.state.name,
                date: Date.now(),
                criteria: [this.state.bathroom, this.state.staff, this.state.clean, this.state.drive, this.state.delivery, this.state.food],
                pictures: this.state.pictures
            };

            this.props.addReviewRequest(review);
            window.location.href = "/restaurant/" + this.state.name;

        }
    };

    handleFiles = (files) => {
        let pics = [];
        if (files) {
            files.map(file => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    pics.push(reader.result);
                };
            })
        }
        this.setState({pictures: pics});

    };

    setScore = (value, key) => {
        this.setState({[key]: value});
    };

    render() {

        const {classes} = this.props;
        return (
            <div className={classes.main}>
                <div className={classes.container}>
                    <h1 className={classes.title}>Add a review on {this.state.name}</h1>
                    <br/>
                    <div className={classes.params}>
                        <label className={classes.param}>Bathroom Quality</label>
                        <Rating name="simple-controlled1" value={this.state.bathroom} className={classes.rating}
                                onChange={(event, newValue) => {
                                    this.setScore(newValue, 'bathroom');
                                }}/>
                    </div>
                    <br/><br/>
                    <div className={classes.params}>
                        <label className={classes.param}>Staff Kindness</label>
                        <Rating name="simple-controlled2" value={this.state.staff} className={classes.rating}
                                onChange={(event, newValue) => {
                                    this.setScore(newValue, 'staff');
                                }}/>
                    </div>
                    <br/><br/>
                    <div className={classes.params}>
                        <label className={classes.param}>Cleanliness</label>
                        <Rating name="simple-controlled3" value={this.state.clean} className={classes.rating}
                                onChange={(event, newValue) => {
                                    this.setScore(newValue, 'clean');
                                }}/>
                    </div>
                    <br/><br/>
                    <div className={classes.params}>
                        <label className={classes.param}>Drive-thru quality</label>
                        <Rating name="simple-controlled4" value={this.state.drive} className={classes.rating}
                                onChange={(event, newValue) => {
                                    this.setScore(newValue, 'drive');
                                }}/>
                    </div>
                    <br/><br/>
                    <div className={classes.params}>
                        <label className={classes.param}>Delivery Speed</label>
                        <Rating name="simple-controlled5" value={this.state.delivery} className={classes.rating}
                                onChange={(event, newValue) => {
                                    this.setScore(newValue, 'delivery');
                                }}/>
                    </div>
                    <br/><br/>
                    <div className={classes.params}>
                        <label className={classes.param}>Food Quality</label>
                        <Rating name="simple-controlled6" value={this.state.food} className={classes.rating}
                                onChange={(event, newValue) => {
                                    this.setScore(newValue, 'food');
                                }}/>
                    </div>
                    <br/><br/>
                    <div className={classes.rest}>
                        <DropzoneArea dropzoneClass={classes.drop}
                                      dropzoneText='Pictures' filesLimit={3}
                                      acceptedFiles={['image/*']} onChange={this.handleFiles}/>
                        <Button variant="contained" color="secondary" className={classes.button}
                                onClick={this.handleClick}>
                            Submit</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state['session'].get('username')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addReviewRequest: (review) => {
            dispatch(APIActions.addReviewRequest(review));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddReviewPage));