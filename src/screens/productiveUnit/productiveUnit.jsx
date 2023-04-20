import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Layout } from "../Layout";
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import Ionicon from "react-native-vector-icons/Ionicons";
import Style from "./style";
import { Constants } from "../../util";

const RightButtons = (navigation, productiveUnit = {}) => {
  return (
    <View style={[Style.row_between, { width: 75 }]}>
      <TouchableOpacity
        activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
        onPress={() => {
          navigation.navigate("Users", {
            productive_unit: productiveUnit,
          });
        }}
      >
        <Ionicon name={"ios-people"} size={32} color={Constants.COLORS.DARK} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
        onPress={() => {
          navigation.replace("EditProductiveUnit", {
            productive_unit: productiveUnit,
          });
        }}
      >
        <Ionicon name={"ios-create"} size={30} color={Constants.COLORS.DARK} />
      </TouchableOpacity>
    </View>
  );
};

export const ProductiveUnit = (props) => {
  const productiveUnit = props.route.params.productive_unit;
  const breadcrumb = {
    title: productiveUnit.name,
    subtitle: "Unidad Productiva",
    icon: "ios-create",
    screen: "EditProductiveUnit",
    right_content: RightButtons(props.navigation, productiveUnit),
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <ScrollView style={Style.main_page}>
        <Breadcrumb navigation={props.navigation} data={breadcrumb} />
        <View style={Style.white_container}>
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Descripción</Text>
            <Text style={Style.text}>{productiveUnit.description}</Text>
          </View>
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Ubicación</Text>
            <Text style={Style.text}>{productiveUnit.address}</Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};
