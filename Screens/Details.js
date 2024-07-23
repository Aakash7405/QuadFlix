import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
const {width} = Dimensions.get('window');

const Details = ({navigation, route}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const {name, image, rating, premiered, summary, type, genres, status} =
    route?.params?.movieData.show;
  const regex = /(<([^>]+)>)/gi;
  const result = summary.replace(regex, '');
  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      style={styles.pageContainer}
      showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon name="angle-left" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <Icon name="search" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.movieImageContainer}>
        <Image source={{uri: `${image.original}`}} style={styles.movieImage} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.movieName}>{name}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.stats}>
            <Text style={styles.match}>95% Match</Text>
            <Text style={styles.year}>{premiered.substring(0, 4)}</Text>

            <MaterialIcons name="hd" size={25} color="white" />
          </View>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={20} color="yellow" />
            <Text style={styles.ratings}>
              {rating.average ? rating.average : 'NA'}
            </Text>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.playButton} underlayColor={'grey'}>
            <Icon name="play" size={30} color="white" />
            <Text style={styles.playText}>Play</Text>
          </TouchableOpacity>
          <Pressable
            style={styles.button}
            onPress={() => {
              setIsAdded(!isAdded);
            }}>
            {isAdded ? (
              <Octicons name="checklist" size={25} color="#A61BC0" />
            ) : (
              <Icon name="add" size={25} color="white" />
            )}
            <Text style={styles.buttonText}>My List</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              setIsLiked(!isLiked);
            }}>
            {isLiked ? (
              <FontAwesomeIcon name="thumbs-up" size={25} color="#A61BC0" />
            ) : (
              <FontAwesomeIcon name="thumbs-up" size={25} color="white" />
            )}
            <Text style={styles.buttonText}>Rate</Text>
          </Pressable>
          <TouchableOpacity style={styles.button} underlayColor={'red'}>
            <FontAwesomeIcon name="share" size={25} color="white" />
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          <Text style={styles.detailsHeading}>Description :</Text> {result}
        </Text>

        <Text style={styles.detailsHeading}>
          Genres :<Text style={styles.description}> {genres.join(' , ')}</Text>
        </Text>

        <Text style={styles.creator}>
          <Text style={styles.detailsHeading}>Show Type :</Text> {type}
        </Text>
        <Text style={styles.detailsHeading}>
          Status :<Text style={styles.description}> {status}</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  movieImageContainer: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  movieImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  detailsHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsContainer: {
    padding: 15,
  },

  movieName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingContainer: {
    height: '100%',
    width: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratings: {
    color: 'white',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  match: {
    color: 'green',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
  year: {
    color: 'grey',
    fontSize: 15,
    marginRight: 10,
  },

  playButton: {
    backgroundColor: '#A61BC0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 5,
    width: width * 0.4,
    height: 50,
  },
  playText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  description: {
    color: 'lightgrey',
    fontSize: 13,
    marginVertical: 10,
  },
  cast: {
    color: 'lightgrey',
    fontSize: 12,
    marginVertical: 5,
  },
  creator: {
    color: 'lightgrey',
    fontSize: 12,
    marginVertical: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 0,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    margin: 5,
  },
  episodeOpions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    gap: 10,
    width: '80%',
  },
  episodeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'red',
    borderTopWidth: 5,
    width: '35%',
  },
  episodeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },
  more: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  moreText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },
  picker: {
    width: '50%',
    color: 'white',
    marginHorizontal: 20,
    marginTop: 10,
  },
  pickerItem: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  episodeContainer: {
    flex: 1,
    marginBottom: 60,
  },
});

export default Details;
