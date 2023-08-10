import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Constants, Utilities, Texts } from "../../util";
import Theme from "../../theme/theme";
import moment from "moment";
import { DetailsActions } from "../detailsActions/detailsActions";
import { BiomassesServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";

export const BiomasseDetails = ({
  biomasse,
  navigation,
  onClose = () => {},
  onDelete = () => {},
}) => {
  console.log(biomasse);
  const { getAuth } = useAuth();
  const onEdit = () => {
    onClose();
    navigation.navigate("AddBiomasse", { biomasse: biomasse });
  };

  const onRemove = async () => {
    try {
      const loggedUser = await getAuth();
      let response = await BiomassesServices.remove(
        loggedUser.token,
        biomasse.id
      );
      let jsonResponse = await response.json();
      if (response.status == 200) {
        Utilities.showAlert({
          title: Texts.success.title,
          text: Texts.success.biomasse.delete,
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
      console.log(error)
      Utilities.showAlert({});
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "¿Está seguro?",
      "Desea eliminar la biomasa",
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
          <Text style={Style.text}>{biomasse.sowing.pond.name}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Pez</Text>
          <Text style={Style.text}>{biomasse.fish_step.fish.name}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Etapa</Text>
          <Text style={Style.text}>{biomasse.fish_step.name}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Peso aproximado</Text>
          <Text style={Style.text}>{biomasse.approximate_weight}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Unidad de medida</Text>
          <Text style={Style.text}>{biomasse.unit_type.name}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Cantidad de muestra</Text>
          <Text style={Style.text}>{biomasse.quantity_of_fish}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Fecha de creación</Text>
          <Text style={Style.text}>
            {moment(biomasse.manual_created_at).format(
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
