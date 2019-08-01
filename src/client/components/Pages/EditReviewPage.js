import React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/styles';
import {connect} from 'react-redux';
import {APIActions, StoreActions} from '../actions'
import {DropzoneArea} from 'material-ui-dropzone'
import Rating from '@material-ui/lab/Rating';

const styles = {
    main: {
        backgroundImage: `url(${'src/client/public/images/reviewbg4.jpg'})`,
        backgroundSize: 'cover',
        height: '550px',
        paddingTop: '40px'
    },
    container: {
        margin: '0 auto 0 auto',
        width: '900px',
        height: '460px',
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


class EditReviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        }
    }

    handleClick = () => {
        if (this.props.bathroom && this.props.staff && this.props.clean && this.props.food) {
            const review = {
                id: this.state.id,
                restaurant: this.props.restaurant,
                date: Date.now(),
                criteria: [this.props.bathroom, this.props.staff, this.props.clean, this.props.drive, this.props.delivery, this.props.food]
            };

            this.props.editReviewRequest(review);
            window.location.href = "/profile/" + this.props.username;

        }
    };

    // handleFiles = (files) => {
    //     let pics = [];
    //
    //     if (files) {
    //         pics = files.map(file => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file);
    //             reader.onload = () => {
    //                 pics.push(reader.result);
    //             };
    //         })
    //     }
    //     this.setScore(pics, 'pictures');
    //
    // };

    setScore = (value, key) => {
        let criteria = {
            restaurant: this.props.restaurant,
            bathroom: this.props.bathroom,
            staff: this.props.staff,
            clean: this.props.clean,
            drive: this.props.drive,
            delivery: this.props.delivery,
            food: this.props.food,
            // pictures: this.props.pictures,
        };
        delete criteria[[key]];
        criteria[[key]] = value;
        this.props.updateReviewCriteria(criteria);
    };

    componentWillMount = () => {
        this.props.getReviewRequest(this.state.id);
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.main}>
                <div className={classes.container}>
                    <h1 className={classes.title}>Edit a review on {this.props.restaurant}</h1>
                    <br/>
                    <div className={classes.params}>
                        <label className={classes.param}>Bathroom Quality</label>
                        <Rating name="simple-controlled1" value={this.props.bathroom} className={classes.rating}
                                onChange={(event, newValue) => {
                                    this.setScore(newValue, 'bathroom');
                                }}/>
                    </div>
                    <br/><br/>
                    <div className={classes.params}>
                        <label className={classes.param}>Staff Kindness</label>
                        <Rating name="simple-controlled2" value={this.props.staff} className={classes.rating}
                                onChange={(event, newValue) => {
                                    this.setScore(newValue, 'staff');
                                }}/>
                    </div>
                    <br/><br/>
                    <div className={classes.params}>
                        <label className={classes.param}>Cleanliness</label>
                        <Rating name="simple-controlled3" value={this.props.clean} className={classes.rating}
                                onChange={(event, newValue) => {
                                    this.setScore(newValue, 'clean');
                                }}/>
                    </div>
                    <br/><br/>
                    <div className={classes.params}>
                        <label className={classes.param}>Drive-thru quality</label>
                        <Rating name="simple-controlled4" value={this.props.drive} className={classes.rating}
                                onChange={(event, newValue) => {
                                    this.setScore(newValue, 'drive');
                                }}/>
                    </div>
                    <br/><br/>
                    <div className={classes.params}>
                        <label className={classes.param}>Delivery Speed</label>
                        <Rating name="simple-controlled5" value={this.props.delivery} className={classes.rating}
                                onChange={(event, newValue) => {
                                    this.setScore(newValue, 'delivery');
                                }}/>
                    </div>
                    <br/><br/>
                    <div className={classes.params}>
                        <label className={classes.param}>Food Quality</label>
                        <Rating name="simple-controlled6" value={this.props.food} className={classes.rating}
                                onChange={(event, newValue) => {
                                    this.setScore(newValue, 'food');
                                }}/>
                    </div>
                    <br/><br/>
                    <div className={classes.rest}>
                        {/*<DropzoneArea dropzoneClass={classes.drop}*/}
                        {/*dropzoneText='Pictures' filesLimit={3}*/}
                        {/*acceptedFiles={['image/*']} onChange={this.handleFiles}/>*/}
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
        username: state['session'].get('username'),
        restaurant: state['review'].get('restaurant'),
        bathroom: state['review'].get('bathroom'),
        staff: state['review'].get('staff'),
        clean: state['review'].get('clean'),
        drive: state['review'].get('drive'),
        delivery: state['review'].get('delivery'),
        food: state['review'].get('food'),
        // pictures: state['review'].get('pictures'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getReviewRequest: (id) => {
            dispatch(APIActions.getReviewRequest(id));
        },
        editReviewRequest: (review) => {
            dispatch(APIActions.editReviewRequest(review));
        },
        updateReviewCriteria: (criteria) => {
            dispatch(StoreActions.updateReviewCriteria(criteria));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditReviewPage));
