import React, {useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/Ionicons';
const TabButton = props => {
  const {label, route, focused, navigation} = props;

  const size = useSharedValue(22);
  const moveY = useSharedValue(0);
  useEffect(() => {
    size.value = withSpring(focused ? 32 : 22, {
      duration: 500,
      dampingRatio: 0.5,
      stiffness: 80,
      overshootClamping: false,
      restDisplacementThreshold: 2,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    });
    moveY.value = withSpring(focused ? 8 : 0, {
      duration: 500,
      dampingRatio: 0.5,
      stiffness: 80,
      overshootClamping: false,
      restDisplacementThreshold: 2,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    });
  }, [size, focused, moveY]);
  const iconStyle = useAnimatedStyle(() => {
    return {
      fontSize: size.value,
      transform: [{translateY: moveY.value}],
    };
  });
  const labelStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(size.value, [22, 32], [1, 0]),
    };
  });
  const labellowercase = label.toLowerCase();
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  return (
    <>
      <AnimatedPressable
        style={styles.tabContainer}
        onPress={() => {
          navigation.navigate(`${route.name}`);
        }}>
        <AnimatedIcon
          name={`${labellowercase}`}
          style={[iconStyle, {color: focused ? '#A61BC0' : 'white'}]}
        />

        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>
      </AnimatedPressable>
    </>
  );
};
export default TabButton;

const styles = StyleSheet.create({
  label: {
    color: 'white',
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: 'white',
  },
});
