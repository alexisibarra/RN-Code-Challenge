import CocktailsAPI from '../../API/CocktailsAPI';

// Constants
export const ACTIONS = {
  CLEAR: 'COCKTAILS/CLEAR',
  UPDATE: 'COCKTAILS/UPDATE',
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

  const all = response.data.drinks.reduce(
    (acc, cocktail) => ({...acc, [cocktail.idDrink]: cocktail}),
    {},
  );

  dispatch(update({all}));
};

export const addToFavorites = cocktailId => async (dispatch, getState) => {
  const favoritesSet = new Set(getState().cocktails.favoriteCocktailsIds);

  favoritesSet.add(cocktailId);

  dispatch(update({favoriteCocktailsIds: Array.from(favoritesSet)}));
};

export const getCocktailDetails = cocktailId => async (dispatch, getState) => {
  const response = await CocktailsAPI.get(cocktailId);
  const cocktail = response.data.drinks[0];
  const allCocktails = getState().cocktails.all;

  let readIngredients = true;
  const maxNumIngredients = 15;
  let currentIngredientsPosition = 1;

  cocktail.ingredients = [];

  while (readIngredients && currentIngredientsPosition <= maxNumIngredients) {
    if (cocktail[`strIngredient${currentIngredientsPosition}`]) {
      cocktail.ingredients.push({
        name: cocktail[`strIngredient${currentIngredientsPosition}`],
        measure: cocktail[`strMeasure${currentIngredientsPosition}`],
      });
    } else {
      readIngredients = false;
    }

    currentIngredientsPosition++;
  }

  cocktail.metaLoaded = true;

  dispatch(
    update({
      all: {
        ...allCocktails,
        [cocktail.idDrink]: {
          ...allCocktails[cocktail.idDrink],
          ...cocktail,
        },
      },
    }),
  );
};

const initialState = {
  all: {},
  currentId: -1,
  searchInput: '',
  favoriteCocktailsIds: [],
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
