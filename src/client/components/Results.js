import React from "react";
import {withStyles} from '@material-ui/styles';
import DisplayCard from './DisplayCard'

const styles = {
    card: {
        display: 'inline-block',
        margin: '0 30px 0 30px'
    },
};

class Results extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        const dataList = this.props.dataList;
        return (
            dataList.map((data,index) => {
                return(<div className={classes.card} key={index}>
                    <DisplayCard  key={index} restaurant={this.props.restaurant} data={data}></DisplayCard>
                </div>)
            })
        );
    }

}

export default withStyles(styles)(Results);