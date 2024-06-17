import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CustomModal } from "../customModal/customModal";
import { SupplyDetails } from "./Details";
import { useState } from "react";
import Theme from "../../theme/theme";
import { Constants, Utilities } from "../../util";
const { height } = Dimensions.get("window");

export const SupplyItem = ({ supply, navigation, onDelete = () => {} }) => {
  const [showModal, setShowModal] = useState(false);

  const onRemove = () => {
    setShowModal(false);
    onDelete();
  };

  const getUseType = (use_type) => {
    return (use_type === "ALIMENT") ? "Alimento" : "Medicina";
  }

  const getUseTypeBg = (use_type) => {
    return (use_type === "ALIMENT") ? Constants.COLORS.GREEN : Constants.COLORS.BLUE;
  }

  return (
    <TouchableOpacity
      activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
      style={Style.container}
      onPress={() => {
        setShowModal(true);
      }}
    >
      <View>
        <Text style={Style.inside_subtitle}>{supply.name}</Text>
        <Text
          style={Style.text}
        >{`Disponible: ${supply.available_quantity} ${supply.measurement_unit.name}`}</Text>
      </View>
      <View>
        <Text style={[Style.text_red, Style.font_roboto_regular, Style.label, {backgroundColor: getUseTypeBg(supply.use_type)}]}>
          {Utilities.getSupplyName(supply.use_type).name}
        </Text>
      </View>
      <CustomModal
        height={height - 400}
        title={supply.name}
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <SupplyDetails
          onClose={() => setShowModal(false)}
          onDelete={() => onRemove()}
          supply={supply}
          navigation={navigation}
        />
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
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    borderRadius: 5,
    overflow: "hidden",
    color: Constants.COLORS.WHITE,
    paddingHorizontal: 3,
    paddingVertical: 1,
    fontSize: 12,
    width: 50,
    alignSelf: "flex-end"
  }
});
