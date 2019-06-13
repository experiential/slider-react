import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import settingsReducer from './settingsReducer';

export default combineReducers({
	board: boardReducer,
	gameSettings: settingsReducer
});
