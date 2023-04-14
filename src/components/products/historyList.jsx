import {View, FlatList} from 'react-native';
import {ProductHistoryItem} from './historyItem';

export const ProductHistoryList = ({navigation}) => {
  const keyExtractor = ({index}) => {
    return index;
  };

  const renderRow = ({item, index}) => {
    return <ProductHistoryItem data={item} key={item.id} navigation={navigation} />;
  };

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={[{name: "Temperatura"}, {name: "Ph"}, {name: "Oxigeno"}]}
      initialNumToRender={5}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
    />
  );
};
