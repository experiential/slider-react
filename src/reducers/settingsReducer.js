import { MOVE_TILE } from '../actions/types';

const INITIAL_STATE = {
	noOfPlayers: 1,
	gridWidth: 5,
	gridHeight: 5
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
