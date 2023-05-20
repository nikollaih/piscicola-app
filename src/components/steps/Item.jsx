import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CustomModal } from "../customModal/customModal";
import { useState } from "react";
import { StepDetails } from "./Details";
import Theme from "../../theme/theme";
import { Constants, Utilities } from "../../util";
import moment from "moment";
const { height } = Dimensions.get("window");

export const StepItem = ({ step, navigation }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
      style={Style.container}
      onPress={() => {
        setShowModal(true);
      }}
    >
      <View>
        <Text style={Style.inside_subtitle}>
          {Utilities.capitalize(step.name)}
        </Text>
        <Text style={Style.text}>
          {(step.description) ? step.description : "Sin descripción"}
        </Text>
      </View>
      <CustomModal
        height={height - 300}
        title={Utilities.capitalize(step.name)}
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <StepDetails
          onClose={() => {
            setShowModal(false);
          }}
          step={step}
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
