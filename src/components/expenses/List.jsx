import { View, FlatList } from "react-native";
import { ExpensesItem } from "./Item";
import { NoDataFound } from "../noDataFound/noDataFound";

export const ExpensesList = ({ navigation }) => {
  const expenses = [];
  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = (item, index) => {
    return <ExpensesItem key={item.id} navigation={navigation} />;
  };

  return expenses.length > 0 ? (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={expenses}
      initialNumToRender={5}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  ) : (
    <NoDataFound />
  );
};
