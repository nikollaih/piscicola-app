import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import Theme from "../../theme/theme";
import moment from "moment";
import { Constants, Texts, Utilities } from "../../util";
import { FishStatsServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { DetailsActions } from "../detailsActions/detailsActions";

export const FishStatsDetails = ({
  fishStats,
  navigation,
  onClose = () => {},
  onDelete = () => {},
}) => {
  const { getAuth } = useAuth();
  const onEdit = () => {
    onClose();
    navigation.navigate("AddFishStats", { fishStats: fishStats });
  };

  const onRemove = async () => {
    try {
      const loggedUser = await getAuth();
      let response = await FishStatsServices.remove(
        loggedUser.token,
        fishStats.id
      );
      let jsonResponse = await response.json();

      if (response.status == 200) {
        Utilities.showAlert({
          title: Texts.success.title,
          text: Texts.success.fishStats.delete,
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
      "Desea eliminar el parametro",
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
          <Text style={Style.inside_subtitle}>Key</Text>
          <Text style={Style.text}>{fishStats.key} </Text>
        </View>
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Minimo</Text>
            <Text style={Style.text}>{fishStats.value_minimum} </Text>
          </View>
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Maximo</Text>
            <Text style={Style.text}>{fishStats.value_maximum} </Text>
          </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Descripción</Text>
          <Text style={Style.text}>{fishStats.description} </Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Fecha de creación</Text>
          <Text style={Style.text}>
            {moment(fishStats.created_at).format(
              Constants.DATETIME_FORMATS.DATE
            )}
          </Text>
        </View>
      </ScrollView>
      <DetailsActions
        onDelete={confirmDelete}
        onEdit={onEdit}
      />
    </View>
  );
};

const Style = StyleSheet.create({
  ...Theme,
  edit_text: {
    color: Constants.COLORS.SECONDARY,
    marginLeft: 5,
  },
});
