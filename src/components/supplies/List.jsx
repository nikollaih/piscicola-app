import {FlatList} from 'react-native';
import {SupplyItem} from './Item';

export const SuppliesList = ({navigation}) => {
  const keyExtractor = ({index}) => {
    return index;
  };

  const renderRow = (item, index) => {
    return <SupplyItem key={index} navigation={navigation} />;
  };

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={[{}, {}, {}]}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{borderRadius: 10, overflow: 'hidden'}}
    />
  );
};
