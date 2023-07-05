import { ScrollView, Text, View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Theme from "../../theme/theme";
import moment from "moment";
import { Constants, Texts, Utilities } from "../../util";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { FishServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { DetailsActions } from "../detailsActions/detailsActions";

export const FishDetails = ({
  fish,
  navigation,
  onClose = () => {},
  onDelete = () => {},
}) => {
  const { getAuth } = useAuth();
  const onEdit = () => {
    onClose();
    navigation.navigate("AddFish", { fish: fish });
  };

  const getParametersButton = () => {
    return <View>
        <TouchableOpacity
        style={Style.row}
        activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
        onPress={() => {
          onClose();
          navigation.navigate("FishStats", { fish: fish });
        }}
      >
        <Ionicon name="ios-analytics" size={24} color={Constants.COLORS.SECONDARY} />
        <Text style={Style.edit_text}>Parametros</Text>
      </TouchableOpacity>
    </View>;
  }

  const onRemove = async () => {
    try {
      const loggedUser = await getAuth();
      let response = await FishServices.remove(loggedUser.token, fish.id);
      let jsonResponse = await response.json();

      if (response.status == 200) {
        Utilities.showAlert({
          title: Texts.success.title,
          text: Texts.success.fish.delete,
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
          <Text style={Style.inside_subtitle}>Nombre</Text>
          <Text style={Style.text}>{fish.name} </Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Tipo de producto</Text>
          <Text style={Style.text}>{fish.fish.name} </Text>
        </View>
        {fish?.productive_unit ? (
          <View style={Style.list_container}>
            <Text style={Style.inside_subtitle}>Unidad productiva</Text>
            <Text style={Style.text}>{fish.productive_unit.name} </Text>
          </View>
        ) : null}
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Descripción</Text>
          <Text style={Style.text}>{fish.description} </Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Fecha de creación</Text>
          <Text style={Style.text}>
            {moment(fish.created_at).format(Constants.DATETIME_FORMATS.DATE)}
          </Text>
        </View>
      </ScrollView>
      <DetailsActions 
      buttons={getParametersButton()}
      onDelete={confirmDelete} onEdit={onEdit} />
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
