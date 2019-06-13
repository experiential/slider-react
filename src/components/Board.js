import React from 'react';
import { connect } from 'react-redux';

import { initialiseGrid } from '../actions';
import { Spatial } from '../spatial_functions.js';
import Tile from './Tile';



const padding = 10;
const board_style_init = { border: "10px solid gray",
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

		let board_style = Object.assign({}, board_style_init);
		board_style.width = tileWidth * gridSize[0] + padding * 2;
		board_style.height = tileHeight * gridSize[1] + padding * 2;

		return (
			<div style={ board_style }>
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
