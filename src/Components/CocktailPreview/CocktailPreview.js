import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Card, CardItem, Body, Text, Grid, Col, Button} from 'native-base';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  getCocktailDetails,
  addToFavorites,
} from '../../Ducks/CocktailsReducer/CocktailsReducer';
import styles from './CocktailPreview.styles';

class CocktailPreview extends Component {
  async componentDidMount() {
    const {cocktailsList, cocktailId} = this.props;

    const {metaLoaded} = cocktailsList[cocktailId];

    if (!metaLoaded) {
      await this.props.getCocktailDetails(this.props.cocktailId);
    }
  }

  render() {
    const {
      addToFavorites,
      cocktailsList,
      cocktailId,
      onPress,
      navigate,
    } = this.props;

    const {
      idDrink,
      strDrink,
      strDrinkThumb,
      ingredients,
      metaLoaded,
    } = cocktailsList[cocktailId];

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => onPress(idDrink)}>
          <Card>
            <CardItem>
              <Body>
                <Grid style={styles.grid}>
                  <Col size={60}>
                    <View>
                      <Text style={styles.name}>{strDrink}</Text>
                    </View>

                    <View style={styles.textBlock}>
                      {ingredients ? (
                        <>
                          {ingredients.slice(0, 2).map(ingredient => (
                            <Text style={styles.text} key={ingredient.name}>
                              {'\u2022'} {ingredient.name}
                            </Text>
                          ))}

                          {ingredients.length > 2 && (
                            <Text style={styles.text}>
                              {`y ${ingredients.length - 2} ingrediente${
                                ingredients.length > 3 ? 's' : ''
                              } mas`}
                            </Text>
                          )}
                        </>
                      ) : metaLoaded ? (
                        <Text>No specified ingredients...</Text>
                      ) : (
                        <Text>Loading ingredients...</Text>
                      )}
                    </View>
                  </Col>
                  <Col size={40}>
                    <Image
                      source={{uri: strDrinkThumb}}
                      style={styles.thumbnail}
                    />
                  </Col>
                </Grid>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => addToFavorites(cocktailId)}>
          <Text>Add to favorite</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

CocktailPreview.propTypes = {
  addToFavorites: PropTypes.func.isRequired,
  cocktailId: PropTypes.string.isRequired,
  cocktailsList: PropTypes.object.isRequired,
  getCocktailDetails: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

const mS = state => ({
  cocktailsList: state.cocktails.all,
});

const mD = {
  getCocktailDetails,
  addToFavorites,
};

export default connect(
  mS,
  mD,
)(CocktailPreview);
