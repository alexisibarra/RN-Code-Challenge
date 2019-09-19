import React, {Component} from 'react';

import {Card, CardItem} from 'native-base';
import {Text, ScrollView, Image, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import styles from './CocktailDetail.styles';
import CustomHeader from '../CocktailsList/CustomHeader';

class CocktailDetail extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Random drinks 0.1',
      header: (
        <CustomHeader
          title={navigation.getParam('title', 'Cocktail Details')}
          noSearch
          showBack
          navigation={navigation}
        />
      ),
    };
  };

  componentDidMount() {
    const {
      navigation: {setParams},
      cocktailsList,
      currentId,
    } = this.props;

    setParams({
      title: cocktailsList[currentId].strDrink,
    });
  }

  render() {
    const {cocktailsList, currentId} = this.props;

    const {strInstructions, strDrinkThumb, ingredients} = cocktailsList[
      currentId
    ];

    return (
      <ScrollView style={styles.scrollView}>
        <Card>
          <CardItem cardBody style={styles.imageContainer}>
            <Image source={{uri: strDrinkThumb}} style={styles.image} />
          </CardItem>
          <CardItem>
            <View style={styles.textBlock}>
              {ingredients &&
                ingredients.map(({measure, name}) => (
                  <Text style={styles.text} key={name}>
                    {`${measure} - ${name}`}
                  </Text>
                ))}
            </View>
          </CardItem>
          <CardItem>
            <View>
              <Text style={styles.text}>{'\u2022'} How to Prepare</Text>
              <Text style={styles.text}>{strInstructions}</Text>
            </View>
          </CardItem>
        </Card>
      </ScrollView>
    );
  }
}

CocktailDetail.propTypes = {
  cocktailsList: PropTypes.object.isRequired,
  currentId: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    setParams: PropTypes.func.isRequired,
  }),
};

const mS = state => ({
  cocktailsList: state.cocktails.all,
  currentId: state.cocktails.currentId,
});

const mD = {};

export default connect(
  mS,
  mD,
)(CocktailDetail);
