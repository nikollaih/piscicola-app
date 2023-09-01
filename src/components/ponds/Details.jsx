import { ScrollView, Text, View, StyleSheet, Alert } from "react-native";
import { Constants, Utilities, Texts } from "../../util";
import Theme from "../../theme/theme";
import moment from "moment";
import { DetailsActions } from "../detailsActions/detailsActions";
import { PondsServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";

export const PondDetails = ({
  pond,
  navigation,
  onClose = () => {},
  onDelete = () => {},
}) => {
  const { getAuth, refreshToken } = useAuth();
  const onEdit = () => {
    onClose();
    navigation.navigate("AddPond", { pond: pond });
  };

  const onRemove = async () => {
    try {
      const loggedUser = await getAuth();
      let response = await PondsServices.remove(loggedUser.token, pond.id);
      let jsonResponse = await response.json();
      if (response.status == 200) {
        Utilities.showAlert({
          title: Texts.success.title,
          text: Texts.success.pond.delete,
          type: "success",
        });
        onDelete();
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({force:true, navigation: navigation});
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
      "Desea eliminar el usuario",
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
          <Text style={Style.inside_subtitle}>Fecha de creación</Text>
          <Text style={Style.text}>
            {moment(pond.created_at).format(Constants.DATETIME_FORMATS.DATE)}
          </Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Sensor ID</Text>
          <Text style={Style.text}>{pond.sensor_id}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Descripción</Text>
          <Text style={Style.text}>{pond.description}</Text>
        </View>
      </ScrollView>
      <DetailsActions onDelete={confirmDelete} onEdit={onEdit} />
    </View>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
