import {View, Text, StyleSheet} from 'react-native';
import Theme from '../../theme/theme';
import { Constants } from '../../util';

export const ExpensesItem = props => {
  return (
    <View style={Style.container}>
      <View>
        <Text style={Style.font_roboto_bold}>Servicio de luz</Text>
        <Text style={Style.font_roboto_regular}>2023/03/21</Text>
      </View>
      <Text style={[Style.text_red, Style.font_roboto_bold]}>$200.000</Text>
    </View>
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
    borderBottomWidth: 1,
    borderColor: Constants.COLORS.IOS_BACKGROUND_GRAY
  }
});
