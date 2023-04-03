import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Farm from "../../assets/images/farm.png";
import { Constants } from "../../util";

const { width } = Dimensions.get("screen");

export const ProductiveUnitItem = ({ navigation, orientation }) => {
  return (
    <TouchableOpacity
      activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
      style={Style.container}
      onPress={() => {
        navigation.navigate("ProductiveUnit");
      }}
    >
      <View>
        <View style={Style.inside}>
          <View style={Style.container_image}>
            <Image source={Farm} style={Style.farm} />
          </View>
          <Text style={Style.text_name}>Asorobles</Text>
          <Text style={Style.text_pond}>Quindio, Vereda uno km5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  container: {
    width: (width / 2) - 15,
    marginBottom: 10,
  },
  text_pond: {
    color: Constants.COLORS.WHITE,
    fontSize: 12,
    fontFamily: "RobotoCondensed-Regular",
  },
  text_name: {
    color: Constants.COLORS.WHITE,
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 17,
  },
  inside: {
    backgroundColor: Constants.COLORS.PRIMARY,
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
  farm: {
    width: 45,
    height: 45,
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
