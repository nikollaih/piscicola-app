import {View, FlatList} from 'react-native';
import {PondItem} from './Item';

export const PondsList = ({navigation}) => {
  const keyExtractor = ({index}) => {
    return index;
  };

  const renderRow = ({item, index}) => {
    return <PondItem navigation={navigation} />;
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
