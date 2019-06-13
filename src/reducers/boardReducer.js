import { INITIALISE_GRID, MOVE_TILE } from '../actions/types';
import { Spatial } from '../spatial_functions.js';
import puzzleImage1 from '../stock-pot-sq.jpg';

const INITIAL_STATE = {
	grid: [ [ 1 ] ],
	tileWidth: 100,
	tileHeight: 100,
	image: puzzleImage1
};

export default (state = INITIAL_STATE, action) => {
	switch ( action.type ) {
		case INITIALISE_GRID:

			let newGrid = [];
			const { gridWidth, gridHeight } = action.payload;

			// Set up grid with tiles in completed position
			for( let row = 0; row < gridHeight; row++ ) {

				let newRow = [];
				for( let cell = 0; cell < gridWidth; cell++ ) {

					if( row == gridHeight - 1 && cell == gridWidth - 1 ) {
						newRow.push( 0 );
					} else {
						newRow.push( ( row * gridWidth ) + cell + 1 );
					}

				}
				newGrid.push( newRow );

			}

			// Now scramble the grid
			let scrambledGrid = Spatial.scrambleGrid(newGrid);

			return { ...state, grid: scrambledGrid };


		case MOVE_TILE:

			const { grid } = state;

			// Find space
			let spacePosition = Spatial.findValueInGrid( 0, grid );

			// Check whether tile is adjacent
			if( Spatial.pointsAreAdjacent( action.payload.tilePosition, spacePosition ) ) {

				// Swap values (swap function returns clone of grid)
				const newGrid = Spatial.swapGridValuesAtPoints( grid, spacePosition, action.payload.tilePosition );
				return { ...state, grid: newGrid };
			}

			return state;

		default:
		
			return state;
	}
};
