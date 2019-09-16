import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';

import PropTypes from 'prop-types';

import styles from './CocktailsList.styles';

export class CocktailsList extends Component {
  static navigationOptions = {
    title: 'Random drinks 0.1',
  };

  render() {
    const {
      navigation: {navigate, setParams},
    } = this.props;

    return (
      <View style={styles.wrapper}>
        <Text>Home Screen</Text>

        <Button title="Go to Details" onPress={() => navigate('Details')} />

        <Button
          title="Update the title"
          onPress={() => setParams({otherParam: 'Updated!'})}
        />
      </View>
    );
  }
}

CocktailsList.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }),
};
