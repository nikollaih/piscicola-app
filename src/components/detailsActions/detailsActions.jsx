import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import theme from "../../theme/theme";
import Ionicon from "react-native-vector-icons/Ionicons";
import { Constants } from "../../util";

export const DetailsActions = ({ onEdit = () => {}, onDelete = () => {} }) => {
  return (
    <View style={Style.container}>
      <TouchableOpacity
        style={Style.button}
        activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
        onPress={() => {onEdit()}}
      >
        <Ionicon name="ios-create" size={24} color={Constants.COLORS.PRIMARY} />
        <Text style={Style.edit_text}>Modificar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={Style.button}
        activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
        onPress={() => {onDelete()}}
      >
        <Ionicon name="ios-trash" size={24} color={Constants.COLORS.RED} />
        <Text style={Style.delete_text}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    paddingVertical: 20,
    ...theme.row_around,
  },
  button: {
    ...theme.row,
  },
  delete_text: {
    color: Constants.COLORS.RED,
    marginLeft: 5,
  },
  edit_text: {
    color: Constants.COLORS.PRIMARY,
    marginLeft: 5,
  },
});
