import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import styles from './CocktailsList.styles';
import {listCocktails} from '../../Ducks/CocktailsReducer/CocktailsReducer';

class CocktailsList extends Component {
  static navigationOptions = {
    title: 'Random drinks 0.1',
  };

  componentDidMount() {
    this.props.listCocktails();
  }

  render() {
    const {
      cocktailsList,
      navigation: {navigate, setParams},
    } = this.props;

    return (
      <View style={styles.wrapper}>
        {cocktailsList.map(cocktail => {
          return <Text key={cocktail.idDrink}>{cocktail.strDrink}</Text>;
        })}

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
  cocktailsList: PropTypes.array.isRequired,
  listCocktails: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }),
};

const mS = state => ({
  cocktailsList: state.cocktails.all,
});

const mD = {
  listCocktails,
};

export default connect(
  mS,
  mD,
)(CocktailsList);
