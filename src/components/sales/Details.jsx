import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert
} from "react-native";
import { Constants, Utilities, Texts } from "../../util";
import Theme from "../../theme/theme";
import moment from "moment";
import { DetailsActions } from "../detailsActions/detailsActions";
import { SaleServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";

export const SaleDetails = ({
  sale,
  navigation,
  onClose = () => {},
  onDelete = () => {},
}) => {
  const { getAuth } = useAuth();
  const onEdit = () => {
    onClose();
    navigation.navigate("AddSale", { sale: sale, sowing: sale.sowing });
  };

  const onRemove = async () => {
    try {
      const loggedUser = await getAuth();
      let response = await SaleServices.remove(
        loggedUser.token,
        sale.id
      );
      let jsonResponse = await response.json();
      if (response.status == 200) {
        Utilities.showAlert({
          title: Texts.success.title,
          text: Texts.success.sale.delete,
          type: "success",
        });
        onDelete();
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({ force: true, navigation: navigation });
          onRemove();
        } else Utilities.showErrorFecth(jsonResponse);
      }
    } catch (error) {
      Utilities.showAlert({});
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "¿Está seguro?",
      "Desea eliminar la venta",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            onRemove();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={Style.full_flex}>
      <ScrollView style={Style.full_flex}>
      <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Estanque</Text>
          <Text style={Style.text}>{sale.sowing.pond.name}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Pez</Text>
          <Text style={Style.text}>{sale.fish.name}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Peso aproximado</Text>
          <Text style={Style.text}>{sale.total_weight + "Kg"}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Precio unitario</Text>
          <Text style={Style.text}>{`$${sale.price_unit.toLocaleString("Es-co")}`}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Total</Text>
          <Text style={Style.text}>{`$${sale.total_earning.toLocaleString("Es-co")}`}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Fecha de venta</Text>
          <Text style={Style.text}>
            {moment(sale.manual_created_at).format(
              Constants.DATETIME_FORMATS.DATE
            )}
          </Text>
        </View>
      </ScrollView>
      <DetailsActions onDelete={confirmDelete} onEdit={onEdit} />
    </View>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
