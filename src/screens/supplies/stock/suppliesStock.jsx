import { View } from "react-native";
import { Layout } from "../../Layout";
import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";
import { SuppliesStockList } from "../../../components/supplies/stock/List";
import FormFields from "../../../json/forms/supplyStock";
import pondStructure from "../../../json/formsStructure/supplyStockStructure";
import { useForm } from "../../../hooks/useForm";
import Style from "../style";

export const SuppliesStock = ({ navigation, route }) => {
  const supply = route.params?.supply;
  const { dataForm, setDataForm } = useForm();

  const breadcrumb = {
    title: `Stock ${supply?.name}`,
    subtitle: "Lista",
    icon: "ios-add",
  };

  /**
   * It opens the AddTank screen.
   */
  const openAddSupplyStock = () => {
    FormFields["structure"] = pondStructure;
    setDataForm({ ...dataForm, [FormFields.form_name]: FormFields });
    navigation.navigate("AddSupplyStock", { supplyStock: { supply_id: supply.id }, supply: supply })
  };

  return (
    <Layout navigation={navigation} route={route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddSupplyStock();
          }}
          navigation={navigation}
          data={breadcrumb}
        />
        <SuppliesStockList navigation={navigation} supply={supply} />
      </View>
    </Layout>
  );
};
