import {StyleSheet, View} from 'react-native';
import React from 'react';

import {ShimmerPlaceHolder} from './ShimmerPlaceHolder';
export const ShimmerProduct = (): React.FC => {
  return (
    <View style={styles.item}>
      <View style={styles.contentItem}>
        <View>
          <ShimmerPlaceHolder
            shimmerStyle={{
              height: 10,
              width: 200,
            }}
          />
          <ShimmerPlaceHolder
            shimmerStyle={{
              marginTop: 8,
              height: 10,
              width: 80,
            }}
          />
          <ShimmerPlaceHolder
            shimmerStyle={{
              marginTop: 8,
              height: 25,
              width: 104,
            }}
          />
        </View>
        <View>
          <ShimmerPlaceHolder
            shimmerStyle={{
              height: 104,
              width: 104,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
  },
  imgItem: {
    width: 104,
    height: 104,
    borderRadius: 10,
  },
  contentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleItem: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 23,
    fontFamily: 'Inter',
  },
});
