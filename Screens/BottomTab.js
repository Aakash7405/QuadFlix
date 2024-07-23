import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, Dimensions} from 'react-native';
import Home from './Home';
import Search from './Search';
import TabButton from './TabButton';
const {width} = Dimensions.get('window');

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: width,
        height: 55,
        borderWidth: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = route => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <>
            <TabButton
              key={index}
              onPress={onPress}
              onLongPress={onLongPress}
              focused={isFocused}
              label={label}
              route={route}
              navigation={navigation}
            />
          </>
        );
      })}
    </View>
  );
}

const BottomTab = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <>
      <BottomTab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{headerShown: false}}
        tabBar={props => <MyTabBar {...props} />}>
        <BottomTab.Screen
          name="HomeScreen"
          component={Home}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <BottomTab.Screen
          name="SearchScreen"
          component={Search}
          options={{
            tabBarLabel: 'Search',
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};
export default BottomTab;
