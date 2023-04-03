import {FlatList} from 'react-native';
import {MedicationItem} from './Item';

export const MedicationsList = ({navigation}) => {
  const keyExtractor = ({index}) => {
    return index;
  };

  const renderRow = (item, index) => {
    return <MedicationItem key={index} navigation={navigation} />;
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
