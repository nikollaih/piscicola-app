import { View, Text, StyleSheet } from "react-native";
import { Constants } from "../../util";
import { RoundIconButton } from "../../components/button/roundIconButton";
import Theme from '../../theme/theme';

export const ProductShortCuts = ({navigation, sowing = {}}) => {
  return (
    <View style={Style.actions}>
      <RoundIconButton
        title="Biomasas"
        icon="barbell"
        fill={Constants.COLORS.PRIMARY}
        onPress={() => {navigation.navigate("Biomasses", {sowing})}}
      />
      <RoundIconButton
        title="Mortalidad"
        icon="heart-dislike"
        fill={Constants.COLORS.BLUE}
        onPress={() => {navigation.navigate("Mortalities", {sowing})}}
      />
      <RoundIconButton
        title="Alimento"
        icon="md-fast-food"
        fill={Constants.COLORS.SOFT_YELLOW}
        onPress={() => {navigation.navigate("Food", {sowing})}}
      />
      <RoundIconButton
        title="Medicamento"
        icon="ios-medkit"
        fill={Constants.COLORS.RED}
        onPress={() => {navigation.navigate("Medications", {sowing})}}
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
