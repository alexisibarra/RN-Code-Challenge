import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {CocktailDetail} from '../Screens/CocktailDetail/CocktailDetail';
import {CocktailsList} from '../Screens/CocktailsList/CocktailsList';

const Navigation = createStackNavigator(
  {
    Home: CocktailsList,
    Details: CocktailDetail,
  },
  {
    initialRouteName: 'Home',
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
