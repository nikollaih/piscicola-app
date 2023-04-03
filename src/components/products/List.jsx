import {View, FlatList} from 'react-native';
import {ProductItem} from './Item';

export const ProductsList = ({navigation, orientation}) => {
  const keyExtractor = ({index}) => {
    return index;
  };

  const renderRow = (item, index) => {
    return <ProductItem key={index} navigation={navigation} orientation={orientation} />;
  };

  return (
    <FlatList
      horizontal={orientation == 'horizontal'}
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={[{}, {}, {}]}
      initialNumToRender={5}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
    />
  );
};
