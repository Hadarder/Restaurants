import React from "react";
import ReactDOM from "react-dom";
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const styles = {
  cardWrapper: {
    transition: '0.5s',
    font: 'Geneva',
    hover: {
      opacity: 0.6
    }
    },
  
  cardImage: {
    width: '100%',
    height: '70%'
  },
  
  cardTitle: {
    fontsize: '16px'
  },
  
  cardDescription: {
    fontsize: '12px',
    opacity: 0.5
  },

  row: {
    width: '1000px'
  },
  
  column: {
    width: '250px',
    height: '200px',
    padding: '0 25px 30px 0'
  },
  
  listTable: {
    // marginleft: 'auto',
    // marginright: 'auto',
    width: '1100px'
  }
};

class RestaurantCard extends React.Component {
  constructor(props) {
    super(props);
    const data = props.data;
    this.state = {image: data.image, title: data.title, description: data.description}
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.cardWrapper}>
            <div>
              <img className={classes.cardImage} src={this.state.image} />
            </div>
            <div>
              <label className={classes.cardTitle}>{this.state.title}</label>
              <br />
              <label className={classes.cardDescription}>{this.state.description}</label>
            </div>
    </div>
      );
  }
}

// RestaurantCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

class RestaurantsList extends React.Component {
  tableRows;
  tableColumns;

  constructor(props){
    super(props);
    this.rows = [];
    const resturantsData = [{
      image: 'https://prod-wolt-venue-images-cdn.wolt.com/5bbdc2ed48cbb5000bbd2a24/137c35abbb54c059d7134da9103dc1b0-edits/4e9981d82c293b553aeb6196239cba90',
      name: 'Gusto',
      description: 'House of italian food'
    },
    {
      image: 'https://prod-wolt-venue-images-cdn.wolt.com/5bbdc2ed48cbb5000bbd2a24/137c35abbb54c059d7134da9103dc1b0-edits/4e9981d82c293b553aeb6196239cba90',
      name: 'Gusto 2',
      description: 'House of italian food - 2'
    },
    {
      image: 'https://prod-wolt-venue-images-cdn.wolt.com/5bbdc2ed48cbb5000bbd2a24/137c35abbb54c059d7134da9103dc1b0-edits/4e9981d82c293b553aeb6196239cba90',
      name: 'Gusto 3',
      description: 'House of italian food - 3'
    },
    {
      image: 'https://prod-wolt-venue-images-cdn.wolt.com/5bbdc2ed48cbb5000bbd2a24/137c35abbb54c059d7134da9103dc1b0-edits/4e9981d82c293b553aeb6196239cba90',
      name: 'Gusto 4',
      description: 'House of italian food - 4'
    },
    {
      image: 'https://prod-wolt-venue-images-cdn.wolt.com/5bbdc2ed48cbb5000bbd2a24/137c35abbb54c059d7134da9103dc1b0-edits/4e9981d82c293b553aeb6196239cba90',
      name: 'Gusto 5',
      description: 'House of italian food - 5'
    },
    {
      image: 'https://prod-wolt-venue-images-cdn.wolt.com/5bbdc2ed48cbb5000bbd2a24/137c35abbb54c059d7134da9103dc1b0-edits/4e9981d82c293b553aeb6196239cba90',
      name: 'Gusto 5',
      description: 'House of italian food - 5'
    },
    {
      image: 'https://prod-wolt-venue-images-cdn.wolt.com/5bbdc2ed48cbb5000bbd2a24/137c35abbb54c059d7134da9103dc1b0-edits/4e9981d82c293b553aeb6196239cba90',
      name: 'Gusto 6',
      description: 'House of italian food - 6'
    },
    {
      image: 'https://prod-wolt-venue-images-cdn.wolt.com/5bbdc2ed48cbb5000bbd2a24/137c35abbb54c059d7134da9103dc1b0-edits/4e9981d82c293b553aeb6196239cba90',
      name: 'Gusto 7',
      description: 'House of italian food - 7'
    },
    {
      image: 'https://prod-wolt-venue-images-cdn.wolt.com/5bbdc2ed48cbb5000bbd2a24/137c35abbb54c059d7134da9103dc1b0-edits/4e9981d82c293b553aeb6196239cba90',
      name: 'Gusto 8',
      description: 'House of italian food - 8'
    },
    {
      image: 'https://prod-wolt-venue-images-cdn.wolt.com/5bbdc2ed48cbb5000bbd2a24/137c35abbb54c059d7134da9103dc1b0-edits/4e9981d82c293b553aeb6196239cba90',
      name: 'Gusto 9',
      description: 'House of italian food - 9'
    },
    {
      image: 'https://prod-wolt-venue-images-cdn.wolt.com/5bbdc2ed48cbb5000bbd2a24/137c35abbb54c059d7134da9103dc1b0-edits/4e9981d82c293b553aeb6196239cba90',
      name: 'Gusto 10',
      description: 'House of italian food - 10'
    },
    {
      image: 'https://prod-wolt-venue-images-cdn.wolt.com/5bbdc2ed48cbb5000bbd2a24/137c35abbb54c059d7134da9103dc1b0-edits/4e9981d82c293b553aeb6196239cba90',
      name: 'Gusto 11',
      description: 'House of italian food - 11'
    },
    {
      image: 'https://prod-wolt-venue-images-cdn.wolt.com/5bbdc2ed48cbb5000bbd2a24/137c35abbb54c059d7134da9103dc1b0-edits/4e9981d82c293b553aeb6196239cba90',
      name: 'Gusto 12',
      description: 'House of italian food - 12'
    }];
    const { classes } = this.props;

    for (let i = 0; i < resturantsData.length / 3; i++){
      this.columns = [];
      
      for (let j = 0; j < 3 && ((i * 3) + j < resturantsData.length); j++){      
        this.tableColumns.push(<td key={`cell${i}-${j}`} className={classes.column}>
        <RestaurantCard data={resturantsData[(i * 3) + j]}></RestaurantCard></td>
        );
      }
      this.tableRows.push(<tr key={`row${i}`} className={classes.row}>{this.tableColumns}</tr>);
    }
  }

  render(){
    const { classes } = this.props;
    return (
      <table className={classes.listTable}>
        <tbody>
        {this.tableRows}
        </tbody>
      </table>
    );
  }
  
}

// RestaurantsList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(RestaurantsList)
