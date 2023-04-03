import { View, Text } from "react-native";
import { ProductsList } from "../../components/products/List";
import { ExpensesList } from "../../components/expenses/List";
import Theme from "../../theme/theme";

export const UserHome = ( props ) => {
  return (
    <View>
      <Text style={Theme.subtitle}>Productos</Text>
      <View style={Theme.container_products}>
        <ProductsList
          navigation={props.navigation}
          orientation={"horizontal"}
        />
      </View>
      <Text style={Theme.subtitle}>Últimos gastos</Text>
      <ExpensesList navigation={props.navigation} />
    </View>
  );
};
