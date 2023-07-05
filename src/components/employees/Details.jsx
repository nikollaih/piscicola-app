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
import { EmployeesServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";

export const EmployeeDetails = ({
  employee,
  navigation,
  onClose = () => {},
  onDelete = () => {},
}) => {
  const { getAuth } = useAuth();
  const onEdit = () => {
    onClose();
    navigation.navigate("AddEmployee", { employee: employee });
  };

  const onRemove = async () => {
    try {
      const loggedUser = await getAuth();
      let response = await EmployeesServices.remove(
        loggedUser.token,
        employee.id
      );
      let jsonResponse = await response.json();
      if (response.status == 200) {
        Utilities.showAlert({
          title: Texts.success.title,
          text: Texts.success.employee.delete,
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
      "Desea eliminar el empleado",
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
          <Text style={Style.inside_subtitle}>Número de identificación</Text>
          <Text style={Style.text}>{employee.identifier}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Teléfono</Text>
          <TouchableOpacity 
            activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
            onPress={() => {Utilities.openUrl(`tel:${employee.phone}`)}}>
            <Text style={[Style.text, {color: Constants.COLORS.PRIMARY}]}>{employee.phone}</Text>
          </TouchableOpacity>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Ocupación</Text>
          <Text style={Style.text}>{employee.occupation}</Text>
        </View>
        <View style={Style.list_container}>
          <Text style={Style.inside_subtitle}>Fecha de creación</Text>
          <Text style={Style.text}>
            {moment(employee.created_at).format(
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
