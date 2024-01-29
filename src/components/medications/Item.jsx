import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CustomModal } from "../customModal/customModal";
import { useState } from "react";
import { MedicationDetails } from "./Details";
import Theme from "../../theme/theme";
import { Constants } from "../../util";
import moment from "moment";
const { height } = Dimensions.get("window");

export const MedicationItem = ({ navigation, medication, sowing, onDelete = () => {} }) => {
  const [showModal, setShowModal] = useState(false);

  const onRemove = () => {
    setShowModal(false);
    onDelete()
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
        <Text
          style={Style.inside_subtitle}
        >{`${medication.supply.name} (${medication.quantity} ${medication.supply.unit_type.name})`}</Text>
        <Text style={Style.text}>
          {moment(medication.apply_at).format(Constants.DATETIME_FORMATS.DATETIME)}
        </Text>
      </View>
      <Text
        style={[Style.text_red, Style.font_roboto_bold]}
      >{`$${medication.supply.total_cost.toLocaleString("es-CO")}`}</Text>
      <CustomModal
        height={height - 400}
        title={medication.supply.name}
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <MedicationDetails
          onClose={() => setShowModal(false)}
          onDelete={() => onRemove()}
          navigation={navigation}
          medication={medication}
          sowing={sowing}
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
