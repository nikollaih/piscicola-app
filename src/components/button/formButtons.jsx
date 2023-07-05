import { View, StyleSheet } from "react-native";
import Theme from "../../theme/theme";
import { FillIconButton } from "./fillIconButton";
import { Constants } from "../../util";

export const FormButtons = ({
  navigation,
  saving,
  onSave = () => {},
  backTimes = 1,
}) => {
  return (
    <View style={Style.buttons_container}>
      <FillIconButton
        title="Cancelar"
        icon="ios-arrow-back"
        fill={Constants.COLORS.GRAY}
        style={Style.left_button}
        onPress={() => {
          navigation.pop(backTimes);
        }}
      />
      <FillIconButton
        title="Guardar"
        icon="ios-save"
        saving={saving}
        style={Style.right_button}
        onPress={() => {
          onSave();
        }}
      />
    </View>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
