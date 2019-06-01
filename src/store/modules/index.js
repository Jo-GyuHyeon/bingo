import { combineReducers } from 'redux';
import base from './base';
import game from './game';
import players from './players';

const rootReducer = combineReducers({ base, game, players });

export default rootReducer;
