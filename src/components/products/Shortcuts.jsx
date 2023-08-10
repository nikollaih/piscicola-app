import { View, Text, StyleSheet } from "react-native";
import { Constants } from "../../util";
import { RoundIconButton } from "../../components/button/roundIconButton";
import Theme from '../../theme/theme';

export const ProductShortCuts = ({navigation, sowing = {}}) => {
  return (
    <View style={Style.actions}>
      <RoundIconButton
        title="Vender"
        icon="ios-cart"
        fill={Constants.COLORS.PRIMARY}
        onPress={() => {navigation.navigate("Biomasses", {sowing})}}
      />
      <RoundIconButton
        title="Alimento"
        icon="md-fast-food"
        fill={Constants.COLORS.SOFT_YELLOW}
        onPress={() => {navigation.navigate("FeedHistory")}}
      />
      <RoundIconButton
        title="Medicamento"
        icon="ios-medkit"
        fill={Constants.COLORS.RED}
      />
      <RoundIconButton
        title="Insumo"
        icon="ios-flask"
        fill={Constants.COLORS.BLUE}
      />
    </View>
  );
};

const Style = StyleSheet.create({
  actions: {
    ...Theme.row_between,
    backgroundColor: Constants.COLORS.WHITE,
    paddingVertical: 20,
    marginHorizontal: -10,
  },
});
