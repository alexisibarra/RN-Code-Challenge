import React, {Component} from 'react';
import {FlatList, ScrollView, Text} from 'react-native';
import {Button} from 'native-base';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import styles from './CocktailsList.styles';
import {
  listCocktails,
  update,
} from '../../Ducks/CocktailsReducer/CocktailsReducer';

import CocktailPreview from '../../Components/CocktailPreview/CocktailPreview';
import {Spinner} from 'native-base';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';

class CocktailsList extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Random drinks 0.1',
      header: (
        <CustomHeader title="Random drinks 0.1" navigation={navigation} />
      ),
    };
  };

  state = {
    loadingTransactions: true,
    itemsToRender: 10,
    loads: 1,
    showSearchBar: false,
  };

  async componentDidMount() {
    const {listCocktails} = this.props;

    await listCocktails();

    this.setState({loadingTransactions: false});
  }

  onCocktrailPress = cocktailId => {
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
      onPress={this.onCocktrailPress}
    />
  );

  loadMore = async () => {
    const {loads} = this.state;

    this.setState({loads: loads + 1, loadingTransactions: true}, async () => {
      this.setState({loadingTransactions: false});
    });
  };

  render() {
    const {cocktailsList, searchInput} = this.props;

    const {loadingTransactions, itemsToRender, loads} = this.state;

    const endOfList = itemsToRender * loads;

    const list = Object.values(cocktailsList);

    const listData = list
      .filter(cocktail => cocktail.strDrink.includes(searchInput))
      .slice(0, endOfList);

    const listLength = list.length;

    const moreToLoad = endOfList < listLength;

    return (
      <>
        <ScrollView style={styles.scrollView}>
          <>
            <Button
              block
              light
              onPress={() => this.props.navigation.navigate('Favorites')}>
              <Text>Favorites</Text>
            </Button>

            <FlatList
              data={listData}
              renderItem={this.renderCocktailPreview}
              keyExtractor={cocktail => cocktail.idDrink}
              removeClippedSubviews
            />

            {loadingTransactions && <Spinner color="white" />}

            {moreToLoad && (
              <Button block light onPress={this.loadMore}>
                <Text>LOAD MORE</Text>
              </Button>
            )}
          </>
        </ScrollView>
      </>
    );
  }
}

CocktailsList.propTypes = {
  cocktailsList: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  listCocktails: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }),
};

const mS = state => ({
  state,
  searchInput: state.cocktails.searchInput,
  cocktailsList: state.cocktails.all,
});

const mD = {
  listCocktails,
  update,
};

export default connect(
  mS,
  mD,
)(CocktailsList);
