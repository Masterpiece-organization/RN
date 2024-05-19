import {Dimensions, StyleSheet, View, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

interface CarouselProps {
  activeIndex: number;
  setActiveIndex: (value: number) => void;
}

interface RenderItemProps {
  item: {
    imgUrl: string;
    rednerItem_img: string;
  };
}

const MOCK_DATA = [
  {
    imgUrl: 'https://picsum.photos/200/300?random=1',
    rednerItem_img: 'https://picsum.photos/200/300?random=1',
  },
  {
    imgUrl: 'https://picsum.photos/200/300?random=3',
    rednerItem_img: 'https://picsum.photos/200/300?random=3',
  },
  {
    imgUrl: 'https://picsum.photos/200/300?random=5',
    rednerItem_img: 'https://picsum.photos/200/300?random=5',
  },
  {
    imgUrl: 'https://picsum.photos/200/300?random=7',
    rednerItem_img: 'https://picsum.photos/200/300?random=7',
  },
  {
    imgUrl: 'https://picsum.photos/200/300?random=9',
    rednerItem_img: 'https://picsum.photos/200/300?random=9',
  },
  {
    imgUrl: 'https://picsum.photos/200/300?random=11',
    rednerItem_img: 'https://picsum.photos/200/300?random=11',
  },
];

const HORIZONTAL_MARGIN = -15;
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH + HORIZONTAL_MARGIN * 2;

const renderItem = ({item}: RenderItemProps) => {
  return (
    <View style={styles.rederItem_wrap}>
      <Image source={{uri: item.imgUrl}} style={styles.renderItem_img} />
    </View>
  );
};

const CarouselComponent = ({activeIndex, setActiveIndex}: CarouselProps) => {
  return (
    <>
      <Carousel
        layout={'default'}
        data={MOCK_DATA}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH + 10}
        autoplay={true}
        loop={true}
        inactiveSlideScale={1}
        onSnapToItem={index => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={MOCK_DATA.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inActivedotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  rederItem_wrap: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    height: 190,
    width: ITEM_WIDTH,
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: 5,
  },

  renderItem_img: {
    width: ITEM_WIDTH,
    height: 190,
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },

  paginationContainer: {
    position: 'absolute',
    bottom: -50,
    alignSelf: 'center',
  },

  dotStyle: {
    width: 16,
    height: 6,
    borderRadius: 6,
    marginHorizontal: -24,
    backgroundColor: '#3D9BFF',
  },
  inActivedotStyle: {
    width: 6,
    height: 6,
    borderRadius: 6,
  },
});
