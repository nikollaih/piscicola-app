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
import { Constants } from "../../util";
const { height } = Dimensions.get("window");

export const SupplyItem = ({ supply, navigation, onDelete = () => {} }) => {
  const [showModal, setShowModal] = useState(false);

  const onRemove = () => {
    setShowModal(false);
    onDelete();
  };

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
        >{`Stock: ${supply.stock} ${supply.unit_type.name}`}</Text>
      </View>
      <Text style={[Style.text_red, Style.font_roboto_bold]}>
        ${supply.total_cost.toLocaleString("es-CO")}
      </Text>
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
});
