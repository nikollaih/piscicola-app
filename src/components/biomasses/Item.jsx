import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BiomasseDetails } from "./Details";
import { useState } from "react";
import { Constants } from "../../util";
import { CustomModal } from "../customModal/customModal";
import Theme from "../../theme/theme";
import moment from "moment";
const { height } = Dimensions.get("window");

export const BiomasseItem = ({ navigation, biomasse, onDelete = () => {} }) => {
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
        <View style={[Style.inside, Style.row_between]}>
          <View>
            
            <Text style={Style.text_name}>{`${biomasse.fish_step.fish.name} - ${biomasse.fish_step.name}`}</Text>
            <Text style={Style.text_biomasse}>{`Muestra: ${biomasse.quantity_of_fish}`}</Text>
            <Text style={Style.text_biomasse}>{moment(biomasse.manual_created_at).format(Constants.DATETIME_FORMATS.DATE)}</Text>
          </View>
          <Text style={Style.text_name}>{`${biomasse.approximate_weight}${biomasse.unit_type.key}`}</Text>
        </View>
      </View>
      <CustomModal
        height={height - 500}
        title={""}
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <BiomasseDetails
          onClose={() => setShowModal(false)}
          onDelete={() => onRemove()}
          navigation={navigation}
          biomasse={biomasse}
        />
      </CustomModal>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  ...Theme,
  container: {
    marginBottom: 10,
  },
  text_biomasse: {
    color: Constants.COLORS.DARK,
    fontSize: 14,
    fontFamily: "RobotoCondensed-Regular",
  },
  text_name: {
    color: Constants.COLORS.DARK,
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 17,
  },
  inside: {
    ...Theme.row,
    backgroundColor: Constants.COLORS.WHITE,
    borderRadius: 20,
    padding: 15,
  },
  product_title: {
    color: Constants.COLORS.DARK,
    marginTop: 5,
    fontFamily: "RobotoCondensed-Regular",
  },
  fish: {
    width: 70,
    height: 70,
  },
  container_image: {
    backgroundColor: Constants.COLORS.WHITE,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginRight: 20,
  },
});
