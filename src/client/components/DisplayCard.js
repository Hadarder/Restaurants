import React from "react";
import {withStyles} from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

const styles = {
    cardWrapper: {
        transition: '0.5s',
        width: '250px',
        height: '300px',
        marginTop: '30px',
        fontFamily: 'Calibri',
        '&:hover': {
            opacity: 0.6
        },
        textAlign: 'center'
    },

    cardImage: {
        width: '270px',
        height: '250px'
    },

    cardTitle: {
        fontsize: '16px'
    },

    cardDescription: {
        fontsize: '12px',
        opacity: 0.5,
    },
    link: {
        color: 'Black',
        '&:hover': {
            color: 'Black'
        },
    },
    rating: {
        margin: '0 50px 0 50px',
    }
};

class DisplayCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        const addr = this.props.restaurant ? "/restaurant/" : "/profile/";

        return (
            <a className={classes.link} href={addr + this.props.data.title}>
                <div className={classes.cardWrapper}>
                    <div>
                        <img className={classes.cardImage} src={this.props.data.image}/>
                    </div>
                    <div>
                        <label className={classes.cardTitle}>{this.props.data.title}</label>
                        <br/>
                        <label className={classes.cardDescription}>{this.props.data.description2}</label>
                        <br/>
                        {this.props.restaurant?
                            <Box component="fieldset" mb={3} borderColor="transparent" className={classes.rating}>
                                <Rating name="simple-controlled" value={this.props.data.description1} precision={0.1} readOnly/>
                            </Box>
                            : <label className={classes.cardDescription}>{this.props.data.description1}</label>}
                    </div>
                </div>
            </a>
        )
            ;
    }
}

export default withStyles(styles)(DisplayCard)
