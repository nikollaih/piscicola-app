import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Theme from "../../theme/theme";
import { Constants } from "../../util";
import { CustomModal } from "../customModal/customModal";
import { ExpenseDetails } from "./Details";
const { height } = Dimensions.get("window");

export const ExpensesItem = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
      style={Style.container}
      onPress={() => {
        setShowModal(true);
      }}>
      <View>
        <Text style={Style.font_roboto_bold}>Servicio de luz</Text>
        <Text style={Style.font_roboto_regular}>2023/03/21</Text>
      </View>
      <Text style={[Style.text_red, Style.font_roboto_bold]}>$200.000</Text>
      <CustomModal
        height={height - 400}
        title="Servicio de luz"
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ExpenseDetails />
      </CustomModal>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  ...Theme,
  container: {
    ...Theme.row_between,
    ...Theme.list_container,
    backgroundColor: Constants.COLORS.WHITE,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Constants.COLORS.IOS_BACKGROUND_GRAY,
  },
});
