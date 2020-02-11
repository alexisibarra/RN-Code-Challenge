import React, {Component} from 'react';

import {Card, CardItem} from 'native-base';
import {Text, ScrollView, Image, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Favorites.styles';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import {FlatList} from 'react-native-gesture-handler';
import CocktailPreview from '../../Components/CocktailPreview/CocktailPreview';
import {update} from '../../Ducks/CocktailsReducer/CocktailsReducer';

class Favorites extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Random drinks 0.1',
      header: (
        <CustomHeader
          title={navigation.getParam('title', 'Favorites')}
          noSearch
          showBack
          navigation={navigation}
        />
      ),
    };
  };

  componentDidMount() {
    console.log('object');
  }

  onCocktailPress = cocktailId => {
    const {
      update,
      navigation: {navigate},
    } = this.props;

    update({currentId: cocktailId});
    navigate('CocktailDetail');
  };

  renderCocktailPreview = ({item}) => (
    <CocktailPreview
      cocktailId={item.idDrink}
      navigate={this.props.navigation.navigate}
      onPress={this.onCocktailPress}
    />
  );

  render() {
    const {cocktailsList, favoriteCocktailsIds} = this.props;

    const listData = favoriteCocktailsIds.map(
      favoriteId => cocktailsList[favoriteId],
    );

    return (
      <>
        <ScrollView style={styles.scrollView}>
          <>
            <FlatList
              data={listData}
              renderItem={this.renderCocktailPreview}
              keyExtractor={cocktail => cocktail.idDrink}
              removeClippedSubviews
            />
          </>
        </ScrollView>
      </>
    );
  }
}

Favorites.propTypes = {
  cocktailsList: PropTypes.object.isRequired,
  favoriteCocktailsIds: PropTypes.array.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }),
  update: PropTypes.func.isRequired,
};

const mS = state => ({
  cocktailsList: state.cocktails.all,
  favoriteCocktailsIds: state.cocktails.favoriteCocktailsIds,
});

const mD = {
  update,
};

export default connect(
  mS,
  mD,
)(Favorites);
