import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import CocktailDetail from '../Screens/CocktailDetail/CocktailDetail';
import CocktailsList from '../Screens/CocktailsList/CocktailsList';
import Favorites from '../Screens/Favorites/Favorites';

const Navigation = createStackNavigator(
  {
    CocktailsList,
    CocktailDetail,
    Favorites,
  },
  {
    initialRouteName: 'CocktailsList',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#4dbcd0',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export const AppNavigation = createAppContainer(Navigation);
