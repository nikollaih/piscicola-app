import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CustomModal } from "../customModal/customModal";
import { useState } from "react";
import { FishDetails } from "./Details";
import Theme from "../../theme/theme";
import { Constants, Utilities } from "../../util";
import moment from "moment";
const { height } = Dimensions.get("window");

export const FishItem = ({ fish, navigation, onDelete = () => {} }) => {
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
        <Text style={Style.inside_subtitle}>
          {Utilities.capitalize(fish.name)}
        </Text>
        <Text style={Style.text}>
          {`${fish?.fish?.name} ${
            fish?.productive_unit?.name
              ? " - " + fish?.productive_unit?.name
              : ""
          }`}{" "}
        </Text>
      </View>
      <CustomModal
        height={height - 500}
        title={Utilities.capitalize(fish.name)}
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <FishDetails
          onClose={() => {
            setShowModal(false);
          }}
          onDelete={() => {
            onRemove();
          }}
          fish={fish}
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
