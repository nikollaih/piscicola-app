import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useState } from "react";
import { Constants } from "../../util";
import { CustomModal } from "../customModal/customModal";
import Theme from "../../theme/theme";
const { height } = Dimensions.get("window");
import Fish from "../../assets/images/fish.png";

export const SowingItem = ({
  navigation,
  sowing,
  onDelete = () => {},
  orientation,
}) => {
  const [showModal, setShowModal] = useState(false);

  const getCustomStyle = () => {
    return {
      width: orientation === "horizontal" ? 160 : undefined,
      marginRight: orientation === "horizontal" ? 10 : 0,
      marginBottom: orientation === "horizontal" ? 0 : 10,
    };
  };

  const onRemove = () => {
    setShowModal(false);
    onDelete();
  };

  return (
    <TouchableOpacity
      activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
      style={[{ ...getCustomStyle() }]}
      onPress={() => {
        navigation.navigate("ProductDetail", { sowing: sowing });
      }}
    >
      <View>
        <View style={Style.inside}>
          <View style={Style.container_image}>
            <Image source={Fish} style={Style.fish} />
          </View>
          <Text
            style={Style.text_name}
          >{sowing.name}</Text>
          <Text style={Style.text_pond}>{`${sowing.fish.name} - ${sowing.step.name}`}</Text>
          <Text style={Style.text_pond}>Cantidad: {sowing.quantity - sowing.dead_quantity}</Text>
          <Text style={Style.text_pond}>Estanque: {sowing.pond.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  text_pond: {
    color: Constants.COLORS.WHITE,
    fontSize: 12,
    fontFamily: "RobotoCondensed-Regular",
  },
  text_name: {
    color: Constants.COLORS.WHITE,
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 17,
    marginBottom: 5
  },
  inside: {
    backgroundColor: Constants.COLORS.SOFT_YELLOW,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  product_title: {
    color: Constants.COLORS.DARK,
    marginTop: 5,
    fontFamily: "RobotoCondensed-Regular",
  },
  fish: {
    width: 40,
    height: 40,
  },
  container_image: {
    backgroundColor: Constants.COLORS.WHITE,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: 15,
  },
});
