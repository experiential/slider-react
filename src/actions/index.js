import { INITIALISE_GRID, MOVE_TILE } from './types';

export const initialiseGrid = ( gridWidth, gridHeight ) => {
	return {
		type: INITIALISE_GRID,
		payload: { gridWidth, gridHeight }
	};
};

export const moveTile = (tilePosition) => {
	return {
		type: MOVE_TILE,
		payload: { tilePosition }
	};
};

