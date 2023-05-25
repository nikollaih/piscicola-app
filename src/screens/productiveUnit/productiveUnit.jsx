import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Layout } from "../Layout";
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { LabelButton } from "../../components/button/labelButton";
import { ProductiveUnitsServices } from "../../services";
import Style from "./style";
import { Constants, Utilities, LocalStorage, Texts } from "../../util";
import { showMessage } from "react-native-flash-message";
import { useAuth } from "../../hooks/useAuth";

export const ProductiveUnit = (props) => {
  const { getAuth, refreshToken } = useAuth();
  const productiveUnit = props.route.params.productive_unit;
  const breadcrumb = {
    title: productiveUnit.name,
    subtitle: "Unidad Productiva",
    icon: "ios-create",
    screen: "EditProductiveUnit",
    right_content: null,
  };

  const onDelete = async () => {
    try {
      let confirmDelete = await Utilities.confirmDelete("Desea eliminar la unidad productiva");
      if (confirmDelete.status) {
        const loggedUser = await getAuth();
        let response = await ProductiveUnitsServices.remove(
          loggedUser.token,
          productiveUnit.id
        );
        let jsonResponse = await response.json();
        if (response.status == 200) {
          onSuccessDelete();
        } else {
          if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
            refreshToken(true);
            onDelete();
          } else Utilities.showErrorFecth(jsonResponse);
        }
      }
    } catch (error) {}
  };

  onSuccessDelete = () => {
    LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "home");
    showMessage({
      message: Texts.success.title,
      description: Texts.success.porductive_unit.delete,
      duration: 3000,
      type: "success",
    });
    props.navigation.goBack();
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <ScrollView style={Style.main_page}>
        <Breadcrumb navigation={props.navigation} data={breadcrumb} />
        <View style={Style.container_buttons}>
          <LabelButton
            onPress={() => {
              props.navigation.navigate("Users", {
                productive_unit: productiveUnit,
              });
            }}
            fill={Constants.COLORS.SECONDARY}
            icon="ios-people"
            title="Usuarios"
          />
          <LabelButton
            onPress={() => {
              props.navigation.replace("EditProductiveUnit", {
                productive_unit: productiveUnit,
              });
            }}
            icon="ios-create"
            style={{ marginHorizontal: 5 }}
            title="Modificar"
          />
          <LabelButton
            onPress={() => {
              onDelete();
            }}
            fill={Constants.COLORS.RED}
            icon="ios-trash"
            title="Eliminar"
          />
        </View>
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
