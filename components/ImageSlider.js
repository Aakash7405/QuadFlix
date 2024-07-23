import {StyleSheet, Text, View, Image, FlatList, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const ImageSlider = ({title, data}) => {
  const navigation = useNavigation();
  const handlePress = item => {
    navigation.navigate('DetailsScreen', {movieData: item});
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, idx) => {
          return 'key' + idx;
        }}
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
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    marginBottom: 30,
  },

  imageContainer: {
    height: 250,
    justifyContent: 'flex-start',
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
  title: {
    height: 50,
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'flex-start',
  },
  titleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
