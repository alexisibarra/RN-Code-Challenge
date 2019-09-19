import React, {Component} from 'react';
import {View} from 'react-native';
import {
  Header,
  Item,
  Icon,
  Input,
  Right,
  Body,
  Title,
  Left,
  Button,
} from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {update} from '../../Ducks/CocktailsReducer/CocktailsReducer';

class CustomHeader extends Component {
  state = {
    showSearchBar: false,
  };

  render() {
    const {
      update,
      title,
      noSearch,
      showBack,
      navigation: {goBack},
    } = this.props;
    const {showSearchBar} = this.state;

    return (
      <View style={{backgroundColor: '#4dbcd0'}}>
        {showSearchBar ? (
          <Header transparent searchBar rounded autoCorrect={false}>
            <Item transparent>
              <Icon name="ios-search" />
              <Input
                onChangeText={value => update({searchInput: value})} // <-- Here
                placeholder="Search"
              />
              <Icon
                onPress={() => this.setState({showSearchBar: false})}
                name="close"
              />
            </Item>
          </Header>
        ) : (
          <Header transparent>
            {showBack && (
              <Left>
                <Button
                  transparent
                  onPress={() => {
                    console.log('object');
                    goBack();
                  }}>
                  <Icon style={{color: 'white'}} name="md-arrow-back" />
                </Button>
              </Left>
            )}
            <Body>
              <Title>{title}</Title>
            </Body>
            {!noSearch && (
              <Right>
                <Icon
                  style={{color: 'white'}}
                  onPress={() => this.setState({showSearchBar: true})}
                  name="search"
                />
              </Right>
            )}
          </Header>
        )}
      </View>
    );
  }
}

CustomHeader.propTypes = {
  update: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  noSearch: PropTypes.bool,
  showBack: PropTypes.bool,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }),
};

const mS = state => ({
  searchInput: state.cocktails.searchInput,
});

const mD = {
  update,
};

export default connect(
  mS,
  mD,
)(CustomHeader);
