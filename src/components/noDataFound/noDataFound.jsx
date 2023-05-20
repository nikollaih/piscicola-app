import { Text, View, StyleSheet, Image } from "react-native";
import NoResultFound from "../../assets/images/no_results_found.png";
import { Constants } from "../../util";

export const NoDataFound = () => {
  return (
    <View style={Style.container}>
      <Image source={NoResultFound} style={Style.image} />
      <Text style={Style.text}>No se encontraron registros</Text>
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Constants.COLORS.WHITE,
    padding: 40,
    borderRadius: 10
  },
  text: {
    marginTop: 10,
    color: Constants.COLORS.DARK
  },
  image: {
    width: 50,
    height: 50,
  },
});
