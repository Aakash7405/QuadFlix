import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const Search = () => {
  const [movieData, setMovieData] = useState([]);
  const [movie, setMovie] = useState('');
  const navigation = useNavigation();
  const handlePress = item => {
    setMovie('');
    navigation.navigate('DetailsScreen', {movieData: item});
  };
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const url = `https://api.tvmaze.com/search/shows?q=${
        movie === '' ? 'all' : movie
      }`;
      const fetchdata = await fetch(url);
      const data = await fetchdata.json();
      const filterData = await data.filter(item => {
        return item.show.image != null;
      });
      setMovieData([...filterData]);
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [movie]);
  return (
    <>
      <View style={styles.container}>
        <Header navigation={navigation} iconName="notifications" />
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} color="white" />
          <TextInput
            placeholderTextColor={'white'}
            style={styles.inputContainer}
            cursorColor={'#A61BC0'}
            placeholder="Search for films or movies"
            value={movie}
            onChangeText={text => {
              setMovie(text);
            }}
          />
        </View>
        <View style={styles.moviesContainer}>
          <Text style={styles.heading}>
            {movie === '' ? 'Trending Movies' : 'Results'}
          </Text>
          {movieData.length > 0 ? (
            <FlatList
              data={movieData}
              numColumns={2}
              style={{marginBottom: 110}}
              renderItem={({item, index}) => {
                return (
                  <Pressable
                    style={styles.imageContainer}
                    onPress={() => {
                      handlePress(item);
                    }}
                    key={index}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${item.show?.image?.original}`,
                      }}
                    />
                  </Pressable>
                );
              }}
            />
          ) : (
            <View style={styles.noResultFoundContainer}>
              <Text style={styles.noResultFoundText}>No Result Found</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};
export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  searchContainer: {
    borderColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#302E2E',
  },
  inputContainer: {
    color: 'white',
    paddingLeft: 10,
  },
  moviesContainer: {
    marginTop: 10,

    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imageContainer: {
    height: 250,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  image: {
    height: 250,
    width: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  noResultFoundContainer: {
    height: '90%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultFoundText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
