import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import Theme from "../../theme/theme";
import moment from "moment";
import { Constants, Utilities, Texts } from "../../util";
import { DetailsActions } from "../detailsActions/detailsActions";
import { SuppliesServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import Ionicon from "react-native-vector-icons/Ionicons";
import theme from "../../theme/theme";

export const SupplyDetails = ({
  supply,
  navigation,
  onClose = () => {},
  onDelete = () => {},
}) => {
  const { getAuth, refreshToken } = useAuth();
  const onEdit = () => {
    onClose();
    navigation.navigate("AddSupply", { supply: supply });
  };

  const onRemove = async () => {
    try {
      const loggedUser = await getAuth();
      let response = await SuppliesServices.remove(loggedUser.token, supply.id);
      let jsonResponse = await response.json();
      if (response.status === 200) {
        Utilities.showAlert({
          title: Texts.success.title,
          text: Texts.success.supply.delete,
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
      "Desea eliminar el insumo",
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

  const getStockButton = () => {
    return (
      <TouchableOpacity
        style={Style.button}
        activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
        onPress={() => {
          onClose();
          navigation.navigate("SuppliesStock", {supply: supply})
        }}
      >
        <Ionicon name="ios-create" size={24} color={Constants.COLORS.SECONDARY} />
        <Text style={Style.edit_text}>Stock</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Fecha de compra</Text>
        <Text style={Style.text}>
          {moment(supply.created_at).format(Constants.DATETIME_FORMATS.DATE)}
        </Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Stock</Text>
        <Text
          style={Style.text}
        >{`${supply.available_quantity} ${supply?.measurement_unit?.name}`}</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Tipo</Text>
        <Text style={Style.text}>
          {Utilities.getSupplyName(supply?.use_type)?.name}
        </Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Notas</Text>
        <Text style={Style.text}>{supply.notes}</Text>
      </View>
      <DetailsActions
        onDelete={confirmDelete}
        onEdit={onEdit}
        buttons={getStockButton()}
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
