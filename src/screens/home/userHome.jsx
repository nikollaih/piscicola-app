import { View, Text } from "react-native";
import { SowingsList } from "../../components/products/List";
import { GeneralExpensesList } from "../../components/expenses/List";
import Theme from "../../theme/theme";

export const UserHome = ({
     navigation,
     refresh,
     setFinishRefresh = () => {},
 }) => {

  return (
    <View>
      <Text style={Theme.subtitle}>Cosechas</Text>
      <View style={Theme.container_products}>
        <SowingsList
          navigation={navigation}
          orientation={"horizontal"}
        />
      </View>
      <Text style={Theme.subtitle}>Últimos gastos</Text>
      <GeneralExpensesList
          setFinishRefresh={() => {
              setFinishRefresh();
          }}
          refresh={refresh}
          allowEdit={false}
          navigation={navigation} />
    </View>
  );
};
