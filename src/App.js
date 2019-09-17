import React from 'react';
import {Provider} from 'react-redux';

import {AppNavigation} from './AppNavigation/AppNavigation';
import {store} from './store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}
