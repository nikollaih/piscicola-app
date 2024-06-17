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

export const UserItem = ({ user, navigation, onDelete = () => {} }) => {
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
        <Text style={Style.inside_subtitle}>
          {Utilities.capitalize(user?.name)}
        </Text>
        <Text style={Style.text}>{user?.email}</Text>
      </View>
      <Text style={[Style.font_roboto_bold]}>
        {Utilities.capitalize(user?.role.name)}
      </Text>
      <CustomModal
        height={height - 320}
        title={user?.name}
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <UserDetails
          onClose={() => setShowModal(false)}
          onDelete={() => onRemove() }
          navigation={navigation}
          user={user}
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
