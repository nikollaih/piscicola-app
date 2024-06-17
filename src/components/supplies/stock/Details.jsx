import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import Theme from "../../../theme/theme";
import moment from "moment";
import { Constants, Utilities, Texts } from "../../../util";
import { DetailsActions } from "../../detailsActions/detailsActions";
import { SuppliesStockServices } from "../../../services";
import { useAuth } from "../../../hooks/useAuth";
import Ionicon from "react-native-vector-icons/Ionicons";
import theme from "../../../theme/theme";

export const SupplyStockDetails = ({
  supplyStock,
  navigation,
  supply,
  onClose = () => {},
  onDelete = () => {},
}) => {
  const { getAuth, refreshToken } = useAuth();
  const onEdit = () => {
    onClose();
    navigation.navigate("AddSupplyStock", { supplyStock: supplyStock, supply: supply });
  };

  const onRemove = async () => {
    try {
      const loggedUser = await getAuth();
      let response = await SuppliesStockServices.remove(loggedUser.token, supplyStock.id);
      let jsonResponse = await response.json();
      if (response.status === 200) {
        Utilities.showAlert({
          title: Texts.success.title,
          text: Texts.success.supplyStock.delete,
          type: "success",
        });
        onDelete();
      } else {
        if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
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
      "Desea eliminar el stock",
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
    <ScrollView>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Fecha de registro</Text>
        <Text style={Style.text}>
          {moment(supplyStock.manual_created_at).format(Constants.DATETIME_FORMATS.DATE)}
        </Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Cantidad</Text>
        <Text
          style={Style.text}
        >{`${supplyStock?.quantity}`}</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Precio Unidad</Text>
        <Text style={Style.text}>
          {`$${(supplyStock?.price / supplyStock?.quantity).toLocaleString("es-CO")}`}
        </Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Precio Total</Text>
        <Text style={Style.text}>
          ${supplyStock.price.toLocaleString("es-CO")}
        </Text>
      </View>
      <DetailsActions
        onDelete={confirmDelete}
        onEdit={onEdit}
      />
    </ScrollView>
  );
};

const Style = StyleSheet.create({
  ...Theme,
  button: {
    ...theme.row,
  },
  edit_text: {
    color: Constants.COLORS.SECONDARY,
    marginLeft: 5,
  }
});
