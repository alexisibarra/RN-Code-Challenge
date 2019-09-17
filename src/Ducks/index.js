import {combineReducers} from 'redux';
import cocktails from './CocktailsReducer/CocktailsReducer';

const appReducer = combineReducers({
  cocktails,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
