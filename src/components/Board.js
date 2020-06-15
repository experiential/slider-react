import React from 'react';
import { connect } from 'react-redux';

import { initialiseGrid } from '../actions';
import { Spatial } from '../spatial_functions.js';
import Tile from './Tile';



const padding = 10;
const boardStyleInit = { border: "10px solid gray",
                    width: 0, 
                    height: 0, 
                    position: "relative",
                    display: "inline-block"
                  };

class Board extends React.Component {

	componentDidMount() {
		const { gridWidth, gridHeight } = this.props.gameSettings;
		this.props.initialiseGrid(gridWidth, gridHeight);
	}

	render() {

		const { grid, tileWidth, tileHeight } = this.props.board;
		let gridSize = Spatial.getGridSize(grid);

		let boardStyle = Object.assign({}, boardStyleInit);
		boardStyle.width = tileWidth * gridSize[0] + padding * 2;
		boardStyle.height = tileHeight * gridSize[1] + padding * 2;

		return (
			<div style={ boardStyle }>
			{
				grid.map( (row, rowIndex) =>
				{
					return row.map( (tile, tileIndex) => 
					{
						if(tile)
						{
							console.log("new tile"+tileIndex)
							let key = tileIndex+","+rowIndex
							return(
							<Tile 
								x={ tileIndex } 
								y={ rowIndex } 
								key={ key } 
								tile={ tile } 
							/>
							);
						}
						else
						  return null;
					} )
				} )
			}
			</div>
		);
	}

}


const mapStateToProps = (state) => {
  return { board: state.board, gameSettings: state.gameSettings };
};

export default connect(mapStateToProps, { initialiseGrid })(Board);
