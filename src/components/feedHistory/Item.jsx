import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CustomModal } from "../customModal/customModal";
import { useState } from "react";
import { FeedDetails } from "./Details";
import Theme from "../../theme/theme";
import { Constants } from "../../util";
const { height } = Dimensions.get("window");

export const FeedItem = (props) => {
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
        <Text style={Style.inside_subtitle}>Nutripez</Text>
        <Text style={Style.text}>2023/03/21</Text>
      </View>
      <View>
        <Text style={[Style.text_red, Style.font_roboto_bold]}>10kg</Text>
        <Text style={[Style.text_red, Style.font_roboto_regular, Style.price]}>$7800</Text>
      </View>
      <CustomModal
        height={height - 400}
        title="Nutripez"
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <FeedDetails />
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
  price: {
    color: Constants.COLORS.GRAY
  }
});
