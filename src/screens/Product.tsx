import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
  FlatList,
  Button,
  Pressable,
} from 'react-native';
import {Color} from '../config/Colors';
import HeaderProduct from '../components/header/HeaderProduct';
import React, {act, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {TProduct} from '../type/products.type';
import FastImage from 'react-native-fast-image';
import {tuncate} from '../helper';
import {ShimmerProduct} from '../components/shimmer/ShimmerProduct';

type ItemProps = TProduct & {
  title: string;
};

const Item = ({title, price, images}: ItemProps) => (
  <View style={styles.item}>
    <View style={styles.contentItem}>
      <View>
        <Text style={styles.titleItem}>{tuncate(title)}</Text>
        <Text style={styles.priceItem}>NT$ {price}</Text>
        <Pressable style={styles.btnCart}>
          <Text style={styles.titleBtn}>Add to cart</Text>
        </Pressable>
      </View>
      <View>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={{uri: images[0]}}
          style={styles.imgItem}
        />
      </View>
    </View>
  </View>
);

const Product = () => {
  const [category, setCategory] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [products, setProducts] = useState<TProductp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    axios
      .get<string[]>('https://dummyjson.com/products/category-list')
      .then(res => {
        setCategory(res.data);
        setActiveCategory(res.data[0]);
      });
  }, []);

  useEffect(() => {
    if (activeCategory) {
      setLoading(true);
      axios
        .get<{products: TProduct[]}>(
          `https://dummyjson.com/products/category/${activeCategory}/`,
        )
        .then(res => {
          setProducts(res.data.products);
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [activeCategory]);

  return (
    <>
      <ScrollView style={styles.container}>
        <HeaderProduct />
        <View
          style={{
            height: 2,
            backgroundColor: '#fff',
            width: Dimensions.get('screen').width,
            position: 'absolute',
            top: 143,
            left: 0,
          }}></View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
          horizontal>
          {category.map((item, idx) => (
            <Pressable
              onPress={() => setActiveCategory(item)}
              key={idx}
              style={styles.categoryItem}>
              <Text
                style={
                  item !== activeCategory
                    ? [
                        styles.textCategory,
                        {color: '#fff', borderBottomColor: '#fff'},
                      ]
                    : [styles.textCategory]
                }>
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        {loading ? (
          <>
            <ShimmerProduct />
            <ShimmerProduct />
            <ShimmerProduct />
          </>
        ) : (
          <FlatList
            style={styles.wrapperList}
            data={products}
            renderItem={({item}) => <Item {...item} />}
            keyExtractor={item => item.id}
          />
        )}
      </ScrollView>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={[Color.gradient.parple2, Color.gradient.parple1]}>
        <Pressable style={styles.footer}>
          <Text style={styles.textFooter}>View Cart</Text>
        </Pressable>
      </LinearGradient>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary.dark,
  },
  wrapperList: {
    gap: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.secondary.dark,
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
  priceItem: {
    color: '#3CA6EC',
    fontSize: 12,
    letterSpacing: 1,
    marginTop: 2,
  },
  btnCart: {
    backgroundColor: Color.gradient.parple1,
    width: 100,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  titleBtn: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '400',
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'Inter',
  },
  footer: {
    padding: 16,
  },
  textFooter: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },
  categories: {
    borderBottomColor: '#fff',
  },
  textCategory: {
    color: Color.gradient.parple1,
    padding: 10,
    borderBottomColor: Color.gradient.parple1,
    borderBottomWidth: 2,
  },
});

export default Product;
