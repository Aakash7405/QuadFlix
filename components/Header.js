import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');
const Header = ({navigation, iconName}) => {
  return (
    <View style={styles.navbarContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../images/logo.png')} />
        <Text style={styles.headerText}>quadflix</Text>
      </View>
      <View style={styles.searchBar}>
        <TouchableHighlight
          style={styles.searchBarIcon}
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}>
          <Icon name={`${iconName}`} size={25} color="white" />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  navbarContainer: {
    height: 50,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#000',
  },
  logoContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  searchBar: {
    height: '100%',
    width: width * 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
  },
  logo: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    borderColor: 'white',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
