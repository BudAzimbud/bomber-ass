import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    PixelRatio,
  } from 'react-native';
  import React from 'react';
  import {Color} from '../../config/Colors';
  import {ArrowLeft, Search} from '../../config/Svg';
  const Logo = require('../../assets/iconbomber.png');
  const HeaderProduct = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerWrapperTitle}>
            <ArrowLeft />
            <Text style={styles.headerText}>Omni Taiwan</Text>
        </View>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholderTextColor={Color.text.secondary}
            style={styles.input}
            placeholder="Search"
          />
          <Search />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    header: {
      backgroundColor: Color.primary.dark,
      padding: 10,
    },
    headerText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '700',
    },
    headerWrapperTitle:{
        flexDirection: 'row',
        gap: 10
    },
    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      padding: 10,
      paddingHorizontal: 12,
      backgroundColor: Color.secondary.dark,
      marginTop: 10,
      borderWidth: 1,
      borderColor: Color.border.dark,
    },
    input: {
      color: Color.text.secondary,
      padding: 0,
      flex: 1,
    },
  });
  export default HeaderProduct;
  