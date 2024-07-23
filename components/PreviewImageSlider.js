import {StyleSheet, Text, View, Image, FlatList, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const PreviewImageSlider = ({title, data}) => {
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

export default PreviewImageSlider;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    marginBottom: 30,
  },

  imageContainer: {
    height: 150,
    width: 150,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 100,
    marginRight: 10,
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
    borderRadius: 100,
    marginRight: 15,
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
