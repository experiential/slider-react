import React from 'react';
import { connect } from 'react-redux';

import { moveTile } from '../actions';
import { Spatial } from '../spatial_functions.js';



const padding = 0;
const tileStyle = {
	border: "0px solid gray", 
	padding: 0, 
	margin: 0,
	width: 0, 
	height: 0, 
	position: "absolute",
	backgroundImage: "",
	backgroundSize: "",
	backgroundPosition: "0px 0px"
};

class Tile extends React.Component {

	onTileClick = () => {
		this.props.moveTile( [ this.props.x, this.props.y ] );
	}

	render() {

		let { x, y, tile, board } = this.props;
		let thisTileStyle = Object.assign({}, tileStyle);
		let { tileHeight, tileWidth } = board;
		let gridSize = Spatial.getGridSize(board.grid);
		thisTileStyle.width = tileWidth;
		thisTileStyle.height = tileHeight;
		thisTileStyle.top = y * (tileHeight + padding);
		thisTileStyle.left = x * (tileWidth + padding);

		// Calculate background image size and offset
		let xSize = gridSize[0] * tileWidth;
		let ySize = gridSize[1] * tileHeight;
		let imagePos = Spatial.getOriginalPosition(tile - 1, gridSize);
		let xOffset = - Math.round(imagePos[0] * tileWidth);
		let yOffset = - Math.round(imagePos[1] * tileHeight);

		// Set background image style
		thisTileStyle.backgroundImage = `url(${board.image})`;
		thisTileStyle.backgroundSize = `${xSize}px ${ySize}px`;
		thisTileStyle.backgroundPosition = `${xOffset}px ${yOffset}px`;

		console.log("Rendering tile for "+x+","+y)

		return(
			<div style={ thisTileStyle } onClick={ this.onTileClick } >
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return { board: state.board };
};

export default connect(mapStateToProps, { moveTile })(Tile);
