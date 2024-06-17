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
import { MedicationServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";

export const MedicationDetails = ({
  medication,
  sowing,
  navigation,
  onClose = () => {},
  onDelete = () => {},
}) => {
  const { getAuth } = useAuth();
  const onEdit = () => {
    onClose();
    navigation.navigate("AddMedication", { medication: medication, sowing: sowing });
  };

  const onRemove = async () => {
    try {
      const loggedUser = await getAuth();
      let response = await MedicationServices.remove(
        loggedUser.token,
        medication.id
      );
      let jsonResponse = await response.json();
      if (response.status == 200) {
        Utilities.showAlert({
          title: Texts.success.title,
          text: Texts.success.medication.delete,
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
      "Desea eliminar el registro",
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
          <Text style={Style.inside_subtitle}>Cantidad</Text>
          <Text style={Style.text}>{`${medication.quantity} ${medication.supply.unit_type.name}`}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Costo</Text>
          <Text style={Style.text}>${medication.supply?.total_cost.toLocaleString("es-CO")}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Fecha de alimentación</Text>
          <Text style={Style.text}>
            {moment(medication.apply_at).format(
              Constants.DATETIME_FORMATS.DATETIME
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