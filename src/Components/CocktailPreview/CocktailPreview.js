import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Card, CardItem, Body, Text, Grid, Col} from 'native-base';
import PropTypes from 'prop-types';

import styles from './CocktailPreview.styles';

export const CocktailPreview = props => {
  const {
    cocktail: {idDrink, strDrink, strDrinkThumb, ingredients},
    onPress,
  } = props;

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
                    ) : (
                      <Text>No specified ingredients...</Text>
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
    </View>
  );
};

CocktailPreview.propTypes = {
  cocktail: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    ingredients: PropTypes.array,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};
