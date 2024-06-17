import { ScrollView, Text, View, StyleSheet, Alert } from "react-native";
import { Texts, Utilities, Constants } from "../../util";
import { UsersServices } from "../../services";
import Theme from "../../theme/theme";
import { useAuth } from "../../hooks/useAuth";
import { DetailsActions } from "../detailsActions/detailsActions";
import moment from "moment";

export const UserDetails = ({
  user,
  navigation,
  onClose = () => {},
  onDelete = () => {},
}) => {
  const { getAuth, refreshToken } = useAuth();
  const onEdit = () => {
    const modifiedUser = {
      ...user,
      role_id: user.role_id,
    };
    onClose();
    navigation.navigate("AddUser", { user: modifiedUser });
  };

  const onRemove = async () => {
    try {
      const loggedUser = await getAuth();
      let response = await UsersServices.remove(loggedUser.token, user.id);
      let jsonResponse = await response.json();

      if (response.status === 200) {
        Utilities.showAlert({
          title: Texts.success.title,
          text: Texts.success.user.delete,
          type: "success",
        });
        onDelete();
      } else {
        if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
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
    <ScrollView>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Email</Text>
        <Text style={Style.text}>{Utilities.capitalize(user?.email)}</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Rol</Text>
        <Text style={Style.text}>
          {Utilities.capitalize(user?.role.name)}
        </Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Fecha de registro</Text>
        <Text style={Style.text}>
          {moment(user.created_at).format(Constants.DATETIME_FORMATS.DATE)}
        </Text>
      </View>
      <DetailsActions onEdit={onEdit} onDelete={confirmDelete} />
    </ScrollView>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
