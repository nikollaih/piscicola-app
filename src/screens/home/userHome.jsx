import { View, Text } from "react-native";
import { SowingsList } from "../../components/products/List";
import { ExpensesList } from "../../components/expenses/List";
import Theme from "../../theme/theme";

export const UserHome = ( props ) => {
  return (
    <View>
      <Text style={Theme.subtitle}>Cosechas</Text>
      <View style={Theme.container_products}>
        <SowingsList
          navigation={props.navigation}
          orientation={"horizontal"}
        />
      </View>
      <Text style={Theme.subtitle}>Últimos gastos</Text>
      <ExpensesList navigation={props.navigation} />
    </View>
  );
};
