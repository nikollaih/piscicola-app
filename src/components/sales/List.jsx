import {View, FlatList} from 'react-native';
import {SalesItem} from './Item';

export const SalesList = ({navigation}) => {
  const keyExtractor = ({index}) => {
    return index;
  };

  const renderRow = (item, index) => {
    return <SalesItem key={item.id} navigation={navigation} />;
  };

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
      initialNumToRender={5}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{borderRadius: 10, overflow: 'hidden'}}
    />
  );
};
