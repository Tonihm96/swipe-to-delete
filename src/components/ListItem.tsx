import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ViewToken
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import Foundation from '@expo/vector-icons/Foundation';

interface Props {
  index: number;
  name: string;
  country: string;
  countryFlag: string;
  year: number;
  onDelete: (index: number) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;
const LIST_ITEM_HEIGHT = 90;
const LIST_ITEM_MARGIN_BOTTOM = 20;

const ListItem = ({
  index,
  name,
  country,
  countryFlag,
  year,
  onDelete
}: Props) => {
  const translationX = useSharedValue(0);
  const itemOpacity = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const itemMarginBottom = useSharedValue(LIST_ITEM_MARGIN_BOTTOM);

  const rContainerStyle = useAnimatedStyle(() => ({
    marginBottom: itemMarginBottom.value,
    height: itemHeight.value
  }));

  const rInfoContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }]
  }));

  const rDeleteContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(itemOpacity.value, [0, TRANSLATE_X_THRESHOLD], [0, 1])
  }));

  const onGesture = useAnimatedGestureHandler({
    onActive(event) {
      translationX.value =
        event.translationX < TRANSLATE_X_THRESHOLD
          ? TRANSLATE_X_THRESHOLD
          : event.translationX > 0
          ? 0
          : event.translationX;
      itemOpacity.value = translationX.value;
    },
    onEnd() {
      const shouldDelete = translationX.value === TRANSLATE_X_THRESHOLD;

      if (shouldDelete) {
        itemOpacity.value = withTiming(0);
        translationX.value = withTiming(-SCREEN_WIDTH, {}, () => {
          itemMarginBottom.value = withTiming(0);
          itemHeight.value = withTiming(0, {}, () => {
            runOnJS(onDelete)(index);
          });
        });
      } else {
        translationX.value = withTiming(0);
        itemOpacity.value = withTiming(0);
      }
    },
    onCancel() {
      translationX.value = withTiming(0);
      itemOpacity.value = withTiming(0);
    }
  });

  return (
    <Animated.View style={rContainerStyle}>
      <View style={styles.container}>
        <PanGestureHandler
          onGestureEvent={onGesture}
          failOffsetY={[-15, 15]}
          activeOffsetX={[-15, 15]}
        >
          <Animated.View style={rInfoContainerStyle}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{name}</Text>
              <View style={styles.detailsContainer}>
                <View style={styles.countryContainer}>
                  <Image
                    resizeMode='contain'
                    style={styles.countryImage}
                    source={{
                      uri: `https://countryflagsapi.com/png/${countryFlag}`
                    }}
                  />
                  <Text style={styles.detailText}>{country}</Text>
                </View>
                <Text style={styles.detailText}>{year}</Text>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
        <Animated.View style={[styles.deleteContainer, rDeleteContainerStyle]}>
          <Foundation name='trash' color='white' size={32} />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8
  },
  title: {
    fontSize: 20,
    fontFamily: 'sans-serif-light',
    marginBottom: 8
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'sans-serif-light'
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  countryImage: {
    height: 14,
    width: 26,
    marginRight: 8
  },
  deleteContainer: {
    backgroundColor: '#ff8686',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 24,
    right: 0,
    height: '100%',
    width: '100%',
    borderRadius: 8,
    position: 'absolute',
    zIndex: -1
  }
});

export { ListItem };
