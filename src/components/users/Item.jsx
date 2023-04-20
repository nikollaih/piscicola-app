import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CustomModal } from "../customModal/customModal";
import { UserDetails } from "./Details";
import { useState } from "react";
import Theme from "../../theme/theme";
import { Constants, Utilities } from "../../util";
const { height } = Dimensions.get("window");

export const UserItem = ({ user }) => {
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
        <Text style={Style.inside_subtitle}>{Utilities.capitalize(user?.full_name)}</Text>
        <Text style={Style.text}>{user?.email}</Text>
      </View>
      <Text style={[Style.font_roboto_bold]}>{Utilities.capitalize(user?.user_type.key)}</Text>
      <CustomModal
        height={height - 280}
        title={user?.full_name}
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <UserDetails user={user} />
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
