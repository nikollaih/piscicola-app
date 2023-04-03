import { View, FlatList } from "react-native";
import { ProductiveUnitItem } from "./Item";

export const ProductiveUnitsList = ({ navigation, orientation }) => {
  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = (item, index) => {
    return (
      <ProductiveUnitItem
        key={item.id}
        navigation={navigation}
        orientation={orientation}
      />
    );
  };

  return (
    <FlatList
      columnWrapperStyle={{ justifyContent: "space-between" }}
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={[{}, {}, {}]}
      initialNumToRender={5}
      numColumns={2}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
    />
  );
};
