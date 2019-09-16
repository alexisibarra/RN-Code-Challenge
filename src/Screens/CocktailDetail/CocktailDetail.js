import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';

import PropTypes from 'prop-types';

export class CocktailDetail extends Component {
  render() {
    const {
      navigation: {push, navigate, goBack},
    } = this.props;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details Screen</Text>

        <Button
          title="Go to Details... again"
          onPress={() => push('Details')}
        />
        <Button title="Go to Home" onPress={() => navigate('Home')} />
        <Button title="Go back" onPress={() => goBack()} />
      </View>
    );
  }
}

CocktailDetail.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
};
