import React, {useEffect, useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import ImageSlider from '../components/ImageSlider';
import PreviewImageSlider from '../components/PreviewImageSlider';
const titleData = ['Previews', 'Popular on QuadFlix', 'Trending Now'];
const {width, height} = Dimensions.get('window');
const Home = ({navigation}) => {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://api.tvmaze.com/search/shows?q=all';
      const fetchdata = await fetch(url);
      const data = await fetchdata.json();
      const filterData= await data.filter((item)=>{return item.show.image != null})

      setMovieData([...filterData]);
    };
    fetchData();
  }, []);
  return (
    <ScrollView>
      <View style={styles.pageContainer}>
        <Header navigation={navigation} iconName="search" />
        <View style={styles.landingImageContainer}>
          <Image
            style={styles.landingImage}
            source={require('../images/maharaja.jpg')}
          />
        </View>
        {movieData.length > 0 && (
          <PreviewImageSlider data={movieData} title={titleData[0]} />
        )}
        {movieData.length > 0 && (
          <ImageSlider data={movieData} title={titleData[1]} />
        )}
        {movieData.length > 0 && (
          <ImageSlider data={movieData} title={titleData[2]} />
        )}
      </View>
    </ScrollView>
  );
};
export default Home;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  landingImageContainer: {
    height: height * 0.27,
    width: width * 0.95,
    borderRadius: 20,
    marginBottom: 10,
  },
  landingImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 20,
  },
});
