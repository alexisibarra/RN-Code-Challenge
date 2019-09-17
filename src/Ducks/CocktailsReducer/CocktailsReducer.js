import CocktailsAPI from '../../API/CocktailsAPI';

// Constants
export const ACTIONS = {
  CLEAR: 'auth/CLEAR',
  UPDATE: 'auth/UPDATE',
};

// Actions
export const update = payload => ({
  type: ACTIONS.UPDATE,
  payload,
});

export const clear = _ => ({
  type: ACTIONS.CLEAR,
});

export const listCocktails = () => async dispatch => {
  const response = await CocktailsAPI.list();

  dispatch(update({all: response.data.drinks}));
};

export const logout = _ => dispatch => {
  return dispatch(clear());
};

const initialState = {
  all: [],
  current: {},
};

const CocktailsReducers = (state = initialState, action) => {
  const {payload, type} = action;

  switch (type) {
    case ACTIONS.UPDATE: {
      return {
        ...state,
        ...payload,
      };
    }
    case ACTIONS.CLEAR: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};

export default CocktailsReducers;
